class TaskItem {
    constructor(task, callbacks) {
        this.task = task;
        this.callbacks = callbacks;
        this.element = null;
        this.isEditing = false;
    }

    render() {
        if (this.task.concluida) {
            return this.renderCompleted();
        }
        return this.renderActive();
    }

    renderActive() {
        this.element = Utils.createElement('div', {
            className: 'task-item',
            dataset: { taskId: this.task.id }
        },
            Utils.createElement('button', {
                className: 'task-checkbox',
                onClick: () => this.callbacks.onToggle(this.task.id),
                'aria-label': 'Marcar como concluída'
            },
                Utils.createElement('svg', {
                    viewBox: '0 0 24 24',
                    fill: 'none',
                    stroke: 'currentColor',
                    'stroke-width': '3',
                    'stroke-linecap': 'round',
                    'stroke-linejoin': 'round'
                },
                    Utils.createElement('polyline', { points: '20 6 9 17 4 12' })
                )
            ),
            Utils.createElement('div', {
                className: 'task-content',
                onDblClick: () => this.startEditing()
            },
                Utils.createElement('p', { className: 'task-text' }, this.task.texto),
                Utils.createElement('span', { className: 'task-date' }, Utils.formatDate(this.task.dataCriacao))
            ),
            Utils.createElement('div', { className: 'task-actions' },
                Utils.createElement('button', {
                    className: 'task-action-btn',
                    onClick: (e) => {
                        e.stopPropagation();
                        this.startEditing();
                    },
                    'aria-label': 'Editar tarefa'
                }, '✎'),
                Utils.createElement('button', {
                    className: 'task-action-btn delete',
                    onClick: (e) => {
                        e.stopPropagation();
                        this.callbacks.onDelete(this.task.id);
                    },
                    'aria-label': 'Excluir tarefa'
                }, '✕')
            )
        );

        return this.element;
    }

    renderCompleted() {
        this.element = Utils.createElement('div', {
            className: 'task-item completed',
            dataset: { taskId: this.task.id }
        },
            Utils.createElement('button', {
                className: 'task-checkbox',
                onClick: () => this.callbacks.onToggle(this.task.id),
                'aria-label': 'Desmarcar conclusão'
            },
                Utils.createElement('svg', {
                    viewBox: '0 0 24 24',
                    fill: 'none',
                    stroke: 'currentColor',
                    'stroke-width': '3',
                    'stroke-linecap': 'round',
                    'stroke-linejoin': 'round'
                },
                    Utils.createElement('polyline', { points: '20 6 9 17 4 12' })
                )
            ),
            Utils.createElement('div', { className: 'task-content' },
                Utils.createElement('p', { className: 'task-text' }, this.task.texto),
                Utils.createElement('span', { className: 'task-date' }, Utils.formatDate(this.task.dataCriacao))
            ),
            Utils.createElement('div', { className: 'task-actions' },
                Utils.createElement('button', {
                    className: 'task-action-btn delete',
                    onClick: (e) => {
                        e.stopPropagation();
                        this.callbacks.onDelete(this.task.id);
                    },
                    'aria-label': 'Excluir tarefa'
                }, '✕')
            )
        );

        return this.element;
    }

    startEditing() {
        if (this.task.concluida || this.isEditing) return;
        this.isEditing = true;

        const input = Utils.createElement('input', {
            type: 'text',
            className: 'task-edit-input',
            value: this.task.texto,
            maxLength: '200'
        });

        const handleSave = () => {
            const newText = input.value.trim();
            this.isEditing = false;
            if (newText && newText !== this.task.texto) {
                this.callbacks.onEdit(this.task.id, newText);
            } else {
                this.callbacks.onRefresh();
            }
        };

        input.addEventListener('blur', handleSave);
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                input.blur();
            }
            if (e.key === 'Escape') {
                input.value = this.task.texto;
                input.blur();
            }
        });

        const textElement = this.element.querySelector('.task-text');
        if (textElement) {
            textElement.replaceWith(input);
            input.focus();
            input.select();
        }
    }
}