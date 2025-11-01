document.addEventListener('DOMContentLoaded', function(){
  document.getElementById('year').textContent = new Date().getFullYear();
  // Simple active link on scroll
  const sections = Array.from(document.querySelectorAll('.section[id]'));
  const navLinks = Array.from(document.querySelectorAll('.nav a'));
  function onScroll(){
    const y = window.scrollY + 120;
    let current = sections[0].id;
    for(const sec of sections){
      if(sec.offsetTop <= y) current = sec.id;
    }
    navLinks.forEach(a=>{
      a.style.opacity = (a.getAttribute('href') === '#'+current) ? '1' : '0.55';
      a.setAttribute('aria-current', (a.getAttribute('href') === '#'+current) ? 'true' : 'false');
    });
  }
  window.addEventListener('scroll', onScroll, {passive:true});
  onScroll();
  // ensure hash links don't add history entries repeatedly
  document.querySelectorAll('.nav a').forEach(a=>{
    a.addEventListener('click', function(e){
      e.preventDefault();
      const id = this.getAttribute('href').slice(1);
      const el = document.getElementById(id);
      if(el) el.scrollIntoView({behavior:'smooth', block:'start'});
      history.replaceState(null, '', '#'+id);
    });
  });
});