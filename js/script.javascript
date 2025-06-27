document.addEventListener('DOMContentLoaded', function() {
    // متابعة التمرير للشريط العلوي
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });

    // تبديل الوضع المظلم
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark');
        localStorage.setItem('darkMode', document.body.classList.contains('dark'));
    });

    // تفعيل وضع مظلم إذا كان مفعل سابقًا
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark');
    }

    // فلترة مشاريع معرض الأعمال
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // إزالة النشط من كل الأزرار
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // إضافة النشط للزر الحالي
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // تأثير التحميل التدريجي للأرقام
    const counters = document.querySelectorAll('[data-count]');
    const speed = 200;
    
    function animateCounter(counter) {
        const target = +counter.getAttribute('data-count');
        const count = +counter.innerText;
        const increment = target / speed;
        
        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(() => animateCounter(counter), 1);
        } else {
            counter.innerText = target;
        }
    }
    
    // تشغيل العدادات عند ظهورها في الشاشة
    function startCountingWhenVisible() {
        counters.forEach(counter => {
            const counterPosition = counter.getBoundingClientRect().top;
            const screenPosition = window.innerHeight;
            
            if (counterPosition < screenPosition) {
                if (!counter.classList.contains('animated')) {
                    counter.classList.add('animated');
                    animateCounter(counter);
                }
            }
        });
    }
    
    window.addEventListener('scroll', startCountingWhenVisible);
    startCountingWhenVisible(); // تشغيل عند التحميل للأرقام الظاهرة

    // تفعيل مكتبة العرض الموسع للصور (Lightbox)
    const lightbox = GLightbox({
        selector: '.portfolio-item a',
        touchNavigation: true,
        keyboardNavigation: true,
    });

    // إرسال نموذج الاتصال
    const contactForm = document.querySelector('form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // هنا يمكنك إضافة كود إرسال النموذج
            alert('تم استلام رسالتك بنجاح! سأتواصل معك قريبًا.');
            this.reset();
        });
    }
});
