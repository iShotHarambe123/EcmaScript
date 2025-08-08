
// Visa år
document.getElementById('year').textContent = new Date().getFullYear();

// Accordion List
document.querySelectorAll('.item-header').forEach(btn => {
  btn.addEventListener('click', () => {
    const body = btn.nextElementSibling;
    body.style.display = body.style.display === 'block' ? 'none' : 'block';
  });
});

// Mobilmeny
const menuBtn = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
menuBtn.addEventListener('click', () => {
  nav.classList.toggle('show');
});
