/**
 * Multi-Language Support System
 * Detects user's browser language and provides language switching functionality
 */

class LanguageSelector {
    constructor() {
        this.currentLanguage = localStorage.getItem('selectedLanguage') || 'en';
        this.userLanguage = this.detectUserLanguage();
        this.hasPrompted = localStorage.getItem('languagePrompted') === 'true';
        this.translations = {};

        this.init();
    }

    init() {
        this.loadTranslations();
        this.createLanguageButton();
        this.addLanguageToSidebar();

        // Check if we should prompt for language
        setTimeout(() => {
            if (!this.hasPrompted && this.userLanguage !== 'en' && this.userLanguage !== this.currentLanguage) {
                this.showLanguagePrompt();
            }
        }, 2000);

        this.applyLanguage();
    }

    detectUserLanguage() {
        const browserLang = navigator.language || navigator.userLanguage;
        const langCode = browserLang.split('-')[0].toLowerCase();

        // Supported languages
        const supportedLanguages = ['en', 'es', 'fr', 'de', 'it', 'pt', 'ru', 'zh', 'ja', 'ko', 'ar', 'hi'];

        return supportedLanguages.includes(langCode) ? langCode : 'en';
    }

    loadTranslations() {
        this.translations = {
            en: {
                // Navigation
                'Home': 'Home',
                'Profile': 'Profile',
                'Discord Servers': 'Discord Servers',
                'Free Cheats': 'Free Cheats',
                'YouTube': 'YouTube',
                'Tools': 'Tools',
                'Console': 'Console',
                'Help & FAQ': 'Help & FAQ',

                // Hero Section
                'Welcome to whatwhatboy\'s': 'Welcome to whatwhatboy\'s',
                'Game Developer • Content Creator • Discord Community Builder': 'Game Developer • Content Creator • Discord Community Builder',
                'Explore my projects, join my Discord servers, and access game cheats featured in my YouTube videos.': 'Explore my projects, join my Discord servers, and access game cheats featured in my YouTube videos.',
                'View Profile': 'View Profile',
                'Join Discord': 'Join Discord',
                'Watch Videos': 'Watch Videos',

                // Stats
                'YouTube Subscribers': 'YouTube Subscribers',
                'Discord Servers': 'Discord Servers',
                'Projects': 'Projects',
                'Online Now': 'Online Now',

                // Games Section
                'Free Game Cheats': 'Free Game Cheats',
                'Free cheats featured in my YouTube videos and Discord communities': 'Free cheats featured in my YouTube videos and Discord communities',
                'Search games...': 'Search games...',
                'PC Games': 'PC Games',
                'View Cheats': 'View Cheats',
                'Available': 'Available',
                'downloads': 'downloads',

                // Language Prompt
                'Language Detection': 'Language Detection',
                'We detected your browser language as': 'We detected your browser language as',
                'Would you like to switch to your language or keep English?': 'Would you like to switch to your language or keep English?',
                'Switch Language': 'Switch Language',
                'Keep English': 'Keep English',
                'Language': 'Language',
                'Select Language': 'Select Language',
                'Language changed successfully!': 'Language changed successfully!',

                // Common Actions
                'Download': 'Download',
                'Video Guide': 'Video Guide',
                'Browse': 'Browse',
                'Visit Site': 'Visit Site',
                'Close': 'Close'
            },

            es: {
                // Navigation
                'Home': 'Inicio',
                'Profile': 'Perfil',
                'Discord Servers': 'Servidores Discord',
                'Free Cheats': 'Trucos Gratis',
                'YouTube': 'YouTube',
                'Tools': 'Herramientas',
                'Console': 'Consola',
                'Help & FAQ': 'Ayuda y FAQ',

                // Hero Section
                'Welcome to whatwhatboy\'s': 'Bienvenido a whatwhatboy\'s',
                'Game Developer • Content Creator • Discord Community Builder': 'Desarrollador de Juegos • Creador de Contenido • Constructor de Comunidades Discord',
                'Explore my projects, join my Discord servers, and access game cheats featured in my YouTube videos.': 'Explora mis proyectos, únete a mis servidores de Discord y accede a trucos de juegos destacados en mis videos de YouTube.',
                'View Profile': 'Ver Perfil',
                'Join Discord': 'Unirse a Discord',
                'Watch Videos': 'Ver Videos',

                // Stats
                'YouTube Subscribers': 'Suscriptores de YouTube',
                'Discord Servers': 'Servidores Discord',
                'Projects': 'Proyectos',
                'Online Now': 'En Línea Ahora',

                // Games Section
                'Free Game Cheats': 'Trucos de Juegos Gratis',
                'Free cheats featured in my YouTube videos and Discord communities': 'Trucos gratuitos destacados en mis videos de YouTube y comunidades de Discord',
                'Search games...': 'Buscar juegos...',
                'PC Games': 'Juegos PC',
                'View Cheats': 'Ver Trucos',
                'Available': 'Disponible',
                'downloads': 'descargas',

                // Language Prompt
                'Language Detection': 'Detección de Idioma',
                'We detected your browser language as': 'Detectamos tu idioma de navegador como',
                'Would you like to switch to your language or keep English?': '¿Te gustaría cambiar a tu idioma o mantener inglés?',
                'Switch Language': 'Cambiar Idioma',
                'Keep English': 'Mantener Inglés',
                'Language': 'Idioma',
                'Select Language': 'Seleccionar Idioma',
                'Language changed successfully!': '¡Idioma cambiado exitosamente!',

                // Common Actions
                'Download': 'Descargar',
                'Video Guide': 'Guía de Video',
                'Browse': 'Navegar',
                'Visit Site': 'Visitar Sitio',
                'Close': 'Cerrar'
            },

            fr: {
                // Navigation
                'Home': 'Accueil',
                'Profile': 'Profil',
                'Discord Servers': 'Serveurs Discord',
                'Free Cheats': 'Triches Gratuites',
                'YouTube': 'YouTube',
                'Tools': 'Outils',
                'Console': 'Console',
                'Help & FAQ': 'Aide et FAQ',

                // Hero Section
                'Welcome to whatwhatboy\'s': 'Bienvenue chez whatwhatboy\'s',
                'Game Developer • Content Creator • Discord Community Builder': 'Développeur de Jeux • Créateur de Contenu • Constructeur de Communautés Discord',
                'Explore my projects, join my Discord servers, and access game cheats featured in my YouTube videos.': 'Explorez mes projets, rejoignez mes serveurs Discord et accédez aux triches de jeux présentées dans mes vidéos YouTube.',
                'View Profile': 'Voir le Profil',
                'Join Discord': 'Rejoindre Discord',
                'Watch Videos': 'Regarder les Vidéos',

                // Stats
                'YouTube Subscribers': 'Abonnés YouTube',
                'Discord Servers': 'Serveurs Discord',
                'Projects': 'Projets',
                'Online Now': 'En Ligne Maintenant',

                // Games Section
                'Free Game Cheats': 'Triches de Jeux Gratuites',
                'Free cheats featured in my YouTube videos and Discord communities': 'Triches gratuites présentées dans mes vidéos YouTube et communautés Discord',
                'Search games...': 'Rechercher des jeux...',
                'PC Games': 'Jeux PC',
                'View Cheats': 'Voir les Triches',
                'Available': 'Disponible',
                'downloads': 'téléchargements',

                // Language Prompt
                'Language Detection': 'Détection de Langue',
                'We detected your browser language as': 'Nous avons détecté votre langue de navigateur comme',
                'Would you like to switch to your language or keep English?': 'Souhaitez-vous basculer vers votre langue ou conserver l\'anglais?',
                'Switch Language': 'Changer de Langue',
                'Keep English': 'Garder l\'Anglais',
                'Language': 'Langue',
                'Select Language': 'Sélectionner la Langue',
                'Language changed successfully!': 'Langue changée avec succès!',

                // Common Actions
                'Download': 'Télécharger',
                'Video Guide': 'Guide Vidéo',
                'Browse': 'Parcourir',
                'Visit Site': 'Visiter le Site',
                'Close': 'Fermer'
            },

            de: {
                // Navigation
                'Home': 'Startseite',
                'Profile': 'Profil',
                'Discord Servers': 'Discord Server',
                'Free Cheats': 'Kostenlose Cheats',
                'YouTube': 'YouTube',
                'Tools': 'Werkzeuge',
                'Console': 'Konsole',
                'Help & FAQ': 'Hilfe & FAQ',

                // Hero Section
                'Welcome to whatwhatboy\'s': 'Willkommen bei whatwhatboy\'s',
                'Game Developer • Content Creator • Discord Community Builder': 'Spieleentwickler • Content Creator • Discord Community Builder',
                'Explore my projects, join my Discord servers, and access game cheats featured in my YouTube videos.': 'Erkunden Sie meine Projekte, treten Sie meinen Discord-Servern bei und greifen Sie auf Spiel-Cheats zu, die in meinen YouTube-Videos vorgestellt werden.',
                'View Profile': 'Profil Anzeigen',
                'Join Discord': 'Discord Beitreten',
                'Watch Videos': 'Videos Ansehen',

                // Stats
                'YouTube Subscribers': 'YouTube Abonnenten',
                'Discord Servers': 'Discord Server',
                'Projects': 'Projekte',
                'Online Now': 'Jetzt Online',

                // Games Section
                'Free Game Cheats': 'Kostenlose Spiel-Cheats',
                'Free cheats featured in my YouTube videos and Discord communities': 'Kostenlose Cheats aus meinen YouTube-Videos und Discord-Communities',
                'Search games...': 'Spiele suchen...',
                'PC Games': 'PC-Spiele',
                'View Cheats': 'Cheats Anzeigen',
                'Available': 'Verfügbar',
                'downloads': 'Downloads',

                // Language Prompt
                'Language Detection': 'Spracherkennung',
                'We detected your browser language as': 'Wir haben Ihre Browser-Sprache erkannt als',
                'Would you like to switch to your language or keep English?': 'Möchten Sie zu Ihrer Sprache wechseln oder bei Englisch bleiben?',
                'Switch Language': 'Sprache Wechseln',
                'Keep English': 'Englisch Behalten',
                'Language': 'Sprache',
                'Select Language': 'Sprache Auswählen',
                'Language changed successfully!': 'Sprache erfolgreich geändert!',

                // Common Actions
                'Download': 'Herunterladen',
                'Video Guide': 'Video-Anleitung',
                'Browse': 'Durchsuchen',
                'Visit Site': 'Website Besuchen',
                'Close': 'Schließen'
            },

            ru: {
                // Navigation
                'Home': 'Главная',
                'Profile': 'Профиль',
                'Discord Servers': 'Discord Серверы',
                'Free Cheats': 'Бесплатные Читы',
                'YouTube': 'YouTube',
                'Tools': 'Инструменты',
                'Console': 'Консоль',
                'Help & FAQ': 'Помощь и FAQ',

                // Hero Section
                'Welcome to whatwhatboy\'s': 'Добро пожаловать к whatwhatboy\'s',
                'Game Developer • Content Creator • Discord Community Builder': 'Разработчик Игр • Создатель Контента • Строитель Discord Сообществ',
                'Explore my projects, join my Discord servers, and access game cheats featured in my YouTube videos.': 'Изучите мои проекты, присоединяйтесь к моим Discord серверам и получите доступ к читам для игр из моих YouTube видео.',
                'View Profile': 'Посмотреть Профиль',
                'Join Discord': 'Присоединиться к Discord',
                'Watch Videos': 'Смотреть Видео',

                // Stats
                'YouTube Subscribers': 'Подписчики YouTube',
                'Discord Servers': 'Discord Серверы',
                'Projects': 'Проекты',
                'Online Now': 'Сейчас Онлайн',

                // Games Section
                'Free Game Cheats': 'Бесплатные Читы для Игр',
                'Free cheats featured in my YouTube videos and Discord communities': 'Бесплатные читы из моих YouTube видео и Discord сообществ',
                'Search games...': 'Поиск игр...',
                'PC Games': 'PC Игры',
                'View Cheats': 'Посмотреть Читы',
                'Available': 'Доступно',
                'downloads': 'загрузок',

                // Language Prompt
                'Language Detection': 'Определение Языка',
                'We detected your browser language as': 'Мы определили язык вашего браузера как',
                'Would you like to switch to your language or keep English?': 'Хотите ли вы переключиться на ваш язык или оставить английский?',
                'Switch Language': 'Сменить Язык',
                'Keep English': 'Оставить Английский',
                'Language': 'Язык',
                'Select Language': 'Выбрать Язык',
                'Language changed successfully!': 'Язык успешно изменён!',

                // Common Actions
                'Download': 'Скачать',
                'Video Guide': 'Видео Гид',
                'Browse': 'Просмотр',
                'Visit Site': 'Посетить Сайт',
                'Close': 'Закрыть'
            }
        };
    }

    createLanguageButton() {
        const langBtn = document.createElement('button');
        langBtn.className = 'language-toggle';
        langBtn.innerHTML = `
            <i class="fas fa-globe"></i>
            <span>${this.getLanguageName(this.currentLanguage)}</span>
        `;
        langBtn.title = 'Change Language';

        langBtn.style.cssText = `
            position: fixed;
            top: 1rem;
            right: 4rem;
            height: 50px;
            padding: 0 1rem;
            border-radius: 25px;
            background: var(--bg-card);
            border: 1px solid var(--border-color);
            color: var(--text-primary);
            cursor: pointer;
            box-shadow: var(--shadow-lg);
            z-index: 9999;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 0.9rem;
            min-width: 80px;
        `;

        langBtn.addEventListener('click', () => this.showLanguageModal());
        langBtn.addEventListener('mouseenter', () => {
            langBtn.style.transform = 'scale(1.05)';
            langBtn.style.borderColor = 'var(--primary-color)';
        });
        langBtn.addEventListener('mouseleave', () => {
            langBtn.style.transform = 'scale(1)';
            langBtn.style.borderColor = 'var(--border-color)';
        });

        document.body.appendChild(langBtn);
        this.langBtn = langBtn;
    }

    addLanguageToSidebar() {
        const sidebarSocial = document.querySelector('.sidebar-social');
        if (!sidebarSocial) return;

        const languageSection = document.createElement('div');
        languageSection.className = 'sidebar-language';
        languageSection.innerHTML = `
            <h4>${this.translate('Language')}</h4>
            <div class="language-options">
                ${this.getLanguageOptions()}
            </div>
        `;

        sidebarSocial.appendChild(languageSection);

        // Add event listeners to language options
        languageSection.querySelectorAll('.lang-option').forEach(option => {
            option.addEventListener('click', () => {
                const lang = option.dataset.lang;
                this.switchLanguage(lang);
            });
        });
    }

    getLanguageOptions() {
        const languages = {
            'en': '🇺🇸 English',
            'es': '🇪🇸 Español',
            'fr': '🇫🇷 Français',
            'de': '🇩🇪 Deutsch',
            'ru': '🇷🇺 Русский',
            'zh': '🇨🇳 中文',
            'ja': '🇯🇵 日本語',
            'ko': '🇰🇷 한국어',
            'pt': '🇵🇹 Português',
            'it': '🇮🇹 Italiano'
        };

        return Object.entries(languages).map(([code, name]) => `
            <button class="lang-option ${code === this.currentLanguage ? 'active' : ''}" data-lang="${code}">
                ${name}
            </button>
        `).join('');
    }

    showLanguagePrompt() {
        const modal = document.createElement('div');
        modal.className = 'language-prompt-modal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            backdrop-filter: blur(5px);
            z-index: 10001;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: fadeIn 0.3s ease;
        `;

        const userLangName = this.getLanguageName(this.userLanguage);

        modal.innerHTML = `
            <div class="language-prompt-content">
                <div class="prompt-header">
                    <i class="fas fa-globe" style="font-size: 3rem; color: var(--primary-color); margin-bottom: 1rem;"></i>
                    <h2>${this.translate('Language Detection')}</h2>
                </div>

                <div class="prompt-body">
                    <p style="margin-bottom: 1.5rem; text-align: center; font-size: 1.1rem;">
                        ${this.translate('We detected your browser language as')} <strong>${userLangName}</strong>
                    </p>
                    <p style="margin-bottom: 2rem; text-align: center; color: var(--text-secondary);">
                        ${this.translate('Would you like to switch to your language or keep English?')}
                    </p>
                </div>

                <div class="prompt-actions">
                    <button class="btn btn-primary switch-lang">
                        <i class="fas fa-language"></i>
                        ${this.translate('Switch Language')} (${userLangName})
                    </button>
                    <button class="btn btn-outline keep-english">
                        <i class="fas fa-check"></i>
                        ${this.translate('Keep English')}
                    </button>
                </div>

                <div class="prompt-footer">
                    <small style="color: var(--text-muted); text-align: center; display: block; margin-top: 1rem;">
                        You can always change this later using the language button
                    </small>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Event listeners
        modal.querySelector('.switch-lang').addEventListener('click', () => {
            this.switchLanguage(this.userLanguage);
            this.markPrompted();
            modal.remove();
        });

        modal.querySelector('.keep-english').addEventListener('click', () => {
            this.markPrompted();
            modal.remove();
        });

        // Close on background click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.markPrompted();
                modal.remove();
            }
        });
    }

    showLanguageModal() {
        const modal = document.createElement('div');
        modal.className = 'language-modal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            backdrop-filter: blur(5px);
            z-index: 10001;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: fadeIn 0.3s ease;
        `;

        modal.innerHTML = `
            <div class="language-modal-content">
                <div class="modal-header">
                    <h2><i class="fas fa-globe"></i> ${this.translate('Select Language')}</h2>
                    <button class="modal-close">&times;</button>
                </div>

                <div class="modal-body">
                    <div class="language-grid">
                        ${this.getLanguageGrid()}
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Event listeners
        modal.querySelector('.modal-close').addEventListener('click', () => modal.remove());
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });

        modal.querySelectorAll('.lang-card').forEach(card => {
            card.addEventListener('click', () => {
                const lang = card.dataset.lang;
                this.switchLanguage(lang);
                modal.remove();
            });
        });
    }

    getLanguageGrid() {
        const languages = {
            'en': { name: 'English', flag: '🇺🇸', native: 'English' },
            'es': { name: 'Spanish', flag: '🇪🇸', native: 'Español' },
            'fr': { name: 'French', flag: '🇫🇷', native: 'Français' },
            'de': { name: 'German', flag: '🇩🇪', native: 'Deutsch' },
            'ru': { name: 'Russian', flag: '🇷🇺', native: 'Русский' },
            'zh': { name: 'Chinese', flag: '🇨🇳', native: '中文' },
            'ja': { name: 'Japanese', flag: '🇯🇵', native: '日本語' },
            'ko': { name: 'Korean', flag: '🇰🇷', native: '한국어' },
            'pt': { name: 'Portuguese', flag: '🇵🇹', native: 'Português' },
            'it': { name: 'Italian', flag: '🇮🇹', native: 'Italiano' }
        };

        return Object.entries(languages).map(([code, info]) => `
            <div class="lang-card ${code === this.currentLanguage ? 'active' : ''}" data-lang="${code}">
                <div class="lang-flag">${info.flag}</div>
                <div class="lang-info">
                    <div class="lang-name">${info.name}</div>
                    <div class="lang-native">${info.native}</div>
                </div>
                ${code === this.currentLanguage ? '<i class="fas fa-check lang-check"></i>' : ''}
            </div>
        `).join('');
    }

    switchLanguage(langCode) {
        if (langCode === this.currentLanguage) return;

        this.currentLanguage = langCode;
        localStorage.setItem('selectedLanguage', langCode);

        this.applyLanguage();
        this.updateLanguageButton();
        this.showNotification();
    }

    applyLanguage() {
        // Find all elements with text content that should be translated
        this.translateElements();

        // Update document language attribute
        document.documentElement.lang = this.currentLanguage;
    }

    translateElements() {
        // Translate navigation
        const navLinks = document.querySelectorAll('.nav-link span');
        navLinks.forEach(span => {
            const text = span.textContent.trim();
            const translated = this.translate(text);
            if (translated !== text) {
                span.textContent = translated;
            }
        });

        // Translate hero section
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            heroTitle.textContent = this.translate('Welcome to whatwhatboy\'s');
        }

        const heroSubtitle = document.querySelector('.hero-subtitle');
        if (heroSubtitle) {
            const parts = heroSubtitle.innerHTML.split('<br>');
            parts[0] = this.translate('Game Developer • Content Creator • Discord Community Builder');
            if (parts[1]) {
                parts[1] = this.translate('Explore my projects, join my Discord servers, and access game cheats featured in my YouTube videos.');
            }
            heroSubtitle.innerHTML = parts.join('<br>');
        }

        // Translate buttons
        this.translateButtons();

        // Translate stats
        this.translateStats();

        // Translate section headers
        this.translateSectionHeaders();

        // Translate placeholders
        this.translatePlaceholders();
    }

    translateButtons() {
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(btn => {
            const text = btn.textContent.trim();
            const icon = btn.querySelector('i');
            const iconClass = icon ? icon.className : '';

            const translated = this.translate(text.replace(/^\s*\w+\s*/, '').trim());
            if (translated !== text) {
                btn.innerHTML = icon ? `<i class="${iconClass}"></i> ${translated}` : translated;
            }
        });
    }

    translateStats() {
        const stats = document.querySelectorAll('.stat p');
        stats.forEach(stat => {
            const text = stat.textContent.trim();
            const translated = this.translate(text);
            if (translated !== text) {
                stat.textContent = translated;
            }
        });
    }

    translateSectionHeaders() {
        const headers = document.querySelectorAll('.section-title, .section-subtitle');
        headers.forEach(header => {
            const text = header.textContent.trim();
            const translated = this.translate(text);
            if (translated !== text) {
                header.textContent = translated;
            }
        });
    }

    translatePlaceholders() {
        const inputs = document.querySelectorAll('input[placeholder]');
        inputs.forEach(input => {
            const placeholder = input.getAttribute('placeholder');
            const translated = this.translate(placeholder);
            if (translated !== placeholder) {
                input.setAttribute('placeholder', translated);
            }
        });
    }

    translate(text) {
        if (!this.translations[this.currentLanguage]) {
            return text;
        }
        return this.translations[this.currentLanguage][text] || text;
    }

    getLanguageName(langCode) {
        const names = {
            'en': 'English',
            'es': 'Español',
            'fr': 'Français',
            'de': 'Deutsch',
            'ru': 'Русский',
            'zh': '中文',
            'ja': '日本語',
            'ko': '한국어',
            'pt': 'Português',
            'it': 'Italiano'
        };
        return names[langCode] || 'English';
    }

    updateLanguageButton() {
        if (this.langBtn) {
            const span = this.langBtn.querySelector('span');
            span.textContent = this.getLanguageName(this.currentLanguage);
        }

        // Update sidebar language options
        const langOptions = document.querySelectorAll('.lang-option');
        langOptions.forEach(option => {
            option.classList.remove('active');
            if (option.dataset.lang === this.currentLanguage) {
                option.classList.add('active');
            }
        });
    }

    markPrompted() {
        localStorage.setItem('languagePrompted', 'true');
        this.hasPrompted = true;
    }

    showNotification() {
        const notification = document.createElement('div');
        notification.className = 'language-notification';
        notification.innerHTML = `
            <i class="fas fa-globe"></i>
            <span>${this.translate('Language changed successfully!')}</span>
        `;
        notification.style.cssText = `
            position: fixed;
            top: 6rem;
            right: 1rem;
            background: var(--bg-card);
            border: 1px solid var(--primary-color);
            border-radius: var(--border-radius);
            padding: 0.75rem 1rem;
            color: var(--text-primary);
            box-shadow: var(--shadow-lg);
            z-index: 10000;
            animation: slideInRight 0.3s ease;
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 0.9rem;
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideInRight 0.3s ease reverse';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// Enhanced CSS for language selector
const languageStyles = `
    /* Language prompt modal styles */
    .language-prompt-content {
        background: var(--bg-card);
        border-radius: var(--border-radius-lg);
        padding: 2rem;
        max-width: 500px;
        width: 90%;
        text-align: center;
        border: 1px solid var(--border-color);
        animation: scaleIn 0.3s ease;
    }

    .language-modal-content {
        background: var(--bg-card);
        border-radius: var(--border-radius-lg);
        padding: 0;
        max-width: 600px;
        width: 90%;
        max-height: 80vh;
        overflow: hidden;
        border: 1px solid var(--border-color);
        animation: scaleIn 0.3s ease;
    }

    .modal-header {
        padding: 1.5rem 2rem;
        border-bottom: 1px solid var(--border-color);
        display: flex;
        justify-content: between;
        align-items: center;
        background: var(--bg-secondary);
    }

    .modal-header h2 {
        margin: 0;
        color: var(--text-primary);
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .modal-close {
        background: none;
        border: none;
        color: var(--text-muted);
        font-size: 1.5rem;
        cursor: pointer;
        margin-left: auto;
    }

    .modal-body {
        padding: 2rem;
        max-height: 60vh;
        overflow-y: auto;
    }

    .language-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1rem;
    }

    .lang-card {
        background: var(--bg-secondary);
        border: 1px solid var(--border-color);
        border-radius: var(--border-radius);
        padding: 1rem;
        cursor: pointer;
        transition: all 0.2s ease;
        display: flex;
        align-items: center;
        gap: 12px;
        position: relative;
    }

    .lang-card:hover {
        border-color: var(--primary-color);
        background: var(--bg-tertiary);
        transform: translateY(-2px);
    }

    .lang-card.active {
        border-color: var(--primary-color);
        background: rgba(99, 102, 241, 0.1);
    }

    .lang-flag {
        font-size: 1.5rem;
    }

    .lang-info {
        flex: 1;
    }

    .lang-name {
        font-weight: 600;
        color: var(--text-primary);
        margin-bottom: 2px;
    }

    .lang-native {
        font-size: 0.9rem;
        color: var(--text-secondary);
    }

    .lang-check {
        color: var(--primary-color);
        font-size: 1.2rem;
    }

    .prompt-actions {
        display: flex;
        gap: 1rem;
        justify-content: center;
        flex-wrap: wrap;
    }

    /* Sidebar language options */
    .sidebar-language {
        margin-top: 1.5rem;
        padding-top: 1rem;
        border-top: 1px solid var(--border-color);
    }

    .sidebar-language h4 {
        color: var(--text-primary);
        margin-bottom: 1rem;
        font-size: 1rem;
    }

    .language-options {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    .lang-option {
        background: var(--bg-tertiary);
        border: 1px solid var(--border-color);
        color: var(--text-secondary);
        padding: 0.5rem 0.75rem;
        border-radius: var(--border-radius-sm);
        cursor: pointer;
        transition: all 0.2s ease;
        font-size: 0.9rem;
        text-align: left;
    }

    .lang-option:hover {
        background: var(--bg-primary);
        border-color: var(--primary-color);
        color: var(--text-primary);
    }

    .lang-option.active {
        background: var(--primary-color);
        border-color: var(--primary-color);
        color: white;
    }

    /* Animations */
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }

    @keyframes scaleIn {
        from {
            opacity: 0;
            transform: scale(0.9);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }

    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100%);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    /* Mobile responsive */
    @media (max-width: 768px) {
        .language-toggle {
            top: 0.5rem !important;
            right: 0.5rem !important;
            height: 45px !important;
            padding: 0 0.75rem !important;
            min-width: 70px !important;
        }

        .language-toggle span {
            display: none;
        }

        .language-grid {
            grid-template-columns: 1fr;
        }

        .prompt-actions {
            flex-direction: column;
        }

        .language-prompt-content,
        .language-modal-content {
            margin: 1rem;
            width: calc(100% - 2rem);
        }
    }
`;

// Inject the styles
const languageStyleSheet = document.createElement('style');
languageStyleSheet.textContent = languageStyles;
document.head.appendChild(languageStyleSheet);

// Initialize language selector when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new LanguageSelector();
    });
} else {
    new LanguageSelector();
}