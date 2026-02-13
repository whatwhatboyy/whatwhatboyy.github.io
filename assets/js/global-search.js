/**
 * Global Site Search Functionality
 * Provides site-wide search capabilities across all pages and content
 */

class GlobalSearch {
    constructor() {
        this.searchIndex = [];
        this.searchResults = [];
        this.isIndexed = false;
        this.searchModal = null;

        this.init();
    }

    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupSearch());
        } else {
            this.setupSearch();
        }
    }

    setupSearch() {
        this.createSearchButton();
        this.createSearchModal();
        this.indexPageContent();
        this.setupKeyboardShortcuts();
    }

    createSearchButton() {
        // Add search button to sidebar
        const sidebar = document.querySelector('.sidebar-nav ul');
        if (sidebar) {
            const searchItem = document.createElement('li');
            searchItem.innerHTML = `
                <a href="#" class="nav-link search-trigger" id="search-trigger">
                    <i class="fas fa-search"></i>
                    <span>Search Site</span>
                </a>
            `;

            // Insert after Home but before other links
            const firstChild = sidebar.children[1] || sidebar.firstChild;
            sidebar.insertBefore(searchItem, firstChild);

            // Add click handler
            searchItem.querySelector('.search-trigger').addEventListener('click', (e) => {
                e.preventDefault();
                this.openSearchModal();
            });
        }

        // Add floating search button on mobile
        const floatingSearchBtn = document.createElement('div');
        floatingSearchBtn.id = 'floating-search-btn';
        floatingSearchBtn.className = 'floating-search-btn';
        floatingSearchBtn.innerHTML = '<i class="fas fa-search"></i>';
        floatingSearchBtn.style.cssText = `
            position: fixed;
            bottom: 80px;
            right: 20px;
            width: 50px;
            height: 50px;
            background: var(--primary-color, #6366f1);
            color: white;
            border: none;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            z-index: 9999;
            box-shadow: 0 4px 20px rgba(0,0,0,0.3);
            transition: all 0.3s ease;
            font-size: 18px;
        `;

        floatingSearchBtn.addEventListener('click', () => this.openSearchModal());
        document.body.appendChild(floatingSearchBtn);

        // Show floating button only on mobile
        const mediaQuery = window.matchMedia('(max-width: 768px)');
        const handleMediaChange = (e) => {
            floatingSearchBtn.style.display = e.matches ? 'flex' : 'none';
        };
        mediaQuery.addEventListener('change', handleMediaChange);
        handleMediaChange(mediaQuery);
    }

    createSearchModal() {
        this.searchModal = document.createElement('div');
        this.searchModal.id = 'search-modal';
        this.searchModal.className = 'search-modal';
        this.searchModal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.9);
            display: none;
            z-index: 10000;
            backdrop-filter: blur(10px);
        `;

        this.searchModal.innerHTML = `
            <div class="search-container" style="
                max-width: 800px;
                margin: 10% auto;
                padding: 40px;
                background: var(--bg-card, #1a1a1a);
                border-radius: 20px;
                box-shadow: 0 20px 60px rgba(0,0,0,0.5);
                border: 2px solid var(--primary-color, #6366f1);
            ">
                <div class="search-header" style="
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-bottom: 30px;
                ">
                    <h2 style="
                        margin: 0;
                        color: var(--text-primary, #ffffff);
                        display: flex;
                        align-items: center;
                        gap: 15px;
                        font-size: 24px;
                    ">
                        <i class="fas fa-search" style="color: var(--primary-color, #6366f1);"></i>
                        Search Site
                    </h2>
                    <button class="search-close" id="search-close" style="
                        background: none;
                        border: none;
                        color: var(--text-secondary, #cccccc);
                        font-size: 24px;
                        cursor: pointer;
                        padding: 5px;
                        border-radius: 5px;
                        transition: all 0.3s ease;
                    ">
                        <i class="fas fa-times"></i>
                    </button>
                </div>

                <div class="search-input-container" style="
                    position: relative;
                    margin-bottom: 30px;
                ">
                    <input type="text" id="search-input" placeholder="Search for cheats, tools, tutorials..." style="
                        width: 100%;
                        padding: 15px 50px 15px 20px;
                        border: 2px solid var(--border-color, #333);
                        border-radius: 15px;
                        background: var(--bg-secondary, #2a2a2a);
                        color: var(--text-primary, #ffffff);
                        font-size: 18px;
                        outline: none;
                        transition: all 0.3s ease;
                        box-sizing: border-box;
                    ">
                    <i class="fas fa-search" style="
                        position: absolute;
                        right: 20px;
                        top: 50%;
                        transform: translateY(-50%);
                        color: var(--text-secondary, #cccccc);
                        font-size: 18px;
                    "></i>
                </div>

                <div class="search-filters" style="
                    display: flex;
                    gap: 10px;
                    margin-bottom: 30px;
                    flex-wrap: wrap;
                ">
                    <button class="filter-btn active" data-filter="all" style="
                        padding: 8px 16px;
                        border: 1px solid var(--primary-color, #6366f1);
                        border-radius: 20px;
                        background: var(--primary-color, #6366f1);
                        color: white;
                        font-size: 14px;
                        cursor: pointer;
                        transition: all 0.3s ease;
                    ">All</button>
                    <button class="filter-btn" data-filter="cheats" style="
                        padding: 8px 16px;
                        border: 1px solid var(--border-color, #333);
                        border-radius: 20px;
                        background: transparent;
                        color: var(--text-secondary, #cccccc);
                        font-size: 14px;
                        cursor: pointer;
                        transition: all 0.3s ease;
                    ">Cheats</button>
                    <button class="filter-btn" data-filter="tools" style="
                        padding: 8px 16px;
                        border: 1px solid var(--border-color, #333);
                        border-radius: 20px;
                        background: transparent;
                        color: var(--text-secondary, #cccccc);
                        font-size: 14px;
                        cursor: pointer;
                        transition: all 0.3s ease;
                    ">Tools</button>
                    <button class="filter-btn" data-filter="tutorials" style="
                        padding: 8px 16px;
                        border: 1px solid var(--border-color, #333);
                        border-radius: 20px;
                        background: transparent;
                        color: var(--text-secondary, #cccccc);
                        font-size: 14px;
                        cursor: pointer;
                        transition: all 0.3s ease;
                    ">Tutorials</button>
                </div>

                <div class="search-results" id="search-results" style="
                    max-height: 400px;
                    overflow-y: auto;
                    border-radius: 10px;
                ">
                    <div class="search-placeholder" style="
                        text-align: center;
                        padding: 60px 20px;
                        color: var(--text-secondary, #cccccc);
                    ">
                        <i class="fas fa-search" style="font-size: 48px; margin-bottom: 20px; opacity: 0.3;"></i>
                        <p style="margin: 0; font-size: 18px;">Start typing to search...</p>
                        <p style="margin: 10px 0 0 0; font-size: 14px; opacity: 0.7;">Use Ctrl+K or Cmd+K to open search</p>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(this.searchModal);

        // Setup event listeners
        this.setupSearchEventListeners();
    }

    setupSearchEventListeners() {
        const searchInput = this.searchModal.querySelector('#search-input');
        const searchClose = this.searchModal.querySelector('#search-close');
        const filterBtns = this.searchModal.querySelectorAll('.filter-btn');

        // Search input
        let searchTimeout;
        searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                this.performSearch(e.target.value);
            }, 300);
        });

        // Close button
        searchClose.addEventListener('click', () => this.closeSearchModal());

        // Click outside to close
        this.searchModal.addEventListener('click', (e) => {
            if (e.target === this.searchModal) {
                this.closeSearchModal();
            }
        });

        // Filter buttons
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => {
                    b.classList.remove('active');
                    b.style.background = 'transparent';
                    b.style.color = 'var(--text-secondary, #cccccc)';
                });
                btn.classList.add('active');
                btn.style.background = 'var(--primary-color, #6366f1)';
                btn.style.color = 'white';

                const query = searchInput.value;
                if (query) {
                    this.performSearch(query, btn.dataset.filter);
                }
            });
        });

        // Focus input when modal opens
        searchInput.addEventListener('focus', () => {
            searchInput.style.borderColor = 'var(--primary-color, #6366f1)';
        });

        searchInput.addEventListener('blur', () => {
            searchInput.style.borderColor = 'var(--border-color, #333)';
        });
    }

    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ctrl+K or Cmd+K to open search
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                this.openSearchModal();
            }

            // Escape to close search
            if (e.key === 'Escape' && this.searchModal.style.display === 'block') {
                this.closeSearchModal();
            }
        });
    }

    indexPageContent() {
        // Build search index from current page content
        const contentSelectors = [
            'h1, h2, h3, h4, h5, h6',
            '.game-title, .cheat-info h3',
            '.tool-card h4',
            '.game-description, .cheat-info p',
            '.feature, .game-features span',
            '.nav-link span',
            '.section-title, .section-subtitle'
        ];

        this.searchIndex = [];

        contentSelectors.forEach(selector => {
            document.querySelectorAll(selector).forEach(element => {
                const text = element.textContent.trim();
                if (text && text.length > 2) {
                    const parentCard = element.closest('.game-card, .cheat-card, .tool-card');
                    let category = 'general';
                    let url = window.location.href;
                    let image = null;

                    if (parentCard) {
                        const img = parentCard.querySelector('img');
                        if (img) image = img.src;

                        // Determine category based on page and content
                        if (window.location.pathname.includes('/games/') || parentCard.classList.contains('cheat-card')) {
                            category = 'cheats';
                        } else if (window.location.pathname.includes('/tools/') || parentCard.classList.contains('tool-card')) {
                            category = 'tools';
                        } else if (text.toLowerCase().includes('tutorial') || text.toLowerCase().includes('guide')) {
                            category = 'tutorials';
                        }

                        // Try to get specific URL for the item
                        const link = parentCard.querySelector('a[href]');
                        if (link && !link.href.includes('#')) {
                            url = link.href;
                        }
                    }

                    this.searchIndex.push({
                        text: text,
                        element: element,
                        category: category,
                        url: url,
                        image: image,
                        weight: this.calculateWeight(element, text)
                    });
                }
            });
        });

        this.isIndexed = true;
    }

    calculateWeight(element, text) {
        let weight = 1;

        // Higher weight for titles
        if (element.tagName.match(/^H[1-6]$/)) {
            weight += 5;
        }

        // Higher weight for game/cheat titles
        if (element.classList.contains('game-title') || element.closest('.cheat-info')) {
            weight += 3;
        }

        // Higher weight for navigation items
        if (element.closest('.nav-link')) {
            weight += 2;
        }

        // Lower weight for very long text
        if (text.length > 100) {
            weight -= 1;
        }

        return weight;
    }

    performSearch(query, filter = 'all') {
        const resultsContainer = this.searchModal.querySelector('#search-results');

        if (!query || query.length < 2) {
            resultsContainer.innerHTML = `
                <div class="search-placeholder" style="
                    text-align: center;
                    padding: 60px 20px;
                    color: var(--text-secondary, #cccccc);
                ">
                    <i class="fas fa-search" style="font-size: 48px; margin-bottom: 20px; opacity: 0.3;"></i>
                    <p style="margin: 0; font-size: 18px;">Start typing to search...</p>
                </div>
            `;
            return;
        }

        // Search through index
        const searchTerms = query.toLowerCase().split(' ').filter(term => term.length > 1);
        const results = [];

        this.searchIndex.forEach(item => {
            let score = 0;
            const itemText = item.text.toLowerCase();

            searchTerms.forEach(term => {
                if (itemText.includes(term)) {
                    // Exact match gets higher score
                    if (itemText === term) {
                        score += 10;
                    } else if (itemText.startsWith(term)) {
                        score += 5;
                    } else {
                        score += 1;
                    }
                }
            });

            if (score > 0) {
                // Apply filter
                if (filter === 'all' || item.category === filter) {
                    results.push({
                        ...item,
                        score: score * item.weight
                    });
                }
            }
        });

        // Sort by score
        results.sort((a, b) => b.score - a.score);

        // Display results
        this.displayResults(results.slice(0, 10), query);
    }

    displayResults(results, query) {
        const resultsContainer = this.searchModal.querySelector('#search-results');

        if (results.length === 0) {
            resultsContainer.innerHTML = `
                <div class="no-results" style="
                    text-align: center;
                    padding: 60px 20px;
                    color: var(--text-secondary, #cccccc);
                ">
                    <i class="fas fa-search-minus" style="font-size: 48px; margin-bottom: 20px; opacity: 0.3;"></i>
                    <p style="margin: 0; font-size: 18px;">No results found for "${query}"</p>
                    <p style="margin: 10px 0 0 0; font-size: 14px; opacity: 0.7;">Try different keywords or check spelling</p>
                </div>
            `;
            return;
        }

        const resultsHTML = results.map(result => {
            const highlightedText = this.highlightSearchTerms(result.text, query);
            const categoryIcon = this.getCategoryIcon(result.category);

            return `
                <div class="search-result-item" style="
                    padding: 15px;
                    border-bottom: 1px solid var(--border-color, #333);
                    cursor: pointer;
                    transition: all 0.3s ease;
                    border-radius: 10px;
                    margin-bottom: 5px;
                "
                data-url="${result.url}"
                onmouseover="this.style.background='var(--bg-hover, rgba(255,255,255,0.05))'"
                onmouseout="this.style.background='transparent'"
                onclick="window.open('${result.url}', '_self')">
                    <div style="display: flex; align-items: center; gap: 15px;">
                        ${result.image ? `<img src="${result.image}" style="width: 40px; height: 40px; border-radius: 8px; object-fit: cover;" onerror="this.style.display='none'">` : ''}
                        <div style="flex: 1;">
                            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 5px;">
                                <i class="${categoryIcon}" style="color: var(--primary-color, #6366f1); font-size: 14px;"></i>
                                <span style="color: var(--text-secondary, #cccccc); font-size: 12px; text-transform: uppercase; font-weight: 500;">${result.category}</span>
                            </div>
                            <div style="color: var(--text-primary, #ffffff); font-weight: 500; margin-bottom: 5px;">${highlightedText}</div>
                            <div style="color: var(--text-secondary, #cccccc); font-size: 14px; opacity: 0.8;">${new URL(result.url).pathname}</div>
                        </div>
                        <i class="fas fa-external-link-alt" style="color: var(--text-secondary, #cccccc); opacity: 0.5;"></i>
                    </div>
                </div>
            `;
        }).join('');

        resultsContainer.innerHTML = `
            <div style="margin-bottom: 15px; color: var(--text-secondary, #cccccc); font-size: 14px;">
                Found ${results.length} result${results.length !== 1 ? 's' : ''} for "${query}"
            </div>
            ${resultsHTML}
        `;
    }

    highlightSearchTerms(text, query) {
        const terms = query.toLowerCase().split(' ').filter(term => term.length > 1);
        let highlightedText = text;

        terms.forEach(term => {
            const regex = new RegExp(`(${term})`, 'gi');
            highlightedText = highlightedText.replace(regex, '<mark style="background: var(--primary-color, #6366f1); color: white; padding: 2px 4px; border-radius: 3px;">$1</mark>');
        });

        return highlightedText;
    }

    getCategoryIcon(category) {
        const icons = {
            'cheats': 'fas fa-gamepad',
            'tools': 'fas fa-tools',
            'tutorials': 'fas fa-graduation-cap',
            'general': 'fas fa-file-alt'
        };
        return icons[category] || icons.general;
    }

    openSearchModal() {
        this.searchModal.style.display = 'block';
        setTimeout(() => {
            const searchInput = this.searchModal.querySelector('#search-input');
            searchInput.focus();
        }, 100);

        // Prevent body scrolling
        document.body.style.overflow = 'hidden';
    }

    closeSearchModal() {
        this.searchModal.style.display = 'none';

        // Restore body scrolling
        document.body.style.overflow = '';

        // Clear search
        const searchInput = this.searchModal.querySelector('#search-input');
        searchInput.value = '';

        const resultsContainer = this.searchModal.querySelector('#search-results');
        resultsContainer.innerHTML = `
            <div class="search-placeholder" style="
                text-align: center;
                padding: 60px 20px;
                color: var(--text-secondary, #cccccc);
            ">
                <i class="fas fa-search" style="font-size: 48px; margin-bottom: 20px; opacity: 0.3;"></i>
                <p style="margin: 0; font-size: 18px;">Start typing to search...</p>
                <p style="margin: 10px 0 0 0; font-size: 14px; opacity: 0.7;">Use Ctrl+K or Cmd+K to open search</p>
            </div>
        `;
    }
}

// Initialize global search
if (typeof window !== 'undefined') {
    window.globalSearch = new GlobalSearch();
}