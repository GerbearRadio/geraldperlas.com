
// THEME TOGGLE
const toggleBtn = document.getElementById("themeToggle");
const htmlEl = document.documentElement;

toggleBtn.addEventListener("click", () => {
  const currentTheme = htmlEl.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  htmlEl.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
});

// Load saved theme
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  htmlEl.setAttribute("data-theme", savedTheme);
}

// FILTERING
const buttons = document.querySelectorAll(".filter-buttons button");
const entries = document.querySelectorAll(".entry");

buttons.forEach(button => {
  button.addEventListener("click", () => {
    document.querySelector(".filter-buttons .active").classList.remove("active");
    button.classList.add("active");

    const filter = button.getAttribute("data-filter");

    entries.forEach(entry => {
      const category = entry.getAttribute("data-category");

      if (filter === "all" || category === filter) {
        entry.style.display = "grid";
        entry.style.opacity = "1";
        entry.style.transform = "translateY(0)";
      } else {
        entry.style.display = "none";
      }
    });
  });
});
