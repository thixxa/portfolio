
// Makes nav links scroll smoothly to each section
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
    // Close mobile menu if open
    document.querySelector('.nav-links').classList.remove('open');
  });
});


// Navbar gets slightly smaller after scrolling down
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});


// ---------- MOBILE HAMBURGER MENU ----------
const navToggle = document.getElementById('navToggle');
const navLinks  = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});


// Elements with class "fade-in" animate in when they enter the viewport.
// Add class="fade-in" to any element in your HTML to animate it.
const fadeEls = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target); // animate only once
    }
  });
}, { threshold: 0.15 });

fadeEls.forEach(el => observer.observe(el));


// Highlights the nav link for the section currently in view
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navItems.forEach(item => item.style.color = '');
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) active.style.color = 'var(--accent)';
    }
  });
}, { threshold: 0.4 });

sections.forEach(sec => sectionObserver.observe(sec));


// Cycles through job titles in the hero role line
// CHANGE: Add or remove titles from the array below
const titles = [
  '$ Building reliable infrastructure at scale',
  '$ Automating everything, shipping faster',
  '$ Keeping systems resilient 24/7',
  '$ Cloud architect & pipeline builder',
];

const roleEl = document.querySelector('.hero-role');
if (roleEl) {
  let titleIndex = 0;
  let charIndex  = 0;
  let isDeleting = false;
  let currentText = '';

  function type() {
    const full = titles[titleIndex];

    if (isDeleting) {
      currentText = full.substring(0, charIndex - 1);
      charIndex--;
    } else {
      currentText = full.substring(0, charIndex + 1);
      charIndex++;
    }

    roleEl.textContent = currentText;

    let speed = isDeleting ? 40 : 70;

    if (!isDeleting && charIndex === full.length) {
      speed = 2000; // pause at end
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting  = false;
      titleIndex  = (titleIndex + 1) % titles.length;
      speed = 400;
    }

    setTimeout(type, speed);
  }

  type();
}