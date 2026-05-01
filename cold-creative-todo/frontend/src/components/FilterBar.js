class FilterBar {
    constructor(containerId, callbacks) {
        this.container = document.getElementById(containerId);
        this.callbacks = callbacks;
        this.buttons = [];
    }

    render(counts, currentFilter) {
        this.container.innerHTML = '';

        const filters = [
            { key: 'todas', label: 'Todas' },
            { key: 'ativas', label: 'Ativas' },
            { key: 'concluidas', label: 'Concluídas' }
        ];

        filters.forEach(({ key, label }) => {
            const count = counts[key];
            const isActive = currentFilter === key;

            const btn = Utils.createElement('button', {
                className: `filter-btn ${isActive ? 'active' : ''}`,
                onClick: () => this.callbacks.onFilterChange(key)
            },
                label,
                Utils.createElement('span', { className: 'filter-count' }, String(count))
            );

            this.buttons.push(btn);
            this.container.appendChild(btn);
        });
    }
}