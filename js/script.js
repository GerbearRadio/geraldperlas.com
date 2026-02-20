// ==============================
// Analog Archive interactions
// - Filtering
// - Randomized timecodes
// - VHS flicker transitions
// - Lightbox modal for images/videos
// ==============================

const body = document.body;

// Flicker helper
function flickerOnce(){
  body.classList.remove("flicker-on");
  // force reflow
  void body.offsetWidth;
  body.classList.add("flicker-on");
  setTimeout(()=> body.classList.remove("flicker-on"), 320);
}

// --------- Random timecode generator
function pad(n){ return String(n).padStart(2,"0"); }
function randomTimecode(){
  // 0–59 minutes, 0–59 seconds, 0–29 frames (NTSC-ish vibe)
  const mm = Math.floor(Math.random()*60);
  const ss = Math.floor(Math.random()*60);
  const ff = Math.floor(Math.random()*30);
  return `00:${pad(mm)}:${pad(ss)}:${pad(ff)}`.replace(/^00:/, ""); // mm:ss:ff-ish
}
function randomHHMMSS(){
  const hh = Math.floor(Math.random()*2); // 0–1 hours
  const mm = Math.floor(Math.random()*60);
  const ss = Math.floor(Math.random()*60);
  return `${pad(hh)}:${pad(mm)}:${pad(ss)}`;
}

// Apply timecodes to cards on load
document.querySelectorAll(".card .tc").forEach(tc => {
  tc.textContent = randomHHMMSS();
});

// --------- Filtering
const buttons = document.querySelectorAll(".filters button");
const cards = document.querySelectorAll(".card");

buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    const active = document.querySelector(".filters .active");
    if (active) active.classList.remove("active");
    btn.classList.add("active");

    const filter = btn.dataset.filter;
    flickerOnce();

    cards.forEach(card => {
      const cat = card.dataset.category;
      const show = (filter === "all" || cat === filter);
      card.style.display = show ? "block" : "none";
    });
  });
});

// --------- Modal (lightbox)
const modal = document.getElementById("modal");
const modalBody = document.getElementById("modalBody");
const modalTitle = document.getElementById("modalTitle");
const modalClose = document.getElementById("modalClose");
const modalMode = document.getElementById("modalMode");
const modalTC = document.getElementById("modalTC");

function openModal({type, src, title, mode}){
  modal.setAttribute("aria-hidden", "false");
  modalTitle.textContent = title || "UNTITLED";
  modalMode.textContent = mode || "PLAY ▷";
  modalTC.textContent = randomHHMMSS();
  modalBody.innerHTML = "";

  if (type === "video"){
    const iframe = document.createElement("iframe");
    iframe.src = src;
    iframe.title = title || "Video";
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
    iframe.allowFullscreen = true;
    modalBody.appendChild(iframe);
  } else {
    const img = document.createElement("img");
    img.src = src;
    img.alt = title || "";
    modalBody.appendChild(img);
  }

  flickerOnce();
}

function closeModal(){
  modal.setAttribute("aria-hidden", "true");
  // stop video playback by clearing
  modalBody.innerHTML = "";
  flickerOnce();
}

document.querySelectorAll(".card .media").forEach(media => {
  media.addEventListener("click", (e) => {
    const card = media.closest(".card");
    const type = card.dataset.type;
    const src = card.dataset.src;
    const title = card.dataset.title || card.querySelector("h2")?.textContent || "UNTITLED";
    const mode = (type === "video") ? "REC ●" : "PLAY ▷";
    openModal({type, src, title, mode});
  });
});

modalClose.addEventListener("click", closeModal);

modal.addEventListener("click", (e) => {
  const close = e.target?.dataset?.close;
  if (close) closeModal();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.getAttribute("aria-hidden") === "false"){
    closeModal();
  }
});
