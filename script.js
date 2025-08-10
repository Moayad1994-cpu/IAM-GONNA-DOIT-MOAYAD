 // Global Variables
let currentLanguage = 'en';
let isDarkMode = false;
let isLoggedIn = false;
let currentUser = null;
let apiKey = localStorage.getItem('geminiApiKey') || '';
let visitorCount = 1247;
let onlineUsers = 23;

// Services Data
const services = [
    {
        id: 'website-design',
        nameEn: 'Website Design',
        nameAr: 'تصميم المواقع',
        descriptionEn: 'Professional responsive websites with modern design and optimal user experience',
        descriptionAr: 'مواقع إلكترونية احترافية متجاوبة مع تصميم حديث وتجربة مستخدم مثلى',
        price: 10,
        image: 'https://i.postimg.cc/BbkrDgyV/service-website-design.png'
    },
    {
        id: 'app-development',
        nameEn: 'Professional Application Development',
        nameAr: 'تطوير التطبيقات الاحترافية',
        descriptionEn: 'Custom mobile and web applications built with cutting-edge technology',
        descriptionAr: 'تطبيقات جوال وويب مخصصة مبنية بأحدث التقنيات',
        price: 0,
        image: 'https://i.postimg.cc/qMCVrP6V/service-app-development.png'
    },
    {
        id: 'cv-creation',
        nameEn: 'Professional CV Creation (ATS System)',
        nameAr: 'إنشاء السيرة الذاتية الاحترافية (نظام ATS)',
        descriptionEn: 'ATS-optimized resumes that pass automated screening systems',
        descriptionAr: 'سير ذاتية محسنة لأنظمة ATS تجتاز أنظمة الفحص الآلي',
        price: 12,
        image: 'https://i.postimg.cc/0ypTM7CV/service-cv-creation.png'
    },
    {
        id: 'graphic-design',
        nameEn: 'Graphic Design, Logo Creation, Advertising and Poster Design',
        nameAr: 'التصميم الجرافيكي وإنشاء الشعارات والإعلانات والملصقات',
        descriptionEn: 'Creative visual designs for branding, marketing, and promotional materials',
        descriptionAr: 'تصاميم بصرية إبداعية للعلامة التجارية والتسويق والمواد الترويجية',
        price: 0,
        image: 'https://i.postimg.cc/nhpJ1dry/service-graphic-design.png'
    },
    {
        id: 'ui-ux-design',
        nameEn: 'Website Interface Design',
        nameAr: 'تصميم واجهات المواقع',
        descriptionEn: 'User-centered interface design for optimal user experience',
        descriptionAr: 'تصميم واجهات محورها المستخدم لتجربة مستخدم مثلى',
        price: 0,
        image: 'https://i.postimg.cc/GmK1gksH/service-ui-ux-design.png'
    },
    {
        id: 'engineering-drawing',
        nameEn: 'Engineering Drawing',
        nameAr: 'الرسم الهندسي',
        descriptionEn: 'Technical drawings and blueprints for engineering projects',
        descriptionAr: 'رسومات تقنية ومخططات للمشاريع الهندسية',
        price: 0,
        image: 'https://i.postimg.cc/KYYh6RnQ/service-engineering-drawing.png'
    },
    {
        id: 'ai-models',
        nameEn: 'AI Models and Systems',
        nameAr: 'نماذج وأنظمة الذكاء الاصطناعي',
        descriptionEn: 'Custom AI solutions and machine learning models for your business',
        descriptionAr: 'حلول ذكاء اصطناعي مخصصة ونماذج تعلم آلي لأعمالك',
        price: 0,
        image: 'https://i.postimg.cc/65NJ9Hr8/service-ai-models.png'
    },
    {
        id: 'video-production',
        nameEn: 'Advertising Videos and Project Filming',
        nameAr: 'فيديوهات إعلانية وتصوير المشاريع',
        descriptionEn: 'Professional video production for marketing and promotional content',
        descriptionAr: 'إنتاج فيديو احترافي للتسويق والمحتوى الترويجي',
        price: 0,
        image: 'https://i.postimg.cc/6p9kZy1w/service-video-production.png'
    },
    {
        id: 'presentation-creation',
        nameEn: 'Professional Presentation Creation',
        nameAr: 'إنشاء العروض التقديمية الاحترافية',
        descriptionEn: 'Engaging presentations that captivate your audience',
        descriptionAr: 'عروض تقديمية جذابة تأسر جمهورك',
        price: 0,
        image: 'https://i.postimg.cc/zfQ64pDX/service-presentation-creation.png'
    },
    {
        id: 'ai-automation',
        nameEn: 'AI Agent Automation',
        nameAr: 'أتمتة وكلاء الذكاء الاصطناعي',
        descriptionEn: 'Intelligent automation solutions to streamline your business processes',
        descriptionAr: 'حلول أتمتة ذكية لتبسيط عمليات أعمالك',
        price: 0,
        image: 'https://i.postimg.cc/zvCQbrCV/service-ai-automation.png'
    },
    {
        id: 'brochure-design',
        nameEn: 'Brochure Design',
        nameAr: 'تصميم البروشورات',
        descriptionEn: 'Professional brochures that effectively communicate your message',
        descriptionAr: 'بروشورات احترافية تنقل رسالتك بفعالية',
        price: 0,
        image: 'https://i.postimg.cc/jqPmkzpt/service-brochure-design.png'
    },
    {
        id: 'marketing-social-media',
        nameEn: 'Marketing and Social Media',
        nameAr: 'التسويق ووسائل التواصل الاجتماعي',
        descriptionEn: 'Comprehensive digital marketing strategies and social media management',
        descriptionAr: 'استراتيجيات تسويق رقمي شاملة وإدارة وسائل التواصل الاجتماعي',
        price: 0,
        image: 'https://i.postimg.cc/hPn6FXnx/service-marketing-social-media.png'
    },
    {
        id: 'podcast-recording',
        nameEn: 'Podcast Recording',
        nameAr: 'تسجيل البودكاست',
        descriptionEn: 'Professional podcast recording and production services',
        descriptionAr: 'خدمات تسجيل وإنتاج البودكاست الاحترافية',
        price: 0,
        image: 'https://i.postimg.cc/YqxVtt2P/service-podcast-recording.png'
    },
    {
        id: 'studio-photography',
        nameEn: 'Studio Photography',
        nameAr: 'التصوير الاستوديو',
        descriptionEn: 'High-quality studio photography for portraits and products',
        descriptionAr: 'تصوير استوديو عالي الجودة للصور الشخصية والمنتجات',
        price: 0,
        image: 'https://i.postimg.cc/nhRPQTDY/service-studio-photography.png'
    },
    {
        id: 'product-photography',
        nameEn: 'Product Photography',
        nameAr: 'تصوير المنتجات',
        descriptionEn: 'Professional product photography for e-commerce and marketing',
        descriptionAr: 'تصوير منتجات احترافي للتجارة الإلكترونية والتسويق',
        price: 0,
        image: 'https://i.postimg.cc/jjB3M5vD/service-product-photography.png'
    },
    {
        id: 'video-filming',
        nameEn: 'Video Filming for Projects, Seminars, and Graduations',
        nameAr: 'تصوير فيديو للمشاريع والندوات والتخرج',
        descriptionEn: 'Professional event videography for special occasions',
        descriptionAr: 'تصوير فيديو احترافي للفعاليات والمناسبات الخاصة',
        price: 0,
        image: 'https://i.postimg.cc/QtLSpzx5/service-video-filming.png'
    },
    {
        id: 'ai-task-completion',
        nameEn: 'AI Task Completion',
        nameAr: 'إنجاز المهام بالذكاء الاصطناعي',
        descriptionEn: 'Automated task completion using advanced AI technologies',
        descriptionAr: 'إنجاز المهام الآلي باستخدام تقنيات الذكاء الاصطناعي المتقدمة',
        price: 0,
        image: 'https://i.postimg.cc/FRjpGx76/service-ai-task-completion.png'
    }
];

// Translation Data
const translations = {
    en: {
        'Services': 'Services',
        'About': 'About',
        'Contact': 'Contact',
        'Login': 'Login',
        'Sign In': 'Sign In',
        'Sign Up': 'Sign Up',
        'Start Your Project Now': 'Start Your Project Now',
        'Chat with Us': 'Chat with Us',
        'Visitors': 'Visitors',
        'Online Now': 'Online Now',
        'Projects Done': 'Projects Done',
        'Our Services': 'Our Services',
        'About Us': 'About Us',
        'Contact Us': 'Contact Us',
        'Call Us': 'Call Us',
        'Email Us': 'Email Us',
        'Visit Us': 'Visit Us',
        'All rights reserved.': 'All rights reserved.',
        'Powered by AI': 'Powered by AI',
        'Location: Abu Dhabi, Yas Island': 'Location: Abu Dhabi, Yas Island',
        'Email:': 'Email:',
        'Mobile Number:': 'Mobile Number:',
        'AI Assistant': 'AI Assistant',
        'Type your message...': 'Type your message...',
        'Send': 'Send',
        'Service Request': 'Service Request',
        'Complete Payment': 'Complete Payment',
        'Configure API Key': 'Configure API Key'
    },
    ar: {
        'Services': 'الخدمات',
        'About': 'من نحن',
        'Contact': 'تواصل معنا',
        'Login': 'تسجيل الدخول',
        'Sign In': 'تسجيل الدخول',
        'Sign Up': 'إنشاء حساب',
        'Start Your Project Now': 'ابدأ مشروعك الآن',
        'Chat with Us': 'تحدث معنا',
        'Visitors': 'زائر',
        'Online Now': 'متصل الآن',
        'Projects Done': 'مشروع مكتمل',
        'Our Services': 'خدماتنا',
        'About Us': 'من نحن',
        'Contact Us': 'تواصل معنا',
        'Call Us': 'اتصل بنا',
        'Email Us': 'راسلنا',
        'Visit Us': 'موقعنا',
        'All rights reserved.': 'جميع الحقوق محفوظة.',
        'Powered by AI': 'مدعوم بالذكاء الاصطناعي',
        'Location: Abu Dhabi, Yas Island': 'الموقع: أبو ظبي، جزيرة ياس',
        'Email:': 'البريد الإلكتروني:',
        'Mobile Number:': 'رقم الهاتف:',
        'AI Assistant': 'المساعد الذكي',
        'Type your message...': 'اكتب رسالتك...',
        'Send': 'إرسال',
        'Service Request': 'طلب خدمة',
        'Complete Payment': 'إتمام الدفع',
        'Configure API Key': 'تكوين مفتاح API'
    }
};

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
    setupEventListeners();
    renderServices();
    initThreeJS();
    updateVisitorStats();
    
    // Check if API key is configured
    if (!apiKey) {
        setTimeout(() => {
            openApiKeyModal();
        }, 2000);
    }
});

// Initialize website
function initializeWebsite() {
    // Load saved preferences
    const savedLanguage = localStorage.getItem('language') || 'en';
    const savedTheme = localStorage.getItem('theme') || 'light';
    
    currentLanguage = savedLanguage;
    isDarkMode = savedTheme === 'dark';
    
    // Apply saved settings
    updateLanguage();
    updateTheme();
}

// Setup event listeners
function setupEventListeners() {
    // Language toggle
    document.getElementById('langToggle').addEventListener('click', toggleLanguage);
    
    // Dark mode toggle
    document.getElementById('darkModeToggle').addEventListener('click', toggleDarkMode);
    
    // Mobile menu toggle
    document.getElementById('mobileMenuBtn').addEventListener('click', toggleMobileMenu);
    
    // Login button
    document.getElementById('loginBtn').addEventListener('click', openAuthModal);
    
    // Search button
    document.getElementById('searchBtn').addEventListener('click', toggleSearch);
    
    // Chat input
    document.getElementById('chatInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // Auth form
    document.getElementById('authForm').addEventListener('submit', handleAuth);
    
    // Service request form
    document.getElementById('serviceRequestForm').addEventListener('submit', function(e) {
        e.preventDefault();
        proceedToPayment();
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Language functions
function toggleLanguage() {
    currentLanguage = currentLanguage === 'en' ? 'ar' : 'en';
    localStorage.setItem('language', currentLanguage);
    updateLanguage();
}

function updateLanguage() {
    const isArabic = currentLanguage === 'ar';
    
    // Update document direction
    document.documentElement.dir = isArabic ? 'rtl' : 'ltr';
    document.documentElement.lang = currentLanguage;
    
    // Update logo and title
    const logoImg = document.getElementById('logoImg');
    const logoText = document.getElementById('logoText');
    const footerLogo = document.getElementById('footerLogo');
    const footerTitle = document.getElementById('footerTitle');
    
    if (isArabic) {
        logoImg.src = 'assets/logo_arabic.png';
        logoText.textContent = 'انا استطيع فعل اي شي';
        footerLogo.src = 'assets/logo_arabic.png';
        footerTitle.textContent = 'انا استطيع فعل اي شي';
    } else {
        logoImg.src = 'assets/logo_english.png';
        logoText.textContent = 'I Am Gonna Do It';
        footerLogo.src = 'assets/logo_english.png';
        footerTitle.textContent = 'I Am Gonna Do It';
    }
    
    // Update hero content
    const heroTitle = document.getElementById('heroTitle');
    const heroSubtitle = document.getElementById('heroSubtitle');
    const heroOverlayText = document.getElementById('heroOverlayText');
    
    if (isArabic) {
        heroTitle.textContent = 'انا استطيع فعل اي شي';
        heroSubtitle.textContent = 'إذا أنت ما عندك وقت احنا وقتك - نحقق أحلامك الرقمية بأحدث التقنيات والحلول المبتكرة';
        heroOverlayText.textContent = 'إذا أنت ما عندك وقت احنا وقتك';
    } else {
        heroTitle.textContent = 'I Am Gonna Do It';
        heroSubtitle.textContent = 'If you don\'t have time, we are your time - We make your digital dreams come true with the latest technologies and innovative solutions';
        heroOverlayText.textContent = 'If you don\'t have time, we are your time';
    }
    
    // Update welcome message
    const welcomeMessage = document.getElementById('welcomeMessage');
    if (isArabic) {
        welcomeMessage.textContent = 'مرحباً! أنا مساعدك الذكي من شركة "انا استطيع فعل اي شي". بادارة مؤيد دغمش كيف  يمكنني مساعدتك في التعرف على خدماتنا والأسعار وطرق الدفع وكيفية الحجز. نحن موجودون في أبو ظبي، جزيرة ياس. كيف يمكنني مساعدتك اليوم؟';
    } else {
        welcomeMessage.textContent = 'Hello! I\'m your AI assistant from \'I Am Gonna Do It\' company managed by moayad dughmosh. how I can help you learn more about our services, pricing, payment methods, and how to book. We\'re located in Abu Dhabi, Yas Island. How can I help you today?';
    }
    
    // Update all elements with data attributes
    document.querySelectorAll('[data-en]').forEach(element => {
        const key = element.getAttribute('data-en');
        if (translations[currentLanguage][key]) {
            element.textContent = translations[currentLanguage][key];
        }
    });
    
    // Update placeholders
    document.querySelectorAll('[data-en-placeholder]').forEach(element => {
        const key = element.getAttribute('data-en-placeholder');
        if (translations[currentLanguage][key]) {
            element.placeholder = translations[currentLanguage][key];
        }
    });
    
    // Re-render services with new language
    renderServices();
}

// Theme functions
function toggleDarkMode() {
    isDarkMode = !isDarkMode;
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    updateTheme();
}

function updateTheme() {
    const icon = document.getElementById('darkModeIcon');
    
    if (isDarkMode) {
        document.documentElement.setAttribute('data-theme', 'dark');
        icon.className = 'fas fa-sun';
    } else {
        document.documentElement.removeAttribute('data-theme');
        icon.className = 'fas fa-moon';
    }
}

// Mobile menu functions
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    mobileMenu.classList.toggle('active');
}

// Search functions
function toggleSearch() {
    const searchTerm = prompt(currentLanguage === 'ar' ? 'ابحث عن خدمة...' : 'Search for a service...');
    if (searchTerm) {
        searchServices(searchTerm);
    }
}

function searchServices(term) {
    const filteredServices = services.filter(service => {
        const name = currentLanguage === 'ar' ? service.nameAr : service.nameEn;
        const description = currentLanguage === 'ar' ? service.descriptionAr : service.descriptionEn;
        return name.toLowerCase().includes(term.toLowerCase()) || 
               description.toLowerCase().includes(term.toLowerCase());
    });
    
    renderServices(filteredServices);
    
    // Scroll to services section
    document.getElementById('services').scrollIntoView({
        behavior: 'smooth'
    });
}

// Services functions
function renderServices(servicesToRender = services) {
    const servicesGrid = document.getElementById('servicesGrid');
    servicesGrid.innerHTML = '';
    
    servicesToRender.forEach(service => {
        const serviceCard = createServiceCard(service);
        servicesGrid.appendChild(serviceCard);
    });
}

function createServiceCard(service) {
    const card = document.createElement('div');
    card.className = 'service-card fade-in';
    
    const name = currentLanguage === 'ar' ? service.nameAr : service.nameEn;
    const description = currentLanguage === 'ar' ? service.descriptionAr : service.descriptionEn;
    
    card.innerHTML = `
        <div class="service-image">
            <img src="${service.image}" alt="${name}" class="service-img">
            <div class="service-price-badge">$${service.price}</div>
        </div>
        <div class="service-content">
            <h3 class="service-title">${name}</h3>
            <p class="service-description">${description}</p>
            <button class="service-btn" onclick="openServiceRequestModal('${service.id}')">
                <span>${currentLanguage === 'ar' ? 'اطلب الآن' : 'Order Now'}</span>
                <i class="fas fa-arrow-right"></i>
            </button>
        </div>
    `;
    
    return card;
}

// Modal functions
function openServiceRequestModal(serviceId = null) {
    const modal = document.getElementById('serviceRequestModal');
    const serviceSelect = document.getElementById('serviceSelect');
    
    // Populate service options
    serviceSelect.innerHTML = `<option value="">${currentLanguage === 'ar' ? 'اختر خدمة' : 'Select a service'}</option>`;
    
    services.forEach(service => {
        const option = document.createElement('option');
        option.value = service.id;
        option.textContent = `${currentLanguage === 'ar' ? service.nameAr : service.nameEn} - $${service.price}`;
        option.dataset.price = service.price;
        serviceSelect.appendChild(option);
    });
    
    // Pre-select service if provided
    if (serviceId) {
        serviceSelect.value = serviceId;
        updateServicePrice();
    }
    
    modal.classList.add('active');
}

function closeServiceRequestModal() {
    document.getElementById('serviceRequestModal').classList.remove('active');
}

function updateServicePrice() {
    const serviceSelect = document.getElementById('serviceSelect');
    const servicePriceElement = document.getElementById('servicePrice');
    const customAmountInput = document.getElementById('customAmount');
    
    const selectedOption = serviceSelect.options[serviceSelect.selectedIndex];
    const basePrice = selectedOption.dataset.price || 0;
    const customAmount = customAmountInput.value || 0;
    
    const finalPrice = customAmount > 0 ? customAmount : basePrice;
    servicePriceElement.textContent = `$${finalPrice}`;
}

function proceedToPayment() {
    const form = document.getElementById('serviceRequestForm');
    const formData = new FormData(form);
    
    // Validate required fields
    const requiredFields = ['fullName', 'email', 'phone', 'serviceSelect', 'projectDescription'];
    let isValid = true;
    
    requiredFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (!field.value.trim()) {
            field.style.borderColor = 'var(--error-color)';
            isValid = false;
        } else {
            field.style.borderColor = 'var(--border-color)';
        }
    });
    
    if (!isValid) {
        alert(currentLanguage === 'ar' ? 'يرجى ملء جميع الحقول المطلوبة' : 'Please fill in all required fields');
        return;
    }
    
    // Get service and price information
    const serviceSelect = document.getElementById('serviceSelect');
    const selectedService = services.find(s => s.id === serviceSelect.value);
    const customAmount = document.getElementById('customAmount').value;
    const finalPrice = customAmount || selectedService.price;
    
    // Update payment modal
    document.getElementById('paymentService').textContent = currentLanguage === 'ar' ? selectedService.nameAr : selectedService.nameEn;
    document.getElementById('paymentClient').textContent = document.getElementById('fullName').value;
    document.getElementById('paymentTotal').textContent = `$${finalPrice}`;
    
    // Update all payment method prices
    document.getElementById('coffeePrice').textContent = `$${finalPrice}`;
    document.getElementById('applePayPrice').textContent = `$${finalPrice}`;
    document.getElementById('cardPrice').textContent = `$${finalPrice}`;
    document.getElementById('qrPrice').textContent = `$${finalPrice}`;
    
    // Close service request modal and open payment modal
    closeServiceRequestModal();
    document.getElementById('paymentModal').classList.add('active');
}

function closePaymentModal() {
    document.getElementById('paymentModal').classList.remove('active');
}

// Payment functions
function payWithCoffee() {
    const amount = document.getElementById('paymentTotal').textContent.replace('$', '');
    const coffeeUrl = `https://coff.ee/moayad_dughmosh?amount=${amount}`;
    window.open(coffeeUrl, '_blank');
    
    // Show success message
    setTimeout(() => {
        alert(currentLanguage === 'ar' ? 'شكراً لك! سنتواصل معك قريباً.' : 'Thank you! We will contact you soon.');
        closePaymentModal();
    }, 1000);
}

function payWithApplePay() {
    if (window.ApplePaySession && ApplePaySession.canMakePayments()) {
        // Apple Pay implementation would go here
        alert(currentLanguage === 'ar' ? 'Apple Pay غير متاح حالياً. يرجى استخدام طريقة دفع أخرى.' : 'Apple Pay is not available. Please use another payment method.');
    } else {
        alert(currentLanguage === 'ar' ? 'Apple Pay غير مدعوم على هذا الجهاز.' : 'Apple Pay is not supported on this device.');
    }
}

function payWithCard() {
    // Stripe implementation would go here
    alert(currentLanguage === 'ar' ? 'سيتم توجيهك إلى صفحة الدفع الآمنة.' : 'You will be redirected to the secure payment page.');
    
    // Simulate payment process
    setTimeout(() => {
        alert(currentLanguage === 'ar' ? 'تم الدفع بنجاح! شكراً لك.' : 'Payment successful! Thank you.');
        closePaymentModal();
    }, 2000);
}

// Auth functions
function openAuthModal() {
    document.getElementById('authModal').classList.add('active');
}

function closeAuthModal() {
    document.getElementById('authModal').classList.remove('active');
}

function switchAuthTab(tab) {
    const tabs = document.querySelectorAll('.auth-tab');
    const nameGroup = document.getElementById('nameGroup');
    const confirmPasswordGroup = document.getElementById('confirmPasswordGroup');
    const authModalTitle = document.getElementById('authModalTitle');
    const authSubmitBtn = document.getElementById('authSubmitBtn');
    
    tabs.forEach(t => t.classList.remove('active'));
    document.querySelector(`[onclick="switchAuthTab('${tab}')"]`).classList.add('active');
    
    if (tab === 'signup') {
        nameGroup.style.display = 'block';
        confirmPasswordGroup.style.display = 'block';
        authModalTitle.textContent = currentLanguage === 'ar' ? 'إنشاء حساب' : 'Sign Up';
        authSubmitBtn.textContent = currentLanguage === 'ar' ? 'إنشاء حساب' : 'Sign Up';
    } else {
        nameGroup.style.display = 'none';
        confirmPasswordGroup.style.display = 'none';
        authModalTitle.textContent = currentLanguage === 'ar' ? 'تسجيل الدخول' : 'Sign In';
        authSubmitBtn.textContent = currentLanguage === 'ar' ? 'تسجيل الدخول' : 'Sign In';
    }
}

function handleAuth(e) {
    e.preventDefault();
    
    const email = document.getElementById('authEmail').value;
    const password = document.getElementById('authPassword').value;
    const isSignUp = document.querySelector('.auth-tab.active').textContent.includes('Sign Up') || 
                     document.querySelector('.auth-tab.active').textContent.includes('إنشاء حساب');
    
    if (isSignUp) {
        const name = document.getElementById('authName').value;
        const confirmPassword = document.getElementById('authConfirmPassword').value;
        
        if (password !== confirmPassword) {
            alert(currentLanguage === 'ar' ? 'كلمات المرور غير متطابقة' : 'Passwords do not match');
            return;
        }
        
        // Simulate sign up
        currentUser = { name, email };
        isLoggedIn = true;
        alert(currentLanguage === 'ar' ? 'تم إنشاء الحساب بنجاح!' : 'Account created successfully!');
    } else {
        // Simulate sign in
        currentUser = { email };
        isLoggedIn = true;
        alert(currentLanguage === 'ar' ? 'تم تسجيل الدخول بنجاح!' : 'Signed in successfully!');
    }
    
    updateLoginStatus();
    closeAuthModal();
}

function updateLoginStatus() {
    const loginBtn = document.getElementById('loginBtn');
    
    if (isLoggedIn) {
        loginBtn.innerHTML = `
            <i class="fas fa-user-check"></i>
            <span>${currentUser.name || currentUser.email}</span>
        `;
        loginBtn.onclick = logout;
    } else {
        loginBtn.innerHTML = `
            <i class="fas fa-user"></i>
            <span>${currentLanguage === 'ar' ? 'تسجيل الدخول' : 'Login'}</span>
        `;
        loginBtn.onclick = openAuthModal;
    }
}

function logout() {
    isLoggedIn = false;
    currentUser = null;
    updateLoginStatus();
    alert(currentLanguage === 'ar' ? 'تم تسجيل الخروج بنجاح!' : 'Logged out successfully!');
}

// Chat functions
function openChatBot() {
    if (!apiKey) {
        openApiKeyModal();
        return;
    }
    document.getElementById('chatModal').classList.add('active');
}

function closeChatBot() {
    document.getElementById('chatModal').classList.remove('active');
}

async function sendMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    
    if (!message) return;
    
    if (!apiKey) {
        alert(currentLanguage === 'ar' ? 'يرجى تكوين مفتاح API أولاً' : 'Please configure API key first');
        openApiKeyModal();
        return;
    }
    
    // Add user message
    addMessage(message, 'user');
    input.value = '';
    
    // Show typing indicator
    const typingIndicator = addMessage(currentLanguage === 'ar' ? 'يكتب...' : 'Typing...', 'bot');
    
    try {
        // Call Gemini API
        const response = await callGeminiAPI(message);
        
        // Remove typing indicator
        typingIndicator.remove();
        
        // Add bot response
        addMessage(response, 'bot');
    } catch (error) {
        console.error('Chat error:', error);
        typingIndicator.remove();
        addMessage(
            currentLanguage === 'ar' ? 
            'عذراً، حدث خطأ في الاتصال. يرجى المحاولة مرة أخرى أو الاتصال بنا مباشرة على التواصل مباشرة مع مدير الموقع مؤيد دغمش على الواتس  +971545489973' :
            'Sorry, there was a connection error. Please try again or contact us directly at moayad dughmosh on whatsapp +971545489973',
            'bot'
        );
    }
}

function addMessage(content, type) {
    const messagesContainer = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}-message`;
    
    messageDiv.innerHTML = `
        <div class="message-content">${content}</div>
    `;
    
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    return messageDiv;
}

async function callGeminiAPI(message) {
    const systemPrompt = currentLanguage === 'ar' ? 
        `أنت مساعد ذكي لشركة "انا استطيع فعل اي شي" الموجودة في أبو ظبي، جزيرة ياس. نحن نقدم خدمات رقمية متنوعة بما في ذلك تصميم المواقع ($0)، تطوير التطبيقات ($0)، السيرة الذاتية ($12)، التصميم الجرافيكي ($50)، وغيرها من الخدمات. يمكن للعملاء الدفع عبر Coffee (https://coff.ee/moayad_dughmosh)، Apple Pay، أو بطاقات الائتمان. للتواصل: moayaddughmosh@gmail.com أو +971545489973. أجب بالعربية بطريقة مفيدة ومهنية.` :
        `You are an AI assistant for "I Am Gonna Do It" company located in Abu Dhabi, Yas Island. We offer various digital services including Website Design ($0), App Development ($0), CV Creation ($12), Graphic Design ($50), and more. Customers can pay via Coffee (https://coff.ee/moayad_dughmosh), Apple Pay, or credit cards. Contact: moayaddughmosh@gmail.com or +971545489973. Respond helpfully and professionally in English.`;
    
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            contents: [{
                parts: [{
                    text: `${systemPrompt}\n\nUser: ${message}`
                }]
            }]
        })
    });
    
    if (!response.ok) {
        throw new Error('API request failed');
    }
    
    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
}

// API Key functions
function openApiKeyModal() {
    document.getElementById('apiKeyModal').classList.add('active');
    document.getElementById('apiKeyInput').value = apiKey;
}

function closeApiKeyModal() {
    document.getElementById('apiKeyModal').classList.remove('active');
}

function saveApiKey() {
    const newApiKey = document.getElementById('apiKeyInput').value.trim();
    
    if (!newApiKey) {
        alert(currentLanguage === 'ar' ? 'يرجى إدخال مفتاح API صحيح' : 'Please enter a valid API key');
        return;
    }
    
    apiKey = newApiKey;
    localStorage.setItem('geminiApiKey', apiKey);
    
    alert(currentLanguage === 'ar' ? 'تم حفظ مفتاح API بنجاح!' : 'API key saved successfully!');
    closeApiKeyModal();
}

// Utility functions
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

function updateVisitorStats() {
    // Simulate real-time updates
    setInterval(() => {
        visitorCount += Math.floor(Math.random() * 3);
        onlineUsers = Math.floor(Math.random() * 10) + 20;
        
        document.getElementById('visitorCount').textContent = `${visitorCount.toLocaleString()}+`;
        document.getElementById('onlineUsers').textContent = onlineUsers;
    }, 30000); // Update every 30 seconds
}

// Three.js 3D Background
function initThreeJS() {
    const container = document.getElementById('threejs-container');
    if (!container) return;
    
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);
    
    // Create floating particles
    const particleCount = 100;
    const particles = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount * 3; i++) {
        positions[i] = (Math.random() - 0.5) * 100;
    }
    
    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    const particleMaterial = new THREE.PointsMaterial({
        color: 0x3b82f6,
        size: 2,
        transparent: true,
        opacity: 0.6
    });
    
    const particleSystem = new THREE.Points(particles, particleMaterial);
    scene.add(particleSystem);
    
    // Create floating cubes
    const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
    const cubeMaterial = new THREE.MeshBasicMaterial({
        color: 0x8b5cf6,
        transparent: true,
        opacity: 0.3,
        wireframe: true
    });
    
    const cubes = [];
    for (let i = 0; i < 10; i++) {
        const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
        cube.position.set(
            (Math.random() - 0.5) * 50,
            (Math.random() - 0.5) * 50,
            (Math.random() - 0.5) * 50
        );
        cube.rotation.set(
            Math.random() * Math.PI,
            Math.random() * Math.PI,
            Math.random() * Math.PI
        );
        scene.add(cube);
        cubes.push(cube);
    }
    
    // Create floating spheres
    const sphereGeometry = new THREE.SphereGeometry(0.5, 16, 16);
    const sphereMaterial = new THREE.MeshBasicMaterial({
        color: 0xec4899,
        transparent: true,
        opacity: 0.4
    });
    
    const spheres = [];
    for (let i = 0; i < 15; i++) {
        const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
        sphere.position.set(
            (Math.random() - 0.5) * 60,
            (Math.random() - 0.5) * 60,
            (Math.random() - 0.5) * 60
        );
        scene.add(sphere);
        spheres.push(sphere);
    }
    
    camera.position.z = 30;
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        // Rotate particles
        particleSystem.rotation.x += 0.001;
        particleSystem.rotation.y += 0.002;
        
        // Animate cubes
        cubes.forEach(cube => {
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
            cube.position.y += Math.sin(Date.now() * 0.001 + cube.position.x) * 0.01;
        });
        
        // Animate spheres
        spheres.forEach(sphere => {
            sphere.position.x += Math.sin(Date.now() * 0.001 + sphere.position.y) * 0.02;
            sphere.position.z += Math.cos(Date.now() * 0.001 + sphere.position.x) * 0.02;
        });
        
        renderer.render(scene, camera);
    }
    
    animate();
    
    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// Call functionality with proper phone dialing
function makePhoneCall() {
    const phoneNumber = '+971545489973';
    
    // Check if device supports tel: protocol
    if (navigator.userAgent.match(/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i)) {
        // Mobile device - use tel: protocol
        window.location.href = `tel:${phoneNumber}`;
    } else {
        // Desktop - show phone number and copy to clipboard
        if (navigator.clipboard) {
            navigator.clipboard.writeText(phoneNumber).then(() => {
                alert(currentLanguage === 'ar' ? 
                    `تم نسخ رقم الهاتف: ${phoneNumber}` : 
                    `Phone number copied: ${phoneNumber}`);
            });
        } else {
            alert(currentLanguage === 'ar' ? 
                `رقم الهاتف: ${phoneNumber}` : 
                `Phone number: ${phoneNumber}`);
        }
    }
}

// Add click event to all call buttons
document.addEventListener('DOMContentLoaded', function() {
    // Add click event to phone links
    document.querySelectorAll('a[href^="tel:"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            makePhoneCall();
        });
    });
});

// Export functions for global access
window.openServiceRequestModal = openServiceRequestModal;
window.closeServiceRequestModal = closeServiceRequestModal;
window.updateServicePrice = updateServicePrice;
window.proceedToPayment = proceedToPayment;
window.closePaymentModal = closePaymentModal;
window.payWithCoffee = payWithCoffee;
window.payWithApplePay = payWithApplePay;
window.payWithCard = payWithCard;
window.openAuthModal = openAuthModal;
window.closeAuthModal = closeAuthModal;
window.switchAuthTab = switchAuthTab;
window.openChatBot = openChatBot;
window.closeChatBot = closeChatBot;
window.sendMessage = sendMessage;
window.openApiKeyModal = openApiKeyModal;
window.closeApiKeyModal = closeApiKeyModal;
window.saveApiKey = saveApiKey;
window.scrollToTop = scrollToTop;
window.makePhoneCall = makePhoneCall;