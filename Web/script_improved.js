// ============================================
// SCRIPT MEJORADO CON ANIMACIONES DINÁMICAS
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar Intersection Observer para animaciones de scroll
    initScrollAnimations();
    
    // Inicializar efectos de hover en elementos
    initHoverEffects();
    
    // Inicializar navegación suave
    initSmoothNavigation();
    
    // Inicializar efectos de parallax suave
    initParallaxEffect();
    
    // Inicializar animaciones de entrada
    initEntryAnimations();
    
    // Inicializar tipografía dinámica
    initDynamicTypography();
    
    // Inicializar cambio de color en la barra de navegación
    initNavColorChange();
    
    // Manejar logo fallback
    handleLogoFallback();
});

// ============================================
// ANIMACIONES DE SCROLL
// ============================================

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.animation = 'slideInUp 0.8s ease forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observar todos los elementos con data-animate
    document.querySelectorAll('[data-animate]').forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
}

// ============================================
// EFECTOS DE HOVER
// ============================================

function initHoverEffects() {
    const cards = document.querySelectorAll('.card-market, .card-interactive, .service-card-visual');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
        
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const light = document.createElement('div');
            light.style.position = 'absolute';
            light.style.width = '100px';
            light.style.height = '100px';
            light.style.background = 'radial-gradient(circle, rgba(0,212,255,0.3) 0%, transparent 70%)';
            light.style.left = (x - 50) + 'px';
            light.style.top = (y - 50) + 'px';
            light.style.pointerEvents = 'none';
            light.style.borderRadius = '50%';
            light.style.opacity = '0.5';
            
            const oldLights = this.querySelectorAll('div[style*="radial-gradient"]');
            oldLights.forEach(l => l.remove());
            
            if (oldLights.length < 1) {
                this.style.position = 'relative';
                this.style.overflow = 'hidden';
                this.appendChild(light);
                
                setTimeout(() => light.remove(), 300);
            }
        });
    });
}

// ============================================
// NAVEGACIÓN SUAVE
// ============================================

function initSmoothNavigation() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') {
                return;
            }
            
            e.preventDefault();
            
            const target = document.querySelector(href);
            if (target) {
                target.style.animation = 'pulse-glow 0.6s ease';
                
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });
}

// ============================================
// EFECTO PARALLAX SUAVE
// ============================================

function initParallaxEffect() {
    const parallaxElements = document.querySelectorAll('.floating-shapes, .hero-gradient-overlay');
    
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        
        parallaxElements.forEach(element => {
            if (element.classList.contains('floating-shapes')) {
                element.style.transform = `translateY(${scrollPosition * 0.5}px)`;
            }
        });
    }, { passive: true });
}

// ============================================
// ANIMACIONES DE ENTRADA
// ============================================

function initEntryAnimations() {
    const elements = document.querySelectorAll('[data-animate]');
    
    elements.forEach((el, index) => {
        const delay = index * 0.1;
        el.style.animationDelay = `${delay}s`;
    });
    
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar-custom');
    
    window.addEventListener('scroll', () => {
        let scrollTop = window.scrollY;
        
        if (scrollTop > 100) {
            navbar.style.boxShadow = '0 10px 30px rgba(0, 212, 255, 0.15)';
        } else {
            navbar.style.boxShadow = 'none';
        }
        
        lastScrollTop = scrollTop;
    }, { passive: true });
}

// ============================================
// EFECTO DE TIPOGRAFÍA DINÁMICA
// ============================================

function initDynamicTypography() {
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    
    headings.forEach(heading => {
        heading.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
            this.style.letterSpacing = '2px';
        });
        
        heading.addEventListener('mouseleave', function() {
            this.style.letterSpacing = '0px';
        });
    });
}

// ============================================
// CAMBIO DE COLOR EN LA BARRA DE NAVEGACIÓN
// ============================================

function initNavColorChange() {
    const sections = document.querySelectorAll('section, header');
    const nav = document.querySelector('#mainNav');

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                nav.className = `navbar navbar-expand-lg navbar-dark fixed-top shadow-sm navbar-custom scrolled-${entry.target.id}`;
            }
        });
    }, { threshold: 0.5 });

    sections.forEach(section => navObserver.observe(section));
}

// ============================================
// MANEJO DE LOGO FALLBACK
// ============================================

function handleLogoFallback() {
    const logo = document.querySelector('.navbar-logo');
    
    if (logo) {
        logo.addEventListener('error', function() {
            this.style.display = 'none';
            // Opcional: puedes añadir un mensaje o comportamiento alternativo aquí
            console.log('Error al cargar el logo');
        });
        
        if (!logo.complete || logo.naturalHeight === 0) {
            logo.style.display = 'none';
            console.log('Logo no disponible');
        }
    }
}

// ============================================
// EFECTO DE SCROLL SUAVE EN BOTONES
// ============================================

document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.5)';
        ripple.style.pointerEvents = 'none';
        ripple.style.animation = 'ripple 0.6s ease-out';
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// ============================================
// EFECTO DE CARGA DE PÁGINA
// ============================================

window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Agregar animación de ripple al CSS dinámicamente
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);