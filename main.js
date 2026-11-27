/* ============================================
   Direct Solar Services — Main JS
   GSAP + ScrollTrigger + Lenis + UI interactions
   ============================================ */

document.documentElement.className = 'js';

/* --- Nav scroll effect --- */
(function initNav() {
  const nav = document.querySelector('.nav');
  if (!nav) return;

  // Scroll pe glass effect
  let ticking = false;
  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        nav.classList.toggle('scrolled', window.scrollY > 50);
        ticking = false;
      });
      ticking = true;
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile burger menu
  const burger = document.querySelector('.nav__burger');
  const mobileMenu = document.querySelector('.nav__mobile-menu');
  if (burger && mobileMenu) {
    burger.addEventListener('click', () => {
      burger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });
    // Menu link click pe band karo
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        burger.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }
})();

/* --- Chatbot --- */
(function initChatbot() {
  const fab = document.querySelector('.chatbot-fab');
  const win = document.querySelector('.chatbot-window');
  const input = document.querySelector('.chatbot-input');
  const sendBtn = document.querySelector('.chatbot-send');
  const messagesContainer = document.querySelector('.chatbot-messages');
  const quickReplies = document.querySelectorAll('.chatbot-quick-reply');

  if (!fab || !win) return;

  fab.addEventListener('click', () => {
    const isOpen = win.classList.toggle('open');
    fab.classList.toggle('open');
    fab.setAttribute('aria-expanded', isOpen);
    if (isOpen && input) input.focus();
  });

  // Chatbot ka guided flow state
  const flow = {
    step: 'welcome',
    data: {}
  };

  const responses = {
    'welcome': {
      text: "Hi! Welcome to Direct Solar Services. How can I help you explore solar solutions?",
      next: 'name'
    },
    'panels': {
      text: "Great choice! Solar panels can be a practical addition to your property. To help you get started, could you share your name?",
      next: 'name'
    },
    'battery': {
      text: "Battery storage can help you make more flexible use of your solar energy. What's your name so we can start an enquiry?",
      next: 'name'
    },
    'repairs': {
      text: "We offer maintenance and repair services for solar systems. To set up an enquiry, could you share your name?",
      next: 'name'
    },
    'commercial': {
      text: "Commercial solar can be a worthwhile investment for businesses. Let's start with your name — what should we call you?",
      next: 'name'
    },
    'name': {
      text: (name) => `Thanks, ${name}! What's your postcode so we can check your area?`,
      next: 'postcode'
    },
    'postcode': {
      text: "Perfect. And which service are you most interested in — solar panels, battery storage, commercial solar, or maintenance?",
      next: 'service'
    },
    'service': {
      text: "Thanks for sharing that. The last thing we'd need is your preferred contact method — phone or email?",
      next: 'contact'
    },
    'contact': {
      text: "Brilliant — that's everything we need to get the ball rolling. In a live version of this site, your enquiry would now be submitted to the Direct Solar Services team. This is a frontend demo, so no data has been sent. Thanks for trying it out!",
      next: 'done'
    }
  };

  function addMessage(text, isUser = false) {
    const msg = document.createElement('div');
    msg.className = `chatbot-msg chatbot-msg--${isUser ? 'user' : 'bot'}`;
    msg.textContent = text;
    messagesContainer.appendChild(msg);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  function handleUserInput(text) {
    addMessage(text, true);
    // Quick replies chhupao after first interaction
    const qr = document.querySelector('.chatbot-quick-replies');
    if (qr) qr.style.display = 'none';

    setTimeout(() => {
      if (flow.step === 'welcome' || flow.step === 'name') {
        flow.data.name = text;
        const resp = responses['name'];
        addMessage(resp.text(text));
        flow.step = resp.next;
      } else if (responses[flow.step]) {
        const resp = responses[flow.step];
        addMessage(typeof resp.text === 'function' ? resp.text(text) : resp.text);
        flow.step = resp.next;
      } else {
        addMessage("Thanks for your message! This is a frontend demo — in a live version, your enquiry would be handled by the Direct Solar Services team.");
      }
    }, 500);
  }

  // Quick reply buttons
  quickReplies.forEach(btn => {
    btn.addEventListener('click', () => {
      const text = btn.textContent;
      // Map quick reply to flow
      if (text.includes('solar panels')) {
        addMessage(text, true);
        const qr = document.querySelector('.chatbot-quick-replies');
        if (qr) qr.style.display = 'none';
        setTimeout(() => { addMessage(responses.panels.text); flow.step = responses.panels.next; }, 500);
      } else if (text.includes('battery')) {
        addMessage(text, true);
        const qr = document.querySelector('.chatbot-quick-replies');
        if (qr) qr.style.display = 'none';
        setTimeout(() => { addMessage(responses.battery.text); flow.step = responses.battery.next; }, 500);
      } else if (text.includes('repairs')) {
        addMessage(text, true);
        const qr = document.querySelector('.chatbot-quick-replies');
        if (qr) qr.style.display = 'none';
        setTimeout(() => { addMessage(responses.repairs.text); flow.step = responses.repairs.next; }, 500);
      } else if (text.includes('commercial')) {
        addMessage(text, true);
        const qr = document.querySelector('.chatbot-quick-replies');
        if (qr) qr.style.display = 'none';
        setTimeout(() => { addMessage(responses.commercial.text); flow.step = responses.commercial.next; }, 500);
      }
    });
  });

  // Send button aur Enter key
  if (sendBtn) {
    sendBtn.addEventListener('click', () => {
      if (input && input.value.trim()) {
        handleUserInput(input.value.trim());
        input.value = '';
      }
    });
  }
  if (input) {
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && input.value.trim()) {
        handleUserInput(input.value.trim());
        input.value = '';
      }
    });
  }
})();

/* --- FAQ Accordion --- */
(function initFAQ() {
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const answer = item.querySelector('.faq-answer');
      const isOpen = item.classList.contains('open');

      // Baaki sab band karo
      document.querySelectorAll('.faq-item.open').forEach(openItem => {
        if (openItem !== item) {
          openItem.classList.remove('open');
          openItem.querySelector('.faq-answer').style.maxHeight = '0';
          openItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
        }
      });

      if (isOpen) {
        item.classList.remove('open');
        answer.style.maxHeight = '0';
        btn.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });
})();

/* --- Contact Form Validation --- */
(function initForm() {
  const form = document.getElementById('quoteForm');
  if (!form) return;

  const formContainer = document.querySelector('.form-container');
  const successState = document.querySelector('.form-success');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    // Har required field check karo
    form.querySelectorAll('[required]').forEach(field => {
      const group = field.closest('.form-group');
      if (!field.value.trim()) {
        group.classList.add('error');
        valid = false;
      } else {
        group.classList.remove('error');
      }
    });

    // Email format check
    const emailField = form.querySelector('[type="email"]');
    if (emailField && emailField.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value)) {
      emailField.closest('.form-group').classList.add('error');
      valid = false;
    }

    if (valid) {
      // Form chhupao, success dikhao
      form.style.display = 'none';
      if (successState) successState.classList.add('is-visible');
    }
  });

  // Live validation — error hatao jab user type kare
  form.querySelectorAll('.form-input, .form-select, .form-textarea').forEach(field => {
    field.addEventListener('input', () => {
      field.closest('.form-group')?.classList.remove('error');
    });
  });
})();

/* --- GSAP + ScrollTrigger — section reveals --- */
(function initMotion() {
  // CDN se load hone ka wait karo
  function waitForGSAP(cb) {
    if (window.gsap && window.ScrollTrigger) return cb();
    const check = setInterval(() => {
      if (window.gsap && window.ScrollTrigger) { clearInterval(check); cb(); }
    }, 100);
  }

  waitForGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    const motion = gsap.matchMedia();

    motion.add("(prefers-reduced-motion: no-preference)", () => {
      // Section reveals
      gsap.utils.toArray('[data-reveal]').forEach(el => {
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            once: true
          }
        });
      });

      // Staggered card reveals
      gsap.utils.toArray('[data-reveal-group]').forEach(group => {
        const cards = group.querySelectorAll('[data-reveal-card]');
        gsap.to(cards, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power4.out',
          stagger: 0.07,
          scrollTrigger: {
            trigger: group,
            start: 'top 85%',
            once: true
          }
        });
      });
    });

    // Reduced motion — sab dikha do seedha
    motion.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set('[data-reveal], [data-reveal-card]', { opacity: 1, y: 0 });
    });
  });
})();

/* --- Lenis Smooth Scroll --- */
(function initLenis() {
  function waitForLenis(cb) {
    if (window.Lenis) return cb();
    const check = setInterval(() => {
      if (window.Lenis) { clearInterval(check); cb(); }
    }, 100);
  }

  waitForLenis(() => {
    // Reduced motion check
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1.5
    });

    // ScrollTrigger sync
    if (window.ScrollTrigger) {
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time) => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);
    } else {
      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    }

    window.__lenis = lenis;
  });
})();
