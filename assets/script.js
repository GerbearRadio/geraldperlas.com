document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('year').textContent = new Date().getFullYear();
  const filters = document.querySelectorAll('.filter');
  const cards = document.querySelectorAll('.card');

  filters.forEach(btn => {
    btn.addEventListener('click', () => {
      filters.forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.dataset.filter;
      cards.forEach(c=>{
        const t = c.dataset.type || '';
        if(f === 'all' || t.includes(f)){
          c.style.display = '';
        } else {
          c.style.display = 'none';
        }
      });
    });
  });
});

function submitContact(e){
  e.preventDefault();
  alert('This demo site does not send messages. Replace form handler with Formspree, Netlify Forms, or your backend.');
}
