function loadSection(file) {
  fetch(file)
    .then(response => response.text())
    .then(html => {
      document.getElementById('content').innerHTML = html;
    });
}

function playClick() {
  document.getElementById('click-sound').play();
}

function toggleTheme() {
  document.body.classList.toggle('light');
}
