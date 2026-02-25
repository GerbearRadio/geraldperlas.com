// Minimal portfolio script (GitHub Pages-friendly JSON + reusable project template)
(() => {
  const body = document.body;
  const siteLoader = document.getElementById('siteLoader');
  const loaderBar = document.getElementById('loaderBar');
  const pageTransition = document.getElementById('pageTransition');
  const THEME_KEY = 'portfolio-theme';
  const PROJECTS_PATH = './data/projects.json';

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
    return typeof url === 'string' && /youtube\.com\/embed|player\.vimeo\.com/i.test(url);
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

  // ---------------------------
  // Home page (JSON cards + tag chips + search)
  // ---------------------------
  const projectGrid = document.getElementById('projectGrid');
  const searchInput = document.getElementById('searchInput');
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
        setLoaderProgress(55);
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
})();
