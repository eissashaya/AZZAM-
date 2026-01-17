// تهيئة أيقونات Lucide
lucide.createIcons();

// تعيين السنة الحالية في الفوتر
document.getElementById('currentYear').textContent = new Date().getFullYear();

// نظام التطبيقات الذكية
class AppModalSystem {
    constructor() {
        this.modal = document.getElementById('appModal');
        this.modalTitle = document.getElementById('appModalTitle');
        this.modalMessage = document.getElementById('appModalMessage');
        this.init();
    }
    
    init() {
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        // زر إغلاق النافذة
        document.getElementById('closeAppModal').addEventListener('click', () => this.close());
        document.getElementById('appModalCloseBtn').addEventListener('click', () => this.close());
        
        // النقر على خلفية النافذة لإغلاقها
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.close();
            }
        });
        
        // أزرار عرض التفاصيل في التطبيقات
        document.querySelectorAll('.app-view-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const card = e.target.closest('.app-card');
                const title = card.getAttribute('data-title');
                const message = card.getAttribute('data-message');
                this.open(title, message);
            });
        });
    }
    
    open(title, message) {
        this.modalTitle.textContent = title;
        this.modalMessage.textContent = message;
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    close() {
        this.modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// نظام القائمة الجانبية
class SidebarSystem {
    constructor() {
        this.sidebar = document.getElementById('sidebar');
        this.overlay = document.getElementById('sidebarOverlay');
        this.init();
    }
    
    init() {
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        // فتح القائمة
        document.getElementById('openSidebar').addEventListener('click', () => this.open());
        
        // إغلاق القائمة
        document.getElementById('closeSidebar').addEventListener('click', () => this.close());
        
        // إغلاق بالنقر على الـ overlay
        this.overlay.addEventListener('click', () => this.close());
        
        // إغلاق بالنقر على رابط في القائمة
        document.querySelectorAll('#sidebar a').forEach(link => {
            link.addEventListener('click', () => this.close());
        });
        
        // إغلاق القائمة عند تغيير حجم النافذة (خاص بالجوال)
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                this.close();
            }
        });
    }
    
    open() {
        this.sidebar.classList.add('open');
        this.overlay.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
    
    close() {
        this.sidebar.classList.remove('open');
        this.overlay.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// دالة لاكتشاف وتطبيق الخط الإنجليزي تلقائياً
function applyEnglishFontAutomatically() {
    // تحديد العناصر التي نريد فحصها
    const elements = document.querySelectorAll('p, span, h1, h2, h3, h4, h5, h6, a, button, li, td, th, div, input, textarea, label, .tech-label, .code-text, .app-name, .skill-name, .project-tech');
    
    elements.forEach(element => {
        // تخطي العناصر التي لديها بالفعل فئة english-text
        if (element.classList.contains('english-text')) return;
        
        // تخطي العناصر التي لديها فئات عربية
        if (element.classList.contains('font-heading') || 
            element.classList.contains('font-decorative') ||
            element.classList.contains('arabic-text')) return;
        
        // الحصول على النص
        const text = element.textContent || element.innerText || element.value || element.placeholder || '';
        
        if (!text || text.trim().length === 0) return;
        
        // التحقق إذا كان النص إنجليزياً (يحتوي على حروف إنجليزية)
        // والتحقق إذا كان يحتوي على عربية
        const hasArabic = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/.test(text);
        const hasEnglish = /[A-Za-z]/.test(text);
        
        // إذا كان النص يحتوي على إنجليزية ولا يحتوي على عربية
        if (hasEnglish && !hasArabic) {
            // إضافة فئة english-text
            element.classList.add('english-text');
        }
    });
    
    // تطبيق خاص على بعض العناصر التي نعرف أنها إنجليزية
    document.querySelectorAll('.cyber-gradient, .typing-effect').forEach(el => {
        if (!el.classList.contains('english-text')) {
            el.classList.add('english-text');
        }
    });
}

// تهيئة التطبيق عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    // تهيئة القائمة الجانبية
    const sidebar = new SidebarSystem();
    
    // تهيئة نافذة التطبيقات
    const appModal = new AppModalSystem();
    
    // تطبيق الخط الإنجليزي تلقائياً بعد تحميل الصفحة
    setTimeout(applyEnglishFontAutomatically, 100);
    
    // إرسال نموذج الCall
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const successMessage = 'شكراً لك! تم إرسال رسالتك بنجاح. سأتواصل معك قريباً.';
            
            alert(successMessage);
            contactForm.reset();
        });
    }
    
    // التمرير السلس
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // إغلاق القائمة على الجوال
                if (window.innerWidth <= 768) {
                    sidebar.close();
                }
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // تأثيرات إضافية للأيقونات
    document.querySelectorAll('.social-tech-icon').forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.1)';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // منع التكبير التلقائي في حقول الإدخال على الجوال
    document.querySelectorAll('input, textarea').forEach(el => {
        el.addEventListener('touchstart', function() {
            this.style.fontSize = '16px';
        });
    });
    
    // تطبيق تأثيرات الأقسام عند التمرير
    const elements = document.querySelectorAll('.section-fade');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    
    elements.forEach(el => observer.observe(el));
    
    // إعادة تطبيق الخط عند أي تغيير في المحتوى
    new MutationObserver(() => {
        setTimeout(applyEnglishFontAutomatically, 50);
    }).observe(document.body, {
        childList: true,
        subtree: true,
        characterData: true
    });
});