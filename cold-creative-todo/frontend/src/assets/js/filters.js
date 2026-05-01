const FilterState = {
    current: 'todas',

    apply(tasks, filter) {
        this.current = filter;

        switch (filter) {
            case 'ativas':
                return tasks.filter(t => !t.concluida);
            case 'concluidas':
                return tasks.filter(t => t.concluida);
            default:
                return [...tasks];
        }
    },

    getCounts(tasks) {
        const total = tasks.length;
        const ativas = tasks.filter(t => !t.concluida).length;
        const concluidas = total - ativas;

        return {
            todas: total,
            ativas,
            concluidas
        };
    }
};