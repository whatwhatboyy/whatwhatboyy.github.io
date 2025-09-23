/**
 * Anti-Adblock Detection Script
 * Detects if user has adblock enabled and shows modal requesting them to disable it
 */

class AntiAdblock {
    constructor() {
        this.isAdblockEnabled = false;
        this.checkInterval = null;
        this.modal = null;
        this.init();
    }

    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.startDetection());
        } else {
            this.startDetection();
        }
    }

    startDetection() {
        this.createTestElements();
        this.createModal();

        // Check immediately and then every 3 seconds
        this.detectAdblock();
        this.checkInterval = setInterval(() => this.detectAdblock(), 3000);
    }

    createTestElements() {
        // Create invisible test elements that adblockers typically block
        const testAd = document.createElement('div');
        testAd.innerHTML = '&nbsp;';
        testAd.className = 'adsbox';
        testAd.style.cssText = 'position: absolute; left: -10000px; width: 1px; height: 1px;';
        document.body.appendChild(testAd);

        // Create another test element
        const testAd2 = document.createElement('div');
        testAd2.innerHTML = '&nbsp;';
        testAd2.className = 'ad-banner googlead';
        testAd2.style.cssText = 'position: absolute; left: -10000px; width: 1px; height: 1px;';
        document.body.appendChild(testAd2);

        this.testElements = [testAd, testAd2];
    }

    detectAdblock() {
        let adblockDetected = false;

        // Method 1: Check if test elements are hidden or removed
        this.testElements.forEach(element => {
            if (element.offsetHeight === 0 || element.style.display === 'none' || !element.parentNode) {
                adblockDetected = true;
            }
        });

        // Method 2: Try to create and check a suspicious script element
        try {
            const script = document.createElement('script');
            script.src = 'https://googleads.g.doubleclick.net/pagead/id';
            script.onerror = () => {
                adblockDetected = true;
            };
            document.head.appendChild(script);
            setTimeout(() => {
                if (script.parentNode) {
                    script.parentNode.removeChild(script);
                }
            }, 100);
        } catch (e) {
            adblockDetected = true;
        }

        // Method 3: Check for common adblock extensions
        if (typeof window.uBlock !== 'undefined' ||
            typeof window.adblock !== 'undefined' ||
            typeof window.AdBlock !== 'undefined') {
            adblockDetected = true;
        }

        if (adblockDetected && !this.isAdblockEnabled) {
            this.isAdblockEnabled = true;
            this.showModal();
        } else if (!adblockDetected && this.isAdblockEnabled) {
            this.isAdblockEnabled = false;
            this.hideModal();
        }
    }

    createModal() {
        this.modal = document.createElement('div');
        this.modal.id = 'adblock-modal';
        this.modal.style.cssText = `
            display: none;
            position: fixed;
            z-index: 10000;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.8);
            backdrop-filter: blur(5px);
        `;

        const modalContent = document.createElement('div');
        modalContent.style.cssText = `
            background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
            margin: 10% auto;
            padding: 30px;
            border: 2px solid #6366f1;
            border-radius: 15px;
            width: 90%;
            max-width: 500px;
            text-align: center;
            color: #f8fafc;
            font-family: 'Inter', sans-serif;
            box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
        `;

        modalContent.innerHTML = `
            <div style="margin-bottom: 20px;">
                <i class="fas fa-shield-alt" style="font-size: 48px; color: #ef4444; margin-bottom: 15px;"></i>
                <h2 style="margin: 0 0 10px 0; color: #f8fafc; font-size: 24px;">AdBlock Detected!</h2>
                <p style="margin: 0; color: #cbd5e1; font-size: 16px; line-height: 1.5;">
                    We've detected that you're using an ad blocker. To access our free cheats and support our content creation, please disable your ad blocker for this site.
                </p>
            </div>

            <div style="background: rgba(239, 68, 68, 0.1); border: 1px solid #ef4444; border-radius: 8px; padding: 15px; margin: 20px 0;">
                <p style="margin: 0; color: #fecaca; font-size: 14px;">
                    <i class="fas fa-exclamation-triangle" style="margin-right: 8px;"></i>
                    Our free cheats are supported by ads. Disabling your ad blocker helps us continue providing these resources.
                </p>
            </div>

            <div style="margin: 25px 0;">
                <h3 style="color: #f8fafc; margin-bottom: 15px; font-size: 18px;">How to disable AdBlock:</h3>
                <ol style="text-align: left; color: #cbd5e1; padding-left: 20px; font-size: 14px; line-height: 1.6;">
                    <li>Click on your AdBlock extension icon in your browser</li>
                    <li>Select "Pause on this site" or "Disable on this domain"</li>
                    <li>Refresh the page to continue</li>
                </ol>
            </div>

            <div style="display: flex; gap: 15px; justify-content: center; margin-top: 25px;">
                <button id="adblock-refresh" style="
                    background: #6366f1;
                    color: white;
                    border: none;
                    padding: 12px 24px;
                    border-radius: 8px;
                    cursor: pointer;
                    font-size: 14px;
                    font-weight: 600;
                    transition: background 0.3s ease;
                ">
                    <i class="fas fa-sync-alt" style="margin-right: 8px;"></i>
                    I've Disabled AdBlock
                </button>

                <button id="adblock-continue" style="
                    background: transparent;
                    color: #cbd5e1;
                    border: 1px solid #475569;
                    padding: 12px 24px;
                    border-radius: 8px;
                    cursor: pointer;
                    font-size: 14px;
                    font-weight: 600;
                    transition: all 0.3s ease;
                ">
                    Continue Anyway
                </button>
            </div>

            <p style="margin-top: 20px; color: #94a3b8; font-size: 12px;">
                Thank you for supporting whatwhatboy! ❤️
            </p>
        `;

        this.modal.appendChild(modalContent);
        document.body.appendChild(this.modal);

        // Add event listeners
        const refreshBtn = this.modal.querySelector('#adblock-refresh');
        const continueBtn = this.modal.querySelector('#adblock-continue');

        refreshBtn.addEventListener('click', () => {
            // Force a hard refresh to reload all scripts and check adblock status
            window.location.reload(true);
        });

        continueBtn.addEventListener('click', () => {
            this.hideModal();
            this.stopDetection();
        });

        // Add hover effects
        refreshBtn.addEventListener('mouseenter', () => {
            refreshBtn.style.background = '#5855eb';
        });

        refreshBtn.addEventListener('mouseleave', () => {
            refreshBtn.style.background = '#6366f1';
        });

        continueBtn.addEventListener('mouseenter', () => {
            continueBtn.style.background = 'rgba(71, 85, 105, 0.5)';
            continueBtn.style.borderColor = '#64748b';
        });

        continueBtn.addEventListener('mouseleave', () => {
            continueBtn.style.background = 'transparent';
            continueBtn.style.borderColor = '#475569';
        });
    }

    showModal() {
        if (this.modal) {
            this.modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    }

    hideModal() {
        if (this.modal) {
            this.modal.style.display = 'none';
            document.body.style.overflow = '';
        }
    }

    stopDetection() {
        if (this.checkInterval) {
            clearInterval(this.checkInterval);
            this.checkInterval = null;
        }
    }

    destroy() {
        this.stopDetection();
        if (this.modal && this.modal.parentNode) {
            this.modal.parentNode.removeChild(this.modal);
        }
        // Remove test elements
        this.testElements.forEach(element => {
            if (element.parentNode) {
                element.parentNode.removeChild(element);
            }
        });
    }
}

// Initialize anti-adblock detection
window.antiAdblock = new AntiAdblock();