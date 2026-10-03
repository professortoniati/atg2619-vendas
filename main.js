/**
 * TITAN PULSE | VitalPro Ultra
 * main.js — Motor de Animações Cinemáticas em Todos os Elementos + Lazy Loading Real
 */

'use strict';

(function () {
  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── 1. LAZY LOADING REAL DE IMAGENS COM BLUR-UP ────────────── */
  function initLazyLoading() {
    const images = document.querySelectorAll('img.lazy-image, img[loading="lazy"]');

    function revealImage(img) {
      if (img.dataset.src) {
        img.src = img.dataset.src;
      }
      img.classList.add('is-loaded');
    }

    if (!('IntersectionObserver' in window)) {
      images.forEach(revealImage);
      return;
    }

    const imgObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
          }

          if (img.complete && img.naturalWidth > 0) {
            img.classList.add('is-loaded');
          } else {
            img.addEventListener('load', () => img.classList.add('is-loaded'), { once: true });
            img.addEventListener('error', () => img.classList.add('is-loaded'), { once: true });
          }

          observer.unobserve(img);
        }
      });
    }, {
      rootMargin: '180px 0px',
      threshold: 0.01
    });

    images.forEach(img => {
      imgObserver.observe(img);
      if (img.complete && img.naturalWidth > 0) {
        img.classList.add('is-loaded');
      }
    });

    // Failsafe de garantia absoluta
    setTimeout(() => {
      images.forEach(img => img.classList.add('is-loaded'));
    }, 1200);
  }

  /* ── 2. SCROLL REVEAL EM TODOS OS ELEMENTOS DA PÁGINA ────────── */
  function initUniversalScrollReveal() {
    if (isReducedMotion) {
      document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));
      return;
    }

    // Identifica e garante que todos os blocos relevantes tenham a classe reveal
    const autoElements = document.querySelectorAll(`
      .feature-card,
      .health-card,
      .telemetry-card,
      .health__showcase,
      .spec-card,
      .trust-card,
      .inclusion-item,
      .footer__trust-item,
      .section-label,
      section:not(#hero) header > *
    `);

    autoElements.forEach(el => {
      if (!el.classList.contains('reveal')) {
        el.classList.add('reveal');
      }
    });

    const revealElements = document.querySelectorAll('.reveal');

    if (!('IntersectionObserver' in window)) {
      revealElements.forEach(el => el.classList.add('is-visible'));
      return;
    }

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target;
          target.classList.add('is-visible');
          observer.unobserve(target);
        }
      });
    }, {
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.08
    });

    // Para elementos já na tela ao carregar (fora do hero), escalona a entrada
    revealElements.forEach((el, index) => {
      const rect = el.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;

      // Elementos do Hero são controlados por suas animações cinemáticas dedicadas
      if (el.closest('#hero')) {
        el.classList.add('is-visible');
        return;
      }

      if (inView) {
        setTimeout(() => {
          el.classList.add('is-visible');
        }, index * 40);
      } else {
        revealObserver.observe(el);
      }
    });
  }

  /* ── 3. CONTADORES NUMÉRICOS DINÂMICOS ───────────────────────── */
  function initCounters() {
    const counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;

    function animateValue(el, targetVal, duration = 1600) {
      const startTime = performance.now();
      const isFloat = String(targetVal).includes('.');
      const decimals = isFloat ? String(targetVal).split('.')[1].length : 0;

      function step(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Easing cúbico para aceleração seguida de desaceleração suave
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = targetVal * eased;

        el.textContent = isFloat
          ? current.toFixed(decimals)
          : Math.round(current).toLocaleString('pt-BR');

        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          el.textContent = isFloat
            ? targetVal.toFixed(decimals)
            : targetVal.toLocaleString('pt-BR');
        }
      }

      requestAnimationFrame(step);
    }

    if (!('IntersectionObserver' in window)) {
      counters.forEach(c => {
        const val = parseFloat(c.dataset.count);
        if (!isNaN(val)) animateValue(c, val);
      });
      return;
    }

    const counterObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseFloat(el.dataset.count);
          if (!isNaN(target)) {
            animateValue(el, target);
          }
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.2 });

    counters.forEach(c => counterObserver.observe(c));
  }

  /* ── 4. BARRA DE PROGRESSO DE ROLAGEM NO TOPO ────────────────── */
  function initScrollProgress() {
    const bar = document.getElementById('scrollProgress');
    if (!bar) return;

    function onScroll() {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      bar.style.width = `${Math.min(progress, 100)}%`;
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ── 5. HEADER DINÂMICO E ACTIVE NAV ─────────────────────────── */
  function initHeaderAndNav() {
    const header = document.querySelector('.header');
    const navLinks = document.querySelectorAll('.nav__link');
    const sections = document.querySelectorAll('main section[id]');

    function handleScroll() {
      const scrollY = window.scrollY;

      // Sombra e fundo do Header
      if (header) {
        if (scrollY > 40) {
          header.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(0, 229, 255, 0.15)';
          header.style.backgroundColor = 'rgba(11, 19, 24, 0.95)';
        } else {
          header.style.boxShadow = '';
          header.style.backgroundColor = '';
        }
      }

      // Marcador de seção ativa no menu
      sections.forEach(sec => {
        const top = sec.offsetTop - 120;
        const height = sec.offsetHeight;
        if (scrollY >= top && scrollY < top + height) {
          navLinks.forEach(link => {
            link.classList.toggle('is-active', link.getAttribute('href') === `#${sec.id}`);
          });
        }
      });
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  /* ── 6. EFEITO 3D TILT NOS CARDS & PRODUTO HERO ──────────────── */
  function init3DTilt() {
    if (isReducedMotion || window.innerWidth < 1024) return;

    const cards = document.querySelectorAll(`
      .feature-card,
      .spec-card,
      .trust-card,
      .health-card,
      .telemetry-card,
      .inclusion-item,
      .hero__product-wrap
    `);

    cards.forEach(card => {
      card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const cx = rect.width / 2;
        const cy = rect.height / 2;
        const rotX = ((y - cy) / cy) * -5;
        const rotY = ((x - cx) / cx) * 5;

        card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-6px)`;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  /* ── 7. PROGRESS BARS DINÂMICAS ──────────────────────────────── */
  function initProgressBars() {
    const bars = document.querySelectorAll('.progress-bar__fill');
    if (!bars.length) return;

    if (!('IntersectionObserver' in window)) {
      bars.forEach(b => b.classList.add('is-visible'));
      return;
    }

    const barObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.25 });

    bars.forEach(b => barObserver.observe(b));
  }

  /* ── 8. STICKY CTA DINÂMICO ──────────────────────────────────── */
  function initStickyCTA() {
    const stickyCTA = document.querySelector('.sticky-cta');
    const heroSection = document.querySelector('#hero');
    const checkoutSection = document.querySelector('#checkout');
    if (!stickyCTA) return;

    function checkStickyVisibility() {
      const scrollY = window.scrollY;
      const heroBottom = heroSection ? (heroSection.offsetTop + heroSection.offsetHeight - 100) : 400;
      const checkoutTop = checkoutSection ? checkoutSection.offsetTop - 300 : 99999;

      if (scrollY > heroBottom && scrollY < checkoutTop) {
        stickyCTA.style.opacity = '1';
        stickyCTA.style.transform = 'translateY(0)';
        stickyCTA.style.pointerEvents = 'auto';
      } else {
        stickyCTA.style.opacity = '0';
        stickyCTA.style.transform = 'translateY(50px)';
        stickyCTA.style.pointerEvents = 'none';
      }
    }

    stickyCTA.style.transition = 'opacity 0.35s ease, transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)';
    window.addEventListener('scroll', checkStickyVisibility, { passive: true });
    checkStickyVisibility();
  }

  /* ── 9. SMOOTH SCROLL PARA LINKS DE ÂNCORA ───────────────────── */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (!href || href === '#') return;
        const target = document.querySelector(href);
        if (!target) return;

        e.preventDefault();
        const header = document.querySelector('.header');
        const headerHeight = header ? header.offsetHeight : 70;
        const targetTop = target.getBoundingClientRect().top + window.scrollY - headerHeight + 5;

        window.scrollTo({
          top: targetTop,
          behavior: 'smooth'
        });
      });
    });
  }

  /* ── 10. GSAP COMPLEMENTAR (PARALLAX & INTERATIVIDADE) ───────── */
  function initGsapEnhancements() {
    if (typeof gsap === 'undefined' || isReducedMotion) return;

    try {
      if (typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // Parallax sutil nos glows de fundo
        gsap.to('.hero__glow-top', {
          y: 180,
          ease: 'none',
          scrollTrigger: {
            trigger: '#hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1.2
          }
        });

        gsap.to('.hero__product-img', {
          y: 45,
          scale: 0.98,
          ease: 'none',
          scrollTrigger: {
            trigger: '#hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1.2
          }
        });
      }
    } catch (err) {
      console.warn('[TITAN PULSE] GSAP parallax handler:', err);
    }
  }

  /* ── 11. INICIALIZAÇÃO GERAL ─────────────────────────────────── */
  function init() {
    initLazyLoading();
    initUniversalScrollReveal();
    initCounters();
    initScrollProgress();
    initHeaderAndNav();
    init3DTilt();
    initProgressBars();
    initStickyCTA();
    initSmoothScroll();
    initGsapEnhancements();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
