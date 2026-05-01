class ColdCreativeToDo {
    constructor() {
        this.tasks = [];
        this.currentFilter = 'todas';
        this.modal = new Modal();
        this.taskList = null;
        this.filterBar = null;
        this.form = null;
        this.input = null;
        this.counter = null;
        this.clearCompletedBtn = null;
        this.feedback = null;
    }

    init() {
        this.loadPage();
        this.bindElements();
        this.tasks = Storage.getTasks();
        this.renderAll();
        this.bindEvents();
    }

    loadPage() {
        const app = document.getElementById('app');
        fetch('src/pages/index.html')
            .then(response => response.text())
            .then(html => {
                app.innerHTML = html;
                this.onPageLoaded();
            })
            .catch(() => {
                app.innerHTML = '<p style="text-align:center;padding:48px;color:var(--text-muted);">Erro ao carregar a aplicação.</p>';
            });
    }

    onPageLoaded() {
        this.bindElements();
        this.taskList = new TaskList('taskList', {
            onToggle: (id) => this.toggleTask(id),
            onDelete: (id) => this.confirmDeleteTask(id),
            onEdit: (id, newText) => this.editTask(id, newText),
            onRefresh: () => this.renderAll()
        });
        this.filterBar = new FilterBar('filterBar', {
            onFilterChange: (filter) => this.setFilter(filter)
        });
        this.tasks = Storage.getTasks();
        this.renderAll();
        this.bindEvents();
    }

    bindElements() {
        this.form = document.getElementById('taskForm');
        this.input = document.getElementById('taskInput');
        this.counter = document.getElementById('taskCounter');
        this.clearCompletedBtn = document.getElementById('clearCompletedBtn');
        this.feedback = document.getElementById('taskFormFeedback');
    }

    bindEvents() {
        if (this.form) {
            this.form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.addTask();
            });
        }

        if (this.clearCompletedBtn) {
            this.clearCompletedBtn.addEventListener('click', () => {
                this.confirmClearCompleted();
            });
        }

        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                if (this.input) this.input.focus();
            }
        });
    }

    addTask() {
        if (!this.input) return;
        const texto = this.input.value.trim();

        if (!texto) {
            this.showFeedback('Digite algo para adicionar uma tarefa.');
            return;
        }

        if (texto.length < 2) {
            this.showFeedback('A tarefa deve ter pelo menos 2 caracteres.');
            return;
        }

        this.hideFeedback();

        const task = {
            id: Utils.generateId(),
            texto: Utils.escapeHtml(texto),
            concluida: false,
            dataCriacao: new Date().toISOString()
        };

        this.tasks = Storage.addTask(task);
        this.input.value = '';
        this.input.focus();
        this.renderAll();
    }

    toggleTask(id) {
        const task = this.tasks.find(t => t.id === id);
        if (!task) return;
        const updated = { ...task, concluida: !task.concluida };
        this.tasks = Storage.updateTask(id, updated);
        this.renderAll();
    }

    editTask(id, newText) {
        if (!newText || newText.length < 2) return;
        this.tasks = Storage.updateTask(id, { texto: Utils.escapeHtml(newText) });
        this.renderAll();
    }

    confirmDeleteTask(id) {
        const task = this.tasks.find(t => t.id === id);
        if (!task) return;

        this.modal.show({
            title: 'Excluir tarefa',
            description: `Deseja realmente excluir "${task.texto}"? Esta ação não pode ser desfeita.`,
            icon: '🗑️',
            confirmText: 'Excluir',
            cancelText: 'Cancelar',
            variant: 'danger',
            onConfirm: () => {
                this.deleteTask(id);
            }
        });
    }

    deleteTask(id) {
        const taskElement = document.querySelector(`[data-task-id="${id}"]`);
        if (taskElement) {
            taskElement.classList.add('removing');
            taskElement.addEventListener('animationend', () => {
                this.tasks = Storage.deleteTask(id);
                this.renderAll();
            }, { once: true });
        } else {
            this.tasks = Storage.deleteTask(id);
            this.renderAll();
        }
    }

    confirmClearCompleted() {
        const completedCount = this.tasks.filter(t => t.concluida).length;
        if (completedCount === 0) return;

        this.modal.show({
            title: 'Limpar concluídas',
            description: `${completedCount} tarefa(s) concluída(s) serão removidas permanentemente.`,
            icon: '🧹',
            confirmText: 'Limpar',
            cancelText: 'Cancelar',
            variant: 'danger',
            onConfirm: () => {
                this.tasks = Storage.clearCompleted();
                this.renderAll();
            }
        });
    }

    setFilter(filter) {
        this.currentFilter = filter;
        this.renderAll();
    }

    renderAll() {
        const filtered = FilterState.apply(this.tasks, this.currentFilter);
        const counts = FilterState.getCounts(this.tasks);

        if (this.taskList) this.taskList.render(filtered);
        if (this.filterBar) this.filterBar.render(counts, this.currentFilter);
        this.updateCounter(counts);
        this.updateClearButton(counts);
    }

    updateCounter(counts) {
        if (!this.counter) return;
        if (counts.ativas === 0) {
            this.counter.innerHTML = '✨ <strong>Tudo concluído!</strong>';
        } else if (counts.ativas === 1) {
            this.counter.innerHTML = '<strong>1</strong> tarefa pendente';
        } else {
            this.counter.innerHTML = `<strong>${counts.ativas}</strong> tarefas pendentes`;
        }
    }

    updateClearButton(counts) {
        if (!this.clearCompletedBtn) return;
        if (counts.concluidas === 0) {
            this.clearCompletedBtn.style.opacity = '0';
            this.clearCompletedBtn.style.pointerEvents = 'none';
        } else {
            this.clearCompletedBtn.style.opacity = '1';
            this.clearCompletedBtn.style.pointerEvents = 'all';
        }
    }

    showFeedback(message) {
        if (!this.feedback) return;
        this.feedback.textContent = message;
        this.feedback.classList.add('visible');
    }

    hideFeedback() {
        if (!this.feedback) return;
        this.feedback.textContent = '';
        this.feedback.classList.remove('visible');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const app = new ColdCreativeToDo();
    app.init();
});