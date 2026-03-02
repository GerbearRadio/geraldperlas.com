// ==============================
// Analog Archive interactions (JSON-driven, GitHub Pages friendly)
// ==============================
const body = document.body;
const siteLoader = document.getElementById('siteLoader');
const loaderBar = document.getElementById('loaderBar');
const pageTransition = document.getElementById('pageTransition');

body.classList.add('is-loading');
let loadingFinished = false;
function finishLoading(){
  if (loadingFinished) return;
  loadingFinished = true;
  if (loaderBar) loaderBar.style.width = '100%';
  setTimeout(() => {
    if (siteLoader) siteLoader.setAttribute('aria-hidden', 'true');
    body.classList.remove('is-loading');
    body.classList.add('is-ready');
  }, 220);
}
(function runLoader(){
  let progress = 0;
  const tick = setInterval(() => {
    progress += Math.floor(Math.random()*18)+8;
    if (loaderBar) loaderBar.style.width = `${Math.min(progress,92)}%`;
  }, 70);
  window.addEventListener('load', () => { clearInterval(tick); finishLoading(); });
  setTimeout(() => { clearInterval(tick); finishLoading(); }, 1000);
})();

function flickerOnce(){
  body.classList.remove('flicker-on');
  void body.offsetWidth;
  body.classList.add('flicker-on');
  setTimeout(()=> body.classList.remove('flicker-on'), 320);
}
function pulseTransition(fn){
  if (!pageTransition){ fn && fn(); return; }
  pageTransition.classList.add('is-active');
  setTimeout(() => { fn && fn(); }, 110);
  setTimeout(() => pageTransition.classList.remove('is-active'), 240);
}
function pad(n){ return String(n).padStart(2,'0'); }
function randomHHMMSS(){
  return `${pad(Math.floor(Math.random()*2))}:${pad(Math.floor(Math.random()*60))}:${pad(Math.floor(Math.random()*60))}`;
}
function escapeHtml(str=''){
  return String(str)
    .replaceAll('&','&amp;')
    .replaceAll('<','&lt;')
    .replaceAll('>','&gt;')
    .replaceAll('"','&quot;')
    .replaceAll("'",'&#39;');
}

// Toast
const toastEl = document.getElementById('toast');
let toastTimer = null;
function showToast(msg, ms=1400){
  if (!toastEl) return;
  toastEl.textContent = msg || '';
  toastEl.classList.add('is-show');
  toastEl.setAttribute('aria-hidden','false');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toastEl.classList.remove('is-show');
    toastEl.setAttribute('aria-hidden','true');
  }, ms);
}


// Theme toggle (persisted)
const themeToggle = document.getElementById('themeToggle');
const rootEl = document.documentElement;
const savedTheme = localStorage.getItem('portfolio-theme');
if (savedTheme === 'light' || savedTheme === 'dark') rootEl.setAttribute('data-theme', savedTheme);
function syncThemeLabel(){
  if (!themeToggle) return;
  const t = rootEl.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
  themeToggle.textContent = t === 'light' ? 'DARK' : 'LIGHT';
}
syncThemeLabel();
themeToggle?.addEventListener('click', () => {
  const next = rootEl.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
  rootEl.setAttribute('data-theme', next);
  localStorage.setItem('portfolio-theme', next);
  syncThemeLabel();
  flickerOnce();
});

// Modal viewer
const modal = document.getElementById('modal');
const modalBody = document.getElementById('modalBody');
const modalTitle = document.getElementById('modalTitle');
const modalClose = document.getElementById('modalClose');
const modalMode = document.getElementById('modalMode');
const modalTC = document.getElementById('modalTC');
function openModal({type, src, title, mode}){
  if (!modal || !modalBody) return;
  modal.setAttribute('aria-hidden', 'false');
  if (modalTitle) modalTitle.textContent = title || 'UNTITLED';
  if (modalMode) modalMode.textContent = mode || 'PLAY ▷';
  if (modalTC) modalTC.textContent = randomHHMMSS();
  modalBody.innerHTML = '';
  if (type === 'video'){
    const iframe = document.createElement('iframe');
    iframe.src = src;
    iframe.title = title || 'Video';
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    iframe.allowFullscreen = true;
    modalBody.appendChild(iframe);
  } else {
    const img = document.createElement('img');
    img.src = src;
    img.alt = title || '';
    modalBody.appendChild(img);
  }
  flickerOnce();
}
function closeModal(){
  if (!modal || !modalBody) return;
  modal.setAttribute('aria-hidden', 'true');
  modalBody.innerHTML = '';
  flickerOnce();
}
modalClose?.addEventListener('click', closeModal);
modal?.addEventListener('click', (e) => { if (e.target?.dataset?.close) closeModal(); });

// Quick detail panel
const detailPanel = document.getElementById('detailPanel');
const detailClose = document.getElementById('detailClose');
const detailMedia = document.getElementById('detailMedia');
const detailTitle = document.getElementById('detailTitle');
const detailMeta = document.getElementById('detailMeta');
const detailDesc = document.getElementById('detailDesc');
const detailLink = document.getElementById('detailPageLink');
function openDetail(card){
  if (!detailPanel || !card) return;
  const title = card.dataset.title || card.querySelector('h2')?.textContent || 'UNTITLED';
  const cat = (card.dataset.category || 'project').toUpperCase();
  const year = card.dataset.year || '2026';
  const role = card.dataset.role || 'Creative';
  const desc = card.dataset.description || 'Replace this sample text with your project summary.';
  const imgSrc = card.querySelector('img')?.getAttribute('src') || card.dataset.src;
  detailTitle && (detailTitle.textContent = title);
  detailMeta && (detailMeta.textContent = `${cat} · ${year} · ${role}`);
  detailDesc && (detailDesc.textContent = desc);
  if (detailLink) detailLink.href = card.dataset.detail || '#';
  if (detailMedia) detailMedia.innerHTML = imgSrc ? `<img src="${escapeHtml(imgSrc)}" alt="${escapeHtml(title)}" />` : '';
  detailPanel.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}
function closeDetail(){
  if (!detailPanel) return;
  detailPanel.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}
detailPanel?.addEventListener('click', (e) => { if (e.target?.dataset?.detailClose) closeDetail(); });
detailClose?.addEventListener('click', closeDetail);

document.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return;
  if (modal?.getAttribute('aria-hidden') === 'false') closeModal();
  if (detailPanel?.getAttribute('aria-hidden') === 'false') closeDetail();
});

// Smooth page transitions between index/detail pages
function navWithTransition(url){ if (url) pulseTransition(() => { window.location.href = url; }); }
document.querySelectorAll('a[href$=".html"]').forEach(link => {
  link.addEventListener('click', (e) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || link.target === '_blank') return;
    e.preventDefault();
    navWithTransition(link.getAttribute('href'));
  });
});

// JSON-driven homepage
const projectGrid = document.getElementById('projectGrid');
const sortSelect = document.getElementById('sortSelect');
const tagChipsEl = document.getElementById('tagChips');
const projectSearch = document.getElementById('projectSearch');
const emptyState = document.getElementById('emptyState');
const filterButtons = Array.from(document.querySelectorAll('.filters button'));
let currentCategory = 'all';
let activeTag = 'all';
let activeSort = 'manual';
let searchTerm = '';
let renderedCards = [];

function cardTemplate(p){
  const modeLabel = p.type === 'video' ? 'REC ●' : 'PLAY ▷';
  const hudClass = p.type === 'video' ? 'hud rec' : 'hud';
  const meta = p.meta || `${p.category || 'Project'} / ${p.subcategory || 'Work'}`;
  return `
  <article class="card" data-id="${escapeHtml(p.id||'')}" data-category="${escapeHtml(p.category||'misc')}" data-featured="${p.featured ? 'true' : 'false'}" data-type="${escapeHtml(p.type||'image')}"
    data-src="${escapeHtml(p.viewerSrc||p.thumb||'')}" data-title="${escapeHtml(p.title||'Untitled')}"
    data-year="${escapeHtml(p.year||'')}" data-role="${escapeHtml(p.role||'')}" data-detail="${escapeHtml(p.detailPage||'#')}"
    data-description="${escapeHtml(p.description||'')}" data-tags="${escapeHtml((p.tags||[]).join(','))}">
    <div class="media">
      <img src="${escapeHtml(p.thumb||'')}" alt="${escapeHtml((p.title||'Project') + ' thumbnail')}" loading="lazy" />
      <div class="${hudClass}"><span class="label">${modeLabel}</span><span class="tc">${randomHHMMSS()}</span></div>
    </div>
    <h2><a href="${escapeHtml(p.detailPage||'#')}">${escapeHtml(p.title||'Untitled')}</a></h2>
    <p class="meta">${escapeHtml(meta)}</p>
  </article>`;
}

function buildTagChips(projects){
  if (!tagChipsEl) return;
  const tags = Array.from(new Set(projects.flatMap(p => Array.isArray(p.tags) ? p.tags : []))).filter(Boolean).sort((a,b)=>a.localeCompare(b));
  tagChipsEl.innerHTML = '';
  const mk = (tag, label, active=false) => {
    const b = document.createElement('button');
    b.className = `tag-chip${active ? ' is-active' : ''}`;
    b.dataset.tag = tag;
    b.textContent = label;
    return b;
  };
  tagChipsEl.appendChild(mk('all','ALL TAGS',true));
  tags.forEach(tag => tagChipsEl.appendChild(mk(tag.toLowerCase(), tag)));
  if (!tagChipsEl.dataset.bound){
    tagChipsEl.dataset.bound = 'true';
    tagChipsEl.addEventListener('click', (e) => {
      const btn = e.target.closest('.tag-chip');
      if (!btn) return;
      tagChipsEl.querySelectorAll('.tag-chip').forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      activeTag = btn.dataset.tag || 'all';
      flickerOnce();
      pulseTransition(() => applyFilterAndSearch());
    });
  }
}

function bindCardInteractions(){
  renderedCards = Array.from(document.querySelectorAll('.card'));
  renderedCards.forEach((card, idx) => {
    const cat = card.dataset.category || 'misc';
    card.classList.add(`cat-${cat}`);
    if ((idx + 1) % 4 === 0) card.classList.add('is-compact');
    card.querySelector('.media')?.addEventListener('click', () => {
      const type = card.dataset.type;
      const src = card.dataset.src;
      const title = card.dataset.title || card.querySelector('h2')?.textContent || 'UNTITLED';
      openModal({ type, src, title, mode: type === 'video' ? 'REC ●' : 'PLAY ▷' });
    });
    card.addEventListener('click', (e) => {
      if (e.target.closest('.media') || e.target.closest('a')) return;
      openDetail(card);
    });
  });
}

function matchesSearch(card){
  if (!searchTerm) return true;
  const hay = [card.dataset.title, card.dataset.category, card.dataset.role, card.dataset.description, card.dataset.tags].join(' ').toLowerCase();
  return hay.includes(searchTerm);
}
function applyFilterAndSearch(){
  renderedCards.forEach(card => {
    const cat = card.dataset.category || '';
    const tags = (card.dataset.tags || '').toLowerCase().split(',').filter(Boolean);
    const isFeatured = card.dataset.featured === 'true';
    const categoryOk = (currentCategory === 'all' || cat === currentCategory || (currentCategory === 'featured' && isFeatured));
    const show = categoryOk && (activeTag === 'all' || tags.includes(activeTag)) && matchesSearch(card);
    card.classList.toggle('is-hidden', !show);
    if (show){
      card.classList.add('is-enter');
      requestAnimationFrame(() => requestAnimationFrame(() => card.classList.remove('is-enter')));
    }
  });
  emptyState && (emptyState.hidden = renderedCards.some(c => !c.classList.contains('is-hidden')));
}
function bindCategoryFilters(){
  filterButtons.forEach(btn => {
    if (btn.dataset.bound) return;
    btn.dataset.bound = 'true';
    btn.addEventListener('click', () => {
    document.querySelector('.filters .active')?.classList.remove('active');
    btn.classList.add('active');
    currentCategory = btn.dataset.filter || 'all';
    flickerOnce();
    pulseTransition(() => applyFilterAndSearch());
  });
  });
}
function bindSort(){
  if (!sortSelect) return;
  if (sortSelect.dataset.bound) return;
  sortSelect.dataset.bound = 'true';
  sortSelect.addEventListener('change', () => {
    activeSort = sortSelect.value || 'manual';
    pulseTransition(() => loadProjects());
  });
}

function bindSearch(){
  if (!projectSearch) return;
  if (projectSearch.dataset.bound) return;
  projectSearch.dataset.bound = 'true';
  let t;
  projectSearch.addEventListener('input', () => {
    clearTimeout(t);
    t = setTimeout(() => {
      searchTerm = projectSearch.value.trim().toLowerCase();
      applyFilterAndSearch();
    }, 60);
  });
}


async function fetchSiteConfig(){
  try{
    const res = await fetch('./data/site-config.json', { cache: 'no-store' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const cfg = await res.json();
    return (cfg && typeof cfg === 'object') ? cfg : {};
  }catch(e){
    console.warn('site-config.json not loaded', e);
    return {};
  }
}

function applySiteConfig(cfg){
  // Title + logo
  const logo = document.querySelector('.logo');
  if (cfg.siteTitle && logo) logo.textContent = cfg.siteTitle;
  if (cfg.siteTitle) document.title = `${cfg.siteTitle} — Analog Archive`;

  // About
  const aboutSection = document.getElementById('aboutSection');
  const aboutHeading = document.getElementById('aboutHeading');
  const aboutDescription = document.getElementById('aboutDescription');
  const aboutPhoto = document.getElementById('aboutPhoto');
  const aboutActions = document.getElementById('aboutActions');

  if (aboutSection){
    const about = cfg.about || {};
    if (about.enabled === false){
      aboutSection.style.display = 'none';
    } else {
      if (aboutHeading && about.heading) aboutHeading.textContent = about.heading;
      if (aboutDescription && about.description) aboutDescription.textContent = about.description;
      if (aboutPhoto && about.profilePhoto) aboutPhoto.src = about.profilePhoto;
      if (aboutPhoto && about.alt) aboutPhoto.alt = about.alt;

      // Social links + BTS link as tag chips
      if (aboutActions){
        const links = Array.isArray(cfg.socialLinks) ? cfg.socialLinks : [];
        const socialHtml = links
          .filter(l => l && l.label && l.url)
          .map(l => {
            const isEmail = String(l.url).startsWith('mailto:');
            return `<a class="tag-chip" href="${escapeHtml(l.url)}" ${isEmail ? '' : 'target="_blank" rel="noopener"'}>${escapeHtml(l.label)}</a>`;
          }).join('');

        const bts = cfg.bts || {};
        const btsHtml = (bts.enabled !== false && bts.url)
          ? `<a class="tag-chip" href="${escapeHtml(bts.url)}">${escapeHtml(bts.label || 'Behind the Scenes')}</a>`
          : '';

        aboutActions.innerHTML = socialHtml + btsHtml;
      }
    }
  }

  // Contact
  const contactSection = document.getElementById('contactSection');
  if (contactSection){
    const c = cfg.contact || {};
    if (c.enabled === false){
      contactSection.hidden = true;
    } else {
      contactSection.hidden = false;
      const h = document.getElementById('contactHeading');
      const d = document.getElementById('contactDescription');
      if (h && c.heading) h.textContent = c.heading;
      if (d && c.description) d.textContent = c.description;

      const email = c.email || 'you@example.com';
      const emailLabel = (c.emailLabel || 'Email').toUpperCase();
      const emailBtn = document.getElementById('contactEmailBtn');
      if (emailBtn){
        emailBtn.textContent = emailLabel;
        emailBtn.href = `mailto:${email}`;
      }

      // Copy email
      const copyBtn = document.getElementById('copyEmailBtn');
      if (copyBtn){
        copyBtn.style.display = (c.enableCopyEmail === false) ? 'none' : '';
        copyBtn.addEventListener('click', async () => {
          try{
            await navigator.clipboard.writeText(email);
            showToast('Email copied');
          }catch(e){
            window.prompt('Copy this email:', email);
          }
        }, { once: true });
      }

      // Resume
      const resumeBtn = document.getElementById('resumeBtn');
      if (resumeBtn){
        if (c.resumeUrl){
          resumeBtn.href = c.resumeUrl;
          resumeBtn.textContent = (c.resumeLabel || 'Resume').toUpperCase();
          resumeBtn.style.display = '';
        } else {
          resumeBtn.style.display = 'none';
        }
      }

      // BTS link in contact actions
      const btsLink = document.getElementById('btsLink');
      const bts = cfg.bts || {};
      if (btsLink){
        if (bts.enabled === false || !bts.url){
          btsLink.style.display = 'none';
        } else {
          btsLink.style.display = '';
          btsLink.href = bts.url;
          btsLink.textContent = (bts.label || 'Behind the Scenes').toUpperCase();
        }
      }

      // Formspree form
      const wrap = document.getElementById('contactFormWrap');
      const form = document.getElementById('contactForm');
      const status = document.getElementById('formStatus');
      const fh = document.getElementById('contactFormHeading');
      const fd = document.getElementById('contactFormDescription');

      const enableForm = (c.enableForm !== false);
      if (wrap) wrap.style.display = enableForm ? '' : 'none';
      if (fh && c.formHeading) fh.textContent = c.formHeading;
      if (fd && c.formDescription) fd.textContent = c.formDescription;

      if (form && enableForm){
        const endpoint = c.formspreeEndpoint || '';
        if (endpoint) form.setAttribute('action', endpoint);
        form.addEventListener('submit', async (ev) => {
          ev.preventDefault();
          if (!endpoint){
            status && (status.textContent = 'Add Formspree endpoint in site-config.json');
            showToast('Add Formspree endpoint', 1800);
            return;
          }
          status && (status.textContent = 'Sending…');
          try{
            const res = await fetch(endpoint, {
              method: 'POST',
              body: new FormData(form),
              headers: { 'Accept': 'application/json' }
            });
            if (res.ok){
              form.reset();
              const msg = c.successMessage || 'Sent.';
              status && (status.textContent = msg);
              showToast(msg);
            }else{
              const msg = c.errorMessage || 'Error.';
              status && (status.textContent = msg);
              showToast(msg, 1800);
            }
          }catch(e){
            const msg = c.errorMessage || 'Error.';
            status && (status.textContent = msg);
            showToast(msg, 1800);
          }
        });
      }
    }
  }
}

async function loadProjects(){
  if (!projectGrid) return; // detail pages
  try {
    const res = await fetch('./data/projects.json', { cache: 'no-store' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    let projects = await res.json();
    if (!Array.isArray(projects)) throw new Error('projects.json must be an array');
    // Sorting
    const yearNum = (p) => {
      const m = String(p.year||'').match(/\d{4}/);
      const n = parseInt(m ? m[0] : '0', 10);
      return Number.isFinite(n) ? n : 0;
    };
    const manualOrder = (p, idx) => {
      const n = Number(p.sortOrder);
      return Number.isFinite(n) ? n : idx + 9999;
    };
    projects = projects.slice();
    projects.sort((a,b) => {
      switch(activeSort){
        case 'newest': return yearNum(b) - yearNum(a) || manualOrder(a,0) - manualOrder(b,0);
        case 'oldest': return yearNum(a) - yearNum(b) || manualOrder(a,0) - manualOrder(b,0);
        case 'title-az': return String(a.title||'').localeCompare(String(b.title||''));
        case 'title-za': return String(b.title||'').localeCompare(String(a.title||''));
        case 'manual':
        default:
          return manualOrder(a,0) - manualOrder(b,0);
      }
    });

    projectGrid.innerHTML = projects.map(cardTemplate).join('\n');
    buildTagChips(projects);
    bindCardInteractions();
    bindCategoryFilters();
    bindSearch();
    bindSort();
    applyFilterAndSearch();
  } catch (err) {
    console.error('Unable to load data/projects.json', err);
    projectGrid.innerHTML = `
      <article class="card">
        <div class="media" style="padding:20px;cursor:default"><p style="font-size:12px;line-height:1.5;color:var(--muted)">
          Projects could not load. If you're testing locally, use a local server (not file://). GitHub Pages will work normally.
        </p></div>
        <h2>Projects not loaded</h2>
        <p class="meta">Check data/projects.json path</p>
      </article>`;
  }
}


async function sha256Hex(str=''){
  const data = new TextEncoder().encode(String(str));
  const buf = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2,'0')).join('');
}

async function btsGate(cfg){
  if (!document.body.classList.contains('bts-page')) return;
  document.body.classList.add('bts-locked');
  const bts = (cfg && cfg.bts) ? cfg.bts : {};
  if (bts.enabled === false){ document.body.classList.remove('bts-locked'); return; }

  const key = 'bts-unlocked';
  const unlocked = localStorage.getItem(key) === 'true';

  const backBtn = document.getElementById('backHomeBtn');
  backBtn?.addEventListener('click', () => pulseTransition(() => window.location.href = 'index.html'));

  const lockBtn = document.getElementById('lockBtsBtn');
  lockBtn?.addEventListener('click', () => {
    localStorage.removeItem(key);
    showToast('Locked');
    setTimeout(() => window.location.href = 'index.html', 300);
  });

  if (unlocked){ document.body.classList.remove('bts-locked'); return; }

  const hint = bts.hint ? `\nHint: ${bts.hint}` : '';
  const pw = window.prompt('Enter password.' + hint);
  if (!pw){ window.location.href = 'index.html'; return; }

  const salt = String(bts.salt || '');
  const expected = String(bts.passwordHash || '');
  try{
    const hash = await sha256Hex(salt + pw);
    if (hash === expected){
      localStorage.setItem(key, 'true');
      document.body.classList.remove('bts-locked');
      showToast('Access granted');
    }else{
      showToast('Wrong password', 1800);
      window.location.href = 'index.html';
    }
  }catch(e){
    showToast('Unable to verify', 1800);
    window.location.href = 'index.html';
  }
}

(async () => {
  const cfg = await fetchSiteConfig();
  applySiteConfig(cfg);
  await btsGate(cfg);
  if (projectGrid) loadProjects();
})();
