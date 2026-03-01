// Minimal portfolio script (GitHub Pages-friendly JSON + reusable project template)
(() => {
  const body = document.body;
  const siteLoader = document.getElementById('siteLoader');
  const loaderBar = document.getElementById('loaderBar');
  const pageTransition = document.getElementById('pageTransition');
  const THEME_KEY = 'portfolio-theme';
  // Base path for GitHub Pages project sites vs custom domains.
  // - Custom domain => '/'
  // - username.github.io/repo => '/repo/'
  const BASE_PATH = (function(){
    const host = window.location.host;
    const path = window.location.pathname;
    const isGithubIo = host.endsWith('github.io');
    if (isGithubIo) {
      const parts = path.split('/').filter(Boolean);
      return parts.length ? `/${parts[0]}/` : '/';
    }
    return '/';
  

  // ---------------------------
  // BTS password gate (lightweight)
  // ---------------------------
  async function btsGate(siteConfig) {
    const page = document.body?.dataset?.page;
    if (page !== 'bts') return;
    const bts = (siteConfig && siteConfig.bts) ? siteConfig.bts : {};
    const enabled = bts.enabled !== false;
    if (!enabled) return;

    const key = 'bts-unlocked';
    const expected = String(bts.passwordHash || '');
    const salt = String(bts.salt || '');

    function lock() {
      localStorage.removeItem(key);
    }

    const logoutBtn = document.getElementById('logoutBtsBtn');
    logoutBtn?.addEventListener('click', () => {
      lock();
      showToast('Locked');
      setTimeout(() => window.location.href = resolveUrl('index.html'), 400);
    });

    const unlocked = localStorage.getItem(key) === 'true';
    if (unlocked) return;

    // Prompt for password (simple)
    const hint = bts.hint ? `\nHint: ${bts.hint}` : '';
    const pw = window.prompt('Enter password to view Behind the Scenes.' + hint);
    if (!pw) {
      window.location.href = resolveUrl('index.html');
      return;
    }

    try {
      const hash = await sha256Hex(salt + pw);
      if (hash === expected) {
        localStorage.setItem(key, 'true');
        showToast('Access granted');
      } else {
        showToast('Wrong password', 1800);
        window.location.href = resolveUrl('index.html');
      }
    } catch (e) {
      showToast('Unable to verify password', 1800);
      window.location.href = resolveUrl('index.html');
    }
  }

})();
  const PROJECTS_PATH = BASE_PATH + 'data/projects.json';
  const SITE_CONFIG_PATH = BASE_PATH + 'data/site-config.json';
  const toastEl = document.getElementById('toast');

  // ---------------------------
  // Loader + page readiness
  // ---------------------------
  body.classList.add('is-loading');
  function setLoaderProgress(value) {
    if (loaderBar) loaderBar.style.width = Math.max(0, Math.min(100, value)) + '%';
  }
  function finishLoading() {
    setLoaderProgress(100);
    setTimeout(() => {
      if (siteLoader) siteLoader.setAttribute('aria-hidden', 'true');
      body.classList.remove('is-loading');
      body.classList.add('is-ready');
    }, 180);
  }
  setLoaderProgress(35);
  window.addEventListener('load', () => setTimeout(finishLoading, 120), { once: true });

  // ---------------------------
  // Theme toggle (persists)
  // ---------------------------
  const root = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem(THEME_KEY);
  if (savedTheme === 'light' || savedTheme === 'dark') {
    root.setAttribute('data-theme', savedTheme);
  }
  function syncThemeButton() {
    if (!themeToggle) return;
    const current = root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
    themeToggle.textContent = current === 'light' ? 'Dark Mode' : 'Light Mode';
  }
  syncThemeButton();
  themeToggle?.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    root.setAttribute('data-theme', next);
    localStorage.setItem(THEME_KEY, next);
    syncThemeButton();
  });

  // ---------------------------
  // Smooth page transitions
  // ---------------------------
  function pulseTransition(callback) {
    if (!pageTransition) return callback?.();
    pageTransition.classList.add('is-active');
    setTimeout(() => {
      callback?.();
    }, 120);
  }
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href]');
    if (!link) return;
    const href = link.getAttribute('href');
    if (!href) return;
    if (link.target === '_blank' || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if (href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return;
    const url = new URL(href, window.location.href);
    if (url.origin !== window.location.origin) return;
    e.preventDefault();
    pulseTransition(() => {
      window.location.href = url.href;
    });
  });

  // ---------------------------
  // Helpers
  // ---------------------------
  function escapeHtml(str='') {
    return String(str).replace(/[&<>"']/g, (m) => (
      { '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[m]
    ));
  }

  let toastTimer = null;
  function showToast(message, timeoutMs = 1400) {
    if (!toastEl) return;
    toastEl.textContent = message || '';
    toastEl.setAttribute('aria-hidden', 'false');
    toastEl.classList.add('is-show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastEl.classList.remove('is-show');
      toastEl.setAttribute('aria-hidden', 'true');
    }, timeoutMs);
  }


  function resolveUrl(url='') {
    const u = String(url || '');
    if (!u) return '';
    // If already absolute or protocol-relative, return as-is
    if (/^(https?:)?\/\//i.test(u) || u.startsWith('mailto:') || u.startsWith('tel:')) return u;
    // Root-relative path stays root-relative
    if (u.startsWith('/')) return u;
    // Otherwise, prefix with BASE_PATH so assets work on both custom domain and project-site paths
    return BASE_PATH + u.replace(/^\.\//,'');
  }


  async function sha256Hex(str='') {
    const data = new TextEncoder().encode(String(str));
    const buf = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2,'0')).join('');
  }


  function iconSvgFor(label='') {
    const key = String(label || '').toLowerCase();
    if (key.includes('instagram')) return `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="4"/><circle cx="12" cy="12" r="4.5"/><path d="M17.6 6.4h.01"/></svg>`;
    if (key.includes('linkedin')) return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.5 10.2V20"/><path d="M6.5 7.1h.01"/><path d="M10.5 20v-5.6c0-1.8 1-3 2.7-3 1.7 0 2.3 1.2 2.3 3V20"/><path d="M17.2 20V10.2"/></svg>`;
    if (key.includes('email') || key.includes('mail')) return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.5 7.5h15v9h-15z"/><path d="M4.8 8l7.2 5 7.2-5"/></svg>`;
    if (key.includes('github')) return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 19c-4 1.3-4-2-5-2"/><path d="M15 19v-2.4c0-.7-.3-1.3-.7-1.7 2.2-.2 4.6-1.1 4.6-5a3.9 3.9 0 0 0-1-2.7 3.6 3.6 0 0 0-.1-2.7s-.8-.3-2.7 1a9.3 9.3 0 0 0-5 0c-1.9-1.3-2.7-1-2.7-1a3.6 3.6 0 0 0-.1 2.7 3.9 3.9 0 0 0-1 2.7c0 3.9 2.4 4.8 4.6 5-.4.4-.7 1-.7 1.7V19"/></svg>`;
    return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 13a5 5 0 0 1 0-7l1.2-1.2a5 5 0 0 1 7 7L17 13"/><path d="M14 11a5 5 0 0 1 0 7L12.8 19.2a5 5 0 0 1-7-7L7 11"/></svg>`;
  }

  function normalizeTag(v='') {
    return String(v).trim().toLowerCase();
  }

  function isEmbedUrl(url='') {
    return typeof url === 'string' && /youtube\.com\/embed|player\.vimeo\.com/i.test(url);
  }

  function mediaEl({ type, src, alt = '' }) {
    src = resolveUrl(src);
    if (!src) return `<div class="media"><div style="padding:1rem;color:var(--muted)">No media source</div></div>`;
    if (type === 'video' && isEmbedUrl(src)) {
      return `<iframe src="${escapeHtml(src)}" title="${escapeHtml(alt || 'Video')}" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;
    }
    if (type === 'video') {
      // Fallback for local placeholder image or mp4
      if (/\.(mp4|webm|ogg)$/i.test(src)) {
        return `<video src="${escapeHtml(src)}" controls preload="metadata" playsinline></video>`;
      }
      return `<img src="${escapeHtml(src)}" alt="${escapeHtml(alt)}" loading="lazy" />`;
    }
    return `<img src="${escapeHtml(src)}" alt="${escapeHtml(alt)}" loading="lazy" />`;
  }

  async function fetchProjects() {
    const res = await fetch(PROJECTS_PATH, { cache: 'no-store' });
    if (!res.ok) throw new Error(`Failed to load ${PROJECTS_PATH}: ${res.status}`);
    const data = await res.json();
    if (!Array.isArray(data)) throw new Error('projects.json must be an array');
    return data;

  async function fetchSiteConfig() {
    try {
      const res = await fetch(SITE_CONFIG_PATH, { cache: 'no-store' });
      if (!res.ok) throw new Error(`Failed to load ${SITE_CONFIG_PATH}: ${res.status}`);
      const data = await res.json();
      return (data && typeof data === 'object') ? data : {};
    } catch (err) {
      console.warn('site-config not loaded, using defaults', err);
      return {};
    }
  }

  }

  const GLOBAL_SITE_CONFIG = fetchSiteConfig();

  GLOBAL_SITE_CONFIG.then(cfg => { try { btsGate(cfg); } catch(e){} });

  // ---------------------------
  // Home page (JSON cards + tag chips + search)
  // ---------------------------
  const projectGrid = document.getElementById('projectGrid');
  const searchInput = document.getElementById('searchInput');
  const aboutSection = document.getElementById('aboutSection');
  const aboutPhoto = document.getElementById('aboutPhoto');
  const aboutHeading = document.getElementById('aboutHeading');
  const aboutDescription = document.getElementById('aboutDescription');
  const aboutActions = document.getElementById('aboutActions');
  const contactSection = document.getElementById('contactSection');
  const contactHeading = document.getElementById('contactHeading');
  const contactDescription = document.getElementById('contactDescription');
  const contactEmailBtn = document.getElementById('contactEmailBtn');
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  const resumeBtn = document.getElementById('resumeBtn');
  const contactForm = document.getElementById('contactForm');
  const contactFormWrap = document.getElementById('contactFormWrap');
  const contactFormHeading = document.getElementById('contactFormHeading');
  const contactFormDescription = document.getElementById('contactFormDescription');
  const formStatus = document.getElementById('formStatus');
  const categoryChipsWrap = document.getElementById('categoryChips');
  const tagChipsWrap = document.getElementById('tagChips');
  const sortSelect = document.getElementById('sortSelect');

  if (projectGrid) {
    let allProjects = [];
    let activeCategory = 'all';
    let activeTag = 'all';
    let activeSort = 'manual';
    let searchTerm = '';

    function buildTagChips(projects) {
      const tags = Array.from(
        new Set(projects.flatMap(p => Array.isArray(p.tags) ? p.tags.map(normalizeTag) : []))
      ).filter(Boolean).sort();
      tagChipsWrap.innerHTML = `<button class="chip is-active" data-tag="all" type="button">All tags</button>` +
        tags.map(tag => `<button class="chip" data-tag="${escapeHtml(tag)}" type="button">${escapeHtml(tag)}</button>`).join('');
    }

    function getFilteredProjects() {
      const q = normalizeTag(searchTerm);
      const filtered = allProjects.filter((p) => {
        const pCategory = normalizeTag(p.category);
        const isFeatured = Boolean(p.featured);
        const categoryOk =
          activeCategory === 'all' ||
          (activeCategory === 'featured' ? isFeatured : pCategory === activeCategory);

        const tags = Array.isArray(p.tags) ? p.tags.map(normalizeTag) : [];
        const tagOk = activeTag === 'all' || tags.includes(activeTag);

        const haystack = [
          p.title, p.category, p.subcategory, p.description, p.role, p.meta,
          ...(Array.isArray(p.tags) ? p.tags : [])
        ].join(' ').toLowerCase();

        const searchOk = !q || haystack.includes(q);
        return categoryOk && tagOk && searchOk;
      });

      const yearNum = (p) => {
        const m = String(p.year || '').match(/\d{4}/);
        const n = parseInt(m ? m[0] : '0', 10);
        return Number.isFinite(n) ? n : 0;
      };
      const manualOrder = (p, idx) => {
        const n = Number(p.sortOrder);
        return Number.isFinite(n) ? n : idx + 9999;
      };

      const withIndex = filtered.map((p, idx) => ({ p, idx }));
      withIndex.sort((a, b) => {
        switch (activeSort) {
          case 'newest':
            return yearNum(b.p) - yearNum(a.p) || manualOrder(a.p, a.idx) - manualOrder(b.p, b.idx);
          case 'oldest':
            return yearNum(a.p) - yearNum(b.p) || manualOrder(a.p, a.idx) - manualOrder(b.p, b.idx);
          case 'title-az':
            return String(a.p.title || '').localeCompare(String(b.p.title || ''));
          case 'title-za':
            return String(b.p.title || '').localeCompare(String(a.p.title || ''));
          case 'manual':
          default:
            return manualOrder(a.p, a.idx) - manualOrder(b.p, b.idx);
        }
      });

      return withIndex.map(x => x.p);
    }

    function cardHtml(p) {
      const category = normalizeTag(p.category || 'other');
      const mediaType = p.type === 'video' || category === 'video' ? 'video' : 'image';
      const thumb = p.thumb || p.viewerSrc || '';
      const link = resolveUrl(`project.html?id=${encodeURIComponent(p.id)}`);
      const subtitle = [p.meta, p.year].filter(Boolean).join(' • ');
      return `
        <article class="card" data-category="${escapeHtml(category)}" data-featured="${p.featured ? 'true' : 'false'}">
          <a class="card-link" href="${link}" aria-label="Open ${escapeHtml(p.title)} project">
            <div class="media">
              ${mediaEl({ type: mediaType, src: thumb, alt: p.title })}
              <span class="badge">${escapeHtml((p.category || '').toUpperCase())}</span>
            </div>
            <div class="card-body">
              <h2>${escapeHtml(p.title || 'Untitled project')}</h2>
              <p class="meta">${escapeHtml(subtitle || 'Project')}</p>
              <p class="desc">${escapeHtml(p.description || '')}</p>
            </div>
          </a>
        </article>
      `;
    }

    function renderProjects() {
      const filtered = getFilteredProjects();
      if (!filtered.length) {
        projectGrid.innerHTML = `<div class="empty-state">No matching projects. Try clearing the search or selecting a different tag/category.</div>`;
        return;
      }
      projectGrid.innerHTML = filtered.map(cardHtml).join('');
    }

    categoryChipsWrap?.addEventListener('click', (e) => {
      const chip = e.target.closest('[data-category]');
      if (!chip) return;
      activeCategory = chip.dataset.category || 'all';
      categoryChipsWrap.querySelectorAll('.chip').forEach(c => c.classList.toggle('is-active', c === chip));
      pulseTransition(() => renderProjects());
      if (pageTransition) setTimeout(() => pageTransition.classList.remove('is-active'), 120);
    });

    tagChipsWrap?.addEventListener('click', (e) => {
      const chip = e.target.closest('[data-tag]');
      if (!chip) return;
      activeTag = chip.dataset.tag || 'all';
      tagChipsWrap.querySelectorAll('.chip').forEach(c => c.classList.toggle('is-active', c === chip));
      pulseTransition(() => renderProjects());
      if (pageTransition) setTimeout(() => pageTransition.classList.remove('is-active'), 120);
    });

    searchInput?.addEventListener('input', (e) => {
      searchTerm = e.target.value || '';
      renderProjects();
    });

    sortSelect?.addEventListener('change', (e) => {
      activeSort = e.target.value || 'manual';
      pulseTransition(() => renderProjects());
      if (pageTransition) setTimeout(() => pageTransition.classList.remove('is-active'), 120);
    });

    (async () => {
      try {
        setLoaderProgress(45);
        const siteConfig = await fetchSiteConfig();
        if (siteConfig.siteTitle) {
          const h1 = document.querySelector('.site-header h1');
          if (h1) h1.textContent = siteConfig.siteTitle;
          document.title = `${siteConfig.siteTitle} — Portfolio`;
        }
        if (siteConfig.siteSubtitle) {
          const subtitle = document.querySelector('.site-header .subtitle');
          if (subtitle) subtitle.textContent = siteConfig.siteSubtitle;
        }
        if (aboutSection && siteConfig.about && siteConfig.about.enabled !== false) {
          if (aboutHeading && siteConfig.about.heading) aboutHeading.textContent = siteConfig.about.heading;
          if (aboutDescription && siteConfig.about.description) aboutDescription.textContent = siteConfig.about.description;
          if (aboutPhoto && siteConfig.about.profilePhoto) aboutPhoto.src = siteConfig.about.profilePhoto;
          if (aboutPhoto && siteConfig.about.alt) aboutPhoto.alt = siteConfig.about.alt;
        } else if (aboutSection) {
          aboutSection.style.display = 'none';
        }

        // Social links under About
        if (aboutActions) {
          const links = Array.isArray(siteConfig.socialLinks) ? siteConfig.socialLinks : [];
          const socialHtml = links
            .filter(link => link && link.url && link.label)
            .map(link => {
              const isEmail = String(link.url).startsWith('mailto:');
              const icon = iconSvgFor(link.label);
              return `<a class="icon-btn" href="${escapeHtml(link.url)}" aria-label="${escapeHtml(link.label)}" title="${escapeHtml(link.label)}" ${isEmail ? '' : 'target="_blank" rel="noopener"'}>${icon}</a>`;
            })
            .join('');

          // BTS link (optional)
          const bts = siteConfig.bts || {};
          const btsHtml = (bts.enabled !== false && bts.url)
            ? `<a class="btn" href="${escapeHtml(resolveUrl(bts.url))}" style="height:36px;padding:0 .9rem">Behind the Scenes</a>`
            : '';

          aboutActions.innerHTML = socialHtml + btsHtml;
        }


        // Contact section + resume button
        if (contactSection && siteConfig.contact && siteConfig.contact.enabled !== false) {
          if (contactHeading && siteConfig.contact.heading) contactHeading.textContent = siteConfig.contact.heading;
          if (contactDescription && siteConfig.contact.description) contactDescription.textContent = siteConfig.contact.description;

          const email = siteConfig.contact.email || 'you@example.com';
          const emailLabel = siteConfig.contact.emailLabel || 'Send Email';
          if (contactEmailBtn) {
            contactEmailBtn.textContent = emailLabel;
            contactEmailBtn.href = `mailto:${email}`;
          }

          const resumeUrl = siteConfig.contact.resumeUrl || '';
          const resumeLabel = siteConfig.contact.resumeLabel || 'Download Resume';
          if (resumeBtn) {
            resumeBtn.textContent = resumeLabel;
            if (resumeUrl) {
              resumeBtn.href = resumeUrl;
              resumeBtn.style.display = '';
            } else {
              resumeBtn.style.display = 'none';
            }
          }

          // Copy email button
          const enableCopy = siteConfig.contact.enableCopyEmail !== false;
          if (copyEmailBtn) {
            copyEmailBtn.style.display = enableCopy ? '' : 'none';
            copyEmailBtn.addEventListener('click', async () => {
              const text = email;
              try {
                await navigator.clipboard.writeText(text);
                showToast('Email copied');
              } catch (e) {
                window.prompt('Copy this email:', text);
                showToast('Copy the email from the prompt');
              }
            }, { once: true });
          }

          // Contact form (Formspree)
          const enableForm = siteConfig.contact.enableForm !== false;
          if (contactFormWrap) contactFormWrap.style.display = enableForm ? '' : 'none';
          if (enableForm && contactForm) {
            const endpoint = siteConfig.contact.formspreeEndpoint || '';
            if (endpoint) contactForm.setAttribute('action', endpoint);
            if (contactFormHeading && siteConfig.contact.formHeading) contactFormHeading.textContent = siteConfig.contact.formHeading;
            if (contactFormDescription && siteConfig.contact.formDescription) contactFormDescription.textContent = siteConfig.contact.formDescription;

            contactForm.addEventListener('submit', async (ev) => {
              ev.preventDefault();
              if (!endpoint) {
                if (formStatus) formStatus.textContent = 'Add your Formspree endpoint in data/site-config.json';
                return;
              }
              if (formStatus) formStatus.textContent = 'Sending…';
              const fd = new FormData(contactForm);
              try {
                const res = await fetch(endpoint, {
                  method: 'POST',
                  body: fd,
                  headers: { 'Accept': 'application/json' }
                });
                if (res.ok) {
                  contactForm.reset();
                  const msg = siteConfig.contact.successMessage || 'Sent.';
                  if (formStatus) formStatus.textContent = msg;
                  showToast(msg);
                } else {
                  const msg = siteConfig.contact.errorMessage || 'Something went wrong.';
                  if (formStatus) formStatus.textContent = msg;
                  showToast(msg, 1800);
                }
              } catch (err) {
                const msg = siteConfig.contact.errorMessage || 'Something went wrong.';
                if (formStatus) formStatus.textContent = msg;
                showToast(msg, 1800);
              }
            });
          }
        } else if (contactSection) {
          contactSection.style.display = 'none';
        }

        setLoaderProgress(60);
        allProjects = await fetchProjects();
        setLoaderProgress(80);
        buildTagChips(allProjects);
        renderProjects();
      } catch (err) {
        console.error(err);
        projectGrid.innerHTML = `
          <div class="empty-state">
            <strong>Projects could not load.</strong><br>
            If you are testing locally, use a local server (not <code>file://</code>). GitHub Pages will work normally.
          </div>`;
      } finally {
        setTimeout(() => {
          if (pageTransition) pageTransition.classList.remove('is-active');
          finishLoading();
        }, 80);
      }
    

  // ---------------------------
  // BTS password gate (lightweight)
  // ---------------------------
  async function btsGate(siteConfig) {
    const page = document.body?.dataset?.page;
    if (page !== 'bts') return;
    const bts = (siteConfig && siteConfig.bts) ? siteConfig.bts : {};
    const enabled = bts.enabled !== false;
    if (!enabled) return;

    const key = 'bts-unlocked';
    const expected = String(bts.passwordHash || '');
    const salt = String(bts.salt || '');

    function lock() {
      localStorage.removeItem(key);
    }

    const logoutBtn = document.getElementById('logoutBtsBtn');
    logoutBtn?.addEventListener('click', () => {
      lock();
      showToast('Locked');
      setTimeout(() => window.location.href = resolveUrl('index.html'), 400);
    });

    const unlocked = localStorage.getItem(key) === 'true';
    if (unlocked) return;

    // Prompt for password (simple)
    const hint = bts.hint ? `\nHint: ${bts.hint}` : '';
    const pw = window.prompt('Enter password to view Behind the Scenes.' + hint);
    if (!pw) {
      window.location.href = resolveUrl('index.html');
      return;
    }

    try {
      const hash = await sha256Hex(salt + pw);
      if (hash === expected) {
        localStorage.setItem(key, 'true');
        showToast('Access granted');
      } else {
        showToast('Wrong password', 1800);
        window.location.href = resolveUrl('index.html');
      }
    } catch (e) {
      showToast('Unable to verify password', 1800);
      window.location.href = resolveUrl('index.html');
    }
  }

})();
  }

  // ---------------------------
  // Reusable project detail page (project.html?id=...)
  // ---------------------------
  const projectTitle = document.getElementById('projectTitle');
  if (projectTitle) {
    const qs = new URLSearchParams(window.location.search);
    const projectId = qs.get('id');
    const missingPanel = document.getElementById('missingProject');
    const hero = document.getElementById('projectHero');

    function setText(id, value) {
      const el = document.getElementById(id);
      if (el) el.textContent = value || '';
    }
    function setChips(id, values=[]) {
      const el = document.getElementById(id);
      if (!el) return;
      el.innerHTML = (values || []).map(v => `<span class="chip" style="cursor:default">${escapeHtml(v)}</span>`).join('');
    }

    function renderGallery(items, fallbackProject) {
      const wrap = document.getElementById('projectGallery');
      if (!wrap) return;
      const galleryItems = Array.isArray(items) && items.length ? items : [fallbackProject.viewerSrc || fallbackProject.thumb].filter(Boolean);
      wrap.innerHTML = galleryItems.map((item) => {
        let entry = item;
        if (typeof entry === 'string') entry = { type: fallbackProject.type || 'image', src: entry };
        const type = (entry.type || fallbackProject.type || 'image') === 'video' ? 'video' : 'image';
        return `<div class="gallery-item ${type}">${mediaEl({ type, src: entry.src, alt: fallbackProject.title })}</div>`;
      }).join('');
    }

    function renderHero(project) {
      if (!hero) return;
      hero.classList.remove('skeleton');
      const type = (project.type || project.category) === 'video' ? 'video' : 'image';
      const src = project.viewerSrc || project.thumb || '';
      hero.innerHTML = mediaEl({ type, src, alt: project.title });
      if (type === 'video' && !isEmbedUrl(src) && !/\.(mp4|webm|ogg)$/i.test(src || '')) {
        // keep placeholders from looking broken
        hero.style.minHeight = '320px';
      }
    }

    (async () => {
      try {
        setLoaderProgress(55);
        const projects = await fetchProjects();
        setLoaderProgress(75);
        const project = projects.find(p => String(p.id) === String(projectId));
        if (!project) {
          missingPanel.hidden = false;
          setText('projectTitle', 'Project not found');
          setText('projectSubtitle', projectId ? `No project found for id "${projectId}"` : 'Missing project ID in URL');
          hero?.remove();
          return;
        }

        document.title = `${project.title} — Portfolio`;
        setText('projectTitle', project.title);
        setText('projectSubtitle', [project.meta, project.year].filter(Boolean).join(' • '));
        setText('projectSummary', project.summary || project.description);
        setText('projectCategory', project.category || '');
        setText('projectYear', project.year || '');
        setText('projectRole', project.role || '');
        setText('projectClient', project.client || 'Personal Project');
        setText('projectChallenge', project.challenge || '');
        setText('projectApproach', project.approach || '');
        setText('projectOutcome', project.outcome || '');
        setText('projectCredits', project.credits || '');
        setChips('projectTools', Array.isArray(project.tools) ? project.tools : []);
        setChips('projectTags', Array.isArray(project.tags) ? project.tags : []);
        renderHero(project);
        renderGallery(project.gallery, project);
      } catch (err) {
        console.error(err);
        missingPanel.hidden = false;
        setText('projectTitle', 'Could not load project');
        setText('projectSubtitle', 'Check data/projects.json and local server setup');
      } finally {
        finishLoading();
      }
    

  // ---------------------------
  // BTS password gate (lightweight)
  // ---------------------------
  async function btsGate(siteConfig) {
    const page = document.body?.dataset?.page;
    if (page !== 'bts') return;
    const bts = (siteConfig && siteConfig.bts) ? siteConfig.bts : {};
    const enabled = bts.enabled !== false;
    if (!enabled) return;

    const key = 'bts-unlocked';
    const expected = String(bts.passwordHash || '');
    const salt = String(bts.salt || '');

    function lock() {
      localStorage.removeItem(key);
    }

    const logoutBtn = document.getElementById('logoutBtsBtn');
    logoutBtn?.addEventListener('click', () => {
      lock();
      showToast('Locked');
      setTimeout(() => window.location.href = resolveUrl('index.html'), 400);
    });

    const unlocked = localStorage.getItem(key) === 'true';
    if (unlocked) return;

    // Prompt for password (simple)
    const hint = bts.hint ? `\nHint: ${bts.hint}` : '';
    const pw = window.prompt('Enter password to view Behind the Scenes.' + hint);
    if (!pw) {
      window.location.href = resolveUrl('index.html');
      return;
    }

    try {
      const hash = await sha256Hex(salt + pw);
      if (hash === expected) {
        localStorage.setItem(key, 'true');
        showToast('Access granted');
      } else {
        showToast('Wrong password', 1800);
        window.location.href = resolveUrl('index.html');
      }
    } catch (e) {
      showToast('Unable to verify password', 1800);
      window.location.href = resolveUrl('index.html');
    }
  }

})();
  }


  // ---------------------------
  // BTS password gate (lightweight)
  // ---------------------------
  async function btsGate(siteConfig) {
    const page = document.body?.dataset?.page;
    if (page !== 'bts') return;
    const bts = (siteConfig && siteConfig.bts) ? siteConfig.bts : {};
    const enabled = bts.enabled !== false;
    if (!enabled) return;

    const key = 'bts-unlocked';
    const expected = String(bts.passwordHash || '');
    const salt = String(bts.salt || '');

    function lock() {
      localStorage.removeItem(key);
    }

    const logoutBtn = document.getElementById('logoutBtsBtn');
    logoutBtn?.addEventListener('click', () => {
      lock();
      showToast('Locked');
      setTimeout(() => window.location.href = resolveUrl('index.html'), 400);
    });

    const unlocked = localStorage.getItem(key) === 'true';
    if (unlocked) return;

    // Prompt for password (simple)
    const hint = bts.hint ? `\nHint: ${bts.hint}` : '';
    const pw = window.prompt('Enter password to view Behind the Scenes.' + hint);
    if (!pw) {
      window.location.href = resolveUrl('index.html');
      return;
    }

    try {
      const hash = await sha256Hex(salt + pw);
      if (hash === expected) {
        localStorage.setItem(key, 'true');
        showToast('Access granted');
      } else {
        showToast('Wrong password', 1800);
        window.location.href = resolveUrl('index.html');
      }
    } catch (e) {
      showToast('Unable to verify password', 1800);
      window.location.href = resolveUrl('index.html');
    }
  }

})();
