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
            e.preventDefault();

            // Limpar mensagens de erro anteriores
            document.querySelectorAll('.form-error').forEach(error => error.textContent = '');

            // Obter valores
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

            // Se válido, simular envio
            if (isValid) {
                console.log('Formulário válido:', { email, phone, message });
                
                // Desabilitar botão durante envio
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                submitBtn.disabled = true;
                submitBtn.textContent = 'Enviando...';

                // Simular delay de envio
                setTimeout(() => {
                    formSuccess.style.display = 'flex';
                    contactForm.style.display = 'none';

                    // Resetar após 5 segundos
                    setTimeout(() => {
                        formSuccess.style.display = 'none';
                        contactForm.style.display = 'block';
                        contactForm.reset();
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = 'Enviar Mensagem <i class="fas fa-paper-plane"></i>';
                    }, 5000);
                }, 1500);
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

        document.getElementById('contactForm').addEventListener('submit', function(event) {
            event.preventDefault(); // Impede a página de recarregar

            // 1. Captura os dados digitados pelo usuário
            const emailUsuario = document.getElementById('email').value;
            const telefone = document.getElementById('phone').value;
            const mensagem = document.getElementById('message').value;

            // 2. Define o seu e-mail como destinatário
            const destinatario = 'joao.da-cruz@hotmail.com';
            const assunto = encodeURIComponent('Novo contato do site');
            
            // 3. Monta o corpo do e-mail
            const corpo = encodeURIComponent(
                `E-mail do remetente: ${emailUsuario}\n` +
                `Telefone: ${telefone}\n\n` +
                `Mensagem:\n${mensagem}`
            );

            // 4. Dispara o e-mail abrindo o app padrão do usuário
            window.location.href = `mailto:${destinatario}?subject=${assunto}&body=${corpo}`;

            // 5. Mostra a mensagem de sucesso que já está no seu HTML
            document.getElementById('formSuccess').style.display = 'block';
            this.reset(); // Limpa o formulário
        });
