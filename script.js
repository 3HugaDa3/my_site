// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Initialize Particles.js after DOM content is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Particle.js Configuration
    particlesJS('particles-js', {
        particles: {
            number: {
                value: 50,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: '#007bff'
            },
            shape: {
                type: 'circle'
            },
            opacity: {
                value: 0.3,
                random: false,
                anim: {
                    enable: false
                }
            },
            size: {
                value: 3,
                random: true
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#007bff',
                opacity: 0.2,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: 'none',
                random: false,
                straight: false,
                out_mode: 'out',
                bounce: false
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: true,
                    mode: 'grab'
                },
                onclick: {
                    enable: true,
                    mode: 'push'
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 140,
                    line_linked: {
                        opacity: 1
                    }
                },
                push: {
                    particles_nb: 4
                }
            }
        },
        retina_detect: true
    });

    // Typed.js Text Animation
    const typed = new Typed('.typed-text', {
        strings: [
            'Web Developer',
            'JavaScript Expert',
            'PHP Developer',
            'UI/UX Enthusiast'
        ],
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 2000,
        loop: true,
        showCursor: true,
        cursorChar: '|',
        autoInsertCss: true
    });
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

// Smooth Progress Bar Animation
const animateProgressBars = () => {
    const progressBars = document.querySelectorAll('.progress-bar');
    progressBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0%';
        setTimeout(() => {
            bar.style.width = width;
        }, 100);
    });
};

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

// Intersection Observer for Progress Bars
const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateProgressBars();
            progressObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

// Observe all progress bars
document.querySelector('#skills')?.querySelectorAll('.progress').forEach(progress => {
    progressObserver.observe(progress);
});

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
