/**
 * Shawnee Forest Rental Cabins - Main JavaScript
 */
(function () {
  'use strict';

  // ===== Mobile Navigation =====
  const mobileToggle = document.getElementById('mobile-toggle');
  const navLinks = document.getElementById('nav-links');
  const navClose = document.getElementById('nav-close');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', function () {
      navLinks.classList.toggle('open');
    });
  }

  if (navClose && navLinks) {
    navClose.addEventListener('click', function () {
      navLinks.classList.remove('open');
    });
  }

  // Close mobile nav when clicking a link
  if (navLinks) {
    navLinks.querySelectorAll('.nav-link').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
      });
    });
  }

  // ===== Header Scroll Behavior =====
  const header = document.getElementById('site-header');

  if (header) {
    function handleScroll() {
      if (window.scrollY > 80) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  // ===== Testimonial Slider =====
  const sliderDots = document.querySelectorAll('.slider-dot');
  const testimonials = document.querySelectorAll('.testimonial');

  if (sliderDots.length > 0 && testimonials.length > 0) {
    let currentSlide = 0;
    let autoSlideInterval;

    function showSlide(index) {
      testimonials.forEach(function (t) {
        t.classList.remove('active');
      });
      sliderDots.forEach(function (d) {
        d.classList.remove('active');
      });
      testimonials[index].classList.add('active');
      sliderDots[index].classList.add('active');
      currentSlide = index;
    }

    sliderDots.forEach(function (dot) {
      dot.addEventListener('click', function () {
        var index = parseInt(this.getAttribute('data-index'));
        showSlide(index);
        clearInterval(autoSlideInterval);
        startAutoSlide();
      });
    });

    function startAutoSlide() {
      autoSlideInterval = setInterval(function () {
        var next = (currentSlide + 1) % testimonials.length;
        showSlide(next);
      }, 5000);
    }

    startAutoSlide();
  }

  // ===== FAQ Accordion =====
  const faqQuestions = document.querySelectorAll('.faq-question');

  faqQuestions.forEach(function (question) {
    question.addEventListener('click', function () {
      var item = this.parentElement;
      var isOpen = item.classList.contains('open');

      // Close all FAQ items
      document.querySelectorAll('.faq-item').forEach(function (faq) {
        faq.classList.remove('open');
        faq.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });

      // Open clicked item if it wasn't already open
      if (!isOpen) {
        item.classList.add('open');
        this.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // ===== Scroll Animation (Intersection Observer) =====
  var animateElements = document.querySelectorAll('.animate-in');

  if ('IntersectionObserver' in window && animateElements.length > 0) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    animateElements.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback: show all elements immediately
    animateElements.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  // ===== Contact Form Handler =====
  var contactForm = document.getElementById('contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = this.querySelector('button[type="submit"]');
      btn.textContent = 'Sending...';
      btn.disabled = true;

      // Simulate form submission (replace with actual form handler)
      setTimeout(function () {
        btn.textContent = 'Message Sent!';
        btn.style.background = '#2d5016';
        contactForm.reset();
        setTimeout(function () {
          btn.textContent = 'Send Message';
          btn.style.background = '';
          btn.disabled = false;
        }, 3000);
      }, 1000);
    });
  }

  // ===== Set minimum dates on date inputs =====
  var dateInputs = document.querySelectorAll('input[type="date"]');
  if (dateInputs.length > 0) {
    var today = new Date().toISOString().split('T')[0];
    dateInputs.forEach(function (input) {
      input.setAttribute('min', today);
    });
  }

  // ===== Booking Form Handler =====
  var bookingForms = document.querySelectorAll('.booking-form');

  bookingForms.forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = this.querySelector('button[type="submit"]');
      btn.textContent = 'Processing...';
      btn.disabled = true;

      setTimeout(function () {
        alert('Thank you for your reservation request! We will confirm your booking within 24 hours. For immediate assistance, please call (618) 555-1234.');
        btn.textContent = 'Reserve Now';
        btn.disabled = false;
      }, 1500);
    });
  });
})();
