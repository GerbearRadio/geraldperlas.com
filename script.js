
function loadSection(file) {
  playClickSound();
  fetch('sections/' + file)
    .then(res => res.text())
    .then(html => {
      document.getElementById("content").innerHTML = html;
    })
    .catch(() => {
      document.getElementById("content").innerHTML = "<p>Error loading section.</p>";
    });
}
function playClickSound() {
  const audio = document.getElementById("click-sound");
  if (audio) audio.play();
}
function toggleTheme() {
  document.body.classList.toggle("light-mode");
  localStorage.setItem("theme", document.body.classList.contains("light-mode") ? "light" : "dark");
}
window.onload = function () {
  if (localStorage.getItem("theme") === "light") {
    document.body.classList.add("light-mode");
  }
  setTimeout(() => {
    document.getElementById("intro-modal").style.display = "none";
    document.querySelector(".menu").style.display = "block";
    document.getElementById("content").style.display = "block";
  }, 4000);
  document.getElementById("loader").style.display = "none";
};
