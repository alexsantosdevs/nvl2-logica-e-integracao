class Modal {
    constructor() {
        this.overlay = null;
    }

    show({ title, description, icon, confirmText, cancelText, onConfirm, variant = 'danger' }) {
        this.close();

        this.overlay = Utils.createElement('div', {
            className: 'modal-overlay',
            onClick: (e) => {
                if (e.target === this.overlay) {
                    this.close();
                }
            }
        });

        const confirmButton = Utils.createElement('button', {
            className: variant === 'danger' ? 'btn btn-danger-fill' : 'btn btn-primary',
            onClick: () => {
                if (typeof onConfirm === 'function') {
                    onConfirm();
                }
                this.close();
            }
        }, confirmText || 'Confirmar');

        const cancelButton = Utils.createElement('button', {
            className: 'btn btn-ghost',
            onClick: () => this.close()
        }, cancelText || 'Cancelar');

        const modal = Utils.createElement('div', { className: 'modal' },
            Utils.createElement('div', { className: 'modal-icon' }, icon || '⚠️'),
            Utils.createElement('h3', { className: 'modal-title' }, title),
            Utils.createElement('p', { className: 'modal-description' }, description),
            Utils.createElement('div', { className: 'modal-actions' },
                cancelButton,
                confirmButton
            )
        );

        this.overlay.appendChild(modal);
        document.body.appendChild(this.overlay);
        document.body.style.overflow = 'hidden';
    }

    close() {
        if (this.overlay) {
            this.overlay.remove();
            this.overlay = null;
            document.body.style.overflow = '';
        }
    }
}