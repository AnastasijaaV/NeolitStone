function toggleMenu() {
  const menu = document.querySelector('.menu');
  const btn = document.querySelector('.menu-toggle');
  if (!menu) return;

  const isOpen = menu.classList.toggle('active');
  if (btn) btn.setAttribute('aria-expanded', String(isOpen));
}

document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('header');
  const headerH = header ? header.offsetHeight : 72;

  // Zatvori meni posle klika (mobilno)
  document.querySelectorAll('nav ul li a').forEach(a => {
    a.addEventListener('click', () => {
      const menu = document.querySelector('.menu');
      const btn = document.querySelector('.menu-toggle');
      if (menu) menu.classList.remove('active');
      if (btn) btn.setAttribute('aria-expanded', 'false');
    });
  });

  // Smooth scroll sa offsetom (zbog fixed header-a)
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (!href || href === '#') return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - headerH;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  // Active link u meniju
  const menuLinks = Array.from(document.querySelectorAll('nav ul li a'));
  const sections = Array.from(document.querySelectorAll('section'));

  function setActiveLink() {
    let current = null;
    for (const s of sections) {
      const rect = s.getBoundingClientRect();
      if (rect.top <= headerH + 40 && rect.bottom >= headerH + 40) {
        current = s;
        break;
      }
    }
    menuLinks.forEach(l => {
      l.classList.toggle('active', current && l.getAttribute('href') === `#${current.id}`);
    });
  }
  window.addEventListener('scroll', setActiveLink, { passive: true });
  setActiveLink();

  // Reveal animacija za #welcome
  const welcome = document.getElementById('welcome');
  if (welcome) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(en => {
        if (en.isIntersecting) welcome.classList.add('visible');
      });
    }, { threshold: 0.25 });
    io.observe(welcome);

    // Subtle parallax za hero background
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const offset = window.scrollY * 0.25;
        welcome.style.backgroundPosition = `center ${offset}px`;
        ticking = false;
      });
    }, { passive: true });
  }

  // WORKS: filter + lightbox
  const grid = document.getElementById('worksGrid');
  const items = grid ? Array.from(grid.querySelectorAll('.work-item')) : [];
  const filterBtns = Array.from(document.querySelectorAll('.filter-btn'));

  function applyFilter(cat) {
    items.forEach(it => {
      const ok = (cat === 'all') || (it.dataset.category === cat);
      it.style.display = ok ? '' : 'none';
    });
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      applyFilter(btn.dataset.filter);
    });
  });

  const lightbox = document.getElementById('lightbox');
  const lbImg = document.getElementById('lightboxImg');
  const lbCap = document.getElementById('lightboxCaption');
  const btnPrev = document.querySelector('.lightbox-prev');
  const btnNext = document.querySelector('.lightbox-next');

  let currentIndex = -1;
  function visibleItems() {
    return items.filter(it => it.style.display !== 'none');
  }

  function openLightbox(idx) {
    const vis = visibleItems();
    if (!vis.length) return;

    currentIndex = Math.max(0, Math.min(idx, vis.length - 1));
    const it = vis[currentIndex];

    const full = it.dataset.full || it.querySelector('img')?.src;
    const cap = it.dataset.caption || '';

    if (lbImg && full) lbImg.src = full;
    if (lbImg) lbImg.alt = it.querySelector('img')?.alt || 'Slika';
    if (lbCap) lbCap.textContent = cap;

    if (lightbox) {
      lightbox.classList.add('open');
      lightbox.setAttribute('aria-hidden', 'false');
    }

    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function step(dir) {
    const vis = visibleItems();
    if (!vis.length) return;

    currentIndex = (currentIndex + dir + vis.length) % vis.length;
    const it = vis[currentIndex];

    const full = it.dataset.full || it.querySelector('img')?.src;
    const cap = it.dataset.caption || '';

    if (lbImg && full) lbImg.src = full;
    if (lbImg) lbImg.alt = it.querySelector('img')?.alt || 'Slika';
    if (lbCap) lbCap.textContent = cap;
  }

  items.forEach((it) => {
    it.addEventListener('click', () => {
      const vis = visibleItems();
      const idx = vis.indexOf(it);
      openLightbox(idx);
    });
  });

  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      const t = e.target;
      if (t && t.dataset && t.dataset.close === '1') closeLightbox();
    });
  }
  if (btnPrev) btnPrev.addEventListener('click', () => step(-1));
  if (btnNext) btnNext.addEventListener('click', () => step(1));

  document.addEventListener('keydown', (e) => {
    if (!lightbox || !lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') step(-1);
    if (e.key === 'ArrowRight') step(1);
  });

  // Kontakt forma (bez backenda)
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Hvala! Upit je spreman. Pošaljite i fotografije prostora na email, ili nas pozovite.');
      form.reset();
    });

      // FAQ: otvori samo jedno pitanje u isto vreme
  const faqItems = Array.from(document.querySelectorAll('.faq-item'));
  faqItems.forEach((item) => {
    item.addEventListener('toggle', () => {
      if (!item.open) return;
      faqItems.forEach((other) => {
        if (other !== item) other.removeAttribute('open');
      });
    });
  });

  }
});
(() => {
  const nums = document.querySelectorAll(".stat-num[data-count]");
  if (!nums.length) return;

  const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

  function animateCount(el, to, suffix = "", duration = 900) {
    const from = 0;
    const start = performance.now();

    // ako ima decimalu
    const hasDecimal = String(to).includes(".");
    const decimals = hasDecimal ? String(to).split(".")[1].length : 0;

    function frame(now) {
      const p = Math.min(1, (now - start) / duration);
      const eased = easeOutCubic(p);
      const value = from + (to - from) * eased;

      const formatted = hasDecimal
        ? value.toFixed(decimals)
        : Math.round(value).toString();

      el.textContent = formatted + suffix;

      if (p < 1) requestAnimationFrame(frame);
    }

    requestAnimationFrame(frame);
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const stat = entry.target.closest(".stat") || entry.target;
        if (stat) stat.classList.add("is-visible");

        // animiraj samo jednom
        if (entry.target.dataset.done === "1") return;
        entry.target.dataset.done = "1";

        const to = Number(entry.target.dataset.count);
        const suffix = entry.target.dataset.suffix || "";
        animateCount(entry.target, to, suffix, 850);

        io.unobserve(entry.target);
      });
    },
    { threshold: 0.35 }
  );

  nums.forEach((el) => {
    // start stanje (0+)
    const suffix = el.dataset.suffix || "";
    el.textContent = "0" + suffix;
    io.observe(el);
  });
})();
