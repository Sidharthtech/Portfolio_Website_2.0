/* ============================================================
   script.js — Portfolio interactions
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
    initTypingEffect();
    initScrollReveal();
    initNavbar();
    initHamburger();
    initSmoothScroll();
    initContactForm();
});

/* ------------------------------------------------------------
   TYPING EFFECT
   ------------------------------------------------------------ */
function initTypingEffect() {
    const el = document.getElementById('typed-text');
    if (!el) return;

    const phrases = [
        'Frontend Developer',
        'Cybersecurity Enthusiast',
        'Python Developer',
        'AI & ML Explorer',
        'Creative Problem Solver'
    ];

    let phraseIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    const typeSpeed = 80;
    const deleteSpeed = 40;
    const pauseEnd = 2000;
    const pauseStart = 500;

    function tick() {
        const current = phrases[phraseIdx];

        if (!isDeleting) {
            el.textContent = current.substring(0, charIdx + 1);
            charIdx++;

            if (charIdx === current.length) {
                isDeleting = true;
                setTimeout(tick, pauseEnd);
                return;
            }
            setTimeout(tick, typeSpeed);
        } else {
            el.textContent = current.substring(0, charIdx - 1);
            charIdx--;

            if (charIdx === 0) {
                isDeleting = false;
                phraseIdx = (phraseIdx + 1) % phrases.length;
                setTimeout(tick, pauseStart);
                return;
            }
            setTimeout(tick, deleteSpeed);
        }
    }

    setTimeout(tick, 1000);
}

/* ------------------------------------------------------------
   SCROLL REVEAL (Intersection Observer)
   ------------------------------------------------------------ */
function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    reveals.forEach((el) => observer.observe(el));
}

/* ------------------------------------------------------------
   NAVBAR — scroll style + active section highlighting
   ------------------------------------------------------------ */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function onScroll() {
        const scrollY = window.scrollY;

        // Scrolled style
        if (scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active link
        let current = '';
        sections.forEach((section) => {
            const top = section.offsetTop - 120;
            if (scrollY >= top) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
}

/* ------------------------------------------------------------
   HAMBURGER MENU
   ------------------------------------------------------------ */
function initHamburger() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    if (!hamburger || !navLinks) return;

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('open');
        document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll('.nav-link').forEach((link) => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('open');
            document.body.style.overflow = '';
        });
    });
}

/* ------------------------------------------------------------
   SMOOTH SCROLL
   ------------------------------------------------------------ */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

/* ------------------------------------------------------------
   CONTACT FORM — Gmail compose (desktop) / mailto (mobile)
   ------------------------------------------------------------ */
function initContactForm() {
    const form = document.getElementById('contactForm');
    const status = document.getElementById('formStatus');
    const submitBtn = document.getElementById('submitBtn');

    if (!form) return;

    function isMobile() {
        return /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent)
            || (window.innerWidth <= 768 && 'ontouchstart' in window);
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = form.querySelector('#name').value.trim();
        const email = form.querySelector('#email').value.trim();
        const message = form.querySelector('#message').value.trim();

        if (!name || !email || !message) {
            status.textContent = 'Please fill in all fields.';
            status.className = 'form-status error';
            return;
        }

        const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
        const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);

        if (isMobile()) {
            // Mobile: open Gmail app via mailto
            window.location.href = `mailto:sidharthhl.mec@gmail.com?subject=${subject}&body=${body}`;
        } else {
            // Desktop: open Gmail compose in a new tab
            const gmailUrl = `https://mail.google.com/mail/?view=cm&to=sidharthhl.mec@gmail.com&su=${subject}&body=${body}`;
            window.open(gmailUrl, '_blank');
        }

        status.textContent = '✓ Opening Gmail...';
        status.className = 'form-status success';
        form.reset();
    });
}
