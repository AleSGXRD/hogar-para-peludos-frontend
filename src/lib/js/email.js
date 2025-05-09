
import emailjs from 'emailjs-com';
// lib/js/email.js
document.getElementById('contact-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    const form = this;
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;

    // Activar spinner
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
        <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Enviando...
    `;

    // Crear notificación
    const showNotification = (message, isSuccess) => {
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg text-white ${
            isSuccess ? 'bg-green-500' : 'bg-red-500'
        } z-50 transition-all duration-300 transform translate-x-0 opacity-100`;
        notification.innerHTML = `
            <div class="flex items-center">
                ${isSuccess ? 
                    '<svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>' :
                    '<svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>'
                }
                <span>${message}</span>
            </div>
        `;
        document.body.appendChild(notification);

        // Auto-eliminar después de 5 segundos
        setTimeout(() => {
            notification.classList.add('translate-x-full', 'opacity-0');
            setTimeout(() => notification.remove(), 300);
        }, 5000);
    };

    try {
        const response = await emailjs.sendForm(
            import.meta.env.PUBLIC_EMAILJS_SERVICE_ID,
            import.meta.env.PUBLIC_EMAILJS_TEMPLATE_ID,
            form,
            import.meta.env.PUBLIC_EMAILJS_USER_ID
        );

        // Éxito
        showNotification('¡Mensaje enviado con éxito!', true);
        form.reset();
    } catch (error) {
        console.error('Error:', error);
        
        // Manejo específico para límite excedido
        if (error.status === 429) {
            showNotification(`
                <div>
                    <p>Límite de envíos excedido.</p>
                    <p class="font-bold mt-1">Por favor contacta directamente:</p>
                    <p class="mt-1">${document.querySelector('a[href^="mailto:"]').textContent}</p>
                    <p>${document.querySelector('a[href^="tel:"]').textContent}</p>
                </div>
            `, false);
        } else {
            showNotification('Error al enviar el mensaje. Intenta nuevamente.', false);
        }
    } finally {
        // Restaurar botón
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
    }
});