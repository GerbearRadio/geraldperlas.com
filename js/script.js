// Minimal portfolio script (GitHub Pages-friendly JSON + reusable project template)
(() => {
  const body = document.body;
  const siteLoader = document.getElementById('siteLoader');
  const loaderBar = document.getElementById('loaderBar');
  const pageTransition = document.getElementById('pageTransition');
  const THEME_KEY = 'portfolio-theme';
  const PROJECTS_PATH = './data/projects.json';
  const SITE_CONFIG_PATH = './data/site-config.json';
  const EXTRAS_PATH = './data/extras.json';
  const EXTRAS_UNLOCK_KEY = 'extras-unlocked';
  const EXTRAS_UNLOCK_TS_KEY = 'extras-unlocked-at';
  const EXTRAS_LAST_ACTIVITY_KEY = 'extras-last-activity';

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

  function normalizeTag(v='') {
    return String(v).trim().toLowerCase();
  }

  function isEmbedUrl(url='') {
    return typeof url === 'string' && /youtube\.com\/embed|player\.vimeo\.com|drive\.google\.com\/file\/d\/[^/]+\/preview|\.pdf($|\?)/i.test(url);
  }

  function mediaEl({ type, src, alt = '' }) {
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
  }

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

  function renderSocialLinks(siteConfig = {}) {
    const wrap = document.getElementById('socialLinks');
    if (!wrap) return;

    const social = siteConfig.social || {};
    const enabled = social.enabled !== false;
    const links = Array.isArray(social.links) ? social.links : [];

    if (!enabled || !links.length) {
      wrap.style.display = 'none';
      return;
    }

    const externalIcon = `
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path fill="currentColor" d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42 9.3-9.29H14V3z"></path>
        <path fill="currentColor" d="M5 5h6v2H7v10h10v-4h2v6H5V5z"></path>
      </svg>`;

    wrap.innerHTML = links
      .filter(l => l && l.label && l.url)
      .map(l => {
        const label = escapeHtml(l.label);
        const url = escapeHtml(l.url);
        return `<a class="social-link" href="${url}" target="_blank" rel="noopener noreferrer" aria-label="${label} (opens in a new tab)">${externalIcon}${label}</a>`;
      })
      .join('');
  }
  // ---------------------------
  // Extras (Behind the Scenes) - lightweight password gate
  // ---------------------------
  function bytesToHex(bytes) {
    return Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
  }

  async function sha256Hex(input) {
    const enc = new TextEncoder();
    const data = enc.encode(input);
    const digest = await crypto.subtle.digest('SHA-256', data);
    return bytesToHex(new Uint8Array(digest));
  }

  function setExtrasUnlocked(isUnlocked) {
    if (isUnlocked) {
      sessionStorage.setItem(EXTRAS_UNLOCK_KEY, '1');
      const now = String(Date.now());
      sessionStorage.setItem(EXTRAS_UNLOCK_TS_KEY, now);
      sessionStorage.setItem(EXTRAS_LAST_ACTIVITY_KEY, now);
    } else {
      sessionStorage.removeItem(EXTRAS_UNLOCK_KEY);
      sessionStorage.removeItem(EXTRAS_UNLOCK_TS_KEY);
      sessionStorage.removeItem(EXTRAS_LAST_ACTIVITY_KEY);
    }
  }

  function isExtrasUnlocked() {
    return sessionStorage.getItem(EXTRAS_UNLOCK_KEY) === '1';
  }

  async function fetchExtras() {
    const res = await fetch(EXTRAS_PATH, { cache: 'no-store' });
    if (!res.ok) throw new Error(`Failed to load ${EXTRAS_PATH}: ${res.status}`);
    const data = await res.json();
    if (!Array.isArray(data)) throw new Error('extras.json must be an array');
    return data;
  }

  function renderExtrasGrid(items = []) {
    const grid = document.getElementById('extrasGrid');
    const count = document.getElementById('extrasCount');
    if (!grid) return;

    const safeItems = Array.isArray(items) ? items : [];
    if (count) count.textContent = `${safeItems.length} item${safeItems.length === 1 ? '' : 's'}`;

    if (!safeItems.length) {
      grid.innerHTML = `<article class="card"><div class="card-body">
        <h3>No extras yet</h3>
        <p class="muted">Add items in <code>/data/extras.json</code> and drop media into <code>/assets</code>.</p>
      </div></article>`;
      return;
    }

    grid.innerHTML = safeItems.map((it) => {
      const title = escapeHtml(it.title || 'Untitled');
      const desc = escapeHtml(it.description || '');
      const type = normalizeTag(it.type || 'link');
      const category = normalizeTag(it.category || 'other');
      const thumb = it.thumb ? escapeHtml(it.thumb) : '';
      const src = it.src ? escapeHtml(it.src) : '';
      const project = escapeHtml(it.project || it.projectTitle || it.projectId || '');

      const tagChips = Array.isArray(it.tags) ? it.tags.map(t => `<span class="pill">${escapeHtml(t)}</span>`).join('') : '';
      const meta = [project && `Project: ${project}`, it.year].filter(Boolean).join(' • ');

      let media = '';
      if (type === 'image' && (src || thumb)) {
        media = `<img src="${src || thumb}" alt="${title}" loading="lazy" />`;
      } else if (type === 'video' && src) {
        if (isEmbedUrl(src)) {
          media = `<iframe src="${src}" title="${title}" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;
        } else if (/\.(mp4|webm|ogg)$/i.test(src)) {
          media = `<video src="${src}" controls preload="metadata" playsinline></video>`;
        } else {
          media = thumb ? `<img src="${thumb}" alt="${title}" loading="lazy" />` : '';
        }
      } else if (type === 'pdf' && src) {
        media = `<iframe src="${src}" title="${title}" loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe>`;
      } else if (thumb) {
        media = `<img src="${thumb}" alt="${title}" loading="lazy" />`;
      }

      const action = src
        ? `<a class="btn btn-ghost" href="${src}" target="_blank" rel="noopener noreferrer">Open</a>`
        : '';

      return `<article class="card">
        <div class="card-media">${media || `<div class="card-media-fallback">No preview</div>`}</div>
        <div class="card-body">
          <p class="eyebrow">${escapeHtml(category.replace(/-/g,' ').toUpperCase())} • ${escapeHtml(type.toUpperCase())}</p>
          <h3>${title}</h3>
          ${meta ? `<p class="muted tiny">${escapeHtml(meta)}</p>` : ''}
          ${desc ? `<p>${desc}</p>` : ''}
          ${tagChips ? `<div class="pill-row">${tagChips}</div>` : ''}
          ${action ? `<div class="card-actions">${action}</div>` : ''}
        </div>
      </article>`;
    }).join('');
  }

  async function initExtrasPage(siteConfig) {
    const gate = document.getElementById('extrasGate');
    const content = document.getElementById('extrasContent');
    if (!gate || !content) return;

    const extrasCfg = siteConfig.extras || {};
    const enabled = extrasCfg.enabled !== false;

    const titleEl = document.getElementById('extrasTitle');
    const subtitleEl = document.getElementById('extrasSubtitle');
    if (titleEl && extrasCfg.title) titleEl.textContent = extrasCfg.title;
    if (subtitleEl && extrasCfg.subtitle) subtitleEl.textContent = extrasCfg.subtitle;

    if (!enabled) {
      gate.innerHTML = `<h2>Disabled</h2><p class="muted">Extras are currently disabled in <code>/data/site-config.json</code>.</p>`;
      return;
    }

    const hint = document.getElementById('extrasHint');
    if (hint && extrasCfg.passwordHint) {
      hint.textContent = extrasCfg.passwordHint;
      hint.hidden = false;
    }

    const lockBtn = document.getElementById('extrasLockBtn');
    lockBtn?.addEventListener('click', () => {
      lockNow();
    });

        function lockNow() {
      setExtrasUnlocked(false);
      const status = document.getElementById('extrasStatus');
      if (status) status.textContent = 'Locked.';
      content.hidden = true;
      gate.hidden = false;
    }

    function touchActivity() {
      sessionStorage.setItem(EXTRAS_LAST_ACTIVITY_KEY, String(Date.now()));
    }

    function startLockTimers(extrasCfg) {
      const lockTimeoutMin = Number(extrasCfg.lockTimeoutMinutes || 0);
      const idleTimeoutMin = Number(extrasCfg.idleTimeoutMinutes || 0);
      const status = document.getElementById('extrasStatus');

      const updateStatus = () => {
        const unlockedAt = Number(sessionStorage.getItem(EXTRAS_UNLOCK_TS_KEY) || 0);
        if (!unlockedAt) return;
        const now = Date.now();

        const lockInMs = lockTimeoutMin > 0 ? Math.max(0, lockTimeoutMin * 60 * 1000 - (now - unlockedAt)) : null;
        const idleAt = Number(sessionStorage.getItem(EXTRAS_LAST_ACTIVITY_KEY) || unlockedAt);
        const idleInMs = idleTimeoutMin > 0 ? Math.max(0, idleTimeoutMin * 60 * 1000 - (now - idleAt)) : null;

        const parts = [];
        if (lockInMs !== null) parts.push(`Auto-lock in ${Math.ceil(lockInMs / 60000)} min`);
        if (idleInMs !== null) parts.push(`Idle lock in ${Math.ceil(idleInMs / 60000)} min`);
        if (status) status.textContent = parts.length ? parts.join(' • ') : 'Unlocked.';
      };

      const tick = () => {
        if (!isExtrasUnlocked()) return;
        const unlockedAt = Number(sessionStorage.getItem(EXTRAS_UNLOCK_TS_KEY) || 0);
        const lastAct = Number(sessionStorage.getItem(EXTRAS_LAST_ACTIVITY_KEY) || unlockedAt);
        const now = Date.now();

        if (lockTimeoutMin > 0 && unlockedAt && now - unlockedAt > lockTimeoutMin * 60 * 1000) {
          lockNow();
          return;
        }
        if (idleTimeoutMin > 0 && lastAct && now - lastAct > idleTimeoutMin * 60 * 1000) {
          lockNow();
          return;
        }
        updateStatus();
      };

      // Activity listeners (idle timeout)
      ['click','keydown','mousemove','touchstart','scroll'].forEach(evt => {
        window.addEventListener(evt, touchActivity, { passive: true });
      });

      updateStatus();
      window.setInterval(tick, 30 * 1000);
    }

    let allExtras = [];
    let activeCategory = 'all';
    let extrasSearchTerm = '';

    function applyExtrasFilters() {
      const term = extrasSearchTerm.trim().toLowerCase();
      const filtered = allExtras.filter((it) => {
        const cat = normalizeTag(it.category || 'other');
        const matchesCat = activeCategory === 'all' || cat === activeCategory;
        if (!matchesCat) return false;

        if (!term) return true;
        const hay = [
          it.title, it.description, it.project, it.projectTitle, it.projectId,
          Array.isArray(it.tags) ? it.tags.join(' ') : ''
        ].filter(Boolean).join(' ').toLowerCase();
        return hay.includes(term);
      });
      renderExtrasGrid(filtered);
    }

    function initExtrasControls() {
      const tabs = document.querySelectorAll('[data-extras-category]');
      const search = document.getElementById('extrasSearch');

      tabs.forEach(btn => {
        btn.addEventListener('click', () => {
          activeCategory = btn.getAttribute('data-extras-category') || 'all';
          tabs.forEach(b => {
            const isActive = b === btn;
            b.classList.toggle('is-active', isActive);
            b.setAttribute('aria-selected', isActive ? 'true' : 'false');
          });
          applyExtrasFilters();
        });
      });

      search?.addEventListener('input', (e) => {
        extrasSearchTerm = e.target.value || '';
        applyExtrasFilters();
      });
    }

    async function unlockAndLoad() {
      gate.hidden = true;
      content.hidden = false;
      try {
        const items = await fetchExtras();
        allExtras = items;
        initExtrasControls();
        applyExtrasFilters();
      } catch (err) {
        console.error(err);
        const grid = document.getElementById('extrasGrid');
        if (grid) grid.innerHTML = `<article class="card"><div class="card-body"><h3>Could not load extras</h3><p class="muted">Check <code>/data/extras.json</code>.</p></div></article>`;
      }
    }

    if (isExtrasUnlocked()) {
      startLockTimers(extrasCfg);
      await unlockAndLoad();
      return;
    }

    const form = document.getElementById('extrasForm');
    const input = document.getElementById('extrasPassword');
    const error = document.getElementById('extrasError');
    form?.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (error) error.hidden = true;

      const password = (input?.value || '').trim();
      const salt = String(extrasCfg.salt || '');
      const expected = String(extrasCfg.passwordHash || '');

      if (!password || !salt || !expected) {
        if (error) {
          error.textContent = 'Password gate is not configured. Set extras.salt and extras.passwordHash in site-config.json.';
          error.hidden = false;
        }
        return;
      }

      try {
        const attempt = await sha256Hex(`${salt}:${password}`);
        if (attempt === expected) {
          setExtrasUnlocked(true);
          startLockTimers(extrasCfg);
          input.value = '';
          await unlockAndLoad();
        } else {
          if (error) {
            error.textContent = 'Incorrect password.';
            error.hidden = false;
          }
        }
      } catch (err) {
        console.error(err);
        if (error) {
          error.textContent = 'Unable to verify password in this browser.';
          error.hidden = false;
        }
      }
    });
  }


  // ---------------------------
  // Home page (JSON cards + tag chips + search)
  // ---------------------------
  const projectGrid = document.getElementById('projectGrid');
  const searchInput = document.getElementById('searchInput');
  const aboutSection = document.getElementById('aboutSection');
  const aboutPhoto = document.getElementById('aboutPhoto');
  const aboutHeading = document.getElementById('aboutHeading');
  const aboutDescription = document.getElementById('aboutDescription');
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
      const link = `project.html?id=${encodeURIComponent(p.id)}`;
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

        renderSocialLinks(siteConfig);

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
    })();
  }

  // ---------------------------
  // Extras page boot
  // ---------------------------
  if (body?.dataset?.page === 'extras') {
    (async () => {
      try {
        setLoaderProgress(55);
        const siteConfig = await fetchSiteConfig();
        renderSocialLinks(siteConfig);
        setLoaderProgress(75);
        await initExtrasPage(siteConfig);
      } catch (err) {
        console.error(err);
      } finally {
        finishLoading();
      }
    })();
  }

})();
