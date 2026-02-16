// Enhanced Interactive Portfolio JavaScript
document.addEventListener('DOMContentLoaded', function () {
    // Initialize AOS (Animate On Scroll)
    if (window.AOS) {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100
        });
    }

    const finePointer = window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    // Custom Cursor (only for fine pointers)
    let cursor = null;
    let follower = null;
    if (finePointer) {
        document.body.classList.add('custom-cursor-enabled');

        cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        follower = document.createElement('div');
        follower.className = 'cursor-follower';
        document.body.appendChild(cursor);
        document.body.appendChild(follower);

        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;
        let followerX = 0, followerY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        function animateCursor() {
            cursorX += (mouseX - cursorX) * 0.5;
            cursorY += (mouseY - cursorY) * 0.5;
            cursor.style.left = cursorX + 'px';
            cursor.style.top = cursorY + 'px';

            followerX += (mouseX - followerX) * 0.1;
            followerY += (mouseY - followerY) * 0.1;
            follower.style.left = followerX + 'px';
            follower.style.top = followerY + 'px';

            requestAnimationFrame(animateCursor);
        }
        animateCursor();

        // Add hover effect to interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .nav-link, .social-link, .skill-item, .btn, .mobile-menu-toggle');
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursor.classList.add('cursor-hover');
                follower.classList.add('cursor-hover');
            });
            element.addEventListener('mouseleave', () => {
                cursor.classList.remove('cursor-hover');
                follower.classList.remove('cursor-hover');
            });
        });
    }

    // Particle Effects
    function createParticles() {
        const particlesBg = document.getElementById('particlesBg');
        const heroParticles = document.getElementById('heroParticles');

        // Background particles
        if (particlesBg) {
            for (let i = 0; i < 50; i++) {
                createParticle(particlesBg, Math.random() * 100, Math.random() * 100);
            }
        }

        // Hero section particles
        if (heroParticles) {
            for (let i = 0; i < 30; i++) {
                createParticle(heroParticles, Math.random() * 100, Math.random() * 100);
            }
        }
    }

    function createParticle(container, x, y) {
        if (!container) return;
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = x + '%';
        particle.style.top = y + '%';
        particle.style.width = Math.random() * 4 + 1 + 'px';
        particle.style.height = particle.style.width;
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (Math.random() * 20 + 10) + 's';
        container.appendChild(particle);
    }

    createParticles();

    // Enhanced Navigation
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    let activeSectionId = null;

    // Smooth scrolling with easing
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 50;

                // Custom easing function
                const startPosition = window.pageYOffset;
                const distance = offsetTop - startPosition;
                const duration = 1000;
                let start = null;

                function animation(currentTime) {
                    if (start === null) start = currentTime;
                    const timeElapsed = currentTime - start;
                    const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
                    window.scrollTo(0, run);
                    if (timeElapsed < duration) requestAnimationFrame(animation);
                }

                function easeInOutQuad(t, b, c, d) {
                    t /= d / 2;
                    if (t < 1) return c / 2 * t * t + b;
                    t--;
                    return -c / 2 * (t * (t - 2) - 1) + b;
                }

                requestAnimationFrame(animation);
            }
        });
    });

    // Active navigation link on scroll with progress
    function updateActiveNav() {
        const scrollPosition = window.scrollY + 100;
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollProgress = (window.scrollY / scrollHeight) * 100;

        // Update scroll progress bar
        const scrollProgressElement = document.querySelector('.scroll-progress');
        if (scrollProgressElement) {
            scrollProgressElement.style.width = scrollProgress + '%';
        }

        let currentSectionId = null;
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = sectionId;
            }
        });

        if (currentSectionId && currentSectionId !== activeSectionId) {
            activeSectionId = currentSectionId;
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentSectionId}`) {
                    link.classList.add('active');
                    createRipple(link);
                }
            });
        }
    }

    function createRipple(element) {
        const ripple = document.createElement('span');
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.5)';
        ripple.style.width = '10px';
        ripple.style.height = '10px';
        ripple.style.top = '50%';
        ripple.style.left = '0';
        ripple.style.transform = 'translate(-50%, -50%)';
        ripple.style.animation = 'ripple 0.6s ease-out';
        element.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    }

    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav();

    // Enhanced Contact Form
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        const inputs = contactForm.querySelectorAll('input, textarea');
        const statusEl = contactForm.querySelector('.form-status');
        const submitBtn = contactForm.querySelector('button[type="submit"]');

        const fields = {
            name: contactForm.querySelector('#name'),
            email: contactForm.querySelector('#email'),
            subject: contactForm.querySelector('#subject'),
            message: contactForm.querySelector('#message')
        };

        const errors = {
            name: contactForm.querySelector('#nameError'),
            email: contactForm.querySelector('#emailError'),
            message: contactForm.querySelector('#messageError')
        };

        const setStatus = (message, type = '') => {
            if (!statusEl) return;
            statusEl.textContent = message;
            statusEl.classList.toggle('is-error', type === 'error');
            statusEl.classList.toggle('is-success', type === 'success');
        };

        const setSubmitting = (isSubmitting) => {
            contactForm.classList.toggle('is-submitting', isSubmitting);
            if (submitBtn) submitBtn.disabled = isSubmitting;
            inputs.forEach(el => {
                el.disabled = isSubmitting;
            });
        };

        const setFieldError = (key, message) => {
            const field = fields[key];
            const error = errors[key];
            if (!field || !error) return;
            const group = field.closest('.form-group');
            if (group) group.classList.add('invalid');
            field.setAttribute('aria-invalid', 'true');
            error.textContent = message;
        };

        const clearFieldError = (key) => {
            const field = fields[key];
            const error = errors[key];
            if (!field || !error) return;
            const group = field.closest('.form-group');
            if (group) group.classList.remove('invalid');
            field.removeAttribute('aria-invalid');
            error.textContent = '';
        };

        const clearAllErrors = () => {
            clearFieldError('name');
            clearFieldError('email');
            clearFieldError('message');
        };

        inputs.forEach(input => {
            input.addEventListener('focus', function () {
                const group = this.closest('.form-group');
                if (group) group.classList.add('focused');
            });

            input.addEventListener('blur', function () {
                const group = this.closest('.form-group');
                if (!group) return;
                group.classList.remove('focused');
                group.classList.toggle('filled', this.value.trim() !== '');
            });

            input.addEventListener('input', function () {
                const id = this.getAttribute('id');
                if (id === 'name') clearFieldError('name');
                if (id === 'email') clearFieldError('email');
                if (id === 'message') clearFieldError('message');
                setStatus('');
            });
        });

        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            if (contactForm.classList.contains('is-submitting')) return;

            clearAllErrors();
            setStatus('');

            const formData = new FormData(this);
            const name = String(formData.get('name') || '').trim();
            const email = String(formData.get('email') || '').trim();
            const message = String(formData.get('message') || '').trim();

            let isValid = true;
            if (name.length < 2) {
                setFieldError('name', 'Please enter your name.');
                isValid = false;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email) {
                setFieldError('email', 'Please enter your email address.');
                isValid = false;
            } else if (!emailRegex.test(email)) {
                setFieldError('email', 'Please enter a valid email address.');
                isValid = false;
            }

            if (message.length < 10) {
                setFieldError('message', 'Please enter a message (at least 10 characters).');
                isValid = false;
            }

            if (!isValid) {
                setStatus('Please fix the highlighted fields and try again.', 'error');
                shakeForm(this);
                const firstInvalid = this.querySelector('.form-group.invalid input, .form-group.invalid textarea');
                if (firstInvalid) firstInvalid.focus();
                return;
            }

            setSubmitting(true);
            setStatus('Sending message…');

            setTimeout(() => {
                setSubmitting(false);
                setStatus('Message sent successfully! I\'ll get back to you soon.', 'success');
                showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
                confetti(this);
                this.reset();
                inputs.forEach(el => {
                    const group = el.closest('.form-group');
                    if (group) group.classList.remove('filled');
                });
            }, 900);
        });
    }

    function shakeForm(form) {
        form.style.animation = 'shake 0.5s';
        setTimeout(() => form.style.animation = '', 500);
    }

    function showNotification(message, type = 'info') {
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;

        const content = document.createElement('div');
        content.className = 'notification-content';

        const iconMap = {
            success: 'fa-check-circle',
            error: 'fa-exclamation-circle',
            info: 'fa-info-circle'
        };

        const icon = document.createElement('i');
        icon.className = `fas ${iconMap[type] || iconMap.info}`;

        const text = document.createElement('span');
        text.textContent = message;

        const close = document.createElement('button');
        close.type = 'button';
        close.className = 'notification-close';
        close.setAttribute('aria-label', 'Close notification');
        close.textContent = '×';

        content.appendChild(icon);
        content.appendChild(text);
        content.appendChild(close);
        notification.appendChild(content);
        document.body.appendChild(notification);

        requestAnimationFrame(() => {
            notification.classList.add('show');
        });

        const removeNotification = () => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        };

        const closeTimer = setTimeout(removeNotification, 4000);
        close.addEventListener('click', () => {
            clearTimeout(closeTimer);
            removeNotification();
        });
    }

    function confetti(originElement) {
        const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reduceMotion) return;

        const rect = originElement ? originElement.getBoundingClientRect() : null;
        const originX = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
        const originY = rect ? rect.top + rect.height / 2 : window.innerHeight / 2;

        const colors = ['#8B5CF6', '#A78BFA', '#C4B5FD', '#FFFFFF'];
        const pieces = 40;

        for (let i = 0; i < pieces; i++) {
            const piece = document.createElement('div');
            piece.className = 'confetti-piece';

            const size = 6 + Math.random() * 6;
            piece.style.width = `${size}px`;
            piece.style.height = `${size}px`;
            piece.style.left = `${originX}px`;
            piece.style.top = `${originY}px`;
            piece.style.background = colors[Math.floor(Math.random() * colors.length)];

            const x = (Math.random() - 0.5) * 400;
            const y = 220 + Math.random() * 420;
            const x1 = x * 0.55;
            const y1 = -y * 0.35;
            const rotate = (Math.random() - 0.5) * 720;
            const rotate1 = rotate * 0.5;

            piece.style.setProperty('--confetti-x', `${x}px`);
            piece.style.setProperty('--confetti-y', `${y}px`);
            piece.style.setProperty('--confetti-x1', `${x1}px`);
            piece.style.setProperty('--confetti-y1', `${y1}px`);
            piece.style.setProperty('--confetti-rotate', `${rotate}deg`);
            piece.style.setProperty('--confetti-rotate1', `${rotate1}deg`);
            piece.style.animationDuration = `${900 + Math.random() * 700}ms`;

            document.body.appendChild(piece);
            piece.addEventListener('animationend', () => piece.remove());
            setTimeout(() => piece.remove(), 2500);
        }
    }

    // Animated Counter for Stats
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        const speed = 200;

        counters.forEach(counter => {
            const suffix = counter.getAttribute('data-suffix') || '';
            const animate = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText.replace(/[^0-9]/g, '');
                const increment = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + increment) + suffix;
                    setTimeout(animate, 10);
                } else {
                    counter.innerText = target + suffix;
                }
            };

            // Start animation when element is in view
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animate();
                        observer.unobserve(entry.target);
                    }
                });
            });

            observer.observe(counter);
        });
    }

    animateCounters();

    // Theme Toggle
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        const icon = themeToggle.querySelector('i');

        function applyTheme(theme) {
            const isLight = theme === 'light';
            document.body.classList.toggle('light-theme', isLight);
            if (icon) {
                icon.classList.toggle('fa-sun', isLight);
                icon.classList.toggle('fa-moon', !isLight);
            }
        }

        let savedTheme = null;
        try {
            savedTheme = localStorage.getItem('theme');
        } catch (e) {
            savedTheme = null;
        }

        const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
        applyTheme(savedTheme || (prefersLight ? 'light' : 'dark'));

        themeToggle.addEventListener('click', function () {
            const nextTheme = document.body.classList.contains('light-theme') ? 'dark' : 'light';
            applyTheme(nextTheme);
            try {
                localStorage.setItem('theme', nextTheme);
            } catch (e) {
                // ignore
            }
            showNotification(nextTheme === 'light' ? 'Light theme activated' : 'Dark theme activated', 'info');
        });
    }

    // Advanced Scroll Animations
    let lastScrollY = window.scrollY;
    let ticking = false;

    function updateScrollAnimations() {
        const scrollY = window.scrollY;
        const delta = scrollY - lastScrollY;

        // Parallax effects
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.translate = `0px ${scrollY * 0.3}px`;
            heroContent.style.opacity = String(Math.max(0, 1 - scrollY / 800));
        }

        // Floating animation for elements
        const floatingElements = document.querySelectorAll('.skill-category');
        floatingElements.forEach((element, index) => {
            const rect = element.getBoundingClientRect();
            const speed = 0.5 + (index % 3) * 0.2;
            const yPos = -(scrollY * speed) % 100;

            if (rect.top < window.innerHeight && rect.bottom > 0) {
                element.style.setProperty('--float-y', `${yPos}px`);
            } else {
                element.style.setProperty('--float-y', '0px');
            }
        });

        lastScrollY = scrollY;
        ticking = false;
    }

    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateScrollAnimations);
            ticking = true;
        }
    }

    window.addEventListener('scroll', requestTick);

    // Magnetic Effect on Buttons
    if (finePointer) {
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(button => {
            button.addEventListener('mousemove', function (e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                this.style.setProperty('--magnet-x', `${x * 0.3}px`);
                this.style.setProperty('--magnet-y', `${y * 0.3}px`);
            });

            button.addEventListener('mouseleave', function () {
                this.style.setProperty('--magnet-x', '0px');
                this.style.setProperty('--magnet-y', '0px');
            });
        });
    }

    // Text Splitting Animation for Hero Title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalNodes = Array.from(heroTitle.childNodes);
        heroTitle.innerHTML = '';

        let index = 0;
        const baseDelay = 500;
        const perCharDelay = 50;

        const createCharSpan = (char, i) => {
            const span = document.createElement('span');
            span.innerText = char === ' ' ? '\u00A0' : char;
            span.style.opacity = '0';
            span.style.transform = 'translateY(50px)';
            span.style.display = 'inline-block';
            span.style.transition = `all 0.5s ease ${i * 0.05}s`;
            setTimeout(() => {
                span.style.opacity = '1';
                span.style.transform = 'translateY(0)';
            }, baseDelay + i * perCharDelay);
            return span;
        };

        originalNodes.forEach((node) => {
            if (node.nodeType === Node.TEXT_NODE) {
                const text = node.textContent || '';
                text.split('').forEach((char) => {
                    heroTitle.appendChild(createCharSpan(char, index));
                    index += 1;
                });
            } else if (node.nodeType === Node.ELEMENT_NODE) {
                const el = node.cloneNode(true);
                el.style.opacity = '0';
                el.style.transform = 'translateY(50px)';
                el.style.display = 'inline-block';
                el.style.transition = `all 0.5s ease ${index * 0.05}s`;
                heroTitle.appendChild(el);
                setTimeout(() => {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }, baseDelay + index * perCharDelay);
                index += (el.textContent || '').length;
            }
        });
    }

    // Typewriter Effect for Hero Subtitle
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        const fullText = heroSubtitle.textContent;
        heroSubtitle.textContent = '';
        heroSubtitle.style.borderRight = '2px solid var(--primary-purple)';
        heroSubtitle.style.animation = 'blinkCursor 0.7s step-end infinite';
        let charIndex = 0;
        const typeDelay = 1200; // wait for title animation
        const typeSpeed = 40;

        function typeWriter() {
            if (charIndex < fullText.length) {
                heroSubtitle.textContent += fullText.charAt(charIndex);
                charIndex++;
                setTimeout(typeWriter, typeSpeed);
            } else {
                // Remove cursor after typing completes
                setTimeout(() => {
                    heroSubtitle.style.borderRight = 'none';
                    heroSubtitle.style.animation = 'none';
                }, 1500);
            }
        }

        setTimeout(typeWriter, typeDelay);
    }

    // Add CSS for shake animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
            20%, 40%, 60%, 80% { transform: translateX(10px); }
        }
        @keyframes ripple {
            0% {
                width: 10px;
                height: 10px;
                opacity: 1;
            }
            100% {
                width: 50px;
                height: 50px;
                opacity: 0;
            }
        }
        @keyframes confettiBurst {
            0% {
                transform: translate(-50%, -50%) translate(0, 0) rotate(0deg);
                opacity: 1;
            }
            45% {
                transform: translate(-50%, -50%) translate(var(--confetti-x1), var(--confetti-y1)) rotate(var(--confetti-rotate1));
                opacity: 1;
            }
            100% {
                transform: translate(-50%, -50%) translate(var(--confetti-x), var(--confetti-y)) rotate(var(--confetti-rotate));
                opacity: 0;
            }
        }
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            max-width: 360px;
            padding: 0.9rem 1rem;
            border-radius: 12px;
            color: white;
            font-weight: 600;
            z-index: 10000;
            transform: translateX(120%);
            opacity: 0.98;
            transition: transform 0.3s ease, opacity 0.3s ease;
            box-shadow: 0 12px 30px rgba(0, 0, 0, 0.25);
            border: 1px solid rgba(255, 255, 255, 0.18);
            backdrop-filter: blur(10px);
        }
        .notification.show {
            transform: translateX(0);
        }
        .notification-success {
            background: linear-gradient(135deg, #10B981, #059669);
        }
        .notification-error {
            background: linear-gradient(135deg, #EF4444, #DC2626);
        }
        .notification-info {
            background: linear-gradient(135deg, #8B5CF6, #6D28D9);
        }
        .notification-content {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        .notification-content i {
            color: rgba(255, 255, 255, 0.95);
        }
        .notification-close {
            background: none;
            border: none;
            color: white;
            font-size: 20px;
            cursor: pointer;
            margin-left: 15px;
            opacity: 0.7;
            transition: opacity 0.3s ease;
        }
        .notification-close:hover {
            opacity: 1;
        }
        .confetti-piece {
            position: fixed;
            border-radius: 2px;
            pointer-events: none;
            z-index: 10000;
            opacity: 1;
            animation-name: confettiBurst;
            animation-timing-function: cubic-bezier(0.2, 0.7, 0.2, 1);
            animation-fill-mode: forwards;
        }
        .form-group.focused input,
        .form-group.focused textarea {
            border-color: var(--primary-purple) !important;
            box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1) !important;
        }
        @keyframes blinkCursor {
            0%, 100% { border-color: var(--primary-purple); }
            50% { border-color: transparent; }
        }
    `;
    document.head.appendChild(style);

    // Mobile Menu Enhancement
    const sidebar = document.querySelector('.sidebar');
    const isMobile = () => window.innerWidth <= 768;

    let overlay = document.querySelector('.mobile-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'mobile-overlay';
        document.body.appendChild(overlay);
    }

    let menuToggle = document.querySelector('.mobile-menu-toggle');
    if (!menuToggle) {
        menuToggle = document.createElement('button');
        menuToggle.className = 'mobile-menu-toggle';
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        document.body.appendChild(menuToggle);
    }

    const setMobileMenuOpen = (open) => {
        if (!sidebar) return;
        sidebar.classList.toggle('mobile-open', open);
        overlay.classList.toggle('active', open);
        document.body.classList.toggle('mobile-menu-open', open);

        const icon = menuToggle.querySelector('i');
        if (icon) {
            icon.classList.toggle('fa-bars', !open);
            icon.classList.toggle('fa-times', open);
        }
    };

    menuToggle.addEventListener('click', () => {
        if (!isMobile()) return;
        setMobileMenuOpen(!sidebar.classList.contains('mobile-open'));
    });

    overlay.addEventListener('click', () => setMobileMenuOpen(false));
    navLinks.forEach(link => link.addEventListener('click', () => isMobile() && setMobileMenuOpen(false)));
    window.addEventListener('keydown', (e) => e.key === 'Escape' && setMobileMenuOpen(false));
    window.addEventListener('resize', () => !isMobile() && setMobileMenuOpen(false));

    // Loading animation
    window.addEventListener('load', function () {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';

        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });
});
