
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('mouseenter', () => {
    link.classList.add('they-live');
  });
  link.addEventListener('mouseleave', () => {
    link.classList.remove('they-live');
  });
});
