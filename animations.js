/**
 * ============================================
 * ANIMATIONS.JS - COLEGIO VENECIA EMS.21
 * Efectos Interactivos y Animaciones Dinámicas
 * ============================================
 */

document.addEventListener('DOMContentLoaded', function() {
  
  // ==========================================
  // 0. DARK MODE TOGGLE
  // ==========================================
  function initThemeToggle() {
    // Crear botón de toggle
    let themeToggle = document.querySelector('.theme-toggle');
    if (!themeToggle) {
      themeToggle = document.createElement('button');
      themeToggle.className = 'theme-toggle';
      themeToggle.setAttribute('aria-label', 'Cambiar tema');
      themeToggle.setAttribute('title', 'Cambiar modo');
      themeToggle.innerHTML = `
        <span class="icon-sun">☀️</span>
        <span class="icon-moon">🌙</span>
      `;
      document.body.appendChild(themeToggle);
    }

    // Verificar preferencia guardada o del sistema
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      document.documentElement.setAttribute('data-theme', 'dark');
    }

    // Toggle click handler
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      document.documentElement.setAttribute('data-theme', newTheme === 'dark' ? 'dark' : '');
      localStorage.setItem('theme', newTheme);
      
      // Animación de rotación
      themeToggle.style.transform = 'scale(1.2) rotate(360deg)';
      setTimeout(() => {
        themeToggle.style.transform = '';
      }, 400);
    });

    // Escuchar cambios en preferencia del sistema
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem('theme')) {
        document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : '');
      }
    });
  }
  
  initThemeToggle();

  // ==========================================
  // 0.5 MENÚ HAMBURGUESA MÓVIL
  // ==========================================
  function initMobileMenu() {
    const header = document.querySelector('.header');
    const nav = document.querySelector('.nav');
    
    if (!header || !nav) return;
    
    // Crear botón hamburguesa si no existe
    let hamburger = document.querySelector('.hamburger');
    if (!hamburger) {
      hamburger = document.createElement('button');
      hamburger.className = 'hamburger';
      hamburger.setAttribute('aria-label', 'Menú de navegación');
      hamburger.setAttribute('aria-expanded', 'false');
      hamburger.innerHTML = `
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
      `;
      header.appendChild(hamburger);
    }
    
    // Crear overlay si no existe
    let overlay = document.querySelector('.mobile-menu-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.className = 'mobile-menu-overlay';
      document.body.appendChild(overlay);
    }
    
    // Toggle del menú
    function toggleMenu() {
      const isOpen = nav.classList.contains('active');
      
      nav.classList.toggle('active');
      hamburger.classList.toggle('active');
      overlay.classList.toggle('active');
      
      hamburger.setAttribute('aria-expanded', !isOpen);
      document.body.classList.toggle('body-noScroll', !isOpen);
    }
    
    // Cerrar menú
    function closeMenu() {
      nav.classList.remove('active');
      hamburger.classList.remove('active');
      overlay.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('body-noScroll');
    }
    
    // Event listeners
    hamburger.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', closeMenu);
    
    // Cerrar al hacer click en un link
    const navLinks = nav.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        // Pequeño delay para que se vea la transición
        setTimeout(closeMenu, 150);
      });
    });
    
    // Cerrar con tecla Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && nav.classList.contains('active')) {
        closeMenu();
      }
    });
    
    // Cerrar al cambiar a pantalla grande
    const mediaQuery = window.matchMedia('(min-width: 769px)');
    mediaQuery.addEventListener('change', (e) => {
      if (e.matches) {
        closeMenu();
      }
    });
  }
  
  initMobileMenu();

  // ==========================================
  // 1. PRELOADER
  // ==========================================
  const preloader = document.querySelector('.preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        preloader.classList.add('loaded');
      }, 500);
    });
  }

  // ==========================================
  // 2. SCROLL REVEAL - Animaciones al hacer scroll
  // ==========================================
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal');
        // Opcional: dejar de observar después de revelar
        // revealObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Aplicar a cards
  document.querySelectorAll('.card').forEach(card => {
    revealObserver.observe(card);
  });

  // Aplicar a video cards
  document.querySelectorAll('.vidCard').forEach(card => {
    revealObserver.observe(card);
  });

  // Aplicar a objetivos
  document.querySelectorAll('#objetivos ul li').forEach(item => {
    revealObserver.observe(item);
  });

  // ==========================================
  // 3. NAVEGACIÓN SMOOTH SCROLL
  // ==========================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // ==========================================
  // 4. ACTIVE NAV LINK ON SCROLL
  // ==========================================
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-list a');

  function highlightNavOnScroll() {
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightNavOnScroll);

  // ==========================================
  // 5. BACK TO TOP BUTTON
  // ==========================================
  // Crear el botón si no existe
  let backToTop = document.querySelector('.back-to-top');
  if (!backToTop) {
    backToTop = document.createElement('button');
    backToTop.className = 'back-to-top';
    backToTop.innerHTML = '↑';
    backToTop.setAttribute('aria-label', 'Volver arriba');
    backToTop.setAttribute('title', 'Volver arriba');
    document.body.appendChild(backToTop);
  }

  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // ==========================================
  // 6. TYPING EFFECT PARA HERO
  // ==========================================
  function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    element.style.visibility = 'visible';
    
    function type() {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        setTimeout(type, speed);
      }
    }
    type();
  }

  // Aplicar typing al hero si existe
  const heroTitle = document.querySelector('.hero h1');
  if (heroTitle) {
    const originalText = heroTitle.textContent;
    // Descomentar la siguiente línea para activar el efecto typing
    // setTimeout(() => typeWriter(heroTitle, originalText, 80), 1000);
  }

  // ==========================================
  // 7. PARALLAX EFFECT EN HERO
  // ==========================================
  const hero = document.querySelector('.hero');
  if (hero) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
    });
  }

  // ==========================================
  // 8. RIPPLE EFFECT EN BOTONES
  // ==========================================
  document.querySelectorAll('.btn, .btn-enviar').forEach(button => {
    button.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      
      ripple.style.cssText = `
        position: absolute;
        background: rgba(255,255,255,0.5);
        border-radius: 50%;
        pointer-events: none;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        left: ${e.clientX - rect.left}px;
        top: ${e.clientY - rect.top}px;
        width: 100px;
        height: 100px;
        margin-left: -50px;
        margin-top: -50px;
      `;
      
      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(ripple);
      
      setTimeout(() => ripple.remove(), 600);
    });
  });

  // CSS para ripple animation
  if (!document.getElementById('ripple-styles')) {
    const style = document.createElement('style');
    style.id = 'ripple-styles';
    style.textContent = `
      @keyframes ripple {
        to {
          transform: scale(4);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }

  // ==========================================
  // 9. HOVER TILT EFFECT EN CARDS
  // ==========================================
  document.querySelectorAll('.card, .flip-card').forEach(card => {
    card.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;
      
      this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
  });

  // ==========================================
  // 10. FORMULARIO - VALIDACIÓN Y EFECTOS
  // ==========================================
  const form = document.querySelector('#formulario-contacto');
  if (form) {
    const inputs = form.querySelectorAll('input');
    
    // Focus effect con glow
    inputs.forEach(input => {
      input.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
      });
      
      input.addEventListener('blur', function() {
        this.parentElement.classList.remove('focused');
        if (this.value.trim() !== '') {
          this.classList.add('has-value');
        } else {
          this.classList.remove('has-value');
        }
      });
    });

    // Shake effect en errores
    form.addEventListener('submit', function(e) {
      let hasError = false;
      
      inputs.forEach(input => {
        if (input.required && input.value.trim() === '') {
          input.parentElement.classList.add('shake');
          input.style.borderColor = '#ef4444';
          hasError = true;
          
          setTimeout(() => {
            input.parentElement.classList.remove('shake');
          }, 500);
        }
      });
      
      if (hasError) {
        e.preventDefault();
      }
    });
  }

  // ==========================================
  // 11. CONTADOR ANIMADO
  // ==========================================
  function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
      start += increment;
      if (start < target) {
        element.textContent = Math.floor(start);
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = target;
      }
    }
    
    updateCounter();
  }

  // ==========================================
  // 12. GALERÍA LIGHTBOX MEJORADO
  // ==========================================
  const galleryImages = document.querySelectorAll('.album-grid img, .zoomable');
  let currentImageIndex = 0;
  let galleryArray = [];

  // Crear lightbox si no existe
  let lightbox = document.querySelector('.lightbox');
  if (!lightbox && galleryImages.length > 0) {
    lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
      <button class="lightbox-close" aria-label="Cerrar">×</button>
      <button class="lightbox-prev" aria-label="Anterior">‹</button>
      <img id="lightbox-img" src="" alt="Imagen ampliada">
      <button class="lightbox-next" aria-label="Siguiente">›</button>
    `;
    document.body.appendChild(lightbox);
  }

  if (lightbox) {
    const lightboxImg = lightbox.querySelector('#lightbox-img');
    const closeBtn = lightbox.querySelector('.lightbox-close');
    const prevBtn = lightbox.querySelector('.lightbox-prev');
    const nextBtn = lightbox.querySelector('.lightbox-next');

    galleryImages.forEach((img, index) => {
      galleryArray.push(img.src);
      
      img.addEventListener('click', () => {
        currentImageIndex = index;
        lightboxImg.src = img.src;
        lightbox.classList.add('is-open');
        document.body.classList.add('body-noScroll');
      });
    });

    function closeLightbox() {
      lightbox.classList.remove('is-open');
      document.body.classList.remove('body-noScroll');
    }

    function showPrev() {
      currentImageIndex = (currentImageIndex - 1 + galleryArray.length) % galleryArray.length;
      lightboxImg.src = galleryArray[currentImageIndex];
    }

    function showNext() {
      currentImageIndex = (currentImageIndex + 1) % galleryArray.length;
      lightboxImg.src = galleryArray[currentImageIndex];
    }

    closeBtn?.addEventListener('click', closeLightbox);
    prevBtn?.addEventListener('click', showPrev);
    nextBtn?.addEventListener('click', showNext);

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    // Navegación con teclado
    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('is-open')) return;
      
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'ArrowRight') showNext();
    });
  }

  // ==========================================
  // 13. LAZY LOADING DE IMÁGENES
  // ==========================================
  const lazyImages = document.querySelectorAll('img[data-src]');
  
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.add('loaded');
        imageObserver.unobserve(img);
      }
    });
  });

  lazyImages.forEach(img => imageObserver.observe(img));

  // ==========================================
  // 14. NÚMEROS ANIMADOS AL SCROLL
  // ==========================================
  const stats = document.querySelectorAll('[data-count]');
  
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.dataset.count);
        animateCounter(entry.target, target);
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  stats.forEach(stat => statsObserver.observe(stat));

  // ==========================================
  // 15. SLIDER PAUSABLE CON INDICADORES
  // ==========================================
  const slider = document.querySelector('.slider');
  const sliderSection = document.querySelector('.slider-section');
  
  if (slider && sliderSection) {
    const slides = slider.querySelectorAll('.slide');
    
    // Crear indicadores
    if (slides.length > 0) {
      let indicators = document.createElement('div');
      indicators.className = 'slider-indicators';
      
      slides.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.className = 'slider-dot' + (index === 0 ? ' active' : '');
        dot.setAttribute('aria-label', `Ir a imagen ${index + 1}`);
        dot.addEventListener('click', () => {
          slider.style.animation = 'none';
          slider.style.transform = `translateX(-${index * 100}vw)`;
          document.querySelectorAll('.slider-dot').forEach(d => d.classList.remove('active'));
          dot.classList.add('active');
        });
        indicators.appendChild(dot);
      });
      
      sliderSection.appendChild(indicators);
    }

    // Pausar en hover
    sliderSection.addEventListener('mouseenter', () => {
      slider.style.animationPlayState = 'paused';
    });

    sliderSection.addEventListener('mouseleave', () => {
      slider.style.animationPlayState = 'running';
    });
  }

  // ==========================================
  // 16. HEADER HIDE/SHOW ON SCROLL
  // ==========================================
  let lastScroll = 0;
  const header = document.querySelector('.header');
  
  if (header) {
    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;
      
      if (currentScroll <= 0) {
        header.style.transform = 'translateY(0)';
        return;
      }
      
      if (currentScroll > lastScroll && currentScroll > 80) {
        // Scrolling down
        header.style.transform = 'translateY(-100%)';
      } else {
        // Scrolling up
        header.style.transform = 'translateY(0)';
      }
      
      lastScroll = currentScroll;
    });
  }

  // ==========================================
  // 17. CONFETTI PARA ÉXITO DE FORMULARIO
  // ==========================================
  window.showConfetti = function() {
    const colors = ['#1a73e8', '#ff6b35', '#10b981', '#ffd700', '#e91e63'];
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
      const confetti = document.createElement('div');
      confetti.style.cssText = `
        position: fixed;
        width: 10px;
        height: 10px;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        left: ${Math.random() * 100}vw;
        top: -10px;
        border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
        z-index: 10000;
        pointer-events: none;
        animation: confettiFall ${2 + Math.random() * 2}s linear forwards;
        animation-delay: ${Math.random() * 0.5}s;
      `;
      document.body.appendChild(confetti);
      
      setTimeout(() => confetti.remove(), 4000);
    }
  };

  // CSS para confetti
  if (!document.getElementById('confetti-styles')) {
    const style = document.createElement('style');
    style.id = 'confetti-styles';
    style.textContent = `
      @keyframes confettiFall {
        0% {
          transform: translateY(0) rotate(0deg);
          opacity: 1;
        }
        100% {
          transform: translateY(100vh) rotate(720deg);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }

  // ==========================================
  // 18. MEJORA DEL VIDEO MODAL
  // ==========================================
  const videoCards = document.querySelectorAll('.vidCard');
  const videoModal = document.getElementById('vidModal');
  const videoPlayer = document.getElementById('vidPlayer');

  if (videoCards.length > 0 && videoModal && videoPlayer) {
    videoCards.forEach(card => {
      card.addEventListener('click', () => {
        const videoSrc = card.getAttribute('data-video');
        if (videoSrc) {
          videoPlayer.src = videoSrc;
          videoModal.classList.add('is-open');
          document.body.classList.add('body-noScroll');
          videoPlayer.play().catch(() => {});
        }
      });
    });

    // Cerrar modal
    const closeModalElements = videoModal.querySelectorAll('[data-close], .vidBackdrop');
    closeModalElements.forEach(el => {
      el.addEventListener('click', () => {
        videoPlayer.pause();
        videoPlayer.src = '';
        videoModal.classList.remove('is-open');
        document.body.classList.remove('body-noScroll');
      });
    });
  }

  // ==========================================
  // 19. ACCESSIBILITY IMPROVEMENTS
  // ==========================================
  // Focus visible para teclado
  document.body.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      document.body.classList.add('keyboard-nav');
    }
  });

  document.body.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
  });

  // Estilos para keyboard navigation
  if (!document.getElementById('a11y-styles')) {
    const style = document.createElement('style');
    style.id = 'a11y-styles';
    style.textContent = `
      .keyboard-nav *:focus {
        outline: 3px solid var(--primary) !important;
        outline-offset: 2px !important;
      }
    `;
    document.head.appendChild(style);
  }

  // ==========================================
  // 20. PRELOAD CRITICAL IMAGES
  // ==========================================
  const criticalImages = ['fondo.jpg', 'logo.jpeg'];
  criticalImages.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  });

  console.log('✨ Animaciones EMS.21 cargadas correctamente');
});

// ==========================================
// FUNCIÓN GLOBAL: Mostrar mensaje de éxito
// ==========================================
function showSuccessMessage() {
  const successMsg = document.getElementById('mensaje-exito');
  if (successMsg) {
    successMsg.style.display = 'block';
    successMsg.innerHTML = `
      <div class="success-checkmark"></div>
      <span>¡Formulario enviado correctamente!</span>
    `;
    
    // Opcional: mostrar confetti
    if (typeof window.showConfetti === 'function') {
      window.showConfetti();
    }
  }
}
