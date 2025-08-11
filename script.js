// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initStickyHeader();
    initSmoothScrolling();
    initFAQAccordion();
    initVideoLazyLoading();
    initCTATracking();
    initScrollAnimations();
    initCounterAnimations();
    initParallaxEffects();
    initPerformanceMonitoring();
    initAccessibility();

    console.log('LeadWorxAI website initialized successfully');
});

// Sticky Header with Advanced Effects
function initStickyHeader() {
    const header = document.getElementById('header');
    let lastScrollTop = 0;
    let ticking = false;

    function updateHeader() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 4px 30px rgba(93, 0, 181, 0.15)';
            header.style.backdropFilter = 'blur(20px)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
            header.style.backdropFilter = 'blur(10px)';
        }
        
        // Hide/show header on scroll
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
        ticking = false;
    }

    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateHeader);
            ticking = true;
        }
    });
}

// Smooth Scrolling with Easing
function initSmoothScrolling() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const header = document.getElementById('header');
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                // Smooth scroll with custom easing
                smoothScrollTo(targetPosition, 800);
            }
        });
    });
}

// Custom smooth scroll function with easing
function smoothScrollTo(target, duration) {
    const start = window.pageYOffset;
    const distance = target - start;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = easeInOutCubic(timeElapsed, start, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function easeInOutCubic(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t * t + b;
        t -= 2;
        return c / 2 * (t * t * t + 2) + b;
    }

    requestAnimationFrame(animation);
}

// Enhanced FAQ Accordion
function initFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            
            // Close all other FAQ items with animation
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
                    
                    // Animate close
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    otherAnswer.style.maxHeight = '0px';
                }
            });
            
            // Toggle current item with animation
            if (isActive) {
                item.classList.remove('active');
                question.setAttribute('aria-expanded', 'false');
                answer.style.maxHeight = '0px';
            } else {
                item.classList.add('active');
                question.setAttribute('aria-expanded', 'true');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });
}

// Video Lazy Loading with Intersection Observer
function initVideoLazyLoading() {
    const video = document.querySelector('.hero-video');
    const playButton = document.querySelector('.play-button');
    
    if (video) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    video.setAttribute('preload', 'metadata');
                    observer.unobserve(video);
                }
            });
        }, {
            threshold: 0.1
        });
        
        observer.observe(video);
        
        // Custom play button functionality
        if (playButton) {
            playButton.addEventListener('click', function() {
                if (video.paused) {
                    video.play();
                    playButton.style.opacity = '0';
                } else {
                    video.pause();
                    playButton.style.opacity = '1';
                }
            });
            
            video.addEventListener('play', function() {
                playButton.style.opacity = '0';
            });
            
            video.addEventListener('pause', function() {
                playButton.style.opacity = '1';
            });
        }
    }
}

// CTA Click Tracking with Enhanced Analytics
function initCTATracking() {
    const ctaButtons = document.querySelectorAll('.cta-book');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Analytics tracking
            const eventData = {
                event: 'cta_click',
                element: this.tagName.toLowerCase(),
                text: this.textContent.trim(),
                position: this.getAttribute('data-position') || 'unknown',
                timestamp: new Date().toISOString()
            };
            
            console.log('CTA clicked:', eventData);
            
            // Future analytics integration point
            // if (typeof fbq !== 'undefined') {
            //     fbq('track', 'Lead', eventData);
            // }
        });
    });
}

// Advanced Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Add staggered animation for grid items
                if (entry.target.parentElement.classList.contains('tiles-grid') ||
                    entry.target.parentElement.classList.contains('steps-grid') ||
                    entry.target.parentElement.classList.contains('testimonials-grid')) {
                    
                    const siblings = Array.from(entry.target.parentElement.children);
                    const index = siblings.indexOf(entry.target);
                    entry.target.style.animationDelay = `${index * 0.1}s`;
                }
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.fade-in-up');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Counter Animations for Statistics
function initCounterAnimations() {
    const counters = document.querySelectorAll('.stat-number[data-count]');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-count'));
    const duration = 2000; // 2 seconds
    const start = performance.now();
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - start;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOutCubic = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(target * easeOutCubic);
        
        element.textContent = current.toLocaleString();
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target.toLocaleString();
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// Parallax Effects
function initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.hero-background');
    
    if (parallaxElements.length > 0) {
        let ticking = false;
        
        function updateParallax() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            parallaxElements.forEach(element => {
                element.style.transform = `translateY(${rate}px)`;
            });
            
            ticking = false;
        }
        
        window.addEventListener('scroll', function() {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        });
    }
}

// Performance Monitoring
function initPerformanceMonitoring() {
    if ('performance' in window) {
        window.addEventListener('load', function() {
            setTimeout(function() {
                const perfData = performance.getEntriesByType('navigation')[0];
                const loadTime = perfData.loadEventEnd - perfData.loadEventStart;
                
                console.log('Performance metrics:', {
                    loadTime: loadTime + 'ms',
                    domContentLoaded: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart + 'ms',
                    firstPaint: performance.getEntriesByType('paint')[0]?.startTime + 'ms'
                });
                
                // Track Core Web Vitals if available
                if ('PerformanceObserver' in window) {
                    try {
                        // Largest Contentful Paint
                        new PerformanceObserver((entryList) => {
                            const entries = entryList.getEntries();
                            const lastEntry = entries[entries.length - 1];
                            console.log('LCP:', lastEntry.startTime);
                        }).observe({ entryTypes: ['largest-contentful-paint'] });
                        
                        // First Input Delay
                        new PerformanceObserver((entryList) => {
                            const entries = entryList.getEntries();
                            entries.forEach(entry => {
                                console.log('FID:', entry.processingStart - entry.startTime);
                            });
                        }).observe({ entryTypes: ['first-input'] });
                        
                        // Cumulative Layout Shift
                        new PerformanceObserver((entryList) => {
                            let clsValue = 0;
                            const entries = entryList.getEntries();
                            entries.forEach(entry => {
                                if (!entry.hadRecentInput) {
                                    clsValue += entry.value;
                                }
                            });
                            console.log('CLS:', clsValue);
                        }).observe({ entryTypes: ['layout-shift'] });
                    } catch (e) {
                        console.log('Performance Observer not fully supported');
                    }
                }
            }, 0);
        });
    }
}

// Accessibility Enhancements
function initAccessibility() {
    // Keyboard navigation support
    document.addEventListener('keydown', function(e) {
        // Skip to main content with Tab key
        if (e.key === 'Tab' && !e.shiftKey && document.activeElement === document.body) {
            const mainContent = document.querySelector('main') || document.querySelector('.hero');
            if (mainContent) {
                mainContent.focus();
                e.preventDefault();
            }
        }
        
        // Close FAQ with Escape key
        if (e.key === 'Escape') {
            const activeFAQ = document.querySelector('.faq-item.active');
            if (activeFAQ) {
                activeFAQ.classList.remove('active');
                activeFAQ.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
                activeFAQ.querySelector('.faq-answer').style.maxHeight = '0px';
            }
        }
    });

    // Add focus indicators for keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });

    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });
    
    // Announce dynamic content changes to screen readers
    function announceToScreenReader(message) {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.style.position = 'absolute';
        announcement.style.left = '-10000px';
        announcement.style.width = '1px';
        announcement.style.height = '1px';
        announcement.style.overflow = 'hidden';
        announcement.textContent = message;
        
        document.body.appendChild(announcement);
        
        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 1000);
    }
    
    // Announce FAQ state changes
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            const questionText = this.textContent.trim();
            announceToScreenReader(`${questionText} ${isExpanded ? 'collapsed' : 'expanded'}`);
        });
    });
}

// Scroll to Top Functionality
function createScrollToTopButton() {
    const scrollToTopButton = document.createElement('button');
    scrollToTopButton.innerHTML = '↑';
    scrollToTopButton.className = 'scroll-to-top';
    scrollToTopButton.setAttribute('aria-label', 'Scroll to top');
    scrollToTopButton.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, #5D00B5 0%, #7B1FA2 100%);
        color: white;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(93, 0, 181, 0.3);
    `;

    document.body.appendChild(scrollToTopButton);

    scrollToTopButton.addEventListener('click', function() {
        smoothScrollTo(0, 800);
    });

    // Show/hide scroll to top button
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopButton.style.opacity = '1';
            scrollToTopButton.style.visibility = 'visible';
        } else {
            scrollToTopButton.style.opacity = '0';
            scrollToTopButton.style.visibility = 'hidden';
        }
    });
}

// Initialize scroll to top button
createScrollToTopButton();

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // Could send error to analytics service in production
});

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

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
    };
}

// Export functions for potential use in other scripts
window.LeadWorxAI = {
    smoothScrollTo,
    debounce,
    throttle,
    announceToScreenReader: function(message) {
        // Make announceToScreenReader available globally
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.style.position = 'absolute';
        announcement.style.left = '-10000px';
        announcement.style.width = '1px';
        announcement.style.height = '1px';
        announcement.style.overflow = 'hidden';
        announcement.textContent = message;
        
        document.body.appendChild(announcement);
        
        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 1000);
    }
};


// Advanced Interactive Features

// Magnetic Button Effect
function initMagneticButtons() {
    const magneticButtons = document.querySelectorAll('.btn, .magnetic-btn');
    
    magneticButtons.forEach(button => {
        button.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            const moveX = x * 0.1;
            const moveY = y * 0.1;
            
            this.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translate(0, 0)';
        });
    });
}

// Floating Particles Background
function createFloatingParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'floating-particles';
    
    for (let i = 0; i < 9; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particlesContainer.appendChild(particle);
    }
    
    hero.appendChild(particlesContainer);
}

// Advanced Scroll Animations with Stagger
function initAdvancedScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const staggerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const children = entry.target.children;
                Array.from(children).forEach((child, index) => {
                    setTimeout(() => {
                        child.classList.add('staggered-animation');
                    }, index * 100);
                });
                staggerObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply staggered animations to grids
    const grids = document.querySelectorAll('.tiles-grid, .steps-grid, .testimonials-grid, .stats-grid');
    grids.forEach(grid => {
        staggerObserver.observe(grid);
    });
}

// Typewriter Effect for Headlines
function initTypewriterEffect() {
    const typewriterElements = document.querySelectorAll('.typewriter');
    
    typewriterElements.forEach(element => {
        const text = element.textContent;
        element.textContent = '';
        element.style.borderRight = '2px solid #5D00B5';
        
        let i = 0;
        const typeInterval = setInterval(() => {
            element.textContent += text.charAt(i);
            i++;
            
            if (i >= text.length) {
                clearInterval(typeInterval);
                setTimeout(() => {
                    element.style.borderRight = 'none';
                }, 1000);
            }
        }, 50);
    });
}

// Enhanced Video Player with Custom Controls
function initEnhancedVideoPlayer() {
    const video = document.querySelector('.hero-video');
    const playButton = document.querySelector('.play-button');
    const videoContainer = document.querySelector('.video-container');
    
    if (video && videoContainer) {
        // Create custom progress bar
        const progressBar = document.createElement('div');
        progressBar.className = 'video-progress';
        progressBar.innerHTML = `
            <div class="progress-bar">
                <div class="progress-fill"></div>
            </div>
        `;
        
        const progressStyles = `
            .video-progress {
                position: absolute;
                bottom: 10px;
                left: 10px;
                right: 10px;
                opacity: 0;
                transition: opacity 0.3s ease;
            }
            .progress-bar {
                height: 4px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 2px;
                overflow: hidden;
            }
            .progress-fill {
                height: 100%;
                background: linear-gradient(90deg, #5D00B5, #A4EDE0);
                width: 0%;
                transition: width 0.1s ease;
            }
            .video-container:hover .video-progress {
                opacity: 1;
            }
        `;
        
        const style = document.createElement('style');
        style.textContent = progressStyles;
        document.head.appendChild(style);
        
        videoContainer.appendChild(progressBar);
        
        const progressFill = progressBar.querySelector('.progress-fill');
        
        video.addEventListener('timeupdate', function() {
            const progress = (video.currentTime / video.duration) * 100;
            progressFill.style.width = progress + '%';
        });
        
        // Click to seek
        progressBar.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const width = rect.width;
            const seekTime = (clickX / width) * video.duration;
            video.currentTime = seekTime;
        });
    }
}

// Parallax Scroll Effects
function initAdvancedParallax() {
    const parallaxElements = document.querySelectorAll('.parallax-element');
    
    if (parallaxElements.length > 0) {
        let ticking = false;
        
        function updateParallax() {
            const scrolled = window.pageYOffset;
            
            parallaxElements.forEach((element, index) => {
                const rate = scrolled * (0.5 + index * 0.1);
                const yPos = -(rate / 2);
                element.style.transform = `translate3d(0, ${yPos}px, 0)`;
            });
            
            ticking = false;
        }
        
        window.addEventListener('scroll', function() {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        });
    }
}

// Mouse Trail Effect
function initMouseTrail() {
    const trail = [];
    const trailLength = 10;
    
    for (let i = 0; i < trailLength; i++) {
        const dot = document.createElement('div');
        dot.className = 'trail-dot';
        dot.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: rgba(164, 237, 224, 0.6);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: all 0.3s ease;
            opacity: ${1 - i / trailLength};
        `;
        document.body.appendChild(dot);
        trail.push(dot);
    }
    
    let mouseX = 0, mouseY = 0;
    
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function animateTrail() {
        let x = mouseX, y = mouseY;
        
        trail.forEach((dot, index) => {
            const nextDot = trail[index + 1] || trail[0];
            
            dot.style.left = x + 'px';
            dot.style.top = y + 'px';
            
            x += (nextDot.offsetLeft - x) * 0.3;
            y += (nextDot.offsetTop - y) * 0.3;
        });
        
        requestAnimationFrame(animateTrail);
    }
    
    animateTrail();
}

// Text Reveal Animation
function initTextRevealAnimation() {
    const textElements = document.querySelectorAll('.reveal-text');
    
    const textObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const text = entry.target.textContent;
                entry.target.innerHTML = '';
                
                text.split('').forEach((char, index) => {
                    const span = document.createElement('span');
                    span.textContent = char === ' ' ? '\u00A0' : char;
                    span.style.cssText = `
                        opacity: 0;
                        transform: translateY(20px);
                        display: inline-block;
                        animation: revealChar 0.5s ease forwards;
                        animation-delay: ${index * 0.03}s;
                    `;
                    entry.target.appendChild(span);
                });
                
                textObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    textElements.forEach(el => textObserver.observe(el));
    
    // Add CSS for character reveal
    const revealStyles = `
        @keyframes revealChar {
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    
    const style = document.createElement('style');
    style.textContent = revealStyles;
    document.head.appendChild(style);
}

// Interactive Cursor
function initInteractiveCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: rgba(93, 0, 181, 0.5);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: all 0.1s ease;
        mix-blend-mode: difference;
    `;
    document.body.appendChild(cursor);
    
    const cursorFollower = document.createElement('div');
    cursorFollower.className = 'cursor-follower';
    cursorFollower.style.cssText = `
        position: fixed;
        width: 40px;
        height: 40px;
        border: 2px solid rgba(164, 237, 224, 0.3);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9998;
        transition: all 0.3s ease;
    `;
    document.body.appendChild(cursorFollower);
    
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;
    
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursor.style.left = mouseX - 10 + 'px';
        cursor.style.top = mouseY - 10 + 'px';
    });
    
    function animateFollower() {
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        
        cursorFollower.style.left = followerX - 20 + 'px';
        cursorFollower.style.top = followerY - 20 + 'px';
        
        requestAnimationFrame(animateFollower);
    }
    
    animateFollower();
    
    // Hover effects
    const hoverElements = document.querySelectorAll('a, button, .btn');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', function() {
            cursor.style.transform = 'scale(1.5)';
            cursorFollower.style.transform = 'scale(1.5)';
        });
        
        el.addEventListener('mouseleave', function() {
            cursor.style.transform = 'scale(1)';
            cursorFollower.style.transform = 'scale(1)';
        });
    });
}

// Scroll Progress Indicator
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #5D00B5, #A4EDE0);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrolled / maxScroll) * 100;
        progressBar.style.width = progress + '%';
    });
}

// Enhanced Loading Animation
function initLoadingAnimation() {
    const loader = document.createElement('div');
    loader.className = 'page-loader';
    loader.innerHTML = `
        <div class="loader-content">
            <div class="loader-logo">
                <img src="./assets/loading_logo.PNG" alt="LeadWorxAI Loading Logo" style="height: 200px; width: auto;">
            </div>
            <div class="loader-progress">
                <div class="loader-bar"></div>
            </div>
        </div>
    `;
    
    const loaderStyles = `
        .page-loader {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #5D00B5 0%, #7B1FA2 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            transition: opacity 0.5s ease, visibility 0.5s ease;
        }
        .loader-content {
            text-align: center;
            color: white;
        }
        .loader-logo {
            margin-bottom: 1rem;
            animation: pulse 2s ease-in-out infinite;
        }
        .loader-text {
            font-family: 'Playfair Display', serif;
            font-size: 2rem;
            font-weight: 700;
            margin-bottom: 2rem;
        }
        .loader-progress {
            width: 200px;
            height: 4px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 2px;
            overflow: hidden;
            margin: 0 auto;
        }
        .loader-bar {
            height: 100%;
            background: linear-gradient(90deg, #A4EDE0, white);
            width: 0%;
            animation: loadProgress 3s ease-in-out forwards;
        }
        @keyframes loadProgress {
            to { width: 100%; }
        }
        .page-loader.hidden {
            opacity: 0;
            visibility: hidden;
        }
    `;
    
    const style = document.createElement('style');
    style.textContent = loaderStyles;
    document.head.appendChild(style);
    
    document.body.appendChild(loader);
    
    window.addEventListener('load', function() {
        setTimeout(() => {
            loader.classList.add('hidden');
            setTimeout(() => {
                document.body.removeChild(loader);
            }, 500);
        }, 2000);
    });
}

// Initialize all advanced features
document.addEventListener('DOMContentLoaded', function() {
    // Initialize advanced features
    initMagneticButtons();
    createFloatingParticles();
    initAdvancedScrollAnimations();
    initTypewriterEffect();
    initEnhancedVideoPlayer();
    initAdvancedParallax();
    initTextRevealAnimation();
    initScrollProgress();
    initLoadingAnimation();
    
    // Initialize interactive cursor only on desktop
    if (window.innerWidth > 768) {
        initInteractiveCursor();
        initMouseTrail();
    }
    
    console.log('Advanced interactive features initialized');
});

// Performance monitoring for animations
function monitorAnimationPerformance() {
    if ('performance' in window && 'PerformanceObserver' in window) {
        try {
            const observer = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach(entry => {
                    if (entry.duration > 16) { // More than one frame
                        console.warn('Long animation frame detected:', entry.duration + 'ms');
                    }
                });
            });
            
            observer.observe({ entryTypes: ['measure'] });
        } catch (e) {
            console.log('Performance monitoring not available');
        }
    }
}

monitorAnimationPerformance();

