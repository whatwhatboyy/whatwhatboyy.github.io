// Breadcrumb Navigation Generator
(function() {
    'use strict';

    // Configuration for custom page names
    const pageNames = {
        'index.html': 'Home',
        'profile.html': 'Profile',
        'contact.html': 'Contact',
        'youtube.html': 'YouTube',
        'help.html': 'Help & FAQ',
        'safety.html': 'Safety',
        'mods.html': 'Game Mods',
        'requirements.html': 'Requirements',
        'gta': 'GTA V',
        'cs2': 'Counter-Strike 2',
        'gmod': "Garry's Mod",
        'rdr2': 'Red Dead Redemption 2',
        'cod': 'Call of Duty',
        'battlefield': 'Battlefield',
        'tf2': 'Team Fortress 2',
        'left4dead': 'Left 4 Dead',
        'farlight84': 'Farlight 84',
        'valorant': 'Valorant',
        'apex': 'Apex Legends',
        'rust': 'Rust',
        'fortnite': 'Fortnite',
        'csgo': 'CS:GO',
        'other': 'Other Games',
        'games': 'Free Cheats',
        'tools': 'Tools',
        'cheatengine': 'Cheat Engine',
        'injectors.html': 'Injectors',
        'sources.html': 'Cheat Sources',
        'console': 'Console',
        'xbox360.html': 'Xbox 360',
        'ps3.html': 'PlayStation 3',
        'emulators.html': 'Emulators'
    };

    function generateBreadcrumbs() {
        // Get the main content container
        const mainContent = document.getElementById('main-content');
        if (!mainContent) return;

        // Check if we're on the home page
        const path = window.location.pathname;
        if (path === '/' || path.endsWith('/index.html') && !path.includes('/games/') && !path.includes('/tools/') && !path.includes('/console/')) {
            return; // Don't show breadcrumbs on home page
        }

        // Parse the URL path
        const pathSegments = path.split('/').filter(segment => segment && segment !== 'index.html');

        if (pathSegments.length === 0) return;

        // Create breadcrumb container
        const breadcrumbNav = document.createElement('nav');
        breadcrumbNav.className = 'breadcrumb';
        breadcrumbNav.setAttribute('aria-label', 'Breadcrumb');

        // Add home link
        const homeLink = document.createElement('a');
        homeLink.href = getRelativePath() + 'index.html';
        homeLink.innerHTML = '<i class="fas fa-home"></i> Home';
        breadcrumbNav.appendChild(homeLink);

        // Build breadcrumb trail
        let currentPath = '';
        pathSegments.forEach((segment, index) => {
            // Skip if it's a file extension
            if (segment.includes('.html')) {
                segment = segment.replace('.html', '');
            }

            // Add separator
            const separator = document.createElement('span');
            separator.className = 'breadcrumb-separator';
            separator.textContent = '›';
            breadcrumbNav.appendChild(separator);

            // Get display name
            const displayName = pageNames[segment] || capitalize(segment);

            // Check if this is the last segment (current page)
            const isLast = index === pathSegments.length - 1;

            if (isLast) {
                // Current page - no link
                const current = document.createElement('span');
                current.className = 'breadcrumb-current';
                current.textContent = displayName;
                breadcrumbNav.appendChild(current);
            } else {
                // Intermediate page - add link
                currentPath += '../';
                const link = document.createElement('a');
                link.href = currentPath + segment + (segment.includes('.html') ? '' : '/index.html');
                link.textContent = displayName;
                breadcrumbNav.appendChild(link);
            }
        });

        // Insert breadcrumb at the top of main content
        const container = mainContent.querySelector('.container');
        if (container) {
            container.insertBefore(breadcrumbNav, container.firstChild);
        }
    }

    function getRelativePath() {
        const depth = window.location.pathname.split('/').filter(s => s && s !== 'index.html').length;
        return '../'.repeat(depth);
    }

    function capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1).replace(/-/g, ' ');
    }

    // Initialize breadcrumbs when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', generateBreadcrumbs);
    } else {
        generateBreadcrumbs();
    }
})();
