/**
 * Kine-Mesh.blog - Final JS 2025
 * Эстетика: Светлый нео-брутализм
 */

window.addEventListener('load', () => {
    
    // --- 1. ИНИЦИАЛИЗАЦИЯ ИКОНОК (LUCIDE) ---
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // --- 2. ПЛАВНЫЙ СКРОЛЛ (LENIS) ---
    let lenis;
    if (typeof Lenis !== 'undefined') {
        lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
    }

    // --- 3. МОБИЛЬНОЕ МЕНЮ ---
    const burger = document.getElementById('burger-menu');
    const menuOverlay = document.getElementById('menu-overlay');
    const mobileLinks = document.querySelectorAll('.mobile-nav__link');

    if (burger && menuOverlay) {
        const toggleMenu = () => {
            burger.classList.toggle('active');
            menuOverlay.classList.toggle('active');
            document.body.style.overflow = menuOverlay.classList.contains('active') ? 'hidden' : '';
        };

        burger.addEventListener('click', toggleMenu);

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                burger.classList.remove('active');
                menuOverlay.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // --- 4. АНИМАЦИЯ ГЕРОЯ (GSAP + SPLITTYPE) ---
    if (window.gsap && window.SplitType) {
        const heroTitle = document.querySelector('#hero-title');
        if (heroTitle) {
            // Разбиваем на слова и буквы для корректного переноса (white-space)
            const text = new SplitType(heroTitle, { types: 'words, chars' });
            
            gsap.from(text.chars, {
                opacity: 0,
                y: 40,
                rotate: 5,
                duration: 0.7,
                stagger: 0.02,
                ease: "back.out(1.7)",
                delay: 0.3
            });

            gsap.from('.hero__subtitle, .hero__actions', {
                opacity: 0,
                y: 20,
                duration: 1,
                stagger: 0.2,
                delay: 1,
                ease: "power2.out"
            });
        }
    }

    // --- 5. ЛОГИКА ФОРМЫ (КАПЧА + ВАЛИДАЦИЯ + AJAX) ---
    const contactForm = document.getElementById('main-form');
    if (contactForm) {
        const phoneInput = document.getElementById('phone');
        const captchaLabel = document.getElementById('captcha-label');
        const captchaInput = document.getElementById('captcha-input');
        const statusDiv = document.getElementById('form-status');
        const submitBtn = contactForm.querySelector('button[type="submit"]');

        // Генерируем случайную капчу
        const n1 = Math.floor(Math.random() * 8) + 1;
        const n2 = Math.floor(Math.random() * 9) + 1;
        const sum = n1 + n2;
        if (captchaLabel) captchaLabel.innerText = `${n1} + ${n2} = `;

        // Валидация телефона (только цифры и +)
        phoneInput.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/[^\d+]/g, '');
        });

        contactForm.onsubmit = async (e) => {
            e.preventDefault();

            // Проверка капчи
            if (parseInt(captchaInput.value) !== sum) {
                statusDiv.innerText = "❌ Ошибка в расчетах. Попробуйте снова.";
                statusDiv.style.display = "block";
                statusDiv.style.background = "#FFCFCF"; // Нео-розовый
                return;
            }

            // Имитация отправки
            submitBtn.disabled = true;
            const originalBtnText = submitBtn.innerText;
            submitBtn.innerText = "ОТПРАВКА...";
            
            statusDiv.innerText = "⏳ Подключаемся к платформе...";
            statusDiv.style.display = "block";
            statusDiv.style.background = "#C7D2FE"; // Нео-индиго

            // Задержка имитации сети
            setTimeout(() => {
                statusDiv.innerHTML = `
                    <div style="text-align: center;">
                        <p style="font-size: 1.2rem; margin-bottom: 5px;">🚀 УСПЕШНО!</p>
                        <p style="font-weight: 400; font-size: 0.9rem;">Ваша стратегия роста готова. Мы свяжемся с вами в течение 15 минут.</p>
                    </div>
                `;
                statusDiv.style.background = "#00FF94"; // Нео-зеленый
                statusDiv.style.color = "#1A1A1A";
                
                contactForm.reset();
                submitBtn.disabled = false;
                submitBtn.innerText = "ОТПРАВИТЬ ПОВТОРНО";
                
                // Скрываем капчу после успеха
                if (captchaLabel) captchaLabel.parentElement.style.opacity = "0.3";
            }, 2000);
        };
    }

    // --- 6. COOKIE POPUP ---
    const cookiePopup = document.getElementById('cookie-popup');
    const acceptBtn = document.getElementById('accept-cookies');

    if (cookiePopup && !localStorage.getItem('kine_mesh_cookies')) {
        setTimeout(() => {
            cookiePopup.classList.add('active');
        }, 3000);
    }

    if (acceptBtn) {
        acceptBtn.onclick = () => {
            localStorage.setItem('kine_mesh_cookies', 'true');
            cookiePopup.classList.remove('active');
        };
    }
});