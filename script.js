// Enhanced Portfolio JavaScript with Dark Theme Features and Performance Optimizations

// Theme Management
class ThemeManager {
    constructor() {
        this.currentTheme = localStorage.getItem('theme') || 'light';
        this.themeToggle = null;
        this.themeIcon = null;
        this.init();
    }
    
    init() {
        // Set initial theme
        this.setTheme(this.currentTheme);
        
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupToggle());
        } else {
            this.setupToggle();
        }
    }
    
    setupToggle() {
        this.themeToggle = document.getElementById('theme-toggle');
        this.themeIcon = document.getElementById('theme-icon');
        
        if (this.themeToggle) {
            this.themeToggle.addEventListener('click', () => this.toggleTheme());
            this.updateIcon();
        }
    }
    
    setTheme(theme) {
        this.currentTheme = theme;
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        this.updateIcon();
    }
    
    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        
        // Add transition class for smooth toggle
        if (this.themeToggle) {
            this.themeToggle.classList.add('transitioning');
            setTimeout(() => {
                this.themeToggle.classList.remove('transitioning');
            }, 300);
        }
        
        this.setTheme(newTheme);
    }
    
    updateIcon() {
        if (this.themeIcon) {
            if (this.currentTheme === 'dark') {
                this.themeIcon.className = 'fas fa-sun';
            } else {
                this.themeIcon.className = 'fas fa-moon';
            }
        }
    }
}

// Initialize theme manager
const themeManager = new ThemeManager();

// Performance optimization - use passive listeners where possible
const passiveSupported = (() => {
    let passiveSupported = false;
    try {
        const options = Object.defineProperty({}, 'passive', {
            get: () => {
                passiveSupported = true;
                return false;
            },
        });
        window.addEventListener('test', null, options);
        window.removeEventListener('test', null, options);
    } catch (err) {
        passiveSupported = false;
    }
    return passiveSupported;
})();

// Initialize loading screen with enhanced animation
document.addEventListener('DOMContentLoaded', function() {
    // Enhanced loading screen animation
    const loadingScreen = document.getElementById('loading-screen');
    const loadingText = document.querySelector('.loading-text');
    const loadingSubtitle = document.querySelector('.loading-subtitle');
    
    // Add entrance animations
    if (loadingText) {
        loadingText.style.animation = 'fadeInUp 0.8s ease forwards 0.2s';
        loadingText.style.opacity = '0';
    }
    
    if (loadingSubtitle) {
        loadingSubtitle.style.animation = 'fadeInUp 0.8s ease forwards 0.4s';
        loadingSubtitle.style.opacity = '0';
    }
    
    // Hide loading screen with stagger animation
    setTimeout(() => {
        if (loadingScreen) {
            loadingScreen.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            loadingScreen.style.opacity = '0';
            loadingScreen.style.transform = 'translateY(-20px)';
            
            setTimeout(() => {
                loadingScreen.style.display = 'none';
                // Trigger entrance animations for main content
                document.body.classList.add('loaded');
            }, 600);
        }
    }, 1500);
});

// Enhanced custom cursor functionality with performance optimization
document.addEventListener('DOMContentLoaded', function() {
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    
    if (!cursorDot || !cursorOutline) return; // Exit if elements don't exist
    
    let mouseX = 0;
    let mouseY = 0;
    let outlineX = 0;
    let outlineY = 0;
    let isVisible = false;
    
    // Throttle mouse movement for better performance
    let mouseMoveTimer = null;
    
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        if (!isVisible) {
            cursorDot.style.opacity = '1';
            cursorOutline.style.opacity = '1';
            isVisible = true;
        }
        
        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';
        
        // Clear previous timer
        if (mouseMoveTimer) {
            clearTimeout(mouseMoveTimer);
        }
        
        // Set timer to hide cursor after inactivity
        mouseMoveTimer = setTimeout(() => {
            if (isVisible) {
                cursorDot.style.opacity = '0';
                cursorOutline.style.opacity = '0';
                isVisible = false;
            }
        }, 2000);
    }, passiveSupported ? { passive: true } : false);
    
    // Optimized cursor outline follow with requestAnimationFrame
    let animationId;
    function animateCursorOutline() {
        const ease = 0.15;
        const distance = Math.sqrt(Math.pow(mouseX - outlineX, 2) + Math.pow(mouseY - outlineY, 2));
        
        if (distance > 1) {
            outlineX += (mouseX - outlineX) * ease;
            outlineY += (mouseY - outlineY) * ease;
            
            cursorOutline.style.left = outlineX + 'px';
            cursorOutline.style.top = outlineY + 'px';
        }
        
        animationId = requestAnimationFrame(animateCursorOutline);
    }
    
    animationId = requestAnimationFrame(animateCursorOutline);
    
    // Enhanced cursor hover effects with better selectors
    const interactiveElements = document.querySelectorAll(`
        a, button, .btn, .nav-link, .project-card, 
        .contact-card, .skill-card, [role="button"], 
        input, textarea, select
    `);
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', function() {
            cursorDot.style.transform = 'scale(2)';
            cursorOutline.style.transform = 'scale(2)';
            cursorDot.style.mixBlendMode = 'difference';
        }, passiveSupported ? { passive: true } : false);
        
        el.addEventListener('mouseleave', function() {
            cursorDot.style.transform = 'scale(1)';
            cursorOutline.style.transform = 'scale(1)';
            cursorDot.style.mixBlendMode = 'normal';
        }, passiveSupported ? { passive: true } : false);
    });
    
    // Hide cursor when leaving window
    document.addEventListener('mouseleave', function() {
        if (isVisible) {
            cursorDot.style.opacity = '0';
            cursorOutline.style.opacity = '0';
            isVisible = false;
        }
    });
    
    // Show cursor when entering window
    document.addEventListener('mouseenter', function() {
        if (!isVisible) {
            cursorDot.style.opacity = '1';
            cursorOutline.style.opacity = '1';
            isVisible = true;
        }
    });
    
    // Cleanup on page unload
    window.addEventListener('beforeunload', function() {
        if (animationId) {
            cancelAnimationFrame(animationId);
        }
        if (mouseMoveTimer) {
            clearTimeout(mouseMoveTimer);
        }
    });
});

// Enhanced Mobile Navigation with better UX
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const body = document.body;

if (navToggle && navMenu) {
    let isMenuOpen = false;
    
    navToggle.addEventListener('click', function(e) {
        e.preventDefault();
        isMenuOpen = !isMenuOpen;
        
        // Toggle menu visibility
        navMenu.classList.toggle('active', isMenuOpen);
        navToggle.classList.toggle('active', isMenuOpen);
        
        // Prevent body scroll when menu is open
        body.style.overflow = isMenuOpen ? 'hidden' : '';
        
        // Enhanced hamburger animation
        const bars = navToggle.querySelectorAll('.bar');
        bars.forEach((bar, index) => {
            if (isMenuOpen) {
                bar.style.transformOrigin = 'center';
                if (index === 0) {
                    bar.style.transform = 'rotate(45deg) translate(5px, 5px)';
                } else if (index === 1) {
                    bar.style.opacity = '0';
                    bar.style.transform = 'scale(0)';
                } else if (index === 2) {
                    bar.style.transform = 'rotate(-45deg) translate(7px, -6px)';
                }
            } else {
                bar.style.transform = 'none';
                bar.style.opacity = '1';
            }
        });
        
        // Add focus trap for accessibility
        if (isMenuOpen) {
            const firstFocusableElement = navMenu.querySelector('.nav-link');
            if (firstFocusableElement) {
                setTimeout(() => firstFocusableElement.focus(), 300);
            }
        }
    });
    
    // Enhanced mobile menu link handling
    navLinks.forEach((link, index) => {
        link.addEventListener('click', function(e) {
            if (isMenuOpen) {
                // Add delay to see the click effect
                setTimeout(() => {
                    closeMobileMenu();
                }, 150);
            }
        });
        
        // Add keyboard navigation
        link.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && isMenuOpen) {
                closeMobileMenu();
                navToggle.focus();
            }
        });
    });
    
    function closeMobileMenu() {
        isMenuOpen = false;
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        body.style.overflow = '';
        
        const bars = navToggle.querySelectorAll('.bar');
        bars.forEach(bar => {
            bar.style.transform = 'none';
            bar.style.opacity = '1';
        });
    }
    
    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && isMenuOpen) {
            closeMobileMenu();
        }
    });
    
    // Close menu on outside click
    document.addEventListener('click', function(e) {
        if (isMenuOpen && !navMenu.contains(e.target) && !navToggle.contains(e.target)) {
            closeMobileMenu();
        }
    });
    
    // Close menu on window resize (desktop breakpoint)
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            if (window.innerWidth > 768 && isMenuOpen) {
                closeMobileMenu();
            }
        }, 150);
    }, passiveSupported ? { passive: true } : false);
}

// Enhanced smooth scrolling with offset calculation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navbar = document.querySelector('.navbar');
            const headerOffset = navbar ? navbar.offsetHeight : 80;
            const elementPosition = target.offsetTop;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
            
            // Update URL without jumping
            if (history.pushState) {
                history.pushState(null, null, this.getAttribute('href'));
            }
        }
    });
});

// Enhanced navbar scroll effect with throttling
let ticking = false;
function updateNavbar() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        const scrollY = window.scrollY;
        
        if (scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    ticking = false;
}

window.addEventListener('scroll', function() {
    if (!ticking) {
        requestAnimationFrame(updateNavbar);
        ticking = true;
    }
}, passiveSupported ? { passive: true } : false);

// Enhanced active navigation link highlighting with throttling
let navTicking = false;
function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    const scrollY = window.scrollY;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollY >= (sectionTop - 200) && scrollY < (sectionTop + sectionHeight - 200)) {
            current = sectionId;
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href === '#' + current) {
            link.classList.add('active');
        }
    });
    
    navTicking = false;
}

window.addEventListener('scroll', function() {
    if (!navTicking) {
        requestAnimationFrame(updateActiveNav);
        navTicking = true;
    }
}, passiveSupported ? { passive: true } : false);

// Enhanced Intersection Observer for animations with better performance
const observerOptions = {
    threshold: [0, 0.1, 0.25],
    rootMargin: '0px 0px -50px 0px'
};

const animationObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const element = entry.target;
            const delay = element.dataset.delay || 0;
            
            setTimeout(() => {
                element.classList.add('animate-in');
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
                
                // Add stagger effect for child elements
                const children = element.querySelectorAll('.stagger-child');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.classList.add('animate-in');
                    }, index * 100);
                });
            }, delay);
            
            // Unobserve after animation to improve performance
            animationObserver.unobserve(element);
        }
    });
}, observerOptions);

// Counter animation observer
const counterObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const target = parseInt(counter.dataset.target || counter.textContent);
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;
            
            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };
            
            updateCounter();
            counterObserver.unobserve(counter);
        }
    });
});

// Initialize animations when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Observe elements for animation with improved selectors
    const animateElements = document.querySelectorAll(`
        .project-card, .skill-card, .timeline-item, 
        .section-header, .about-card, .contact-card,
        .hero-stats .stat-item, .about-achievements
    `);
    
    animateElements.forEach((el, index) => {
        // Add initial styles for animation
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        
        // Add stagger delay
        el.dataset.delay = index * 50;
        
        animationObserver.observe(el);
    });
    
    // Observe counters
    const counters = document.querySelectorAll('.stat-item h3, .metric-value');
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
    
    // Add entrance animation to hero content
    const heroElements = document.querySelectorAll('.hero-title .title-line');
    heroElements.forEach((line, index) => {
        line.style.animationDelay = `${index * 0.2}s`;
    });
});

// Enhanced parallax effect with performance optimization
let parallaxTicking = false;
function updateParallax() {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    const rateGrid = scrolled * -0.3;
    
    const heroParticles = document.querySelector('.hero-particles');
    const heroGrid = document.querySelector('.hero-grid');
    const heroOrbs = document.querySelectorAll('.gradient-orb');
    
    if (heroParticles) {
        heroParticles.style.transform = `translate3d(0, ${rate}px, 0)`;
    }
    
    if (heroGrid) {
        heroGrid.style.transform = `translate3d(0, ${rateGrid}px, 0)`;
    }
    
    // Animate gradient orbs with different speeds
    heroOrbs.forEach((orb, index) => {
        const orbRate = scrolled * (-0.2 - index * 0.1);
        orb.style.transform = `translate3d(0, ${orbRate}px, 0)`;
    });
    
    parallaxTicking = false;
}

window.addEventListener('scroll', function() {
    if (!parallaxTicking && window.innerWidth > 768) { // Only on desktop
        requestAnimationFrame(updateParallax);
        parallaxTicking = true;
    }
}, passiveSupported ? { passive: true } : false);

// Enhanced project video handling with better UX
document.addEventListener('DOMContentLoaded', function() {
    const videoOverlays = document.querySelectorAll('.video-overlay');
    
    videoOverlays.forEach(overlay => {
        const video = overlay.parentElement.querySelector('video');
        const playButton = overlay.querySelector('.play-button');
        
        if (playButton && video) {
            playButton.addEventListener('click', function() {
                video.play().then(() => {
                    overlay.style.opacity = '0';
                    overlay.style.pointerEvents = 'none';
                }).catch(error => {
                    console.log('Video play failed:', error);
                });
            });
            
            // Show overlay when video ends
            video.addEventListener('ended', function() {
                overlay.style.opacity = '1';
                overlay.style.pointerEvents = 'auto';
            });
            
            // Pause video when not in viewport
            const videoObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (!entry.isIntersecting && !video.paused) {
                        video.pause();
                        overlay.style.opacity = '1';
                        overlay.style.pointerEvents = 'auto';
                    }
                });
            });
            
            videoObserver.observe(video);
        }
    });
});

// Performance monitoring and optimization
document.addEventListener('DOMContentLoaded', function() {
    // Add skip link for accessibility
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.className = 'skip-link';
    skipLink.textContent = 'Skip to main content';
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add main landmark if not exists
    const heroSection = document.querySelector('#hero');
    if (heroSection && !document.querySelector('main')) {
        heroSection.setAttribute('role', 'main');
        heroSection.setAttribute('id', 'main');
    }
    
    // Preload critical resources
    const criticalImages = document.querySelectorAll('img[data-preload]');
    criticalImages.forEach(img => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = img.src;
        document.head.appendChild(link);
    });
    
    // Lazy load non-critical images
    const lazyImages = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
    
    // Add focus visible polyfill behavior
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('using-keyboard');
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('using-keyboard');
    });
});

// Error handling and fallbacks
window.addEventListener('error', function(e) {
    console.warn('Portfolio script error:', e.error);
    // Graceful degradation - ensure basic functionality works
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
    }
});

// Cleanup on page unload
window.addEventListener('beforeunload', function() {
    // Cancel any ongoing animations
    const observers = [animationObserver, counterObserver];
    observers.forEach(observer => {
        if (observer && observer.disconnect) {
            observer.disconnect();
        }
    });
});

// ========================================
// CONTACT MODAL FUNCTIONALITY
// ========================================

// Modal functions
function openContactModal() {
    const modal = document.getElementById('contactModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Focus on first input
        setTimeout(() => {
            const firstInput = modal.querySelector('input[name="name"]');
            if (firstInput) firstInput.focus();
        }, 300);
    }
}

function closeContactModal() {
    const modal = document.getElementById('contactModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        
        // Reset form
        const form = modal.querySelector('#contactForm');
        if (form) {
            form.reset();
            hideFormMessage();
        }
    }
}

// Close modal on overlay click
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('contactModal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeContactModal();
            }
        });
        
        // Close on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeContactModal();
            }
        });
    }
});

// Form submission with EmailJS
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', handleFormSubmission);
    }
});

async function handleFormSubmission(e) {
    e.preventDefault();
    
    const submitBtn = document.getElementById('submitBtn');
    const formData = new FormData(e.target);
    
    // Show loading state
    setButtonLoading(submitBtn, true);
    hideFormMessage();
    
    try {
        // Prepare email data
        const emailData = {
            to_email: 'mukund.jangid95@gmail.com',
            from_name: formData.get('name'),
            from_email: formData.get('email'),
            company: formData.get('company') || 'Not specified',
            project_type: formData.get('project') || 'Not specified',
            message: formData.get('message'),
            timeline: formData.get('timeline') || 'Not specified',
            timestamp: new Date().toLocaleString()
        };
        
        // Send email using EmailJS (you'll need to set this up)
        const result = await sendEmailJS(emailData);
        
        if (result.success) {
            showFormMessage('Opening your email client... If it doesn\'t open automatically, please copy the email details and send to mukund.jangid95@gmail.com', 'success');
            
            // Reset form after delay
            setTimeout(() => {
                e.target.reset();
                closeContactModal();
            }, 3000);
        } else {
            throw new Error('Failed to send message');
        }
        
    } catch (error) {
        console.error('Form submission error:', error);
        showFormMessage('Sorry, there was an error sending your message. Please try again or contact me directly at mukund.jangid95@gmail.com', 'error');
    } finally {
        setButtonLoading(submitBtn, false);
    }
}

// EmailJS integration (you'll need to configure this)
async function sendEmailJS(emailData) {
    try {
        // For now, we'll use a fallback method
        // You can replace this with actual EmailJS configuration
        
        // Create mailto link as fallback
        const subject = `New Portfolio Contact: ${emailData.project_type}`;
        const body = `
Name: ${emailData.from_name}
Email: ${emailData.from_email}
Company: ${emailData.company}
Project Type: ${emailData.project_type}
Timeline: ${emailData.timeline}

Message:
${emailData.message}

Sent from: Portfolio Website
Time: ${emailData.timestamp}
        `.trim();
        
        const mailtoLink = `mailto:${emailData.to_email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        
        // Try to open email client with fallback handling
        try {
            // Use window.location.href for better compatibility
            window.location.href = mailtoLink;
            
            // Show additional guidance after a short delay
            setTimeout(() => {
                const currentMessage = document.querySelector('.form-message');
                if (currentMessage && currentMessage.textContent.includes('Opening your email client')) {
                    showFormMessage(`Email client opened! If you don't see your email app, you can manually copy this email: mukund.jangid95@gmail.com`, 'info');
                }
            }, 2000);
            
        } catch (error) {
            // If mailto fails, show the email details for manual copying
            console.log('Mailto failed, showing manual copy option');
            showEmailDetails(emailData, subject, body);
        }
        
        return { success: true };
        
        /* 
        // Uncomment and configure this when you set up EmailJS
        const response = await emailjs.send(
            'YOUR_SERVICE_ID',
            'YOUR_TEMPLATE_ID',
            emailData,
            'YOUR_PUBLIC_KEY'
        );
        return { success: true, response };
        */
        
    } catch (error) {
        console.error('EmailJS error:', error);
        return { success: false, error };
    }
}

// Show email details for manual copying if mailto fails
function showEmailDetails(emailData, subject, body) {
    const modal = document.getElementById('contactModal');
    const modalContent = modal.querySelector('.modal-content');
    
    // Create elements instead of using template literals to avoid escaping issues
    modalContent.innerHTML = `
        <div class="email-details">
            <h4>Email Details (Copy & Send Manually)</h4>
            <p>Your email client couldn't open automatically. Please copy the details below:</p>
            <div class="email-field">
                <label>To:</label>
                <div class="email-value">
                    <input type="text" value="${emailData.to_email}" readonly>
                    <button onclick="copyToClipboard('${emailData.to_email}')" class="copy-btn">Copy</button>
                </div>
            </div>
            <div class="email-field">
                <label>Subject:</label>
                <div class="email-value">
                    <input type="text" value="${subject}" readonly>
                    <button onclick="copyToClipboard('${subject.replace(/'/g, "\\'")}', this)" class="copy-btn">Copy</button>
                </div>
            </div>
            <div class="email-field">
                <label>Message:</label>
                <div class="email-value">
                    <textarea readonly rows="8" id="emailBody">${body}</textarea>
                    <button onclick="copyEmailBody()" class="copy-btn">Copy</button>
                </div>
            </div>
            <div class="email-actions">
                <button onclick="location.reload()" class="btn btn-secondary">Start Over</button>
                <button onclick="closeContactModal()" class="btn btn-primary">Close</button>
            </div>
        </div>
    `;
}

// Helper functions for copying
function copyToClipboard(text, button) {
    navigator.clipboard.writeText(text).then(() => {
        if (button) {
            const originalText = button.textContent;
            button.textContent = 'Copied!';
            button.style.background = '#10b981';
            setTimeout(() => {
                button.textContent = originalText;
                button.style.background = '';
            }, 2000);
        }
    }).catch(err => {
        console.error('Copy failed:', err);
    });
}

function copyEmailBody() {
    const textarea = document.getElementById('emailBody');
    const button = event.target;
    copyToClipboard(textarea.value, button);
}

function setButtonLoading(button, isLoading) {
    if (isLoading) {
        button.classList.add('loading');
        button.disabled = true;
    } else {
        button.classList.remove('loading');
        button.disabled = false;
    }
}

function showFormMessage(message, type) {
    const modal = document.getElementById('contactModal');
    let messageDiv = modal.querySelector('.form-message');
    
    if (!messageDiv) {
        messageDiv = document.createElement('div');
        messageDiv.className = 'form-message';
        const form = modal.querySelector('.contact-form');
        form.insertBefore(messageDiv, form.firstChild);
    }
    
    messageDiv.textContent = message;
    messageDiv.className = `form-message ${type}`;
    messageDiv.style.display = 'block';
    
    // Auto-hide success messages
    if (type === 'success') {
        setTimeout(() => hideFormMessage(), 5000);
    }
}

function hideFormMessage() {
    const modal = document.getElementById('contactModal');
    const messageDiv = modal?.querySelector('.form-message');
    if (messageDiv) {
        messageDiv.style.display = 'none';
    }
}

// Make functions globally available
window.openContactModal = openContactModal;
window.closeContactModal = closeContactModal;

// Enhanced hover effects for project cards
document.addEventListener('DOMContentLoaded', function() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            
            const icon = this.querySelector('.project-icon');
            if (icon) {
                icon.style.transform = 'rotateY(180deg)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            
            const icon = this.querySelector('.project-icon');
            if (icon) {
                icon.style.transform = 'rotateY(0deg)';
            }
        });
    });
});

// Typing animation for hero title
document.addEventListener('DOMContentLoaded', function() {
    const titleLines = document.querySelectorAll('.title-line');
    
    titleLines.forEach((line, index) => {
        const text = line.textContent;
        line.textContent = '';
        
        setTimeout(() => {
            let i = 0;
            const typeInterval = setInterval(() => {
                line.textContent += text[i];
                i++;
                if (i >= text.length) {
                    clearInterval(typeInterval);
                }
            }, 50);
        }, index * 800);
    });
});

// Background particle animation
document.addEventListener('DOMContentLoaded', function() {
    createFloatingParticles();
});

function createFloatingParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    const particleCount = 20;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = '2px';
        particle.style.height = '2px';
        particle.style.background = 'rgba(0, 212, 255, 0.3)';
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animation = `floatParticle ${5 + Math.random() * 5}s ease-in-out infinite`;
        particle.style.animationDelay = Math.random() * 2 + 's';
        
        hero.appendChild(particle);
    }
}

// Add keyframe animation for particles
const style = document.createElement('style');
style.textContent = `
    @keyframes floatParticle {
        0%, 100% {
            transform: translateY(0px) translateX(0px);
            opacity: 0.3;
        }
        25% {
            transform: translateY(-20px) translateX(10px);
            opacity: 0.8;
        }
        50% {
            transform: translateY(0px) translateX(20px);
            opacity: 0.5;
        }
        75% {
            transform: translateY(20px) translateX(-10px);
            opacity: 0.8;
        }
    }
`;
document.head.appendChild(style);

// Contact form handling with enhanced validation
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Enhanced form validation
            const formData = new FormData(contactForm);
            const formObject = {};
            let isValid = true;
            
            formData.forEach((value, key) => {
                formObject[key] = value;
                
                // Basic validation
                if (!value.trim()) {
                    isValid = false;
                    const field = contactForm.querySelector(`[name="${key}"]`);
                    field.style.borderColor = 'var(--accent-color)';
                    setTimeout(() => {
                        field.style.borderColor = 'var(--border-color)';
                    }, 3000);
                }
            });
            
            if (!isValid) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Simulate form submission with enhanced feedback
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            submitButton.style.background = 'var(--gradient-accent)';
            
            setTimeout(() => {
                submitButton.textContent = '✓ Message Sent!';
                submitButton.style.background = 'var(--gradient-accent)';
                
                setTimeout(() => {
                    submitButton.textContent = originalText;
                    submitButton.style.background = 'var(--gradient-primary)';
                    submitButton.disabled = false;
                    contactForm.reset();
                }, 3000);
            }, 2000);
        });
    }
});

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(function() {
    // Scroll-based animations and effects
    const scrolled = window.pageYOffset;
    const heroVisual = document.querySelector('.hero-visual');
    
    if (heroVisual) {
        heroVisual.style.transform = `translateY(${scrolled * 0.2}px)`;
    }
}, 16));

// Lazy loading for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
});

// Easter egg: Konami code
document.addEventListener('DOMContentLoaded', function() {
    let konamiCode = [];
    const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
    
    document.addEventListener('keydown', function(e) {
        konamiCode.push(e.keyCode);
        
        if (konamiCode.length > konamiSequence.length) {
            konamiCode.shift();
        }
        
        if (konamiCode.join(',') === konamiSequence.join(',')) {
            document.body.style.background = 'var(--gradient-accent)';
            setTimeout(() => {
                document.body.style.background = 'var(--primary-bg)';
            }, 2000);
        }
    });
});

console.log('🚀 Enhanced Portfolio Website Loaded Successfully!');
console.log('💫 Dark theme with advanced animations active');
console.log('🎯 Ready for professional showcasing');
