// SmartBoAD Home Page Script - Updated with Ad Submission

document.addEventListener('DOMContentLoaded', function() {
    initializeHomePage();
    setupEventListeners();
    startAnimations();
    setupAdModal();
});

function initializeHomePage() {
    console.log('SmartBoAD Home Page Initialized');
    updateCurrentYear();
    initScrollAnimations();
    setupSearchForm();
}

function setupEventListeners() {
    // Mobile menu toggle
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.innerHTML = navMenu.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
    }
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            const targetElement = document.querySelector(href);
            if (targetElement) {
                e.preventDefault();
                
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    navToggle.innerHTML = '<i class="fas fa-bars"></i>';
                }
                
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 8px 25px rgba(0,0,0,0.1)';
            navbar.style.top = '10px';
            navbar.style.padding = '0.75rem 1.5rem';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 6px 20px rgba(0,0,0,0.08)';
            navbar.style.top = '20px';
            navbar.style.padding = '0.75rem 2rem';
        }
    });
    
    // Popular search tags
    document.querySelectorAll('.tag').forEach(tag => {
        tag.addEventListener('click', function() {
            const searchInput = document.querySelector('.search-input');
            if (searchInput) {
                searchInput.value = this.textContent;
                searchInput.focus();
            }
        });
    });
}

function startAnimations() {
    // Hero section entrance animation
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.animation = 'fadeInUp 1s ease forwards';
    }
    
    // Animate search section on scroll
    const searchSection = document.querySelector('.search-section');
    if (searchSection) {
        searchSection.style.opacity = '0';
        searchSection.style.transform = 'translateY(20px)';
        searchSection.style.transition = 'all 0.6s ease';
    }
}

function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Search section
                if (entry.target.classList.contains('search-section')) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
                
                // Feature cards
                if (entry.target.classList.contains('feature-card')) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    entry.target.style.transition = 'all 0.6s ease';
                }
                
                // User cards
                if (entry.target.classList.contains('user-card')) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    entry.target.style.transition = 'all 0.6s ease 0.2s';
                }
                
                // Step cards
                if (entry.target.classList.contains('step-card')) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    entry.target.style.transition = 'all 0.6s ease 0.4s';
                }
            }
        });
    }, observerOptions);
    
    // Observe all animated elements
    document.querySelectorAll('.search-section, .feature-card, .user-card, .step-card, .testimonial-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        observer.observe(el);
    });
}

function setupSearchForm() {
    const searchForm = document.querySelector('.search-form');
    if (searchForm) {
        const searchInput = searchForm.querySelector('.search-input');
        const searchButton = searchForm.querySelector('.btn-search');
        const priceFilter = document.getElementById('price-range');
        const roomFilter = document.getElementById('room-type');
        const amenitiesFilter = document.getElementById('amenities');
        
        searchButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            const location = searchInput.value.trim();
            const price = priceFilter.value;
            const roomType = roomFilter.value;
            const amenities = amenitiesFilter.value;
            
            if (!location) {
                showToast('Please enter a university or location', 'warning');
                searchInput.focus();
                return;
            }
            
            // Simulate search
            showToast(`Searching for boardings in "${location}"...`, 'info');
            
            setTimeout(() => {
                showToast('Found 25+ boardings matching your criteria!', 'success');
                
                console.log('Search parameters:', {
                    location,
                    price,
                    roomType,
                    amenities
                });
            }, 1500);
        });
        
        // Allow Enter key submission
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                searchButton.click();
            }
        });
    }
}

function setupAdModal() {
    const modal = document.getElementById('adsModal');
    const openButtons = document.querySelectorAll('.open-ads-modal');
    const closeButton = modal.querySelector('.modal-close');
    const closeFormButton = modal.querySelector('.close-form');
    const planButtons = modal.querySelectorAll('.select-plan');
    const adForm = document.getElementById('adForm');
    const adTypeInput = document.getElementById('adType');
    const adMessage = document.getElementById('adMessage');
    const charCount = document.getElementById('charCount');
    const submissionForm = document.getElementById('adSubmissionForm');
    
    // Open modal
    openButtons.forEach(button => {
        button.addEventListener('click', function() {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close modal
    closeButton.addEventListener('click', closeModal);
    closeFormButton.addEventListener('click', closeModal);
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Select plan
    planButtons.forEach(button => {
        button.addEventListener('click', function() {
            const plan = this.getAttribute('data-plan');
            let planName = '';
            
            switch(plan) {
                case 'basic':
                    planName = 'Basic Ad - $49/month';
                    break;
                case 'premium':
                    planName = 'Premium Ad - $99/month';
                    break;
                case 'enterprise':
                    planName = 'Enterprise - $199/month';
                    break;
            }
            
            adTypeInput.value = planName;
            adForm.classList.add('active');
            adForm.scrollIntoView({ behavior: 'smooth' });
        });
    });
    
    // Character count
    adMessage.addEventListener('input', function() {
        charCount.textContent = this.value.length;
    });
    
    // Form submission
    submissionForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('adName').value,
            email: document.getElementById('adEmail').value,
            phone: document.getElementById('adPhone').value,
            plan: adTypeInput.value,
            message: adMessage.value,
            image: document.getElementById('adImage').files[0] ? 'Image uploaded' : 'No image'
        };
        
        console.log('Ad submission:', formData);
        
        showToast('Ad request submitted successfully! We will contact you within 24 hours.', 'success');
        closeModal();
        submissionForm.reset();
        charCount.textContent = '0';
        adForm.classList.remove('active');
    });
    
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

function updateCurrentYear() {
    const yearElement = document.querySelector('.footer-bottom p');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.innerHTML = yearElement.innerHTML.replace('2024', currentYear);
    }
}

function showToast(message, type = 'info') {
    // Remove existing toasts
    const existingToasts = document.querySelectorAll('.toast');
    existingToasts.forEach(toast => toast.remove());
    
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <div class="toast-icon">
            <i class="fas fa-${getToastIcon(type)}"></i>
        </div>
        <div class="toast-message">${message}</div>
        <button class="toast-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add styles
    toast.style.cssText = `
        position: fixed;
        top: 120px;
        right: 20px;
        background: white;
        padding: 1.25rem 1.5rem;
        border-radius: 16px;
        box-shadow: 0 12px 32px rgba(0,0,0,0.15);
        display: flex;
        align-items: center;
        gap: 1rem;
        z-index: 9999;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 400px;
        border-left: 4px solid ${getToastColor(type)};
        animation: slideInRight 0.3s ease forwards;
    `;
    
    document.body.appendChild(toast);
    
    // Add keyframe for animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from { transform: translateX(400px); }
            to { transform: translateX(0); }
        }
    `;
    document.head.appendChild(style);
    
    // Close button
    const closeBtn = toast.querySelector('.toast-close');
    closeBtn.addEventListener('click', () => {
        toast.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (toast.parentNode) {
            toast.style.transform = 'translateX(400px)';
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        }
    }, 5000);
}

function getToastIcon(type) {
    const icons = {
        'success': 'check-circle',
        'error': 'exclamation-circle',
        'warning': 'exclamation-triangle',
        'info': 'info-circle'
    };
    return icons[type] || 'info-circle';
}

function getToastColor(type) {
    const colors = {
        'success': '#10B981',
        'error': '#EF4444',
        'warning': '#F59E0B',
        'info': '#3B82F6'
    };
    return colors[type] || '#3B82F6';
}

// Initialize on window load
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// Export functions for global access
window.homePage = {
    showToast,
    setupSearchForm,
    setupAdModal
};