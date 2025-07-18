// File: js/script.js

// Initialize AOS with enhanced settings
AOS.init({
  duration: 1000,
  once: true,
  offset: 100,
  easing: 'ease-out-cubic'
});

// Loading Screen
document.addEventListener('DOMContentLoaded', function() {
  const loading = document.querySelector('.loading');
  if (loading) {
    setTimeout(() => {
      loading.classList.add('hidden');
      setTimeout(() => {
        loading.style.display = 'none';
      }, 500);
    }, 1500);
  }
});

// Navbar Scroll Effect
window.addEventListener('scroll', function() {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 100) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Parallax Effect for Hero Section
window.addEventListener('scroll', function() {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector('.hero');
  if (hero) {
    const rate = scrolled * -0.5;
    hero.style.transform = `translateY(${rate}px)`;
  }
});

// Animated Counter for Statistics
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);
  
  function updateCounter() {
    start += increment;
    if (start < target) {
      element.textContent = Math.floor(start);
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target;
    }
  }
  
  updateCounter();
}

// Intersection Observer for Counter Animation
const observerOptions = {
  threshold: 0.5,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const counter = entry.target;
      const target = parseInt(counter.getAttribute('data-target'));
      animateCounter(counter, target);
      observer.unobserve(counter);
    }
  });
}, observerOptions);

// Observe all counter elements
document.querySelectorAll('[data-target]').forEach(counter => {
  observer.observe(counter);
});

// Typing Animation for Hero Text
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = '';
  
  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  
  type();
}

// Initialize typing animation for hero title
const heroTitle = document.querySelector('.hero h1');
if (heroTitle) {
  const originalText = heroTitle.textContent;
  typeWriter(heroTitle, originalText, 80);
}

// Floating Animation for Cards
function addFloatingEffect() {
  const cards = document.querySelectorAll('.card, .feature-box');
  cards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
    card.classList.add('floating');
  });
}

// Add floating animation class
const floatingStyle = document.createElement('style');
floatingStyle.textContent = `
  .floating {
    animation: float 3s ease-in-out infinite;
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }
`;
document.head.appendChild(floatingStyle);

// Initialize floating effect
addFloatingEffect();

// Interactive Form Validation
const forms = document.querySelectorAll('form');
forms.forEach(form => {
  const inputs = form.querySelectorAll('input, textarea, select');
  
  inputs.forEach(input => {
    input.addEventListener('focus', function() {
      this.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
      if (!this.value) {
        this.parentElement.classList.remove('focused');
      }
    });
    
    input.addEventListener('input', function() {
      if (this.value) {
        this.classList.add('has-value');
      } else {
        this.classList.remove('has-value');
      }
    });
  });
});

// Particle Background Effect
function createParticles() {
  const particleContainer = document.createElement('div');
  particleContainer.className = 'particle-container';
  particleContainer.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 1;
  `;
  
  document.body.appendChild(particleContainer);
  
  for (let i = 0; i < 50; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.cssText = `
      position: absolute;
      width: 4px;
      height: 4px;
      background: rgba(212, 160, 23, 0.6);
      border-radius: 50%;
      animation: particleFloat ${Math.random() * 10 + 10}s linear infinite;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
    `;
    particleContainer.appendChild(particle);
  }
}

// Add particle animation styles
const particleStyle = document.createElement('style');
particleStyle.textContent = `
  @keyframes particleFloat {
    0% {
      transform: translateY(100vh) rotate(0deg);
      opacity: 0;
    }
    10% {
      opacity: 1;
    }
    90% {
      opacity: 1;
    }
    100% {
      transform: translateY(-100px) rotate(360deg);
      opacity: 0;
    }
  }
`;
document.head.appendChild(particleStyle);

// Initialize particles
createParticles();

// Enhanced Button Hover Effects
document.querySelectorAll('.btn').forEach(button => {
  button.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-3px) scale(1.05)';
  });
  
  button.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0) scale(1)';
  });
});

// Image Lazy Loading with Fade Effect
const images = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      img.classList.add('fade-in');
      observer.unobserve(img);
    }
  });
});

images.forEach(img => imageObserver.observe(img));

// Add fade-in animation for images
const imageFadeStyle = document.createElement('style');
imageFadeStyle.textContent = `
  .fade-in {
    animation: fadeIn 0.8s ease-in;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; transform: scale(0.9); }
    to { opacity: 1; transform: scale(1); }
  }
`;
document.head.appendChild(imageFadeStyle);

// Scroll Progress Indicator
function createScrollProgress() {
  const progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress';
  progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 3px;
    background: linear-gradient(90deg, var(--secondary), var(--primary));
    z-index: 9999;
    transition: width 0.1s ease;
  `;
  document.body.appendChild(progressBar);
  
  window.addEventListener('scroll', () => {
    const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    progressBar.style.width = scrolled + '%';
  });
}

// Initialize scroll progress
createScrollProgress();

// Enhanced Carousel Controls
document.querySelectorAll('.carousel').forEach(carousel => {
  const prevBtn = carousel.querySelector('.carousel-control-prev');
  const nextBtn = carousel.querySelector('.carousel-control-next');
  
  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-50%) scale(1.1)';
    });
    
    prevBtn.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(-50%) scale(1)';
    });
    
    nextBtn.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-50%) scale(1.1)';
    });
    
    nextBtn.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(-50%) scale(1)';
    });
  }
});

// Text Reveal Animation
function revealText() {
  const textElements = document.querySelectorAll('.reveal-text');
  const textObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  });
  
  textElements.forEach(element => {
    textObserver.observe(element);
  });
}

// Add text reveal styles
const textRevealStyle = document.createElement('style');
textRevealStyle.textContent = `
  .reveal-text {
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.8s ease;
  }
  
  .reveal-text.revealed {
    opacity: 1;
    transform: translateY(0);
  }
`;
document.head.appendChild(textRevealStyle);

// Initialize text reveal
revealText();

// Enhanced Mobile Menu
const navbarToggler = document.querySelector('.navbar-toggler');
const navbarCollapse = document.querySelector('.navbar-collapse');

if (navbarToggler && navbarCollapse) {
  navbarToggler.addEventListener('click', function() {
    navbarCollapse.classList.toggle('show');
    this.classList.toggle('active');
  });
  
  // Close mobile menu when clicking on a link
  document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navbarCollapse.classList.remove('show');
      navbarToggler.classList.remove('active');
    });
  });
}

// Add mobile menu animation styles
const mobileMenuStyle = document.createElement('style');
mobileMenuStyle.textContent = `
  .navbar-collapse {
    transition: all 0.3s ease;
  }
  
  .navbar-toggler.active .navbar-toggler-icon {
    transform: rotate(45deg);
  }
  
  .navbar-toggler-icon {
    transition: transform 0.3s ease;
  }
`;
document.head.appendChild(mobileMenuStyle);

// Performance Optimization: Throttle scroll events
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(function() {
  // Scroll-based animations here
}, 16));

console.log('Enhanced animations and interactions loaded successfully!');
