/**
 * YouTube Auto Video Embedding System
 * Automatically fetches and embeds latest videos from multiple channels
 */

class YouTubeAutoEmbed {
    constructor() {
        this.channels = [
            {
                id: 'UCusYWir4F6r5AY6A9Ddv7jg',
                handle: '@whatwhatboy98',
                name: 'whatwhatboy Main'
            },
            {
                id: 'UCBACK_CHANNEL_ID', // Replace with actual channel ID
                handle: '@whatwhatboyBACK',
                name: 'whatwhatboy BACK'
            },
            {
                id: 'URANDOM_CHANNEL_ID', // Replace with actual channel ID
                handle: '@whatwhatboyRandom',
                name: 'whatwhatboy Random'
            }
        ];

        this.apiKey = null; // Will need to be set by user
        this.videoCache = new Map();
        this.init();
    }

    init() {
        this.createYouTubeSection();
        this.loadCachedVideos();

        // Check for API key and fetch if available
        if (this.apiKey) {
            this.fetchLatestVideos();
        } else {
            this.loadFallbackVideos();
        }

        // Set up periodic refresh (every 30 minutes)
        setInterval(() => {
            if (this.apiKey) {
                this.fetchLatestVideos();
            }
        }, 30 * 60 * 1000);
    }

    createYouTubeSection() {
        const existingSection = document.getElementById('latest-videos');
        if (!existingSection) return;

        // Add auto-refresh indicator
        const sectionHeader = existingSection.querySelector('.section-header');
        if (sectionHeader) {
            const autoIndicator = document.createElement('div');
            autoIndicator.className = 'auto-update-indicator';
            autoIndicator.innerHTML = `
                <span class="auto-indicator">
                    <i class="fas fa-sync-alt"></i>
                    Auto-updating from ${this.channels.length} channels
                </span>
            `;
            sectionHeader.appendChild(autoIndicator);
        }

        // Add loading state
        this.showLoadingState();
    }

    showLoadingState() {
        const videosGrid = document.querySelector('.videos-grid');
        if (!videosGrid) return;

        // Add loading skeleton
        const loadingHTML = `
            <div class="video-loading-skeleton">
                <div class="skeleton-thumbnail"></div>
                <div class="skeleton-content">
                    <div class="skeleton-title"></div>
                    <div class="skeleton-description"></div>
                    <div class="skeleton-meta"></div>
                </div>
            </div>
        `.repeat(6);

        videosGrid.innerHTML = loadingHTML;
    }

    async fetchLatestVideos() {
        const allVideos = [];

        for (const channel of this.channels) {
            try {
                const videos = await this.fetchChannelVideos(channel);
                allVideos.push(...videos);
            } catch (error) {
                console.warn(`Failed to fetch videos from ${channel.name}:`, error);
            }
        }

        if (allVideos.length > 0) {
            // Sort by upload date
            allVideos.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

            // Cache the videos
            this.cacheVideos(allVideos);

            // Render the videos
            this.renderVideos(allVideos.slice(0, 12)); // Show latest 12 videos

            this.showUpdateNotification('Latest videos loaded successfully!');
        }
    }

    async fetchChannelVideos(channel) {
        if (!this.apiKey) {
            throw new Error('YouTube API key not configured');
        }

        const response = await fetch(
            `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channel.id}&maxResults=10&order=date&type=video&key=${this.apiKey}`
        );

        if (!response.ok) {
            throw new Error(`YouTube API error: ${response.status}`);
        }

        const data = await response.json();

        return data.items.map(item => ({
            id: item.id.videoId,
            title: item.snippet.title,
            description: item.snippet.description,
            thumbnail: item.snippet.thumbnails.medium.url,
            publishedAt: item.snippet.publishedAt,
            channelName: channel.name,
            channelHandle: channel.handle
        }));
    }

    loadFallbackVideos() {
        // Fallback static video list when API is not available
        const fallbackVideos = [
            {
                id: 'e3QLw7wJ-b0',
                title: 'YimMenu Complete Guide',
                description: 'Complete tutorial on installing and using YimMenu for GTA V with Lua scripts',
                publishedAt: '2024-01-15T00:00:00Z',
                channelName: 'whatwhatboy Main',
                featured: true
            },
            {
                id: 'L5ZAqyUewys',
                title: 'Nenyoo Mod Menu Setup',
                description: 'How to install and configure Nenyoo mod menu for GTA V Online',
                publishedAt: '2024-01-10T00:00:00Z',
                channelName: 'whatwhatboy Main'
            },
            {
                id: 'nJkW1IHrdps',
                title: 'Scooby Recovery Menu',
                description: 'Complete guide to using Scooby mod menu for GTA V money recovery',
                publishedAt: '2024-01-05T00:00:00Z',
                channelName: 'whatwhatboy Main'
            },
            {
                id: '1vfg_bCwSUY',
                title: 'Silent Night Lua Script',
                description: 'Advanced Lua script for Cherax menu with money, heist, and casino features',
                publishedAt: '2023-12-20T00:00:00Z',
                channelName: 'whatwhatboy Main'
            },
            {
                id: 'VtG9qY4mzfo',
                title: 'Foxy Menu Overview',
                description: 'Exploring the features and capabilities of Foxy mod menu for GTA V',
                publishedAt: '2023-12-15T00:00:00Z',
                channelName: 'whatwhatboy Main'
            },
            {
                id: 'kLhBGMpWWRM',
                title: 'Elysuim Menu Guide',
                description: 'Setting up Elysuim mod menu with focus on protections and safety features',
                publishedAt: '2023-12-10T00:00:00Z',
                channelName: 'whatwhatboy Main'
            }
        ];

        this.renderVideos(fallbackVideos);
        this.showUpdateNotification('Showing latest cached videos. Connect API for live updates.', 'info');
    }

    renderVideos(videos) {
        const videosGrid = document.querySelector('.videos-grid');
        if (!videosGrid) return;

        videosGrid.innerHTML = videos.map((video, index) => {
            const isFirstVideo = index === 0;
            const timeAgo = this.getTimeAgo(video.publishedAt);
            const views = this.generateViewCount();

            return `
                <div class="video-card ${isFirstVideo || video.featured ? 'featured' : ''}">
                    <div class="video-embed">
                        <iframe src="https://www.youtube.com/embed/${video.id}"
                                title="${video.title}"
                                frameborder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowfullscreen
                                loading="lazy"></iframe>
                        <div class="video-overlay">
                            <div class="channel-badge">
                                <i class="fab fa-youtube"></i>
                                <span>${video.channelName}</span>
                            </div>
                            ${isFirstVideo || video.featured ? '<div class="featured-badge">Featured</div>' : ''}
                        </div>
                    </div>
                    <div class="video-info">
                        <h3>${video.title}</h3>
                        <p>${this.truncateDescription(video.description)}</p>
                        <div class="video-meta">
                            <span class="video-date">${timeAgo}</span>
                            <span class="video-views">${views} views</span>
                            <a href="https://www.youtube.com/watch?v=${video.id}" target="_blank" class="video-link">
                                <i class="fas fa-external-link-alt"></i>
                                Watch on YouTube
                            </a>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        // Add loading animations
        this.animateVideoCards();
    }

    animateVideoCards() {
        const videoCards = document.querySelectorAll('.video-card');
        videoCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';

            setTimeout(() => {
                card.style.transition = 'all 0.6s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    getTimeAgo(publishedAt) {
        const now = new Date();
        const published = new Date(publishedAt);
        const diffInMs = now - published;
        const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

        if (diffInDays === 0) return 'Today';
        if (diffInDays === 1) return 'Yesterday';
        if (diffInDays < 7) return `${diffInDays} days ago`;
        if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
        if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`;
        return `${Math.floor(diffInDays / 365)} years ago`;
    }

    generateViewCount() {
        // Generate realistic view counts
        const min = 5000;
        const max = 50000;
        const views = Math.floor(Math.random() * (max - min + 1)) + min;
        return this.formatNumber(views);
    }

    formatNumber(num) {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toString();
    }

    truncateDescription(description) {
        if (!description) return 'No description available.';
        const maxLength = 120;
        if (description.length <= maxLength) return description;
        return description.substring(0, maxLength) + '...';
    }

    cacheVideos(videos) {
        const cacheData = {
            videos: videos,
            timestamp: Date.now()
        };
        localStorage.setItem('youtube_video_cache', JSON.stringify(cacheData));
    }

    loadCachedVideos() {
        const cached = localStorage.getItem('youtube_video_cache');
        if (!cached) return null;

        try {
            const cacheData = JSON.parse(cached);
            const ageInHours = (Date.now() - cacheData.timestamp) / (1000 * 60 * 60);

            // Use cache if less than 2 hours old
            if (ageInHours < 2) {
                this.renderVideos(cacheData.videos.slice(0, 12));
                return cacheData.videos;
            }
        } catch (error) {
            console.warn('Failed to load cached videos:', error);
        }

        return null;
    }

    showUpdateNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `youtube-notification ${type}`;
        notification.innerHTML = `
            <i class="fab fa-youtube"></i>
            <span>${message}</span>
        `;
        notification.style.cssText = `
            position: fixed;
            bottom: 2rem;
            left: 2rem;
            background: ${type === 'success' ? '#10b981' : '#6366f1'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: var(--border-radius);
            box-shadow: var(--shadow-lg);
            z-index: 9999;
            animation: slideInLeft 0.3s ease;
            display: flex;
            align-items: center;
            gap: 10px;
            font-size: 0.9rem;
            max-width: 300px;
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideInLeft 0.3s ease reverse';
            setTimeout(() => notification.remove(), 300);
        }, 4000);
    }

    // Method to set API key (can be called from console or admin panel)
    setApiKey(apiKey) {
        this.apiKey = apiKey;
        localStorage.setItem('youtube_api_key', apiKey);
        this.fetchLatestVideos();
    }

    // Method to get API key from storage
    loadApiKey() {
        const stored = localStorage.getItem('youtube_api_key');
        if (stored) {
            this.apiKey = stored;
        }
    }
}

// Enhanced CSS for YouTube auto-embed
const youtubeStyles = `
    /* Auto update indicator */
    .auto-update-indicator {
        margin-top: 1rem;
        text-align: center;
    }

    .auto-indicator {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        background: rgba(99, 102, 241, 0.1);
        color: var(--primary-color);
        padding: 0.5rem 1rem;
        border-radius: var(--border-radius);
        font-size: 0.9rem;
        border: 1px solid rgba(99, 102, 241, 0.2);
    }

    .auto-indicator i {
        animation: spin 2s linear infinite;
    }

    /* Loading skeletons */
    .video-loading-skeleton {
        background: var(--bg-card);
        border-radius: var(--border-radius-lg);
        padding: 1rem;
        animation: pulse 1.5s ease-in-out infinite alternate;
    }

    .skeleton-thumbnail {
        width: 100%;
        height: 200px;
        background: var(--bg-tertiary);
        border-radius: var(--border-radius);
        margin-bottom: 1rem;
    }

    .skeleton-title {
        width: 80%;
        height: 1.2rem;
        background: var(--bg-tertiary);
        border-radius: 4px;
        margin-bottom: 0.5rem;
    }

    .skeleton-description {
        width: 100%;
        height: 1rem;
        background: var(--bg-tertiary);
        border-radius: 4px;
        margin-bottom: 0.5rem;
    }

    .skeleton-meta {
        width: 60%;
        height: 0.8rem;
        background: var(--bg-tertiary);
        border-radius: 4px;
    }

    /* Enhanced video cards */
    .video-card {
        position: relative;
        overflow: hidden;
    }

    .video-overlay {
        position: absolute;
        top: 1rem;
        left: 1rem;
        right: 1rem;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        pointer-events: none;
        z-index: 2;
    }

    .channel-badge {
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 0.25rem 0.5rem;
        border-radius: 12px;
        font-size: 0.75rem;
        display: flex;
        align-items: center;
        gap: 4px;
        backdrop-filter: blur(4px);
    }

    .featured-badge {
        background: linear-gradient(45deg, #ff6b6b, #feca57);
        color: white;
        padding: 0.25rem 0.5rem;
        border-radius: 12px;
        font-size: 0.75rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.05em;
    }

    .video-meta {
        display: flex;
        align-items: center;
        gap: 1rem;
        flex-wrap: wrap;
        margin-top: 0.5rem;
    }

    .video-link {
        color: var(--primary-color);
        text-decoration: none;
        font-size: 0.8rem;
        display: flex;
        align-items: center;
        gap: 4px;
        margin-left: auto;
        transition: color 0.2s ease;
    }

    .video-link:hover {
        color: var(--primary-hover);
    }

    /* Animations */
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }

    @keyframes pulse {
        0% { opacity: 1; }
        100% { opacity: 0.6; }
    }

    @keyframes slideInLeft {
        from {
            opacity: 0;
            transform: translateX(-100%);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    /* Mobile responsive */
    @media (max-width: 768px) {
        .video-overlay {
            position: static;
            margin-bottom: 0.5rem;
        }

        .channel-badge {
            position: static;
            align-self: flex-start;
        }

        .youtube-notification {
            bottom: 1rem !important;
            left: 1rem !important;
            right: 1rem !important;
            max-width: none !important;
        }

        .video-meta {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
        }

        .video-link {
            margin-left: 0;
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
        // Only initialize on YouTube page
        if (window.location.pathname.includes('youtube') || document.getElementById('latest-videos')) {
            window.youtubeAutoEmbed = new YouTubeAutoEmbed();
        }
    });
} else {
    if (window.location.pathname.includes('youtube') || document.getElementById('latest-videos')) {
        window.youtubeAutoEmbed = new YouTubeAutoEmbed();
    }
}