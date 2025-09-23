/**
 * Enhanced Multi-Language Support System
 * Improved with proper character sets and additional languages
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

        // Expanded supported languages
        const supportedLanguages = ['en', 'es', 'fr', 'de', 'it', 'pt', 'ru', 'zh', 'ja', 'ko', 'ar', 'hi', 'th', 'nl', 'tr', 'pl', 'sv', 'no', 'da', 'fi'];

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
            },

            zh: {
                // Navigation
                'Home': '首页',
                'Profile': '个人资料',
                'Discord Servers': 'Discord 服务器',
                'Free Cheats': '免费作弊',
                'YouTube': 'YouTube',
                'Tools': '工具',
                'Console': '控制台',
                'Help & FAQ': '帮助与常见问题',

                // Hero Section
                'Welcome to whatwhatboy\'s': '欢迎来到 whatwhatboy\'s',
                'Game Developer • Content Creator • Discord Community Builder': '游戏开发者 • 内容创作者 • Discord 社区建设者',
                'Explore my projects, join my Discord servers, and access game cheats featured in my YouTube videos.': '探索我的项目，加入我的 Discord 服务器，访问我的 YouTube 视频中的游戏作弊。',
                'View Profile': '查看个人资料',
                'Join Discord': '加入 Discord',
                'Watch Videos': '观看视频',

                // Stats
                'YouTube Subscribers': 'YouTube 订阅者',
                'Discord Servers': 'Discord 服务器',
                'Projects': '项目',
                'Online Now': '当前在线',

                // Games Section
                'Free Game Cheats': '免费游戏作弊',
                'Free cheats featured in my YouTube videos and Discord communities': '我的 YouTube 视频和 Discord 社区中的免费作弊',
                'Search games...': '搜索游戏...',
                'PC Games': 'PC 游戏',
                'View Cheats': '查看作弊',
                'Available': '可用',
                'downloads': '下载',

                // Language Prompt
                'Language Detection': '语言检测',
                'We detected your browser language as': '我们检测到您的浏览器语言为',
                'Would you like to switch to your language or keep English?': '您想切换到您的语言还是保持英语？',
                'Switch Language': '切换语言',
                'Keep English': '保持英语',
                'Language': '语言',
                'Select Language': '选择语言',
                'Language changed successfully!': '语言更改成功！',

                // Common Actions
                'Download': '下载',
                'Video Guide': '视频指南',
                'Browse': '浏览',
                'Visit Site': '访问网站',
                'Close': '关闭'
            },

            ja: {
                // Navigation
                'Home': 'ホーム',
                'Profile': 'プロフィール',
                'Discord Servers': 'Discord サーバー',
                'Free Cheats': '無料チート',
                'YouTube': 'YouTube',
                'Tools': 'ツール',
                'Console': 'コンソール',
                'Help & FAQ': 'ヘルプとFAQ',

                // Hero Section
                'Welcome to whatwhatboy\'s': 'whatwhatboy\'s へようこそ',
                'Game Developer • Content Creator • Discord Community Builder': 'ゲーム開発者 • コンテンツクリエイター • Discord コミュニティビルダー',
                'Explore my projects, join my Discord servers, and access game cheats featured in my YouTube videos.': '私のプロジェクトを探索し、Discord サーバーに参加し、YouTube ビデオで紹介されているゲームチートにアクセスしてください。',
                'View Profile': 'プロフィールを見る',
                'Join Discord': 'Discord に参加',
                'Watch Videos': 'ビデオを見る',

                // Stats
                'YouTube Subscribers': 'YouTube 登録者',
                'Discord Servers': 'Discord サーバー',
                'Projects': 'プロジェクト',
                'Online Now': '現在オンライン',

                // Games Section
                'Free Game Cheats': '無料ゲームチート',
                'Free cheats featured in my YouTube videos and Discord communities': '私の YouTube ビデオと Discord コミュニティで紹介されている無料チート',
                'Search games...': 'ゲームを検索...',
                'PC Games': 'PC ゲーム',
                'View Cheats': 'チートを見る',
                'Available': '利用可能',
                'downloads': 'ダウンロード',

                // Language Prompt
                'Language Detection': '言語検出',
                'We detected your browser language as': 'ブラウザの言語を検出しました:',
                'Would you like to switch to your language or keep English?': 'あなたの言語に切り替えますか、それとも英語のままにしますか？',
                'Switch Language': '言語を切り替える',
                'Keep English': '英語のまま',
                'Language': '言語',
                'Select Language': '言語を選択',
                'Language changed successfully!': '言語が正常に変更されました！',

                // Common Actions
                'Download': 'ダウンロード',
                'Video Guide': 'ビデオガイド',
                'Browse': '閲覧',
                'Visit Site': 'サイトを訪問',
                'Close': '閉じる'
            },

            ko: {
                // Navigation
                'Home': '홈',
                'Profile': '프로필',
                'Discord Servers': 'Discord 서버',
                'Free Cheats': '무료 치트',
                'YouTube': 'YouTube',
                'Tools': '도구',
                'Console': '콘솔',
                'Help & FAQ': '도움말 및 FAQ',

                // Hero Section
                'Welcome to whatwhatboy\'s': 'whatwhatboy\'s에 오신 것을 환영합니다',
                'Game Developer • Content Creator • Discord Community Builder': '게임 개발자 • 콘텐츠 크리에이터 • Discord 커뮤니티 빌더',
                'Explore my projects, join my Discord servers, and access game cheats featured in my YouTube videos.': '내 프로젝트를 탐색하고, Discord 서버에 참여하고, YouTube 비디오에서 소개된 게임 치트에 액세스하세요.',
                'View Profile': '프로필 보기',
                'Join Discord': 'Discord 참여',
                'Watch Videos': '동영상 보기',

                // Stats
                'YouTube Subscribers': 'YouTube 구독자',
                'Discord Servers': 'Discord 서버',
                'Projects': '프로젝트',
                'Online Now': '현재 온라인',

                // Games Section
                'Free Game Cheats': '무료 게임 치트',
                'Free cheats featured in my YouTube videos and Discord communities': '내 YouTube 비디오와 Discord 커뮤니티에서 소개된 무료 치트',
                'Search games...': '게임 검색...',
                'PC Games': 'PC 게임',
                'View Cheats': '치트 보기',
                'Available': '사용 가능',
                'downloads': '다운로드',

                // Language Prompt
                'Language Detection': '언어 감지',
                'We detected your browser language as': '브라우저 언어를 다음과 같이 감지했습니다:',
                'Would you like to switch to your language or keep English?': '귀하의 언어로 전환하시겠습니까, 아니면 영어를 유지하시겠습니까?',
                'Switch Language': '언어 전환',
                'Keep English': '영어 유지',
                'Language': '언어',
                'Select Language': '언어 선택',
                'Language changed successfully!': '언어가 성공적으로 변경되었습니다!',

                // Common Actions
                'Download': '다운로드',
                'Video Guide': '비디오 가이드',
                'Browse': '찾아보기',
                'Visit Site': '사이트 방문',
                'Close': '닫기'
            },

            th: {
                // Navigation
                'Home': 'หน้าหลัก',
                'Profile': 'โปรไฟล์',
                'Discord Servers': 'เซิร์ฟเวอร์ Discord',
                'Free Cheats': 'โกงฟรี',
                'YouTube': 'YouTube',
                'Tools': 'เครื่องมือ',
                'Console': 'คอนโซล',
                'Help & FAQ': 'ช่วยเหลือและคำถามที่พบบ่อย',

                // Hero Section
                'Welcome to whatwhatboy\'s': 'ยินดีต้อนรับสู่ whatwhatboy\'s',
                'Game Developer • Content Creator • Discord Community Builder': 'นักพัฒนาเกม • ผู้สร้างเนื้อหา • ผู้สร้างชุมชน Discord',
                'Explore my projects, join my Discord servers, and access game cheats featured in my YouTube videos.': 'สำรวจโปรเจ็กต์ของฉัน เข้าร่วมเซิร์ฟเวอร์ Discord และเข้าถึงโกงเกมที่แนะนำในวิดีโอ YouTube ของฉัน',
                'View Profile': 'ดูโปรไฟล์',
                'Join Discord': 'เข้าร่วม Discord',
                'Watch Videos': 'ดูวิดีโอ',

                // Stats
                'YouTube Subscribers': 'ผู้ติดตาม YouTube',
                'Discord Servers': 'เซิร์ฟเวอร์ Discord',
                'Projects': 'โปรเจ็กต์',
                'Online Now': 'ออนไลน์ตอนนี้',

                // Games Section
                'Free Game Cheats': 'โกงเกมฟรี',
                'Free cheats featured in my YouTube videos and Discord communities': 'โกงฟรีที่แนะนำในวิดีโอ YouTube และชุมชน Discord ของฉัน',
                'Search games...': 'ค้นหาเกม...',
                'PC Games': 'เกม PC',
                'View Cheats': 'ดูโกง',
                'Available': 'พร้อมใช้งาน',
                'downloads': 'ดาวน์โหลด',

                // Language Prompt
                'Language Detection': 'การตรวจจับภาษา',
                'We detected your browser language as': 'เราตรวจพบภาษาเบราว์เซอร์ของคุณเป็น',
                'Would you like to switch to your language or keep English?': 'คุณต้องการเปลี่ยนเป็นภาษาของคุณหรือคงไว้เป็นภาษาอังกฤษ?',
                'Switch Language': 'เปลี่ยนภาษา',
                'Keep English': 'คงไว้เป็นภาษาอังกฤษ',
                'Language': 'ภาษา',
                'Select Language': 'เลือกภาษา',
                'Language changed successfully!': 'เปลี่ยนภาษาสำเร็จ!',

                // Common Actions
                'Download': 'ดาวน์โหลด',
                'Video Guide': 'คู่มือวิดีโอ',
                'Browse': 'เรียกดู',
                'Visit Site': 'เยี่ยมชมเว็บไซต์',
                'Close': 'ปิด'
            },

            ar: {
                // Navigation
                'Home': 'الرئيسية',
                'Profile': 'الملف الشخصي',
                'Discord Servers': 'خوادم Discord',
                'Free Cheats': 'الغش المجاني',
                'YouTube': 'YouTube',
                'Tools': 'الأدوات',
                'Console': 'وحدة التحكم',
                'Help & FAQ': 'المساعدة والأسئلة الشائعة',

                // Hero Section
                'Welcome to whatwhatboy\'s': 'مرحباً بك في whatwhatboy\'s',
                'Game Developer • Content Creator • Discord Community Builder': 'مطور ألعاب • منشئ محتوى • باني مجتمع Discord',
                'Explore my projects, join my Discord servers, and access game cheats featured in my YouTube videos.': 'استكشف مشاريعي، انضم إلى خوادم Discord الخاصة بي، واحصل على غش الألعاب المعروضة في مقاطع YouTube الخاصة بي.',
                'View Profile': 'عرض الملف الشخصي',
                'Join Discord': 'انضم إلى Discord',
                'Watch Videos': 'شاهد المقاطع',

                // Stats
                'YouTube Subscribers': 'مشتركو YouTube',
                'Discord Servers': 'خوادم Discord',
                'Projects': 'المشاريع',
                'Online Now': 'متصل الآن',

                // Games Section
                'Free Game Cheats': 'غش الألعاب المجاني',
                'Free cheats featured in my YouTube videos and Discord communities': 'الغش المجاني المعروض في مقاطع YouTube ومجتمعات Discord الخاصة بي',
                'Search games...': 'البحث عن الألعاب...',
                'PC Games': 'ألعاب الكمبيوتر',
                'View Cheats': 'عرض الغش',
                'Available': 'متاح',
                'downloads': 'التحميلات',

                // Language Prompt
                'Language Detection': 'اكتشاف اللغة',
                'We detected your browser language as': 'لقد اكتشفنا لغة المتصفح الخاص بك كـ',
                'Would you like to switch to your language or keep English?': 'هل تريد التبديل إلى لغتك أم الاحتفاظ بالإنجليزية؟',
                'Switch Language': 'تبديل اللغة',
                'Keep English': 'الاحتفاظ بالإنجليزية',
                'Language': 'اللغة',
                'Select Language': 'اختر اللغة',
                'Language changed successfully!': 'تم تغيير اللغة بنجاح!',

                // Common Actions
                'Download': 'تحميل',
                'Video Guide': 'دليل الفيديو',
                'Browse': 'تصفح',
                'Visit Site': 'زيارة الموقع',
                'Close': 'إغلاق'
            },

            hi: {
                // Navigation
                'Home': 'मुख्य पृष्ठ',
                'Profile': 'प्रोफ़ाइल',
                'Discord Servers': 'Discord सर्वर',
                'Free Cheats': 'मुफ्त चीट्स',
                'YouTube': 'YouTube',
                'Tools': 'उपकरण',
                'Console': 'कंसोल',
                'Help & FAQ': 'सहायता और FAQ',

                // Hero Section
                'Welcome to whatwhatboy\'s': 'whatwhatboy\'s में आपका स्वागत है',
                'Game Developer • Content Creator • Discord Community Builder': 'गेम डेवलपर • कंटेंट क्रिएटर • Discord कम्युनिटी बिल्डर',
                'Explore my projects, join my Discord servers, and access game cheats featured in my YouTube videos.': 'मेरे प्रोजेक्ट्स एक्सप्लोर करें, मेरे Discord सर्वर्स में शामिल हों, और मेरे YouTube वीडियो में फीचर किए गए गेम चीट्स तक पहुंचें।',
                'View Profile': 'प्रोफ़ाइल देखें',
                'Join Discord': 'Discord में शामिल हों',
                'Watch Videos': 'वीडियो देखें',

                // Stats
                'YouTube Subscribers': 'YouTube सब्सक्राइबर्स',
                'Discord Servers': 'Discord सर्वर्स',
                'Projects': 'प्रोजेक्ट्स',
                'Online Now': 'अभी ऑनलाइन',

                // Games Section
                'Free Game Cheats': 'मुफ्त गेम चीट्स',
                'Free cheats featured in my YouTube videos and Discord communities': 'मेरे YouTube वीडियो और Discord कम्युनिटीज में फीचर किए गए मुफ्त चीट्स',
                'Search games...': 'गेम्स खोजें...',
                'PC Games': 'PC गेम्स',
                'View Cheats': 'चीट्स देखें',
                'Available': 'उपलब्ध',
                'downloads': 'डाउनलोड्स',

                // Language Prompt
                'Language Detection': 'भाषा की पहचान',
                'We detected your browser language as': 'हमने आपकी ब्राउज़र भाषा का पता लगाया है:',
                'Would you like to switch to your language or keep English?': 'क्या आप अपनी भाषा में स्विच करना चाहते हैं या अंग्रेजी रखना चाहते हैं?',
                'Switch Language': 'भाषा बदलें',
                'Keep English': 'अंग्रेजी रखें',
                'Language': 'भाषा',
                'Select Language': 'भाषा चुनें',
                'Language changed successfully!': 'भाषा सफलतापूर्वक बदल गई!',

                // Common Actions
                'Download': 'डाउनलोड',
                'Video Guide': 'वीडियो गाइड',
                'Browse': 'ब्राउज़ करें',
                'Visit Site': 'साइट पर जाएं',
                'Close': 'बंद करें'
            },

            // Additional languages
            nl: {
                'Home': 'Start',
                'Profile': 'Profiel',
                'Discord Servers': 'Discord Servers',
                'Free Cheats': 'Gratis Cheats',
                'YouTube': 'YouTube',
                'Tools': 'Gereedschap',
                'Console': 'Console',
                'Help & FAQ': 'Help & FAQ',
                'Welcome to whatwhatboy\'s': 'Welkom bij whatwhatboy\'s',
                'Language': 'Taal',
                'Select Language': 'Selecteer Taal',
                'Language changed successfully!': 'Taal succesvol gewijzigd!'
            },

            tr: {
                'Home': 'Ana Sayfa',
                'Profile': 'Profil',
                'Discord Servers': 'Discord Sunucuları',
                'Free Cheats': 'Ücretsiz Hileler',
                'YouTube': 'YouTube',
                'Tools': 'Araçlar',
                'Console': 'Konsol',
                'Help & FAQ': 'Yardım ve SSS',
                'Welcome to whatwhatboy\'s': 'whatwhatboy\'s\'e Hoş Geldiniz',
                'Language': 'Dil',
                'Select Language': 'Dil Seç',
                'Language changed successfully!': 'Dil başarıyla değiştirildi!'
            },

            pl: {
                'Home': 'Strona główna',
                'Profile': 'Profil',
                'Discord Servers': 'Serwery Discord',
                'Free Cheats': 'Darmowe Cheaty',
                'YouTube': 'YouTube',
                'Tools': 'Narzędzia',
                'Console': 'Konsola',
                'Help & FAQ': 'Pomoc i FAQ',
                'Welcome to whatwhatboy\'s': 'Witamy w whatwhatboy\'s',
                'Language': 'Język',
                'Select Language': 'Wybierz Język',
                'Language changed successfully!': 'Język został pomyślnie zmieniony!'
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
            'th': '🇹🇭 ไทย',
            'ar': '🇸🇦 العربية',
            'hi': '🇮🇳 हिन्दी',
            'pt': '🇵🇹 Português',
            'it': '🇮🇹 Italiano',
            'nl': '🇳🇱 Nederlands',
            'tr': '🇹🇷 Türkçe',
            'pl': '🇵🇱 Polski'
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
            'th': { name: 'Thai', flag: '🇹🇭', native: 'ไทย' },
            'ar': { name: 'Arabic', flag: '🇸🇦', native: 'العربية' },
            'hi': { name: 'Hindi', flag: '🇮🇳', native: 'हिन्दी' },
            'pt': { name: 'Portuguese', flag: '🇵🇹', native: 'Português' },
            'it': { name: 'Italian', flag: '🇮🇹', native: 'Italiano' },
            'nl': { name: 'Dutch', flag: '🇳🇱', native: 'Nederlands' },
            'tr': { name: 'Turkish', flag: '🇹🇷', native: 'Türkçe' },
            'pl': { name: 'Polish', flag: '🇵🇱', native: 'Polski' }
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

        // Set text direction for Arabic
        if (this.currentLanguage === 'ar') {
            document.documentElement.dir = 'rtl';
        } else {
            document.documentElement.dir = 'ltr';
        }
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

            const cleanText = text.replace(/^\s*\w+\s*/, '').trim();
            const translated = this.translate(cleanText);
            if (translated !== cleanText && translated !== text) {
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
            'th': 'ไทย',
            'ar': 'العربية',
            'hi': 'हिन्दी',
            'pt': 'Português',
            'it': 'Italiano',
            'nl': 'Nederlands',
            'tr': 'Türkçe',
            'pl': 'Polski'
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
        max-width: 700px;
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
        justify-content: space-between;
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
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
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
        font-family: inherit;
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
        max-height: 200px;
        overflow-y: auto;
    }

    .lang-option {
        background: var(--bg-tertiary);
        border: 1px solid var(--border-color);
        color: var(--text-secondary);
        padding: 0.5rem 0.75rem;
        border-radius: var(--border-radius-sm);
        cursor: pointer;
        transition: all 0.2s ease;
        font-size: 0.85rem;
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

    /* RTL Support for Arabic */
    [dir="rtl"] .lang-card {
        flex-direction: row-reverse;
    }

    [dir="rtl"] .modal-header {
        flex-direction: row-reverse;
    }

    [dir="rtl"] .language-toggle {
        right: auto;
        left: 4rem;
    }

    /* Font support for different scripts */
    .lang-native {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI",
                     "Noto Sans CJK SC", "Noto Sans CJK TC", "Noto Sans CJK JP", "Noto Sans CJK KR",
                     "Noto Sans Thai", "Noto Sans Arabic", "Noto Sans Devanagari",
                     Roboto, sans-serif;
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

        [dir="rtl"] .language-toggle {
            right: 0.5rem !important;
            left: auto !important;
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