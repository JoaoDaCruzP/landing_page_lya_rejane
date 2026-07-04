// ===== MENU MOBILE RESPONSIVO =====
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// ===== HEADER STICKY COM SCROLL =====
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ===== VALIDAÇÃO E ENVIO DO FORMULÁRIO =====
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault(); // Impede o envio real do formulário e o recarregamento

    // Limpar mensagens de erro anteriores
    document.querySelectorAll('.form-error').forEach(error => error.textContent = '');

    // Obter valores limpos
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const message = document.getElementById('message').value.trim();

    let isValid = true;

    // Validar Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        document.getElementById('emailError').textContent = 'Por favor, insira um email válido';
        isValid = false;
    }

    // Validar Telefone
    const phoneRegex = /^[\d\s()\-+]*$/;
    if (!phone || !phoneRegex.test(phone) || phone.length < 10) {
        document.getElementById('phoneError').textContent = 'Por favor, insira um telefone válido';
        isValid = false;
    }

    // Validar Mensagem
    if (!message || message.length < 10) {
        document.getElementById('messageError').textContent = 'A mensagem deve ter no mínimo 10 caracteres';
        isValid = false;
    }

    // SE O FORMULÁRIO FOR VÁLIDO, FAZ O DISPARO E ANIMAÇÃO
    if (isValid) {
        console.log('Formulário válido. Preparando envio...');
        
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Enviando...';

        // 1. Configura os dados do e-mail (UNIFICADO AQUI)
        const destinatario = 'joao.da-cruz@hotmail.com';
        const assunto = encodeURIComponent('Novo contato do site');
        const corpo = encodeURIComponent(
            `E-mail do remetente: ${email}\n` +
            `Telefone: ${phone}\n\n` +
            `Mensagem:\n${message}`
        );

        // Simula o delay do carregamento antes de abrir o e-mail e mostrar o sucesso
        setTimeout(() => {
            // 2. Dispara o cliente de e-mail do usuário
            window.location.href = `mailto:${destinatario}?subject=${assunto}&body=${corpo}`;

            // 3. Exibe a mensagem de sucesso
            formSuccess.style.display = 'flex';
            contactForm.style.display = 'none';

            // Reseta a tela após 5 segundos
            setTimeout(() => {
                formSuccess.style.display = 'none';
                contactForm.style.display = 'block';
                contactForm.reset();
                submitBtn.disabled = false;
                submitBtn.innerHTML = 'Enviar Mensagem <i class="fas fa-paper-plane"></i>';
            }, 5000);
        }, 1500);

    } else {
        console.log('Envio bloqueado: existem campos inválidos ou vazios.');
    }
}); 

// ===== SCROLL SUAVE PARA ÂNCORAS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});