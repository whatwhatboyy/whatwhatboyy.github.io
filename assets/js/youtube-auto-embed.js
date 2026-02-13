/**
 * YouTube Auto Video Embedding System
 * Automatically displays latest videos from multiple channels
 */

class YouTubeAutoEmbed {
    constructor() {
        this.channels = [
            {
                id: 'UCusYWir4F6r5AY6A9Ddv7jg',
                handle: '@whatwhatboy101',
                name: 'whatwhatboy101'
            },
            {
                handle: '@whatwhatboy98',
                name: 'whatwhatboy98'
            }
        ];

        this.init();
    }

    init() {
        // Hide loading container and show fallback videos immediately
        const loadingContainer = document.getElementById('youtube-auto-embed-container');
        const fallbackContainer = document.getElementById('fallback-videos');

        if (loadingContainer) {
            loadingContainer.style.display = 'none';
        }

        if (fallbackContainer) {
            fallbackContainer.style.display = 'grid';
        }

        this.addChannelInfo();
    }

    addChannelInfo() {
        const sectionHeader = document.querySelector('#latest-videos .section-header');
        if (!sectionHeader) return;

        const channelInfo = document.createElement('div');
        channelInfo.className = 'youtube-channels-info';
        channelInfo.innerHTML = `
            <div class="channels-list">
                <span class="channel-label">📺 My YouTube Channels:</span>
                <a href="https://www.youtube.com/@whatwhatboy101?sub_confirmation=1" target="_blank" class="channel-link">
                    <i class="fab fa-youtube"></i>
                    @whatwhatboy101
                </a>
                <a href="https://www.youtube.com/@whatwhatboy98?sub_confirmation=1" target="_blank" class="channel-link">
                    <i class="fab fa-youtube"></i>
                    @whatwhatboy98
                </a>
            </div>
        `;

        sectionHeader.appendChild(channelInfo);
    }
}

// Enhanced CSS for YouTube auto-embed
const youtubeStyles = `
    /* Channel info styling */
    .youtube-channels-info {
        margin-top: 1rem;
        padding: 1rem;
        background: rgba(255, 0, 0, 0.1);
        border-radius: 8px;
        border: 1px solid rgba(255, 0, 0, 0.2);
    }

    .channels-list {
        display: flex;
        align-items: center;
        gap: 1rem;
        flex-wrap: wrap;
        justify-content: center;
    }

    .channel-label {
        color: var(--text-secondary);
        font-size: 0.9rem;
        font-weight: 500;
    }

    .channel-link {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 0.5rem 1rem;
        background: #ff0000;
        color: white;
        text-decoration: none;
        border-radius: 6px;
        font-size: 0.9rem;
        font-weight: 600;
        transition: all 0.3s ease;
    }

    .channel-link:hover {
        background: #cc0000;
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(255, 0, 0, 0.3);
    }

    .channel-link i {
        font-size: 1.1em;
    }

    /* Enhanced video cards */
    .video-card {
        position: relative;
        overflow: hidden;
        background: var(--bg-card);
        border-radius: var(--border-radius-lg);
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .video-card:hover {
        transform: translateY(-5px);
        box-shadow: var(--shadow-xl);
    }

    .video-embed {
        position: relative;
        padding-bottom: 56.25%; /* 16:9 aspect ratio */
        height: 0;
        overflow: hidden;
        border-radius: var(--border-radius-lg) var(--border-radius-lg) 0 0;
    }

    .video-embed iframe {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }

    .video-info {
        padding: 1.5rem;
    }

    .video-info h3 {
        color: var(--text-primary);
        margin-bottom: 0.5rem;
        font-size: 1.1rem;
        line-height: 1.4;
    }

    .video-info p {
        color: var(--text-secondary);
        font-size: 0.9rem;
        line-height: 1.5;
        margin-bottom: 1rem;
    }

    .video-meta {
        display: flex;
        align-items: center;
        gap: 1rem;
        flex-wrap: wrap;
        color: var(--text-muted);
        font-size: 0.85rem;
    }

    .video-date,
    .video-views {
        display: flex;
        align-items: center;
        gap: 0.3rem;
    }

    /* Featured video styling */
    .video-card.featured {
        grid-column: 1 / -1;
        background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.1));
        border: 2px solid var(--primary-color);
    }

    .video-card.featured .video-info h3 {
        font-size: 1.3rem;
        color: var(--primary-color);
    }

    /* Loading container */
    .loading-container {
        text-align: center;
        padding: 3rem;
        color: var(--text-secondary);
    }

    .loading-spinner {
        width: 50px;
        height: 50px;
        border: 4px solid rgba(99, 102, 241, 0.2);
        border-top-color: var(--primary-color);
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin: 0 auto 1rem;
    }

    @keyframes spin {
        to { transform: rotate(360deg); }
    }

    /* Mobile responsive */
    @media (max-width: 768px) {
        .channels-list {
            flex-direction: column;
            align-items: stretch;
            gap: 0.5rem;
        }

        .channel-link {
            width: 100%;
            justify-content: center;
        }

        .video-card.featured {
            grid-column: auto;
        }
    }
`;

// Inject the styles
const youtubeStyleSheet = document.createElement('style');
youtubeStyleSheet.textContent = youtubeStyles;
document.head.appendChild(youtubeStyleSheet);

// Initialize YouTube auto-embed when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        if (window.location.pathname.includes('youtube') || document.getElementById('latest-videos')) {
            window.youtubeAutoEmbed = new YouTubeAutoEmbed();
        }
    });
} else {
    if (window.location.pathname.includes('youtube') || document.getElementById('latest-videos')) {
        window.youtubeAutoEmbed = new YouTubeAutoEmbed();
    }
}
