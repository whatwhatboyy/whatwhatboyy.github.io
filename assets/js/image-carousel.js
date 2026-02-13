/**
 * Image Carousel Component
 * Allows multiple cheat preview images with arrow navigation
 */

class ImageCarousel {
    constructor() {
        this.carousels = new Map();
        this.init();
    }

    init() {
        // Initialize all carousels on page load
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeCarousels());
        } else {
            this.initializeCarousels();
        }
    }

    initializeCarousels() {
        // Find all cheat cards and convert single images to carousels if they have multiple images
        const cheatCards = document.querySelectorAll('.cheat-card');
        cheatCards.forEach((card, index) => {
            const imageContainer = card.querySelector('.cheat-image');
            if (imageContainer) {
                // Check if this card has carousel data
                const carouselData = card.dataset.carouselImages;
                if (carouselData) {
                    this.createCarousel(card, imageContainer, carouselData, index);
                }
            }
        });
    }

    createCarousel(card, imageContainer, carouselData, cardIndex) {
        try {
            const images = JSON.parse(carouselData);
            if (images && images.length > 1) {
                const carouselId = `carousel-${cardIndex}`;
                const carousel = this.buildCarouselHTML(images, carouselId);

                // Replace the single image with carousel
                imageContainer.innerHTML = carousel;

                // Initialize carousel functionality
                this.initializeCarouselControls(carouselId, images);

                // Store carousel data
                this.carousels.set(carouselId, {
                    images: images,
                    currentIndex: 0
                });
            }
        } catch (error) {
            console.warn('Invalid carousel data for card:', error);
        }
    }

    buildCarouselHTML(images, carouselId) {
        return `
            <div class="image-carousel" id="${carouselId}">
                <div class="carousel-container">
                    <div class="carousel-track" id="${carouselId}-track">
                        ${images.map((img, index) => `
                            <div class="carousel-slide ${index === 0 ? 'active' : ''}" data-index="${index}">
                                <img src="${img.src}" alt="${img.alt || 'Cheat preview'}" onclick="openImageModal(this.src)">
                            </div>
                        `).join('')}
                    </div>

                    <button class="carousel-btn carousel-prev" id="${carouselId}-prev" aria-label="Previous image">
                        <i class="fas fa-chevron-left"></i>
                    </button>

                    <button class="carousel-btn carousel-next" id="${carouselId}-next" aria-label="Next image">
                        <i class="fas fa-chevron-right"></i>
                    </button>

                    <div class="carousel-indicators" id="${carouselId}-indicators">
                        ${images.map((_, index) => `
                            <button class="carousel-indicator ${index === 0 ? 'active' : ''}" data-index="${index}" aria-label="Go to slide ${index + 1}"></button>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    initializeCarouselControls(carouselId, images) {
        const carousel = document.getElementById(carouselId);
        const track = document.getElementById(`${carouselId}-track`);
        const prevBtn = document.getElementById(`${carouselId}-prev`);
        const nextBtn = document.getElementById(`${carouselId}-next`);
        const indicators = document.getElementById(`${carouselId}-indicators`);

        if (!carousel || !track || !prevBtn || !nextBtn) return;

        let currentIndex = 0;

        // Previous button click
        prevBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            currentIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1;
            this.updateCarousel(carouselId, track, indicators, currentIndex);
        });

        // Next button click
        nextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            currentIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0;
            this.updateCarousel(carouselId, track, indicators, currentIndex);
        });

        // Indicator clicks
        if (indicators) {
            indicators.addEventListener('click', (e) => {
                if (e.target.classList.contains('carousel-indicator')) {
                    e.preventDefault();
                    e.stopPropagation();
                    currentIndex = parseInt(e.target.dataset.index);
                    this.updateCarousel(carouselId, track, indicators, currentIndex);
                }
            });
        }

        // Touch/swipe support for mobile
        this.addTouchSupport(carousel, () => {
            // Swipe left (next)
            currentIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0;
            this.updateCarousel(carouselId, track, indicators, currentIndex);
        }, () => {
            // Swipe right (previous)
            currentIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1;
            this.updateCarousel(carouselId, track, indicators, currentIndex);
        });

        // Auto-advance carousel (optional)
        if (images.length > 1) {
            this.startAutoAdvance(carouselId, () => {
                currentIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0;
                this.updateCarousel(carouselId, track, indicators, currentIndex);
            });
        }

        // Update carousel data
        this.carousels.set(carouselId, {
            images: images,
            currentIndex: currentIndex
        });
    }

    updateCarousel(carouselId, track, indicators, newIndex) {
        // Update slides
        const slides = track.querySelectorAll('.carousel-slide');
        slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === newIndex);
        });

        // Update indicators
        if (indicators) {
            const indicatorButtons = indicators.querySelectorAll('.carousel-indicator');
            indicatorButtons.forEach((btn, index) => {
                btn.classList.toggle('active', index === newIndex);
            });
        }

        // Transform track to show current slide
        track.style.transform = `translateX(-${newIndex * 100}%)`;

        // Update stored index
        const carouselData = this.carousels.get(carouselId);
        if (carouselData) {
            carouselData.currentIndex = newIndex;
        }
    }

    addTouchSupport(carousel, onSwipeLeft, onSwipeRight) {
        let startX = 0;
        let startY = 0;
        let moveX = 0;
        let moveY = 0;

        carousel.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        });

        carousel.addEventListener('touchmove', (e) => {
            if (!startX || !startY) return;

            moveX = e.touches[0].clientX;
            moveY = e.touches[0].clientY;

            const diffX = startX - moveX;
            const diffY = startY - moveY;

            // Prevent vertical scrolling during horizontal swipe
            if (Math.abs(diffX) > Math.abs(diffY)) {
                e.preventDefault();
            }
        });

        carousel.addEventListener('touchend', (e) => {
            if (!startX || !moveX) return;

            const diffX = startX - moveX;
            const diffY = startY - moveY;
            const threshold = 50;

            // Only trigger if horizontal swipe is more significant than vertical
            if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > threshold) {
                if (diffX > 0) {
                    onSwipeLeft(); // Swipe left = next
                } else {
                    onSwipeRight(); // Swipe right = previous
                }
            }

            // Reset values
            startX = 0;
            startY = 0;
            moveX = 0;
            moveY = 0;
        });
    }

    startAutoAdvance(carouselId, advanceFunction) {
        const carousel = document.getElementById(carouselId);
        let autoAdvanceInterval;

        const startAutoAdvance = () => {
            autoAdvanceInterval = setInterval(advanceFunction, 5000); // 5 seconds
        };

        const stopAutoAdvance = () => {
            if (autoAdvanceInterval) {
                clearInterval(autoAdvanceInterval);
                autoAdvanceInterval = null;
            }
        };

        // Pause auto-advance on hover
        carousel.addEventListener('mouseenter', stopAutoAdvance);
        carousel.addEventListener('mouseleave', startAutoAdvance);

        // Pause auto-advance when user interacts
        carousel.addEventListener('click', () => {
            stopAutoAdvance();
            setTimeout(startAutoAdvance, 10000); // Resume after 10 seconds
        });

        // Start auto-advance
        startAutoAdvance();
    }

    // Public method to add images to existing carousel
    addImageToCarousel(cardElement, imageData) {
        const existingData = cardElement.dataset.carouselImages;
        let images = [];

        try {
            images = existingData ? JSON.parse(existingData) : [];
        } catch (error) {
            images = [];
        }

        images.push(imageData);
        cardElement.dataset.carouselImages = JSON.stringify(images);

        // Reinitialize the carousel
        const imageContainer = cardElement.querySelector('.cheat-image');
        if (imageContainer) {
            const cardIndex = Array.from(document.querySelectorAll('.cheat-card')).indexOf(cardElement);
            this.createCarousel(cardElement, imageContainer, JSON.stringify(images), cardIndex);
        }
    }

    // Public method to remove image from carousel
    removeImageFromCarousel(cardElement, imageIndex) {
        const existingData = cardElement.dataset.carouselImages;
        let images = [];

        try {
            images = existingData ? JSON.parse(existingData) : [];
        } catch (error) {
            return;
        }

        if (imageIndex >= 0 && imageIndex < images.length) {
            images.splice(imageIndex, 1);
            cardElement.dataset.carouselImages = JSON.stringify(images);

            // Reinitialize the carousel
            const imageContainer = cardElement.querySelector('.cheat-image');
            if (imageContainer) {
                const cardIndex = Array.from(document.querySelectorAll('.cheat-card')).indexOf(cardElement);
                this.createCarousel(cardElement, imageContainer, JSON.stringify(images), cardIndex);
            }
        }
    }
}

// Initialize carousel system
window.imageCarousel = new ImageCarousel();