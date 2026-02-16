// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Initialize Particles.js after DOM content is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Анимация главной секции
    function animateHeroSection() {
        const heroTimeline = gsap.timeline();
        
        // Анимируем появление текста с новыми элементами
        heroTimeline.to(".reveal-text-delay-0", {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out"
        })
        .to(".reveal-text", {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out"
        }, "-=0.3")
        .to(".reveal-text-delay-1", {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out"
        }, "-=0.4")
        .to(".reveal-text-delay-2", {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out"
        }, "-=0.4")
        .to(".reveal-text-delay-3", {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out"
        }, "-=0.4")
        .to(".reveal-text-delay-4", {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            stagger: 0.1
        }, "-=0.4");
        
        // Упрощенная конфигурация частиц
        if (typeof particlesJS !== 'undefined') {
            particlesJS("particles-js", {
                particles: {
                    number: { value: 80 },
                    color: { value: "#ffffff" },
                    shape: { type: "circle" },
                    opacity: { value: 0.3 },
                    size: { value: 3 },
                    line_linked: {
                        enable: true,
                        distance: 150,
                        color: "#4facfe"
                    },
                    move: { enable: true, speed: 1 }
                },
                interactivity: {
                    events: {
                        onhover: { enable: true, mode: "grab" },
                        onclick: { enable: true, mode: "push" }
                    }
                }
            });
        }
    }

    animateHeroSection();

    // Инициализация typed.js
    const typed = new Typed('.typed-text', {
        strings: ['Web Developer', 'JavaScript Expert', 'PHP Developer', 'UI/UX Enthusiast'],
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 2000,
        loop: true,
        showCursor: true,
        cursorChar: '|',
        autoInsertCss: true
    });

    // Настраиваем анимацию для hero-секции с использованием GSAP
    function setupHeroAnimations() {
        // Создаем таймлайн для начальной загрузки
        const heroTimeline = gsap.timeline({
            defaults: { ease: "power3.out" }
        });

        // Анимируем контент и заголовок
        heroTimeline.to(".hero-title", {
            backgroundPosition: "200% center",
            duration: 10,
            repeat: -1,
            ease: "linear"
        });

        // Анимация кнопки при наведении
        const heroButton = document.querySelector('.hero-cta .btn');
        if (heroButton) {
            heroButton.addEventListener('mouseenter', () => {
                gsap.to(heroButton, {
                    scale: 1.05,
                    boxShadow: "0 8px 20px rgba(33, 150, 243, 0.6)",
                    duration: 0.3
                });
            });
            
            heroButton.addEventListener('mouseleave', () => {
                gsap.to(heroButton, {
                    scale: 1,
                    boxShadow: "0 4px 15px rgba(33, 150, 243, 0.3)",
                    duration: 0.3
                });
            });
        }
    }

    // Вызываем функцию настройки анимаций hero-секции
    setupHeroAnimations();
});

// Cursor Trail Effect
const cursorTrail = document.getElementById('cursor-trail');
let cursorTimeout;

document.addEventListener('mousemove', function(e) {
    cursorTrail.style.opacity = '1';
    cursorTrail.style.transform = `translate(${e.clientX - 10}px, ${e.clientY - 10}px) scale(1)`;
    
    // Add pulse effect on mouse move
    cursorTrail.style.transform += ' scale(1.5)';
    clearTimeout(cursorTimeout);
    
    cursorTimeout = setTimeout(() => {
        cursorTrail.style.transform = `translate(${e.clientX - 10}px, ${e.clientY - 10}px) scale(1)`;
    }, 100);
});

document.addEventListener('mouseleave', function() {
    cursorTrail.style.opacity = '0';
});

// Улучшенная анимация прогресс-баров
const animateProgressBars = () => {
    const progressBars = document.querySelectorAll('.progress-bar');
    progressBars.forEach(bar => {
        // Получаем значение прогресса из атрибута data-progress
        const progress = bar.getAttribute('data-progress') + '%';
        
        // Сначала установим ширину 0
        bar.style.width = '0%';
        
        // Добавим небольшую задержку перед началом анимации для постепенного появления
        setTimeout(() => {
            // Добавляем класс для анимации значения
            bar.classList.add('animated');
            
            // Анимируем ширину до нужного значения
            bar.style.width = progress;
        }, 300);
    });
};

// Используем GSAP для анимации прогресс-баров при прокрутке
const setupProgressBarAnimations = () => {
    // Находим все прогресс-бары
    const progressBars = document.querySelectorAll('.progress-bar');
    
    // Настраиваем анимацию для каждого прогресс-бара с помощью GSAP ScrollTrigger
    progressBars.forEach(bar => {
        const progress = bar.getAttribute('data-progress') + '%';
        // Устанавливаем начальное состояние
        gsap.set(bar, { width: '0%' });
        
        // Создаем ScrollTrigger для каждого прогресс-бара
        ScrollTrigger.create({
            trigger: bar.closest('.skill-card'),
            start: 'top 80%',
            onEnter: () => {
                // Анимация заполнения
                gsap.to(bar, {
                    width: progress,
                    duration: 1.5,
                    ease: 'power2.out',
                    onStart: () => {
                        // Через небольшую задержку показываем значение
                        setTimeout(() => {
                            bar.classList.add('animated');
                        }, 600);
                    }
                });
            },
            once: true
        });
    });
};

// Запускаем настройку анимации прогресс-баров
setupProgressBarAnimations();

// Enhanced Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        const navHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
        
        window.scrollTo({
            top: targetPosition - navHeight,
            behavior: 'smooth'
        });
    });
});

// Dynamic Navbar
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        navbar.style.background = 'rgba(0, 0, 0, 0.9)';
        navbar.style.padding = '0.5rem 1rem';
        
        if (currentScroll > lastScroll) {
            // Scrolling down - hide navbar
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up - show navbar
            navbar.style.transform = 'translateY(0)';
        }
    } else {
        navbar.style.background = 'rgba(0, 0, 0, 0.8)';
        navbar.style.padding = '1rem';
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
});

// Отображаем наложение переходов в DOM
document.body.insertAdjacentHTML('beforeend', '<div class="transition-overlay"></div>');
const transitionOverlay = document.querySelector('.transition-overlay');

// Инициализация GSAP
gsap.registerPlugin(ScrollTrigger);

// Настройка начальной анимации при загрузке страницы
window.addEventListener('DOMContentLoaded', () => {
    // Анимация загрузки страницы
    const tl = gsap.timeline();
    
    // Скрываем наложение переходов
    tl.to(transitionOverlay, {
        duration: 0.6,
        y: '-100%',
        ease: 'power2.out'
    });
    
    // Анимация первой секции
    tl.to('.section-wrapper[data-section="home"] section', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out'
    }, '-=0.3');
    
    // Инициализация всех секций
    initSections();
});

// Функция инициализации секций
function initSections() {
    // Получаем все обертки секций
    const sectionWrappers = document.querySelectorAll('.section-wrapper');
    
    // Создаем анимацию для каждой секции при прокрутке
    sectionWrappers.forEach(wrapper => {
        const section = wrapper.querySelector('section');
        const sectionId = wrapper.getAttribute('data-section');
        
        if (sectionId !== 'home') { // Не анимируем домашнюю секцию, так как она уже анимирована
            // Создаем ScrollTrigger для каждой секции
            ScrollTrigger.create({
                trigger: wrapper,
                start: 'top 80%',
                onEnter: () => {
                    gsap.to(section, {
                        opacity: 1,
                        y: 0,
                        duration: 1,
                        ease: 'power3.out'
                    });
                },
                once: true
            });
        }
    });
    
    // Плавный переход при клике на ссылки навигации
    setupSmoothNavigationTransition();
}

// Функция для настройки плавного перехода между разделами при клике на ссылки
function setupSmoothNavigationTransition() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Анимация наложения для перехода
                const tl = gsap.timeline();
                
                // Добавляем класс анимации для предотвращения взаимодействия
                document.querySelectorAll('.section-wrapper').forEach(section => {
                    section.classList.add('is-animating');
                });
                
                // Показываем наложение перехода (сверху вниз)
                tl.to(transitionOverlay, {
                    duration: 0.5,
                    y: '0%',
                    ease: 'power2.in'
                });
                
                // После наложения выполняем прокрутку
                tl.add(() => {
                    const navHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset;
                    
                    window.scrollTo({
                        top: targetPosition - navHeight,
                        behavior: 'auto' // Используем 'auto' вместо 'smooth', так как мы управляем анимацией с помощью GSAP
                    });
                });
                
                // Скрываем наложение перехода (снизу вверх)
                tl.to(transitionOverlay, {
                    duration: 0.5,
                    y: '-100%',
                    ease: 'power2.out',
                    onComplete: () => {
                        // Удаляем класс анимации, чтобы снова разрешить взаимодействие
                        document.querySelectorAll('.section-wrapper').forEach(section => {
                            section.classList.remove('is-animating');
                        });
                    }
                });
            }
        });
    });
}

// Дополнительные эффекты для секций при прокрутке
function setupScrollAnimations() {
    // Эффект параллакса для секции about
    gsap.to('.about-image', {
        y: 100,
        scrollTrigger: {
            trigger: '#about',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
        }
    });
    
    // Стаггированная анимация для карточек навыков
    gsap.from('.skill-card', {
        scale: 0.8,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        scrollTrigger: {
            trigger: '#skills',
            start: 'top 70%',
            toggleActions: 'play none none reverse'
        }
    });
    
    
    // Параллакс для floating shapes
    gsap.to('.shape-1', {
        y: -100,
        x: 50,
        rotation: 180,
        scrollTrigger: {
            trigger: '.hero-section',
            start: 'top top',
            end: 'bottom top',
            scrub: 1
        }
    });
    
    gsap.to('.shape-2', {
        y: 100,
        x: -50,
        rotation: -180,
        scrollTrigger: {
            trigger: '.hero-section',
            start: 'top top',
            end: 'bottom top',
            scrub: 1
        }
    });
    
    gsap.to('.shape-3', {
        y: -80,
        x: -40,
        rotation: 90,
        scrollTrigger: {
            trigger: '.hero-section',
            start: 'top top',
            end: 'bottom top',
            scrub: 1
        }
    });
    
    gsap.to('.shape-4', {
        y: 120,
        x: 60,
        rotation: -90,
        scrollTrigger: {
            trigger: '.hero-section',
            start: 'top top',
            end: 'bottom top',
            scrub: 1
        }
    });
    
    // Анимация для статистики героя
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        const finalValue = stat.textContent;
        gsap.from(stat, {
            textContent: 0,
            duration: 2,
            ease: 'power1.out',
            snap: { textContent: 1 },
            scrollTrigger: {
                trigger: stat,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            onUpdate: function() {
                stat.textContent = Math.ceil(this.targets()[0].textContent) + (finalValue.includes('+') ? '+' : finalValue.includes('%') ? '%' : '');
            }
        });
    });
}

// Запуск дополнительных анимаций
setupScrollAnimations();

// Enhanced Form Submission
document.querySelector('.contact-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const button = this.querySelector('button[type="submit"]');
    const originalText = button.textContent;
    
    // Add loading state
    button.disabled = true;
    button.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Sending...';
    
    // Simulate form submission (replace with actual form submission logic)
    setTimeout(() => {
        button.innerHTML = '<i class="fas fa-check me-2"></i>Sent Successfully!';
        button.classList.add('btn-success');
        
        // Reset form
        this.reset();
        
        // Reset button state after 3 seconds
        setTimeout(() => {
            button.disabled = false;
            button.textContent = originalText;
            button.classList.remove('btn-success');
        }, 3000);
    }, 1500);
});

// Skill Card Hover Effect
document.querySelectorAll('.skill-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.querySelector('.skill-card-inner').style.transform = 'rotateY(180deg)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.querySelector('.skill-card-inner').style.transform = 'rotateY(0)';
    });
});

// Enhanced Mouse Parallax for Hero Section
document.addEventListener('mousemove', function(e) {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    // Parallax effect for floating shapes
    gsap.to('.shape-1', {
        x: mouseX * 30,
        y: mouseY * 30,
        duration: 1,
        ease: 'power2.out'
    });
    
    gsap.to('.shape-2', {
        x: mouseX * -20,
        y: mouseY * -20,
        duration: 1.2,
        ease: 'power2.out'
    });
    
    gsap.to('.shape-3', {
        x: mouseX * 25,
        y: mouseY * -25,
        duration: 0.8,
        ease: 'power2.out'
    });
    
    gsap.to('.shape-4', {
        x: mouseX * -15,
        y: mouseY * 15,
        duration: 1.5,
        ease: 'power2.out'
    });
});

// Magnetic Button Effect
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('mousemove', function(e) {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        gsap.to(button, {
            x: x * 0.3,
            y: y * 0.3,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
    
    button.addEventListener('mouseleave', function() {
        gsap.to(button, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: 'elastic.out(1, 0.5)'
        });
    });
});
