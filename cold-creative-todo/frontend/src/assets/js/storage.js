const Storage = {
    STORAGE_KEY: 'coldcreative_todo_tasks',

    getTasks() {
        try {
            const raw = localStorage.getItem(this.STORAGE_KEY);
            if (!raw) return [];
            const tasks = JSON.parse(raw);
            if (!Array.isArray(tasks)) return [];
            return tasks.filter(task => {
                return task && typeof task.id === 'string' && typeof task.texto === 'string';
            });
        } catch (error) {
            return [];
        }
    },

    saveTasks(tasks) {
        try {
            const serialized = JSON.stringify(tasks);
            localStorage.setItem(this.STORAGE_KEY, serialized);
        } catch (error) {
            if (error.name === 'QuotaExceededError') {
                this.showStorageWarning();
            }
        }
    },

    addTask(task) {
        const tasks = this.getTasks();
        tasks.unshift(task);
        this.saveTasks(tasks);
        return tasks;
    },

    updateTask(taskId, updates) {
        const tasks = this.getTasks();
        const index = tasks.findIndex(t => t.id === taskId);
        if (index === -1) return tasks;
        tasks[index] = { ...tasks[index], ...updates };
        this.saveTasks(tasks);
        return tasks;
    },

    deleteTask(taskId) {
        const tasks = this.getTasks();
        const filtered = tasks.filter(t => t.id !== taskId);
        this.saveTasks(filtered);
        return filtered;
    },

    clearCompleted() {
        const tasks = this.getTasks();
        const active = tasks.filter(t => !t.concluida);
        this.saveTasks(active);
        return active;
    },

    showStorageWarning() {
        alert('O armazenamento local está cheio. Libere espaço para continuar salvando tarefas.');
    }
};