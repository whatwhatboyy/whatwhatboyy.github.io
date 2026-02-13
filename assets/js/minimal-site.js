// ========================================
// MINIMAL SITE JAVASCRIPT - LOW RAM USAGE
// Single file with only essential features
// ========================================

(function() {
    'use strict';

    // ============ MOBILE SIDEBAR TOGGLE ============
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const mobileSidebarBtn = document.getElementById('mobile-sidebar-btn');
    const mainContent = document.getElementById('main-content');

    function toggleSidebar() {
        if (sidebar) {
            sidebar.classList.toggle('active');
        }
    }

    if (mobileSidebarBtn) {
        mobileSidebarBtn.addEventListener('click', toggleSidebar);
    }

    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', toggleSidebar);
    }

    // Close sidebar when clicking outside on mobile
    if (mainContent) {
        mainContent.addEventListener('click', function() {
            if (window.innerWidth <= 1024 && sidebar && sidebar.classList.contains('active')) {
                sidebar.classList.remove('active');
            }
        });
    }

    // ============ SMOOTH SCROLL FOR ANCHOR LINKS ============
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    // Close sidebar on mobile after navigation
                    if (window.innerWidth <= 1024 && sidebar) {
                        sidebar.classList.remove('active');
                    }
                }
            }
        });
    });

    // ============ ACTIVE NAV LINK ON SCROLL ============
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function updateActiveNav() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }

    // Throttle scroll event for performance
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (!scrollTimeout) {
            scrollTimeout = setTimeout(function() {
                updateActiveNav();
                scrollTimeout = null;
            }, 100);
        }
    });

    // ============ SIMPLE GAME SEARCH ============
    const gameSearch = document.getElementById('gameSearch');
    if (gameSearch) {
        gameSearch.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            const gameCards = document.querySelectorAll('.game-card');

            gameCards.forEach(card => {
                const searchData = card.getAttribute('data-search') || '';
                const title = card.querySelector('.game-title')?.textContent || '';
                const description = card.querySelector('.game-description')?.textContent || '';

                const searchableText = (searchData + ' ' + title + ' ' + description).toLowerCase();

                if (searchableText.includes(searchTerm)) {
                    card.style.display = '';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }

    // ============ LAZY LOAD IMAGES ============
    const images = document.querySelectorAll('img[loading="lazy"]');
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                    }
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    // ============ HANDLE IMAGE ERRORS ============
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', function() {
            if (!this.dataset.errorHandled) {
                this.dataset.errorHandled = 'true';
                // Try to use fallback from onerror attribute
                const fallback = this.getAttribute('onerror');
                if (fallback && !this.src.includes('logo.png')) {
                    const match = fallback.match(/this\.src='([^']+)'/);
                    if (match && match[1]) {
                        this.src = match[1];
                    }
                }
            }
        });
    });

    // ============ CONSOLE LOG (Minimal) ============
    // console.log('%c✓ Site loaded successfully', 'color: #8b5cf6; font-weight: bold; font-size: 14px;');

})();
