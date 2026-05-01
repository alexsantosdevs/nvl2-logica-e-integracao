class TaskList {
    constructor(containerId, callbacks) {
        this.container = document.getElementById(containerId);
        this.callbacks = callbacks;
    }

    render(tasks) {
        this.container.innerHTML = '';

        if (tasks.length === 0) {
            this.renderEmpty();
            return;
        }

        const fragment = document.createDocumentFragment();

        tasks.forEach(task => {
            const taskItem = new TaskItem(task, this.callbacks);
            const element = taskItem.render();
            fragment.appendChild(element);
        });

        this.container.appendChild(fragment);
    }

    renderEmpty() {
        const filterLabels = {
            'todas': 'Nenhuma tarefa ainda',
            'ativas': 'Nenhuma tarefa ativa',
            'concluidas': 'Nenhuma tarefa concluída'
        };

        const filterSubtitles = {
            'todas': 'Adicione sua primeira tarefa acima.',
            'ativas': 'Você concluiu tudo! Incrível.',
            'concluidas': 'Complete algumas tarefas primeiro.'
        };

        const currentFilter = FilterState.current;

        const emptyElement = Utils.createElement('div', { className: 'task-list-empty' },
            Utils.createElement('div', { className: 'task-list-empty-icon' }, '📋'),
            Utils.createElement('p', { className: 'task-list-empty-text' }, filterLabels[currentFilter] || filterLabels['todas']),
            Utils.createElement('p', { className: 'task-list-empty-subtext' }, filterSubtitles[currentFilter] || filterSubtitles['todas'])
        );

        this.container.appendChild(emptyElement);
    }
}