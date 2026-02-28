/* ========================================================================
   NEOLIT STONE — JavaScript Interactions
   ======================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide icons
  if (window.lucide) {
    lucide.createIcons();
  }

  // ── Preloader ──
  const preloader = document.getElementById('preloader');
  document.body.classList.add('loading');

  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader.classList.add('hidden');
      document.body.classList.remove('loading');
    }, 800);
  });

  // Fallback: force hide preloader after 3s
  setTimeout(() => {
    preloader.classList.add('hidden');
    document.body.classList.remove('loading');
  }, 3000);

  // ── Custom Cursor ──
  const cursorDot = document.getElementById('cursorDot');
  const cursorRing = document.getElementById('cursorRing');

  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.left = mouseX + 'px';
      cursorDot.style.top = mouseY + 'px';
    });

    function animateRing() {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      cursorRing.style.left = ringX + 'px';
      cursorRing.style.top = ringY + 'px';
      requestAnimationFrame(animateRing);
    }
    animateRing();

    // Hover effect on interactive elements
    const hoverTargets = document.querySelectorAll('a, button, .product-card, .gallery-item, .faq-item summary');
    hoverTargets.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursorDot.classList.add('hover');
        cursorRing.classList.add('hover');
      });
      el.addEventListener('mouseleave', () => {
        cursorDot.classList.remove('hover');
        cursorRing.classList.remove('hover');
      });
    });
  }

  // ── Header Scroll ──
  const header = document.getElementById('header');
  let lastScroll = 0;

  function onScroll() {
    const scrollY = window.scrollY;

    // Add scrolled class
    if (scrollY > 80) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    lastScroll = scrollY;
  }

  window.addEventListener('scroll', onScroll, { passive: true });

// ── Mobile Menu ──
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');

function openMenu() {
  nav.classList.add('open');
  hamburger.classList.add('active');
  hamburger.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
  document.body.classList.add('nav-open');
}

function closeMenu() {
  nav.classList.remove('open');
  hamburger.classList.remove('active');
  hamburger.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
  document.body.classList.remove('nav-open');
}

hamburger.addEventListener('click', () => {
  const isOpen = nav.classList.contains('open');
  if (isOpen) closeMenu();
  else openMenu();
});

// Close on link click
nav.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    closeMenu();
  });
});

// Close on outside click (klik van menija)
document.addEventListener('click', (e) => {
  if (!nav.classList.contains('open')) return;

  const clickedInsideNav = nav.contains(e.target);
  const clickedHamburger = hamburger.contains(e.target);
  if (!clickedInsideNav && !clickedHamburger) {
    closeMenu();
  }
});

// Close on ESC
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeMenu();
});

// ── Active Nav Link on Scroll ──
  const sections = document.querySelectorAll('.section, .hero');
  const navLinks = document.querySelectorAll('.nav-link');

  function updateActiveNav() {
    const scrollPos = window.scrollY + 200;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });

  // ── Scroll Reveal Animations ──
  const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ── Counter Animation ──
  const statNumbers = document.querySelectorAll('.stat-number[data-count]');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(el => counterObserver.observe(el));

  function animateCounter(el) {
    const target = parseInt(el.dataset.count);
    const duration = 2000;
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);
      el.textContent = current;

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }

  // ── Hero Particles ──
  const particlesContainer = document.getElementById('heroParticles');

  function createParticles() {
    for (let i = 0; i < 30; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      particle.style.left = Math.random() * 100 + '%';
      particle.style.width = (Math.random() * 3 + 1) + 'px';
      particle.style.height = particle.style.width;
      particle.style.animationDuration = (Math.random() * 8 + 6) + 's';
      particle.style.animationDelay = (Math.random() * 6) + 's';
      particlesContainer.appendChild(particle);
    }
  }

  createParticles();

  // ── Showcase Slider ──
  const slides = document.querySelectorAll('#showcaseSlider .slide');
  const dots = document.querySelectorAll('#showcaseSlider .dot');
  const prevBtn = document.querySelector('#showcaseSlider .prev');
  const nextBtn = document.querySelector('#showcaseSlider .next');
  let currentSlide = 0;
  let slideInterval;

  function goToSlide(index) {
    slides.forEach(s => s.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    currentSlide = (index + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
  }

  function nextSlide() {
    goToSlide(currentSlide + 1);
  }

  function prevSlide() {
    goToSlide(currentSlide - 1);
  }

  function startAutoSlide() {
    slideInterval = setInterval(nextSlide, 4000);
  }

  function resetAutoSlide() {
    clearInterval(slideInterval);
    startAutoSlide();
  }

  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => { prevSlide(); resetAutoSlide(); });
    nextBtn.addEventListener('click', () => { nextSlide(); resetAutoSlide(); });

    dots.forEach(dot => {
      dot.addEventListener('click', () => {
        goToSlide(parseInt(dot.dataset.index));
        resetAutoSlide();
      });
    });

    startAutoSlide();
  }

  // ── Gallery Filter ──
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      galleryItems.forEach(item => {
        const category = item.dataset.category;
        if (filter === 'all' || category === filter) {
          item.classList.remove('hidden');
          item.style.animation = 'fadeIn 0.5s ease forwards';
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });

  // Add fadeIn keyframe dynamically
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeIn {
      from { opacity: 0; transform: scale(0.95); }
      to { opacity: 1; transform: scale(1); }
    }
  `;
  document.head.appendChild(style);

  // ── Lightbox ──
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = lightbox.querySelector('.lightbox-close');
  const lightboxPrev = lightbox.querySelector('.lightbox-prev');
  const lightboxNext = lightbox.querySelector('.lightbox-next');
  const lightboxBackdrop = lightbox.querySelector('.lightbox-backdrop');
  let lightboxItems = [];
  let lightboxIndex = 0;

  function updateLightboxItems() {
    lightboxItems = Array.from(document.querySelectorAll('.gallery-item:not(.hidden)'));
  }

  function openLightbox(index) {
    updateLightboxItems();
    lightboxIndex = index;
    const item = lightboxItems[lightboxIndex];
    lightboxImg.src = item.dataset.full;
    lightboxImg.alt = item.querySelector('img').alt;
    lightboxCaption.textContent = item.dataset.caption || '';
    lightbox.classList.add('active');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function lightboxNavigate(dir) {
    lightboxIndex = (lightboxIndex + dir + lightboxItems.length) % lightboxItems.length;
    const item = lightboxItems[lightboxIndex];
    lightboxImg.style.opacity = '0';
    setTimeout(() => {
      lightboxImg.src = item.dataset.full;
      lightboxImg.alt = item.querySelector('img').alt;
      lightboxCaption.textContent = item.dataset.caption || '';
      lightboxImg.style.opacity = '1';
    }, 200);
  }

  galleryItems.forEach((item, i) => {
    item.addEventListener('click', () => {
      updateLightboxItems();
      const actualIndex = lightboxItems.indexOf(item);
      openLightbox(actualIndex >= 0 ? actualIndex : 0);
    });
  });

  lightboxClose.addEventListener('click', closeLightbox);
  lightboxBackdrop.addEventListener('click', closeLightbox);
  lightboxPrev.addEventListener('click', () => lightboxNavigate(-1));
  lightboxNext.addEventListener('click', () => lightboxNavigate(1));

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') lightboxNavigate(-1);
    if (e.key === 'ArrowRight') lightboxNavigate(1);
  });

  // Lightbox image transition
  lightboxImg.style.transition = 'opacity 0.3s ease';

  // ── Back to Top ──
  const backToTop = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 600) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }, { passive: true });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ── Year ──
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // ── Smooth Scroll for Anchor Links ──
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const headerHeight = header.offsetHeight;
        const targetPos = target.offsetTop - headerHeight;
        window.scrollTo({
          top: targetPos,
          behavior: 'smooth'
        });
      }
    });
  });

  // ── Contact Form ──
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const btn = contactForm.querySelector('.btn-submit');
      const originalHTML = btn.innerHTML;
      btn.innerHTML = '<span style="display:flex;align-items:center;gap:8px">Šaljemo...</span>';
      btn.disabled = true;

      // Simulate sending (replace with actual form handler)
      setTimeout(() => {
        btn.innerHTML = '<span style="display:flex;align-items:center;gap:8px">✓ Upit poslat!</span>';
        btn.style.background = 'linear-gradient(135deg, #4CAF50, #45a049)';
        btn.style.color = '#fff';

        setTimeout(() => {
          contactForm.reset();
          btn.innerHTML = originalHTML;
          btn.disabled = false;
          btn.style.background = '';
          btn.style.color = '';
          // Re-create icons since innerHTML was changed
          if (window.lucide) lucide.createIcons();
        }, 3000);
      }, 1500);
    });
  }

  // ── Parallax on Hero (subtle) ──
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const heroBg = document.querySelector('.hero-bg img');
    if (heroBg && scrollY < window.innerHeight) {
      heroBg.style.transform = `scale(1.1) translateY(${scrollY * 0.15}px)`;
    }
  }, { passive: true });

  // ── Tilt Effect on Product Cards (desktop only) ──
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
      });
    });
  }

  // ── FAQ Accordion (open one, close others) ──
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach((item) => {
  item.addEventListener('toggle', () => {
    if (!item.open) return; // reaguj samo kad se otvara

    faqItems.forEach((other) => {
      if (other !== item) other.removeAttribute('open');
    });
  });
});
});
