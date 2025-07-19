// UI Management Module
const UI = {
    showModal(title, content) {
        const modal = document.getElementById('modal');
        const modalTitle = document.getElementById('modalTitle');
        const modalContent = document.getElementById('modalContent');
        
        if (modalTitle) modalTitle.textContent = title;
        if (modalContent) modalContent.innerHTML = content;
        if (modal) modal.style.display = 'flex';
    },
    
    hideModal() {
        const modal = document.getElementById('modal');
        if (modal) modal.style.display = 'none';
    },
    
    createForm(fields, formId) {
        const form = document.createElement('form');
        form.id = formId;
        
        fields.forEach(field => {
            const formGroup = document.createElement('div');
            formGroup.className = 'form-group';
            
            const label = document.createElement('label');
            label.textContent = field.label;
            if (field.required) label.innerHTML += ' *';
            
            let input;
            if (field.type === 'textarea') {
                input = document.createElement('textarea');
                input.rows = 3;
            } else if (field.type === 'select') {
                input = document.createElement('select');
                field.options.forEach(option => {
                    const optionEl = document.createElement('option');
                    optionEl.value = option.value;
                    optionEl.textContent = option.label;
                    input.appendChild(optionEl);
                });
            } else {
                input = document.createElement('input');
                input.type = field.type;
            }
            
            input.name = field.name;
            input.className = 'form-input';
            if (field.required) input.required = true;
            if (field.value) input.value = field.value;
            
            formGroup.appendChild(label);
            formGroup.appendChild(input);
            form.appendChild(formGroup);
        });
        
        const actions = document.createElement('div');
        actions.className = 'form-actions';
        actions.innerHTML = `
            <button type="button" class="btn btn-secondary" onclick="UI.hideModal()">Cancel</button>
            <button type="submit" class="btn btn-primary">Submit</button>
        `;
        form.appendChild(actions);
        
        return form;
    },
    
    showNotification(message, type = 'info') {
        // Simple notification - you can enhance this later
        alert(`${type.toUpperCase()}: ${message}`);
    }
};

 