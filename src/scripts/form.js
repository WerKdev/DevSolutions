/**
 * Script para validação e envio do formulário de contato
 */
document.addEventListener('DOMContentLoaded', function() {
    // Selecionando o formulário
    const contactForm = document.getElementById('contactForm');
    
    // Selecionando os campos do formulário
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    
    // Selecionando o modal de sucesso
    const successModal = document.getElementById('successModal');
    
    // Adicionando evento de submit ao formulário
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // Prevenindo o comportamento padrão do formulário
            e.preventDefault();
            
            // Variável para rastrear a validade do formulário
            let isValid = true;
            
            // Validação do campo nome
            if (!nameInput.value.trim()) {
                nameInput.classList.add('is-invalid');
                isValid = false;
            } else {
                nameInput.classList.remove('is-invalid');
                nameInput.classList.add('is-valid');
            }
            
            // Validação do campo email
            if (!validateEmail(emailInput.value)) {
                emailInput.classList.add('is-invalid');
                isValid = false;
            } else {
                emailInput.classList.remove('is-invalid');
                emailInput.classList.add('is-valid');
            }
            
            // Validação do campo mensagem
            if (!messageInput.value.trim()) {
                messageInput.classList.add('is-invalid');
                isValid = false;
            } else {
                messageInput.classList.remove('is-invalid');
                messageInput.classList.add('is-valid');
            }
            
            // Se o formulário for válido, processar o envio
            if (isValid) {
                // Aqui seria implementada a lógica de envio para um servidor
                // Para fins do exercício, simularemos um envio bem-sucedido
                
                // Feedback visual durante o processamento
                const submitButton = contactForm.querySelector('button[type="submit"]');
                submitButton.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Enviando...';
                submitButton.disabled = true;
                
                // Simulação de um tempo de processamento (2 segundos)
                setTimeout(function() {
                    // Resetar o formulário
                    contactForm.reset();
                    
                    // Remover as classes de validação
                    nameInput.classList.remove('is-valid');
                    emailInput.classList.remove('is-valid');
                    messageInput.classList.remove('is-valid');
                    
                    // Resetar o botão
                    submitButton.innerHTML = 'Enviar';
                    submitButton.disabled = false;
                    
                    // Exibir o modal de sucesso
                    const modal = new bootstrap.Modal(successModal);
                    modal.show();
                }, 2000);
            } else {
                // Se houver campos inválidos, role até o primeiro campo inválido
                const firstInvalidField = document.querySelector('.is-invalid');
                if (firstInvalidField) {
                    firstInvalidField.focus();
                }
            }
        });
        
        // Adicionando eventos de input para validação em tempo real
        nameInput.addEventListener('input', function() {
            if (this.value.trim()) {
                this.classList.remove('is-invalid');
            }
        });
        
        emailInput.addEventListener('input', function() {
            if (validateEmail(this.value)) {
                this.classList.remove('is-invalid');
            }
        });
        
        messageInput.addEventListener('input', function() {
            if (this.value.trim()) {
                this.classList.remove('is-invalid');
            }
        });
    }
    
    // Função para validar email
    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
});