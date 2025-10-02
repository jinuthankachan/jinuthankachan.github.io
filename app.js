// Jinu Thankachan Portfolio JavaScript - Enhanced Version

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initMobileMenu();
    initContactForm();
    initScrollAnimations();
    initSkillAnimations();
    initParallaxEffects();
    initTypewriterEffect();
});

// Navigation functionality
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.navbar__link');
    const sections = document.querySelectorAll('section[id]');
    
    // Handle smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const navbarHeight = navbar.offsetHeight || 70;
                const offsetTop = targetSection.offsetTop - navbarHeight;
                
                // Use window.scrollTo with smooth behavior
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                closeMobileMenu();
                
                // Update active link immediately
                updateActiveLink(this);
            }
        });
    });
    
    // Handle scroll events for navbar styling and active links
    let ticking = false;
    
    function updateNavbar() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add/remove background to navbar on scroll
        if (scrollTop > 50) {
            navbar.classList.add('navbar--scrolled');
        } else {
            navbar.classList.remove('navbar--scrolled');
        }
        
        // Update active navigation link based on scroll position
        updateActiveNavLink();
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    });
    
    // Update active navigation link
    function updateActiveNavLink() {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                const activeLink = document.querySelector(`.navbar__link[href="#${sectionId}"]`);
                if (activeLink) {
                    updateActiveLink(activeLink);
                }
            }
        });
    }
    
    function updateActiveLink(activeLink) {
        navLinks.forEach(link => link.classList.remove('active'));
        activeLink.classList.add('active');
    }
}

// Mobile menu functionality
function initMobileMenu() {
    const mobileToggle = document.getElementById('navbar-toggle');
    const mobileMenu = document.getElementById('navbar-menu');
    
    if (!mobileToggle || !mobileMenu) {
        console.error('Mobile menu elements not found');
        return;
    }
    
    mobileToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleMobileMenu();
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (mobileMenu.classList.contains('active') && 
            !mobileMenu.contains(e.target) && 
            !mobileToggle.contains(e.target)) {
            closeMobileMenu();
        }
    });
    
    // Close menu on window resize if screen becomes larger
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            closeMobileMenu();
        }
    });
    
    // Close menu when pressing Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });
}

function toggleMobileMenu() {
    const mobileToggle = document.getElementById('navbar-toggle');
    const mobileMenu = document.getElementById('navbar-menu');
    
    mobileToggle.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
}

function closeMobileMenu() {
    const mobileToggle = document.getElementById('navbar-toggle');
    const mobileMenu = document.getElementById('navbar-menu');
    
    if (mobileToggle && mobileMenu) {
        mobileToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Contact form functionality
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (!contactForm) {
        console.error('Contact form not found');
        return;
    }
    
    const nameField = document.getElementById('contact-name');
    const emailField = document.getElementById('contact-email');
    const messageField = document.getElementById('contact-message');
    const submitButton = contactForm.querySelector('button[type="submit"]');
    
    // Ensure form fields are properly initialized
    [nameField, emailField, messageField].forEach(field => {
        if (field) {
            // Clear any existing styles that might interfere
            field.style.pointerEvents = 'auto';
            field.style.userSelect = 'auto';
            field.removeAttribute('readonly');
            
            // Add input event listeners
            field.addEventListener('input', function() {
                clearFieldError(this);
                this.classList.remove('error');
                validateFieldRealTime(this);
            });
            
            field.addEventListener('focus', function() {
                this.classList.add('focused');
            });
            
            field.addEventListener('blur', function() {
                this.classList.remove('focused');
                validateField(this);
            });
        }
    });
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (!nameField || !emailField || !messageField || !submitButton) {
            console.error('Form fields not found');
            return;
        }
        
        // Get form data
        const formData = {
            name: nameField.value.trim(),
            email: emailField.value.trim(),
            message: messageField.value.trim()
        };
        
        // Clear previous errors
        clearAllFieldErrors();
        
        // Validate form
        const validation = validateContactForm(formData);
        if (!validation.isValid) {
            showFormError(validation.message);
            return;
        }
        
        // Show loading state
        const originalText = submitButton.textContent;
        submitButton.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" style="animation: spin 1s linear infinite; margin-right: 8px;">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="m16 12-4-4-4 4"></path>
                <path d="m12 16 4-4"></path>
            </svg>
            Sending...
        `;
        submitButton.disabled = true;
        submitButton.classList.add('loading');
        
        // Simulate form submission (replace with actual form handling)
        setTimeout(() => {
            // Reset form
            contactForm.reset();
            
            // Show success message
            showFormSuccess('Thank you for reaching out! I\'ll get back to you within 24 hours.');
            
            // Reset button
            submitButton.textContent = originalText;
            submitButton.disabled = false;
            submitButton.classList.remove('loading');
            
            // Add celebration effect
            createCelebrationEffect();
        }, 2000);
    });
}

// Form validation functions
function validateContactForm(data) {
    if (!data.name) {
        return { isValid: false, message: 'Please enter your name.' };
    }
    
    if (data.name.length < 2) {
        return { isValid: false, message: 'Name must be at least 2 characters long.' };
    }
    
    if (!data.email) {
        return { isValid: false, message: 'Please enter your email address.' };
    }
    
    if (!isValidEmail(data.email)) {
        return { isValid: false, message: 'Please enter a valid email address.' };
    }
    
    if (!data.message) {
        return { isValid: false, message: 'Please enter your message.' };
    }
    
    if (data.message.length < 10) {
        return { isValid: false, message: 'Message must be at least 10 characters long.' };
    }
    
    return { isValid: true };
}

function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    if (field.id === 'contact-name') {
        if (!value) {
            isValid = false;
            errorMessage = 'Name is required.';
        } else if (value.length < 2) {
            isValid = false;
            errorMessage = 'Name must be at least 2 characters long.';
        }
    } else if (field.id === 'contact-email') {
        if (!value) {
            isValid = false;
            errorMessage = 'Email is required.';
        } else if (!isValidEmail(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address.';
        }
    } else if (field.id === 'contact-message') {
        if (!value) {
            isValid = false;
            errorMessage = 'Message is required.';
        } else if (value.length < 10) {
            isValid = false;
            errorMessage = 'Message must be at least 10 characters long.';
        }
    }
    
    if (!isValid) {
        showFieldError(field, errorMessage);
        field.classList.add('error');
    } else {
        clearFieldError(field);
        field.classList.remove('error');
    }
    
    return isValid;
}

function validateFieldRealTime(field) {
    // Real-time validation for better UX
    const value = field.value.trim();
    
    if (field.id === 'contact-email' && value.length > 0) {
        if (!isValidEmail(value)) {
            field.style.borderColor = 'rgba(var(--color-error-rgb), 0.5)';
        } else {
            field.style.borderColor = 'rgba(var(--color-success-rgb), 0.5)';
        }
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showFieldError(field, message) {
    clearFieldError(field);
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    
    field.parentNode.appendChild(errorDiv);
}

function clearFieldError(field) {
    const errorDiv = field.parentNode.querySelector('.field-error');
    if (errorDiv) {
        errorDiv.remove();
    }
    // Reset border color
    field.style.borderColor = '';
}

function clearAllFieldErrors() {
    const errorDivs = document.querySelectorAll('.field-error');
    errorDivs.forEach(errorDiv => errorDiv.remove());
    
    const formFields = document.querySelectorAll('.form-control');
    formFields.forEach(field => {
        field.classList.remove('error');
        field.style.borderColor = '';
    });
}

function showFormError(message) {
    showNotification(message, 'error');
}

function showFormSuccess(message) {
    showNotification(message, 'success');
}

function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    
    // Add icon based on type
    const iconMap = {
        success: '✓',
        error: '✗',
        info: 'ℹ'
    };
    
    notification.innerHTML = `
        <span class="notification-icon">${iconMap[type] || 'ℹ'}</span>
        <span class="notification-message">${message}</span>
    `;
    
    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '90px',
        right: '20px',
        padding: '16px 20px',
        borderRadius: '12px',
        fontSize: '14px',
        fontWeight: '500',
        zIndex: '1001',
        maxWidth: '400px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
        backdropFilter: 'blur(10px)',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease-out',
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
    });
    
    // Set colors based on type
    if (type === 'error') {
        notification.style.backgroundColor = 'rgba(239, 68, 68, 0.9)';
        notification.style.color = '#ffffff';
        notification.style.border = '1px solid rgba(239, 68, 68, 0.3)';
    } else if (type === 'success') {
        notification.style.backgroundColor = 'rgba(34, 197, 94, 0.9)';
        notification.style.color = '#ffffff';
        notification.style.border = '1px solid rgba(34, 197, 94, 0.3)';
    } else {
        notification.style.backgroundColor = 'rgba(59, 130, 246, 0.9)';
        notification.style.color = '#ffffff';
        notification.style.border = '1px solid rgba(59, 130, 246, 0.3)';
    }
    
    document.body.appendChild(notification);
    
    // Animate in immediately
    notification.style.transform = 'translateX(0)';
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 5000);
}

// Scroll animations
function initScrollAnimations() {
    // Check if IntersectionObserver is supported
    if (!window.IntersectionObserver) {
        console.warn('IntersectionObserver not supported, skipping scroll animations');
        return;
    }
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Add special animation for stat cards
                if (entry.target.classList.contains('stat-card')) {
                    animateStatCard(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // Observe elements that should animate on scroll
    const animateElements = document.querySelectorAll('.stat-card, .skill-category, .project-card, .timeline__item, .award-card, .interest-item, .education-card, .certification-item');
    
    animateElements.forEach((el, index) => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
}

// Skill animations
function initSkillAnimations() {
    if (!window.IntersectionObserver) {
        return;
    }
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillTags = entry.target.querySelectorAll('.skill-tag');
                skillTags.forEach((tag, index) => {
                    tag.classList.add('skill-animate');
                });
            }
        });
    }, { threshold: 0.5 });
    
    // Observe skill categories
    const skillCategories = document.querySelectorAll('.skill-category');
    skillCategories.forEach(category => {
        const tags = category.querySelectorAll('.skill-tag');
        tags.forEach(tag => {
            tag.classList.add('skill-ready');
        });
        observer.observe(category);
    });
}

// Parallax effects
function initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.hero__image-placeholder');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.3;
        
        parallaxElements.forEach(el => {
            el.style.transform = `translateY(${rate}px)`;
        });
    });
}

// Typewriter effect for hero section (disabled for instant loading)
function initTypewriterEffect() {
    // Typewriter effect disabled for instant content loading
    // The text will appear immediately without delay
    return;
}

// Animate stat cards with counting effect
function animateStatCard(card) {
    const numberElement = card.querySelector('.stat-card__number');
    if (!numberElement) return;
    
    const finalText = numberElement.textContent;
    const hasPlus = finalText.includes('+');
    const hasK = finalText.includes('k');
    const numberValue = parseFloat(finalText.replace(/[^0-9.]/g, ''));
    
    if (isNaN(numberValue)) return;
    
    let currentValue = 0;
    const increment = numberValue / 50; // 50 steps
    const timer = setInterval(() => {
        currentValue += increment;
        if (currentValue >= numberValue) {
            currentValue = numberValue;
            clearInterval(timer);
        }
        
        let displayValue = Math.floor(currentValue);
        if (hasK) displayValue += 'k';
        if (hasPlus) displayValue += '+';
        
        numberElement.textContent = displayValue;
    }, 30);
}

// Celebration effect for form submission
function createCelebrationEffect() {
    const colors = ['#32CD32', '#FFD700', '#FF6347', '#87CEEB', '#DDA0DD'];
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: fixed;
                width: 10px;
                height: 10px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                left: ${Math.random() * 100}vw;
                top: -10px;
                z-index: 1000;
                border-radius: 50%;
                pointer-events: none;
                animation: fall 3s linear forwards;
            `;
            
            document.body.appendChild(confetti);
            
            setTimeout(() => {
                confetti.remove();
            }, 3000);
        }, i * 5);
    }
}

// Add CSS for confetti animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fall {
        to {
            transform: translateY(100vh);
            opacity: 0;
        }
    }
    
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
    
    .notification-icon {
        font-weight: bold;
        font-size: 16px;
    }
`;
document.head.appendChild(style);

// Initialize on page load
window.addEventListener('load', function() {
    // Ensure smooth scrolling is working
    const htmlElement = document.documentElement;
    htmlElement.style.scrollBehavior = 'smooth';
    
    // Initialize active nav link on page load
    const homeLink = document.querySelector('.navbar__link[href="#home"]');
    if (homeLink) {
        homeLink.classList.add('active');
    }
    
    // Add loading complete class to body
    document.body.classList.add('loaded');
});

// Handle page visibility changes
document.addEventListener('visibilitychange', function() {
    if (!document.hidden) {
        // Page became visible, reinitialize if needed
        console.log('Page visible - Jinu Thankachan Portfolio');
    }
});

// Add some interactive easter eggs
let konamiCode = [];
const konamiPattern = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // Up Up Down Down Left Right Left Right B A

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.keyCode);
    if (konamiCode.length > konamiPattern.length) {
        konamiCode.shift();
    }
    
    if (JSON.stringify(konamiCode) === JSON.stringify(konamiPattern)) {
        showNotification('🎉 Easter egg unlocked! Thanks for exploring my portfolio thoroughly!', 'success');
        createCelebrationEffect();
        konamiCode = [];
    }
});

// Add console message for developers
console.log(`
🚀 Welcome to Jinu Thankachan's Portfolio!
👨‍💻 Principal Engineer & Blockchain Technology Leader
🔗 GitHub: https://github.com/jinuthankachan
💼 LinkedIn: https://www.linkedin.com/in/jinut2/
🌐 Website: https://jinuthankachan.com

Built with modern web technologies and lots of ☕
Interested in blockchain, fintech, or GoFrame? Let's connect!
`);

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        validateContactForm,
        isValidEmail
    };
}