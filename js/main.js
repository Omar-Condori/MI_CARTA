/* ============================================
   a-letter-for-you — Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ---------- LANGUAGE SWITCHER ----------
  const langBtn = document.getElementById('langBtn');
  let currentLang = 'es'; // default language

  if (langBtn) {
    langBtn.addEventListener('click', () => {
      currentLang = currentLang === 'es' ? 'en' : 'es';
      updateLanguage(currentLang);
    });
  }

  function updateLanguage(lang) {
    // Update button text and flag
    const langFlag = langBtn ? langBtn.querySelector('.hero__lang-flag') : null;
    const langText = langBtn ? langBtn.querySelector('.hero__lang-text') : null;
    
    if (lang === 'es') {
      if (langFlag) langFlag.textContent = '🇺🇸';
      if (langText) langText.textContent = 'English';
      if (langBtn) langBtn.setAttribute('aria-label', 'Switch to English');
    } else {
      if (langFlag) langFlag.textContent = '🇵🇪'; // or 🇪🇸
      if (langText) langText.textContent = 'Español';
      if (langBtn) langBtn.setAttribute('aria-label', 'Cambiar a Español');
    }

    // Update all elements with data-es / data-en attributes
    const elements = document.querySelectorAll('[data-es][data-en]');
    elements.forEach(el => {
      const text = lang === 'es' ? el.getAttribute('data-es') : el.getAttribute('data-en');
      
      // Check if it's the subtitle or has HTML tags
      if (el.classList.contains('hero__subtitle') || el.classList.contains('letter__body') || text.includes('<br>') || text.includes('<code>')) {
        el.innerHTML = text;
      } else {
        el.textContent = text;
      }
    });

    // Update letter toggle button text dynamically based on state
    const letterContent = document.getElementById('letterContent');
    const letterToggleText = document.querySelector('.letter__toggle-text');
    if (letterContent && letterToggleText) {
      const isOpen = letterContent.classList.contains('open');
      if (lang === 'es') {
        letterToggleText.textContent = isOpen ? 'Cerrar carta' : 'Abrir carta';
      } else {
        letterToggleText.textContent = isOpen ? 'Close letter' : 'Open letter';
      }
    }

    // Update placeholders of form inputs
    const nameInput = document.getElementById('name');
    const messageInput = document.getElementById('message');
    if (nameInput) {
      nameInput.placeholder = lang === 'es' ? 'Escribe tu nombre aquí...' : 'Write your name here...';
    }
    if (messageInput) {
      messageInput.placeholder = lang === 'es' ? 'Escribe lo que quieras decir...' : 'Write whatever you want to say...';
    }
  }

  // ---------- INTERSECTION OBSERVER (Reveal Animations) ----------
  const revealElements = document.querySelectorAll('.reveal');

  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(el => revealObserver.observe(el));

  // ---------- SCROLL PROGRESS ----------
  const scrollProgress = document.getElementById('scrollProgress');

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    scrollProgress.style.width = progress + '%';
  });

  // ---------- SMOOTH SCROLL (Hero Button) ----------
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ---------- LETTER TOGGLE ----------
  const letterToggle = document.getElementById('letterToggle');
  const letterContent = document.getElementById('letterContent');
  const letterClose = document.getElementById('letterClose');

  if (letterToggle && letterContent) {
    letterToggle.addEventListener('click', () => {
      const isOpen = letterContent.classList.contains('open');
      if (isOpen) {
        letterContent.classList.remove('open');
        letterToggle.setAttribute('aria-expanded', 'false');
        letterToggle.querySelector('.letter__toggle-text').textContent = currentLang === 'es' ? 'Abrir carta' : 'Open letter';
      } else {
        letterContent.classList.add('open');
        letterToggle.setAttribute('aria-expanded', 'true');
        letterToggle.querySelector('.letter__toggle-text').textContent = currentLang === 'es' ? 'Cerrar carta' : 'Close letter';
        // Scroll to reveal more of the letter after opening
        setTimeout(() => {
          letterContent.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
      }
    });
  }

  if (letterClose && letterContent && letterToggle) {
    letterClose.addEventListener('click', () => {
      letterContent.classList.remove('open');
      letterToggle.setAttribute('aria-expanded', 'false');
      letterToggle.querySelector('.letter__toggle-text').textContent = currentLang === 'es' ? 'Abrir carta' : 'Open letter';
    });
  }

  // ---------- ACCORDION ----------
  const accordionTriggers = document.querySelectorAll('.accordion__trigger');

  accordionTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
      const content = document.getElementById(trigger.getAttribute('aria-controls'));

      // Close all accordions
      accordionTriggers.forEach(t => {
        t.setAttribute('aria-expanded', 'false');
        const c = document.getElementById(t.getAttribute('aria-controls'));
        if (c) c.classList.remove('open');
      });

      // Toggle current
      if (!isExpanded) {
        trigger.setAttribute('aria-expanded', 'true');
        if (content) content.classList.add('open');
      }
    });
  });

  // ---------- MUSIC PLAYER ----------
  const playerToggle = document.getElementById('playerToggle');
  const playerEl = document.querySelector('.player');
  let audio = null;

  if (playerToggle && playerEl) {
    playerToggle.addEventListener('click', () => {
      if (!audio) {
        // Intentar cargar el primer archivo de música encontrado
        // Coloca tu archivo .mp3 en assets/music/
        audio = new Audio();
        audio.loop = true;

        // Intentar con nombres comunes
        const possibleTracks = [
          'assets/music/Hombre y mujer Felipe Garibo.mp3',
          'assets/music/song.mp3',
          'assets/music/music.mp3',
          'assets/music/audio.mp3',
          'assets/music/track.mp3'
        ];

        let loaded = false;

        const tryLoad = (index) => {
          if (index >= possibleTracks.length) {
            // No se encontró archivo — mostrar mensaje
            const titleEl = document.getElementById('playerTitle');
            if (titleEl) titleEl.textContent = currentLang === 'es' ? '🎵 Agrega una canción' : '🎵 Add a song';
            playerEl.classList.remove('playing');
            audio = null;
            return;
          }

          audio.src = possibleTracks[index];
          audio.load();

          audio.addEventListener('canplaythrough', () => {
            if (!loaded) {
              loaded = true;
              audio.play()
                .then(() => {
                  playerEl.classList.add('playing');
                  const titleEl = document.getElementById('playerTitle');
                  if (titleEl && index === 0) {
                    titleEl.textContent = 'Hombre y mujer - Felipe Garibo';
                    titleEl.removeAttribute('data-es');
                    titleEl.removeAttribute('data-en');
                  }
                })
                .catch(() => {
                  playerEl.classList.remove('playing');
                  audio = null;
                });
            }
          }, { once: true });

          audio.addEventListener('error', () => {
            if (!loaded) tryLoad(index + 1);
          }, { once: true });
        };

        tryLoad(0);
      } else if (audio.paused) {
        audio.play()
          .then(() => playerEl.classList.add('playing'))
          .catch(() => playerEl.classList.remove('playing'));
      } else {
        audio.pause();
        playerEl.classList.remove('playing');
      }
    });
  }

  // ---------- FORM HANDLING ----------
  const responseForm = document.getElementById('responseForm');
  const formStatus = document.getElementById('formStatus');

  if (responseForm) {
    responseForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const name = document.getElementById('name').value.trim();
      const message = document.getElementById('message').value.trim();

      if (!name || !message) {
        if (formStatus) formStatus.textContent = currentLang === 'es' ? 'Por favor, completa todos los campos.' : 'Please fill in all fields.';
        return;
      }

      const submitBtn = responseForm.querySelector('.form__btn');
      if (submitBtn) submitBtn.disabled = true;
      if (formStatus) formStatus.textContent = currentLang === 'es' ? 'Enviando...' : 'Sending...';

      try {
        // Llamar a la función preparada para Supabase
        await saveMessage(name, message);

        if (formStatus) {
          formStatus.textContent = currentLang === 'es' ? 'Gracias por tu mensaje ❤️' : 'Thank you for your message ❤️';
          formStatus.style.color = 'var(--color-rose-dark)';
        }
        responseForm.reset();
      } catch (error) {
        if (formStatus) {
          // La función actualmente simula éxito; cuando conectes Supabase
          // esto manejará el error real
          formStatus.textContent = currentLang === 'es' 
            ? 'Tu mensaje se ha guardado (demo). Conecta Supabase para almacenamiento real.' 
            : 'Your message has been saved (demo). Connect Supabase for real storage.';
          formStatus.style.color = 'var(--color-text-light)';
        }
      } finally {
        if (submitBtn) submitBtn.disabled = false;
      }
    });
  }

  // ---------- HEARTS RAIN EFFECT ----------
  const porQueSection = document.getElementById('por-que');
  let heartsInterval = null;

  if (porQueSection) {
    // Create container for hearts
    const rainContainer = document.createElement('div');
    rainContainer.className = 'hearts-rain';
    porQueSection.appendChild(rainContainer);

    // Observer to start/stop rain depending on visibility (saves performance)
    const rainObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          startHeartsRain(rainContainer);
        } else {
          stopHeartsRain();
        }
      });
    }, { threshold: 0.05 });

    rainObserver.observe(porQueSection);
  }

  function startHeartsRain(container) {
    if (heartsInterval) return;

    heartsInterval = setInterval(() => {
      // Avoid browser lag by limiting simultaneous hearts
      if (container.children.length > 25) return;

      const heart = document.createElement('span');
      heart.className = 'hearts-rain__heart';
      heart.textContent = ['❤️', '💖', '💝', '💕', '♥', '🌸'][Math.floor(Math.random() * 6)];

      // Randomize values
      const size = Math.random() * 14 + 12; // 12px to 26px
      const left = Math.random() * 100; // 0% to 100%
      const duration = Math.random() * 4 + 4; // 4s to 8s
      const delay = Math.random() * 2; // delay up to 2s
      const opacity = Math.random() * 0.4 + 0.3; // 0.3 to 0.7

      heart.style.left = `${left}%`;
      heart.style.fontSize = `${size}px`;
      heart.style.animationDuration = `${duration}s`;
      heart.style.animationDelay = `${delay}s`;
      heart.style.opacity = opacity;

      container.appendChild(heart);

      // Clean up DOM after animation finishes
      heart.addEventListener('animationend', () => {
        heart.remove();
      });
    }, 450);
  }

  function stopHeartsRain() {
    if (heartsInterval) {
      clearInterval(heartsInterval);
      heartsInterval = null;
    }
  }

});
