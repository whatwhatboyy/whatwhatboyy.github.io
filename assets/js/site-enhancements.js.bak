/**
 * Site Enhancement Features
 * Additional dynamic features to make the site feel more alive
 */

class SiteEnhancements {
    constructor() {
        this.init();
    }

    init() {
        this.addVisitorCounter();
        this.addLiveStatusIndicators();
        this.addDownloadCounters();
        this.addRecentActivity();
        this.addTypingEffect();
        this.addProgressBars();
        this.addNotificationSystem();
        this.addTooltips();
        this.addCopyToClipboard();
        this.addShareButtons();
    }

    // 1. Live Visitor Counter
    addVisitorCounter() {
        const heroStats = document.querySelector('.hero-stats');
        if (!heroStats) return;

        // Simulate live visitor count
        const visitorStat = document.createElement('div');
        visitorStat.className = 'stat';
        visitorStat.innerHTML = `
            <h3 id="visitor-count">0</h3>
            <p>Online Now <span class="pulse-dot"></span></p>
        `;
        heroStats.appendChild(visitorStat);

        // Animate visitor count
        this.animateVisitorCount();
    }

    animateVisitorCount() {
        const visitorElement = document.getElementById('visitor-count');
        if (!visitorElement) return;

        const baseCount = 47;
        let currentCount = baseCount;

        // Initial count up animation
        this.countUp(visitorElement, 0, baseCount, 2000);

        // Periodically update with realistic fluctuations
        setInterval(() => {
            const change = Math.floor(Math.random() * 5) - 2; // -2 to +2
            currentCount = Math.max(30, currentCount + change);
            visitorElement.textContent = currentCount;
        }, 8000 + Math.random() * 4000);
    }

    // 2. Live Status Indicators for Cheats
    addLiveStatusIndicators() {
        const statusBadges = document.querySelectorAll('.status-badge');
        statusBadges.forEach(badge => {
            if (badge.textContent.toLowerCase().includes('working') ||
                badge.textContent.toLowerCase().includes('updated')) {

                const pulse = document.createElement('span');
                pulse.className = 'status-pulse';
                badge.appendChild(pulse);
            }
        });
    }

    // 3. Download Counters
    addDownloadCounters() {
        const downloadButtons = document.querySelectorAll('.btn-primary[href], .game-link');
        downloadButtons.forEach((button, index) => {
            const counter = document.createElement('small');
            counter.className = 'download-counter';
            const count = 1500 + Math.floor(Math.random() * 8500);
            counter.textContent = `${count.toLocaleString()} downloads`;

            // Add counter near the button
            const parent = button.closest('.cheat-actions') || button.closest('.game-info');
            if (parent) {
                parent.appendChild(counter);
            }

            // Increment on click
            button.addEventListener('click', () => {
                const currentCount = parseInt(counter.textContent.replace(/[^\d]/g, ''));
                counter.textContent = `${(currentCount + 1).toLocaleString()} downloads`;
            });
        });
    }

    // 4. Recent Activity Feed
    addRecentActivity() {
        const sidebar = document.querySelector('.sidebar-social');
        if (!sidebar) return;

        const activityFeed = document.createElement('div');
        activityFeed.className = 'recent-activity';
        activityFeed.innerHTML = `
            <h4>Recent Activity</h4>
            <div class="activity-list" id="activity-list">
                <!-- Activities will be populated here -->
            </div>
        `;
        sidebar.appendChild(activityFeed);

        this.generateRecentActivity();
    }

    generateRecentActivity() {
        const activities = [
            'New GTA V mod uploaded',
            'CS2 cheats updated',
            'User joined Discord',
            'Tutorial video published',
            'Kiddions menu updated',
            'New member in community',
            'Bug fix released',
            'YimMenu v2 available'
        ];

        const activityList = document.getElementById('activity-list');
        if (!activityList) return;

        // Add initial activities
        for (let i = 0; i < 3; i++) {
            this.addActivityItem(activityList, activities[Math.floor(Math.random() * activities.length)]);
        }

        // Add new activity periodically
        setInterval(() => {
            const activity = activities[Math.floor(Math.random() * activities.length)];
            this.addActivityItem(activityList, activity);

            // Remove old activities (keep max 5)
            const items = activityList.querySelectorAll('.activity-item');
            if (items.length > 5) {
                items[items.length - 1].remove();
            }
        }, 15000 + Math.random() * 10000);
    }

    addActivityItem(container, text) {
        const item = document.createElement('div');
        item.className = 'activity-item';
        item.innerHTML = `
            <span class="activity-dot"></span>
            <span class="activity-text">${text}</span>
            <span class="activity-time">just now</span>
        `;
        container.insertBefore(item, container.firstChild);
    }

    // 5. Typing Effect for Hero Title
    addTypingEffect() {
        const heroTitle = document.querySelector('.hero-title');
        if (!heroTitle) return;

        const originalText = heroTitle.textContent;
        const phrases = [
            "Welcome to whatwhatboy's",
            "Gaming Hub & Cheats",
            "Free Mod Menus",
            "Discord Communities"
        ];

        let currentPhrase = 0;
        let currentChar = 0;
        let isDeleting = false;

        function typeEffect() {
            const current = phrases[currentPhrase];

            if (isDeleting) {
                heroTitle.textContent = current.substring(0, currentChar - 1);
                currentChar--;
            } else {
                heroTitle.textContent = current.substring(0, currentChar + 1);
                currentChar++;
            }

            let delay = isDeleting ? 50 : 100;

            if (!isDeleting && currentChar === current.length) {
                delay = 2000;
                isDeleting = true;
            } else if (isDeleting && currentChar === 0) {
                isDeleting = false;
                currentPhrase = (currentPhrase + 1) % phrases.length;
                delay = 500;
            }

            setTimeout(typeEffect, delay);
        }

        // Start typing effect after 3 seconds
        setTimeout(typeEffect, 3000);
    }

    // 6. Progress Bars for Features
    addProgressBars() {
        const features = document.querySelectorAll('.feature');
        features.forEach(feature => {
            const progressBar = document.createElement('div');
            progressBar.className = 'feature-progress';
            progressBar.innerHTML = `
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${60 + Math.random() * 40}%"></div>
                </div>
            `;
            feature.appendChild(progressBar);
        });
    }

    // 7. Toast Notification System
    addNotificationSystem() {
        // Show welcome notification
        setTimeout(() => {
            this.showToast('Welcome to whatwhatboy\'s gaming hub! 🎮', 'info');
        }, 2000);

        // Random helpful tips
        const tips = [
            'Tip: Join our Discord for the latest updates!',
            'New cheats are added weekly!',
            'Remember to use alt accounts for safety!',
            'Check out our YouTube for tutorials!'
        ];

        setInterval(() => {
            if (Math.random() < 0.3) { // 30% chance every interval
                const tip = tips[Math.floor(Math.random() * tips.length)];
                this.showToast(tip, 'tip');
            }
        }, 30000);
    }

    showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            <i class="fas fa-${type === 'tip' ? 'lightbulb' : 'info-circle'}"></i>
            <span>${message}</span>
            <button class="toast-close">&times;</button>
        `;

        document.body.appendChild(toast);

        // Auto remove after 5 seconds
        setTimeout(() => toast.remove(), 5000);

        // Manual close
        toast.querySelector('.toast-close').addEventListener('click', () => toast.remove());
    }

    // 8. Enhanced Tooltips
    addTooltips() {
        const elements = document.querySelectorAll('[title]');
        elements.forEach(element => {
            const tooltip = document.createElement('div');
            tooltip.className = 'custom-tooltip';
            tooltip.textContent = element.getAttribute('title');
            element.setAttribute('title', ''); // Remove default tooltip

            element.addEventListener('mouseenter', (e) => {
                document.body.appendChild(tooltip);
                tooltip.style.left = e.pageX + 10 + 'px';
                tooltip.style.top = e.pageY - 30 + 'px';
                tooltip.classList.add('visible');
            });

            element.addEventListener('mouseleave', () => {
                tooltip.remove();
            });

            element.addEventListener('mousemove', (e) => {
                if (tooltip.parentNode) {
                    tooltip.style.left = e.pageX + 10 + 'px';
                    tooltip.style.top = e.pageY - 30 + 'px';
                }
            });
        });
    }

    // 9. Copy to Clipboard functionality
    addCopyToClipboard() {
        const codeElements = document.querySelectorAll('code, .code');
        codeElements.forEach(element => {
            const copyBtn = document.createElement('button');
            copyBtn.className = 'copy-btn';
            copyBtn.innerHTML = '<i class="fas fa-copy"></i>';
            copyBtn.title = 'Copy to clipboard';

            element.style.position = 'relative';
            element.appendChild(copyBtn);

            copyBtn.addEventListener('click', () => {
                navigator.clipboard.writeText(element.textContent).then(() => {
                    copyBtn.innerHTML = '<i class="fas fa-check"></i>';
                    setTimeout(() => {
                        copyBtn.innerHTML = '<i class="fas fa-copy"></i>';
                    }, 2000);
                });
            });
        });
    }

    // 10. Social Share Buttons
    addShareButtons() {
        const gameCards = document.querySelectorAll('.game-card, .cheat-card');
        gameCards.forEach(card => {
            const title = card.querySelector('h3, h4')?.textContent || 'Check this out!';
            const shareBtn = document.createElement('button');
            shareBtn.className = 'share-btn';
            shareBtn.innerHTML = '<i class="fas fa-share-alt"></i>';
            shareBtn.title = 'Share';

            card.style.position = 'relative';
            card.appendChild(shareBtn);

            shareBtn.addEventListener('click', () => {
                if (navigator.share) {
                    navigator.share({
                        title: title,
                        url: window.location.href
                    });
                } else {
                    // Fallback - copy to clipboard
                    navigator.clipboard.writeText(window.location.href);
                    this.showToast('Link copied to clipboard!', 'info');
                }
            });
        });
    }

    // Utility function for count up animation
    countUp(element, start, end, duration) {
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            const current = Math.floor(start + (end - start) * progress);
            element.textContent = current;

            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }

        requestAnimationFrame(update);
    }
}

// Enhanced CSS for new features
const enhancementStyles = `
    /* Pulse dot for online status */
    .pulse-dot {
        display: inline-block;
        width: 8px;
        height: 8px;
        background: #10b981;
        border-radius: 50%;
        animation: pulse 2s infinite;
        margin-left: 5px;
    }

    @keyframes pulse {
        0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); }
        70% { box-shadow: 0 0 0 10px rgba(16, 185, 129, 0); }
        100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
    }

    /* Status pulse for working cheats */
    .status-pulse {
        display: inline-block;
        width: 6px;
        height: 6px;
        background: #10b981;
        border-radius: 50%;
        margin-left: 8px;
        animation: pulse 1.5s infinite;
    }

    /* Download counters */
    .download-counter {
        display: block;
        color: var(--text-muted);
        font-size: 0.75rem;
        margin-top: 5px;
        text-align: center;
    }

    /* Recent activity */
    .recent-activity {
        margin-top: 2rem;
        padding-top: 1rem;
        border-top: 1px solid var(--border-color);
    }

    .recent-activity h4 {
        color: var(--text-primary);
        margin-bottom: 1rem;
        font-size: 1rem;
    }

    .activity-item {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px 0;
        font-size: 0.8rem;
        animation: slideInLeft 0.3s ease;
    }

    .activity-dot {
        width: 6px;
        height: 6px;
        background: var(--primary-color);
        border-radius: 50%;
        flex-shrink: 0;
    }

    .activity-text {
        flex: 1;
        color: var(--text-secondary);
    }

    .activity-time {
        color: var(--text-muted);
        font-size: 0.7rem;
    }

    /* Progress bars */
    .feature-progress {
        margin-top: 8px;
    }

    .progress-bar {
        width: 100%;
        height: 4px;
        background: var(--bg-tertiary);
        border-radius: 2px;
        overflow: hidden;
    }

    .progress-fill {
        height: 100%;
        background: linear-gradient(90deg, var(--primary-color), var(--accent-color));
        border-radius: 2px;
        animation: progressLoad 2s ease-out;
    }

    @keyframes progressLoad {
        0% { width: 0% !important; }
    }

    /* Toast notifications */
    .toast {
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        background: var(--bg-card);
        border: 1px solid var(--border-color);
        border-radius: var(--border-radius);
        padding: 1rem 1.5rem;
        color: var(--text-primary);
        box-shadow: var(--shadow-lg);
        z-index: 10000;
        animation: slideInUp 0.3s ease;
        max-width: 300px;
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .toast-tip {
        border-left: 4px solid var(--warning-color);
    }

    .toast-close {
        background: none;
        border: none;
        color: var(--text-muted);
        cursor: pointer;
        margin-left: auto;
        font-size: 1.2rem;
    }

    /* Custom tooltips */
    .custom-tooltip {
        position: absolute;
        background: var(--bg-secondary);
        color: var(--text-primary);
        padding: 8px 12px;
        border-radius: var(--border-radius-sm);
        font-size: 0.8rem;
        box-shadow: var(--shadow-md);
        z-index: 10000;
        opacity: 0;
        transform: translateY(5px);
        transition: all 0.2s ease;
        pointer-events: none;
    }

    .custom-tooltip.visible {
        opacity: 1;
        transform: translateY(0);
    }

    /* Copy and share buttons */
    .copy-btn, .share-btn {
        position: absolute;
        top: 8px;
        right: 8px;
        background: rgba(0, 0, 0, 0.7);
        border: none;
        color: white;
        padding: 6px 8px;
        border-radius: 4px;
        cursor: pointer;
        opacity: 0;
        transition: opacity 0.2s ease;
        font-size: 0.8rem;
    }

    .share-btn {
        top: 8px;
        right: 45px;
    }

    *:hover > .copy-btn,
    *:hover > .share-btn {
        opacity: 1;
    }

    /* Animation keyframes */
    @keyframes slideInLeft {
        from {
            opacity: 0;
            transform: translateX(-20px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;

// Inject the styles
const styleSheet = document.createElement('style');
styleSheet.textContent = enhancementStyles;
document.head.appendChild(styleSheet);

// Initialize enhancements when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new SiteEnhancements();
    });
} else {
    new SiteEnhancements();
}