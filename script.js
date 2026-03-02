document.addEventListener('DOMContentLoaded', () => {
    // 1. Header Scroll Effect & Active Nav State
    const header = document.getElementById('header');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        // Header background
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Active Nav State
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // 2. Mobile Navigation Toggle
    const mobileToggle = document.getElementById('mobile-toggle');
    const navList = document.querySelector('.nav-list');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navList.classList.toggle('active');
            const icon = mobileToggle.querySelector('i');
            if (navList.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
                icon.style.color = '#2a2a2a';
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                icon.style.color = window.scrollY > 50 ? '#2a2a2a' : '#ffffff';
            }
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navList.classList.contains('active')) {
                navList.classList.remove('active');
                const icon = mobileToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

    // 3. Hero Slider Functionality
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    let currentSlideIndex = 0;
    const slideInterval = 5000;
    let slideTimer;

    function initSlider() {
        if (slides.length > 0) {
            startSlideShow();
        }
    }

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        slides[index].classList.add('active');
        if (dots[index]) dots[index].classList.add('active');
    }

    function nextSlide() {
        currentSlideIndex = (currentSlideIndex + 1) % slides.length;
        showSlide(currentSlideIndex);
    }

    function startSlideShow() {
        slideTimer = setInterval(nextSlide, slideInterval);
    }

    function stopSlideShow() {
        clearInterval(slideTimer);
    }

    window.currentSlide = function (index) {
        stopSlideShow();
        currentSlideIndex = index;
        showSlide(currentSlideIndex);
        startSlideShow();
    };

    initSlider();

    // 4. Scroll Reveal Animations (Intersection Observer)
    const fadeElements = document.querySelectorAll('.fade-up');

    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.style.animationPlayState = 'running';
                // Remove the class so it doesn't trigger again, or just let it stay animated
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);

    // Initial pause for fade-up animations until scrolled into view
    fadeElements.forEach(el => {
        el.style.animationPlayState = 'paused';
        // For hero elements, play immediately
        if (el.closest('.hero')) {
            el.style.animationPlayState = 'running';
        } else {
            appearOnScroll.observe(el);
        }
    });

    // 5. Contact Form Mockup Submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const btn = this.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            const statusDiv = document.getElementById('formStatus');

            // Loading state
            btn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Sending...';
            btn.disabled = true;

            // Simulate API call
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.disabled = false;

                statusDiv.innerHTML = '<span style="color: #2ecc71;"><i class="fas fa-check-circle"></i> Thank you! Your message has been sent successfully. We will contact you soon.</span>';

                // Reset form
                this.reset();

                // Clear message after 5 seconds
                setTimeout(() => {
                    statusDiv.innerHTML = '';
                }, 5000);
            }, 1500);
        });
    }
});
