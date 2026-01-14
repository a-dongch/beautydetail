/* =============================================
   BEAUTY DETAIL - Interactive JavaScript
   ============================================= */

// =============================================
// Initialize AOS (Animate On Scroll)
// =============================================
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100,
        easing: 'ease-out-cubic'
    });
});

// =============================================
// Navigation Scroll Effect
// =============================================
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    // Add scrolled class when page is scrolled
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// =============================================
// Mobile Menu Toggle
// =============================================
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link, .footer-links a').forEach(link => {
        link.addEventListener('click', function() {
            mobileMenuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.navbar')) {
            mobileMenuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// =============================================
// Smooth Scroll for Navigation Links
// =============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Skip if it's just "#" or empty
        if (href === '#' || href === '') {
            e.preventDefault();
            return;
        }
        
        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
            const offsetTop = target.offsetTop - 80; // Adjust for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
            
            // Update URL without triggering scroll
            if (history.pushState) {
                history.pushState(null, null, href);
            }
        }
    });
});

// =============================================
// Counter Animation for Hero Stats
// =============================================
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16); // 60fps
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Trigger counter animation when in viewport
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'));
                animateCounter(stat, target);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Hero stats removed - using carousel slides instead
// const heroStats = document.querySelector('.hero-stats');
// if (heroStats) {
//     statsObserver.observe(heroStats);
// }

// =============================================
// Plan Comparison Toggle
// =============================================
const comparisonToggle = document.getElementById('comparisonToggle');
const comparisonContent = document.getElementById('comparisonContent');

if (comparisonToggle && comparisonContent) {
    comparisonToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        comparisonContent.classList.toggle('active');
    });
}

// =============================================
// Plan Selection Handler
// =============================================
const planButtons = document.querySelectorAll('.plan-btn');

planButtons.forEach(button => {
    button.addEventListener('click', function() {
        const planType = this.getAttribute('data-plan');
        
        // Scroll to contact form
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Pre-select the plan in the form
            setTimeout(() => {
                const planSelect = document.getElementById('plan');
                if (planSelect) {
                    planSelect.value = planType;
                    planSelect.focus();
                    
                    // Add highlight animation
                    planSelect.style.borderColor = '#d4558d';
                    setTimeout(() => {
                        planSelect.style.borderColor = '';
                    }, 2000);
                }
            }, 500);
        }
        
        // Show confirmation message
        showNotification(`${this.closest('.plan-card').querySelector('.plan-name').textContent} 선택됨! 아래 양식을 작성해주세요.`);
    });
});

// =============================================
// Hero Swiper Initialization
// =============================================
const heroSwiper = new Swiper('.heroSwiper', {
    slidesPerView: 1,
    spaceBetween: 0,
    loop: true,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.hero-pagination',
        clickable: true,
    },
    effect: 'fade',
    fadeEffect: {
        crossFade: true
    },
    speed: 1000,
});

// =============================================
// Template Swiper Initialization
// =============================================
const templatesSwiper = new Swiper('.templatesSwiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        640: {
            slidesPerView: 2,
            spaceBetween: 20,
        },
        1024: {
            slidesPerView: 3,
            spaceBetween: 30,
        },
    }
});

// Template View Buttons
document.querySelectorAll('.view-template').forEach(button => {
    // If it's a link, let it work normally
    if (button.tagName === 'A') {
        return; // Skip event listener for actual links
    }
    
    button.addEventListener('click', function(e) {
        e.preventDefault();
        const templateId = this.getAttribute('data-template');
        showNotification('템플릿 미리보기는 곧 제공될 예정입니다!');
        
        // In production, this would open a modal or navigate to template preview
        console.log('View template:', templateId);
    });
});

// =============================================
// FAQ Accordion
// =============================================
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', function() {
        const isActive = item.classList.contains('active');
        
        // Close all FAQ items
        faqItems.forEach(faq => {
            faq.classList.remove('active');
        });
        
        // Open clicked item if it wasn't active
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// =============================================
// Contact Form Handler
// =============================================

// Slack Webhook URL
const SLACK_WEBHOOK_URL = 'https://slack-proxy-mougo-genaral.zonber1002.workers.dev';

// Plan labels mapping
const planLabels = {
    'standard': '스탠다드 플랜 (25만원)',
    'premium': '프리미엄 플랜 (30만원)',
    'maintenance': '유지보수만 필요',
    'consultation': '상담 후 결정'
};

// =============================================
// Send to Slack Webhook
// =============================================
async function sendToSlack(formData) {
    const now = new Date();
    const formattedDate = now.toLocaleString('ko-KR', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit',
        weekday: 'short'
    });
    
    // Escape special characters for Slack
    const escapeSlackText = (text) => {
        if (!text) return '';
        return String(text)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
    };
    
    const slackMessage = {
        text: '🎨 새로운 문의가 접수되었습니다!',
        blocks: [
            {
                type: 'header',
                text: {
                    type: 'plain_text',
                    text: '🎨 새로운 문의 접수',
                    emoji: true
                }
            },
            {
                type: 'divider'
            },
            {
                type: 'section',
                fields: [
                    {
                        type: 'mrkdwn',
                        text: `*👤 이름/샵명*\n${escapeSlackText(formData.name)}`
                    },
                    {
                        type: 'mrkdwn',
                        text: `*📞 연락처*\n${escapeSlackText(formData.contact)}`
                    }
                ]
            },
            {
                type: 'section',
                text: {
                    type: 'mrkdwn',
                    text: `*💎 관심 플랜*\n${escapeSlackText(planLabels[formData.plan] || formData.plan)}`
                }
            }
        ]
    };
    
    // Add message if exists
    if (formData.message && formData.message.trim()) {
        slackMessage.blocks.push({
            type: 'section',
            text: {
                type: 'mrkdwn',
                text: `*💬 문의 내용*\n${escapeSlackText(formData.message)}`
            }
        });
    }
    
    // Add timestamp
    slackMessage.blocks.push({
        type: 'divider'
    });
    
    slackMessage.blocks.push({
        type: 'context',
        elements: [
            {
                type: 'mrkdwn',
                text: `⏰ ${formattedDate}`
            }
        ]
    });
    
    // Add action button style reminder
    slackMessage.blocks.push({
        type: 'section',
        text: {
            type: 'mrkdwn',
            text: '✨ *빠르게 응답해주세요!*'
        }
    });
    
    console.log('Sending to Slack:', JSON.stringify(slackMessage, null, 2));
    
    try {
        const response = await fetch(SLACK_WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(slackMessage)
        });
        
        console.log('Slack response status:', response.status);
        console.log('Slack response ok:', response.ok);
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error('Slack error response:', errorText);
            throw new Error(`Slack 전송 실패 (${response.status}): ${errorText}`);
        }
        
        const responseText = await response.text();
        console.log('Slack success response:', responseText);
        
        return response;
    } catch (fetchError) {
        console.error('Fetch error:', fetchError);
        throw new Error(`네트워크 오류: ${fetchError.message}`);
    }
}

// =============================================
// Form Submission Handler
// =============================================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Use FormData to get form values (more reliable)
        const formDataObj = new FormData(contactForm);
        
        // Get values from FormData
        const nameValue = (formDataObj.get('name') || '').toString().trim();
        const contactValue = (formDataObj.get('contact') || '').toString().trim();
        const planValue = (formDataObj.get('plan') || '').toString().trim();
        const messageValue = (formDataObj.get('message') || '').toString().trim();
        
        // Also get from direct input access as fallback
        const nameInput = document.getElementById('name');
        const contactInput = document.getElementById('contact');
        const planInput = document.getElementById('plan');
        const messageInput = document.getElementById('message');
        
        // Use direct input value if FormData is empty (fallback)
        const finalName = nameValue || (nameInput ? nameInput.value.trim() : '');
        const finalContact = contactValue || (contactInput ? contactInput.value.trim() : '');
        const finalPlan = planValue || (planInput ? planInput.value.trim() : '');
        const finalMessage = messageValue || (messageInput ? messageInput.value.trim() : '');
        
        // Debug log
        console.log('FormData values:', {
            name: nameValue,
            contact: contactValue,
            plan: planValue,
            message: messageValue
        });
        console.log('Direct input values:', {
            name: nameInput ? nameInput.value : 'N/A',
            contact: contactInput ? contactInput.value : 'N/A',
            plan: planInput ? planInput.value : 'N/A',
            message: messageInput ? messageInput.value : 'N/A'
        });
        console.log('Final values:', {
            name: finalName,
            contact: finalContact,
            plan: finalPlan,
            message: finalMessage
        });
        
        // Validate form
        if (!finalName || finalName.length === 0) {
            showNotification('이름/샵 이름을 입력해주세요.', 'error');
            if (nameInput) nameInput.focus();
            return;
        }
        
        if (!finalContact || finalContact.length === 0) {
            showNotification('연락처를 입력해주세요.', 'error');
            if (contactInput) contactInput.focus();
            return;
        }
        
        if (!finalPlan || finalPlan.length === 0) {
            showNotification('관심 플랜을 선택해주세요.', 'error');
            if (planInput) planInput.focus();
            return;
        }
        
        // Prepare form data
        const formData = {
            name: finalName,
            contact: finalContact,
            plan: finalPlan,
            message: finalMessage
        };
        
        // Show loading state
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.innerHTML;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 전송 중...';
        submitButton.disabled = true;
        
        try {
            // Send to Slack
            await sendToSlack(formData);
            
            // Reset form
            contactForm.reset();
            
            // Reset button
            submitButton.innerHTML = originalButtonText;
            submitButton.disabled = false;
            
            // Show success message
            showNotification('문의가 성공적으로 전송되었습니다! 빠른 시일 내에 연락드리겠습니다.', 'success');
            
            // Log data
            console.log('Form submitted to Slack:', formData);
            
        } catch (error) {
            console.error('Form submission error:', error);
            console.error('Error details:', {
                message: error.message,
                stack: error.stack,
                name: error.name
            });
            
            // Reset button
            submitButton.innerHTML = originalButtonText;
            submitButton.disabled = false;
            
            // Show detailed error message
            const errorMessage = error.message || '알 수 없는 오류가 발생했습니다.';
            showNotification(`전송 실패: ${errorMessage}`, 'error');
            
            // Also log to console for debugging
            console.error('Full error object:', error);
        }
    });
}

// =============================================
// Notification System
// =============================================
function showNotification(message, type = 'info') {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add styles dynamically
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            top: 100px;
            right: 2rem;
            background: white;
            padding: 1.25rem 1.5rem;
            border-radius: 16px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1rem;
            z-index: 9999;
            min-width: 300px;
            max-width: 500px;
            animation: slideIn 0.3s ease;
            border-left: 4px solid #d4558d;
        }
        
        .notification-success {
            border-left-color: #10b981;
        }
        
        .notification-error {
            border-left-color: #ef4444;
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 1rem;
        }
        
        .notification-content i {
            font-size: 1.5rem;
            color: #d4558d;
        }
        
        .notification-success .notification-content i {
            color: #10b981;
        }
        
        .notification-error .notification-content i {
            color: #ef4444;
        }
        
        .notification-content span {
            color: #1a1a2e;
            font-weight: 500;
        }
        
        .notification-close {
            background: none;
            border: none;
            color: #8b8b9e;
            cursor: pointer;
            padding: 0.5rem;
            font-size: 1rem;
            transition: color 0.2s;
        }
        
        .notification-close:hover {
            color: #1a1a2e;
        }
        
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
        
        @media (max-width: 768px) {
            .notification {
                left: 1rem;
                right: 1rem;
                min-width: auto;
            }
        }
    `;
    
    // Add style and notification to page
    if (!document.querySelector('style[data-notification-styles]')) {
        style.setAttribute('data-notification-styles', 'true');
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Close button handler
    const closeButton = notification.querySelector('.notification-close');
    closeButton.addEventListener('click', () => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// =============================================
// Scroll to Top Button
// =============================================
const scrollTopButton = document.getElementById('scrollTop');

if (scrollTopButton) {
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 500) {
            scrollTopButton.classList.add('visible');
        } else {
            scrollTopButton.classList.remove('visible');
        }
    });
    
    scrollTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// =============================================
// Feature Card Tilt Effect (Advanced)
// =============================================
const featureCards = document.querySelectorAll('.feature-card');

featureCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'transform 0.1s ease';
    });
    
    card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transition = 'transform 0.5s ease';
        this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// =============================================
// Plan Cards Hover Effect
// =============================================
const planCards = document.querySelectorAll('.plan-card');

planCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        // Add subtle scale effect to featured badge
        const badge = this.querySelector('.popular-label');
        if (badge) {
            badge.style.transform = 'scale(1.1)';
        }
    });
    
    card.addEventListener('mouseleave', function() {
        const badge = this.querySelector('.popular-label');
        if (badge) {
            badge.style.transform = 'scale(1)';
        }
    });
});

// =============================================
// Parallax Effect on Hero Section
// =============================================
// Parallax effect removed - using carousel slides instead
// window.addEventListener('scroll', function() {
//     const scrolled = window.pageYOffset;
//     const hero = document.querySelector('.hero-content');
//     
//     if (hero && scrolled < window.innerHeight) {
//         hero.style.transform = `translateY(${scrolled * 0.5}px)`;
//         hero.style.opacity = 1 - (scrolled / 700);
//     }
// });

// =============================================
// Form Input Animation
// =============================================
const formInputs = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');

formInputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.style.transform = 'translateX(5px)';
        this.parentElement.style.transition = 'transform 0.3s ease';
    });
    
    input.addEventListener('blur', function() {
        this.parentElement.style.transform = 'translateX(0)';
    });
});

// =============================================
// Loading Animation on Page Load
// =============================================
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Trigger any additional animations after page load
    setTimeout(() => {
        AOS.refresh();
    }, 100);
});

// =============================================
// Prevent Default for Template Links
// =============================================
document.querySelectorAll('a[href="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
    });
});

// =============================================
// Console Welcome Message
// =============================================
console.log('%c뷰티디테일', 'font-size: 40px; font-weight: bold; background: linear-gradient(135deg, #d4558d 0%, #9d7ee6 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;');
console.log('%c프리미엄 뷰티샵 홍보페이지 제작 서비스', 'font-size: 14px; color: #7c5ccc;');
console.log('%c✨ 문의: @beautydetail_official', 'font-size: 12px; color: #d4558d;');

// =============================================
// Performance Monitoring (Development)
// =============================================
if (window.performance) {
    window.addEventListener('load', function() {
        setTimeout(() => {
            const perfData = window.performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log(`⚡ Page Load Time: ${pageLoadTime}ms`);
        }, 0);
    });
}

// =============================================
// Easter Egg - Konami Code
// =============================================
let konamiCode = [];
const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join('') === konamiPattern.join('')) {
        showNotification('🎉 축하합니다! 히든 할인코드: BEAUTY2026', 'success');
        
        // Add rainbow animation to hero section
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.animation = 'rainbow 3s linear infinite';
            
            const rainbowKeyframes = `
                @keyframes rainbow {
                    0% { filter: hue-rotate(0deg); }
                    100% { filter: hue-rotate(360deg); }
                }
            `;
            
            const style = document.createElement('style');
            style.textContent = rainbowKeyframes;
            document.head.appendChild(style);
            
            setTimeout(() => {
                hero.style.animation = '';
            }, 5000);
        }
        
        konamiCode = [];
    }
});

// =============================================
// Accessibility Enhancements
// =============================================

// Add keyboard navigation for custom elements
document.querySelectorAll('.plan-card, .template-card, .feature-card').forEach(card => {
    card.setAttribute('tabindex', '0');
    
    card.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            const button = this.querySelector('.btn, .view-template');
            if (button) {
                button.click();
            }
        }
    });
});

// Announce dynamic content changes to screen readers
function announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    setTimeout(() => {
        announcement.remove();
    }, 1000);
}

// Add screen reader only class
const srOnlyStyles = `
    .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border-width: 0;
    }
`;

const srStyle = document.createElement('style');
srStyle.textContent = srOnlyStyles;
document.head.appendChild(srStyle);

// =============================================
// Initialize All Features
// =============================================
console.log('✅ All interactive features initialized successfully!');