/**
 * Mobile Experience Enhancements
 * Improves mobile usability and touch interactions
 */

class MobileEnhancements {
    constructor() {
        this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        this.isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        this.scrollPosition = 0;

        this.init();
    }

    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupEnhancements());
        } else {
            this.setupEnhancements();
        }
    }

    setupEnhancements() {
        this.enhanceTouchInteractions();
        this.improveScrolling();
        this.addPullToRefresh();
        this.optimizeViewport();
        this.addMobileGestures();
        this.enhanceKeyboard();
        this.addStatusBarSupport();
    }

    enhanceTouchInteractions() {
        // Add touch feedback to interactive elements
        const interactiveElements = document.querySelectorAll('button, .btn, .nav-link, .game-card, .cheat-card, .tool-card');

        interactiveElements.forEach(element => {
            if (!element.classList.contains('touch-enhanced')) {
                element.classList.add('touch-enhanced');

                // Add touch feedback
                element.addEventListener('touchstart', (e) => {
                    element.style.transform = 'scale(0.98)';
                    element.style.opacity = '0.8';
                    element.style.transition = 'all 0.1s ease';
                });

                element.addEventListener('touchend', (e) => {
                    setTimeout(() => {
                        element.style.transform = '';
                        element.style.opacity = '';
                        element.style.transition = 'all 0.3s ease';
                    }, 100);
                });

                element.addEventListener('touchcancel', (e) => {
                    element.style.transform = '';
                    element.style.opacity = '';
                });
            }
        });
    }

    improveScrolling() {
        // Smooth scrolling for mobile
        if (this.isMobile) {
            document.documentElement.style.setProperty('-webkit-overflow-scrolling', 'touch');
            document.body.style.setProperty('-webkit-overflow-scrolling', 'touch');
        }

        // Optimize scroll performance
        let scrollTimer;
        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimer);
            document.body.classList.add('scrolling');

            scrollTimer = setTimeout(() => {
                document.body.classList.remove('scrolling');
            }, 150);
        }, { passive: true });
    }

    addPullToRefresh() {
        if (!this.isMobile) return;

        let startY = 0;
        let currentY = 0;
        let pullDistance = 0;
        let isPulling = false;
        let refreshThreshold = 80;

        // Create pull to refresh indicator
        const pullIndicator = document.createElement('div');
        pullIndicator.className = 'pull-to-refresh-indicator';
        pullIndicator.style.cssText = `
            position: fixed;
            top: -60px;
            left: 50%;
            transform: translateX(-50%);
            width: 40px;
            height: 40px;
            background: var(--primary-color, #6366f1);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 18px;
            z-index: 9999;
            transition: all 0.3s ease;
            box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        `;
        pullIndicator.innerHTML = '<i class="fas fa-arrow-down"></i>';
        document.body.appendChild(pullIndicator);

        document.addEventListener('touchstart', (e) => {
            if (window.scrollY === 0) {
                startY = e.touches[0].clientY;
                isPulling = true;
            }
        }, { passive: true });

        document.addEventListener('touchmove', (e) => {
            if (!isPulling) return;

            currentY = e.touches[0].clientY;
            pullDistance = Math.max(0, currentY - startY);

            if (pullDistance > 0 && window.scrollY === 0) {
                e.preventDefault();

                const progress = Math.min(pullDistance / refreshThreshold, 1);
                const translateY = Math.min(pullDistance * 0.5, 60);

                pullIndicator.style.top = `${translateY - 60}px`;
                pullIndicator.style.transform = `translateX(-50%) rotate(${progress * 180}deg)`;

                if (progress >= 1) {
                    pullIndicator.innerHTML = '<i class="fas fa-sync-alt"></i>';
                    pullIndicator.style.background = 'var(--success-color, #10b981)';
                } else {
                    pullIndicator.innerHTML = '<i class="fas fa-arrow-down"></i>';
                    pullIndicator.style.background = 'var(--primary-color, #6366f1)';
                }
            }
        }, { passive: false });

        document.addEventListener('touchend', (e) => {
            if (!isPulling) return;

            isPulling = false;

            if (pullDistance >= refreshThreshold) {
                // Trigger refresh
                pullIndicator.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
                pullIndicator.style.top = '20px';

                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            } else {
                // Reset indicator
                pullIndicator.style.top = '-60px';
                pullIndicator.style.transform = 'translateX(-50%) rotate(0deg)';
                pullIndicator.innerHTML = '<i class="fas fa-arrow-down"></i>';
                pullIndicator.style.background = 'var(--primary-color, #6366f1)';
            }

            pullDistance = 0;
        }, { passive: true });
    }

    optimizeViewport() {
        // Handle viewport height changes (especially on iOS)
        const setViewportHeight = () => {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        };

        setViewportHeight();
        window.addEventListener('resize', setViewportHeight);
        window.addEventListener('orientationchange', () => {
            setTimeout(setViewportHeight, 100);
        });

        // Prevent zoom on input focus for iOS
        if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
            const inputs = document.querySelectorAll('input, textarea, select');
            inputs.forEach(input => {
                if (input.style.fontSize === '' || parseFloat(input.style.fontSize) < 16) {
                    input.style.fontSize = '16px';
                }
            });
        }
    }

    addMobileGestures() {
        if (!this.isTouch) return;

        // Add swipe gestures for navigation
        let startX = 0;
        let startY = 0;
        let currentX = 0;
        let currentY = 0;

        document.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        }, { passive: true });

        document.addEventListener('touchmove', (e) => {
            currentX = e.touches[0].clientX;
            currentY = e.touches[0].clientY;
        }, { passive: true });

        document.addEventListener('touchend', (e) => {
            const diffX = startX - currentX;
            const diffY = startY - currentY;

            // Detect horizontal swipe (minimum 100px movement, more horizontal than vertical)
            if (Math.abs(diffX) > 100 && Math.abs(diffX) > Math.abs(diffY)) {
                const sidebar = document.getElementById('sidebar');
                const mainContent = document.getElementById('main-content');

                if (diffX > 0) {
                    // Swipe left - close sidebar
                    if (sidebar && sidebar.classList.contains('active')) {
                        sidebar.classList.remove('active');
                        if (mainContent) mainContent.classList.remove('sidebar-open');
                        this.updateMobileSidebarBtn(false);
                    }
                } else {
                    // Swipe right - open sidebar
                    if (sidebar && !sidebar.classList.contains('active')) {
                        sidebar.classList.add('active');
                        if (mainContent) mainContent.classList.add('sidebar-open');
                        this.updateMobileSidebarBtn(true);
                    }
                }
            }
        }, { passive: true });
    }

    updateMobileSidebarBtn(isOpen) {
        const mobileSidebarBtn = document.getElementById('mobile-sidebar-btn');
        if (mobileSidebarBtn) {
            const icon = mobileSidebarBtn.querySelector('i');
            if (icon) {
                if (isOpen) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        }
    }

    enhanceKeyboard() {
        // Handle virtual keyboard on mobile
        if (!this.isMobile) return;

        let initialViewportHeight = window.innerHeight;

        const handleKeyboard = () => {
            const currentHeight = window.innerHeight;
            const heightDifference = initialViewportHeight - currentHeight;

            if (heightDifference > 150) {
                // Keyboard is likely open
                document.body.classList.add('keyboard-open');
                document.documentElement.style.setProperty('--keyboard-height', `${heightDifference}px`);
            } else {
                // Keyboard is likely closed
                document.body.classList.remove('keyboard-open');
                document.documentElement.style.setProperty('--keyboard-height', '0px');
            }
        };

        window.addEventListener('resize', handleKeyboard);

        // Focus management for inputs
        const inputs = document.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                setTimeout(() => {
                    input.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 300);
            });
        });
    }

    addStatusBarSupport() {
        // Add support for modern mobile status bars
        const metaViewport = document.querySelector('meta[name="viewport"]');
        if (metaViewport) {
            let content = metaViewport.content;
            if (!content.includes('viewport-fit=cover')) {
                content += ', viewport-fit=cover';
                metaViewport.setAttribute('content', content);
            }
        }

        // Add safe area CSS variables
        document.documentElement.style.setProperty('--safe-area-inset-top', 'env(safe-area-inset-top)');
        document.documentElement.style.setProperty('--safe-area-inset-right', 'env(safe-area-inset-right)');
        document.documentElement.style.setProperty('--safe-area-inset-bottom', 'env(safe-area-inset-bottom)');
        document.documentElement.style.setProperty('--safe-area-inset-left', 'env(safe-area-inset-left)');
    }

    // Public methods for external use
    vibrate(pattern = 50) {
        if ('vibrate' in navigator) {
            navigator.vibrate(pattern);
        }
    }

    showToast(message, duration = 3000) {
        const toast = document.createElement('div');
        toast.className = 'mobile-toast';
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            bottom: calc(80px + var(--safe-area-inset-bottom, 0px));
            left: 50%;
            transform: translateX(-50%);
            background: rgba(0,0,0,0.8);
            color: white;
            padding: 12px 24px;
            border-radius: 25px;
            font-size: 14px;
            z-index: 10000;
            backdrop-filter: blur(10px);
            animation: slideUpFadeIn 0.3s ease;
        `;

        // Add animation styles
        if (!document.getElementById('mobile-toast-styles')) {
            const styles = document.createElement('style');
            styles.id = 'mobile-toast-styles';
            styles.textContent = `
                @keyframes slideUpFadeIn {
                    from { opacity: 0; transform: translateX(-50%) translateY(100%); }
                    to { opacity: 1; transform: translateX(-50%) translateY(0); }
                }
                @keyframes slideDownFadeOut {
                    from { opacity: 1; transform: translateX(-50%) translateY(0); }
                    to { opacity: 0; transform: translateX(-50%) translateY(100%); }
                }
            `;
            document.head.appendChild(styles);
        }

        document.body.appendChild(toast);

        setTimeout(() => {
            toast.style.animation = 'slideDownFadeOut 0.3s ease';
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        }, duration);
    }
}

// Initialize mobile enhancements
if (typeof window !== 'undefined') {
    window.mobileEnhancements = new MobileEnhancements();
}