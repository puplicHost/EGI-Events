const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const nav = document.querySelector("nav");

if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("open");
        navToggle.classList.toggle("open", isOpen);
        navToggle.setAttribute("aria-expanded", isOpen);
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 768) {
            navLinks.classList.remove("open");
            navToggle.classList.remove("open");
            navToggle.setAttribute("aria-expanded", "false");
        }
    });
}

// Navbar scroll effect
window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        nav.classList.add("scrolled");
    } else {
        nav.classList.remove("scrolled");
    }
});

// Set active navigation link based on current page
function setActiveNavLink() {
    const currentPath = window.location.pathname;
    const currentPage = currentPath.split('/').pop();

    const navLinks = document.querySelectorAll('.nav-links li a');

    navLinks.forEach(link => {
        link.classList.remove('active');

        const linkPath = link.getAttribute('href');
        const linkPage = linkPath.split('/').pop();

        if (linkPage === currentPage ||
            (currentPage === '' && linkPage === 'index.html') ||
            (currentPage === 'index.html' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// Reveal on scroll
const revealElements = () => {
    const reveals = document.querySelectorAll('section, .reveal');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.05 });

    reveals.forEach(el => observer.observe(el));
};

// Call when page loads
document.addEventListener('DOMContentLoaded', () => {
    setActiveNavLink();
    revealElements();

    // FAQ Toggle
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            // Close other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            item.classList.toggle('active');
        });
    });
});

// Call when navigation changes (for single page apps)
window.addEventListener('popstate', setActiveNavLink);

const counters = document.querySelectorAll(".counter");
const counterSection = document.querySelector(".counter-section");
let started = false; // لمنع تكرار الأنيماشن

function startCount() {
    counters.forEach(counter => {
        let target = +counter.getAttribute("data-target");
        let count = 0;

        let step = target / 100;

        let update = setInterval(() => {
            count += step;
            counter.textContent = Math.floor(count);

            if (count >= target) {
                counter.textContent = target;
                clearInterval(update);
            }
        }, 20);
    });
}

if (counterSection && counters.length) {
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !started) {
            startCount();
            started = true;
        }
    }, { threshold: 0.5 });

    observer.observe(counterSection);
}

const whatsappForm = document.getElementById("whatsappForm");

if (whatsappForm) {
    whatsappForm.addEventListener("submit", function (e) {
        e.preventDefault();

        // رقم الواتساب المطلوب إرسال الرسالة له
        let phoneNumber = "201557857739";

        let name = document.getElementById("name").value;
        let phone = document.getElementById("phone").value;
        let message = document.getElementById("message").value;

        let finalMessage =
            `الاسم: ${name}%0A` +
            `رقم الهاتف: ${phone}%0A` +
            `الرسالة: ${message}`;

        // فتح واتساب بالرابط
        let url = `https://wa.me/${phoneNumber}?text=${finalMessage}`;

        window.open(url, "_blank");
    });
}

// Payment Form Handler
const paymentForm = document.getElementById("paymentForm");

if (paymentForm) {
    paymentForm.addEventListener("submit", function (e) {
        e.preventDefault();

        let fullName = document.getElementById("pay-name").value;
        let email = document.getElementById("pay-email").value;
        let phone = document.getElementById("pay-phone").value;
        let service = document.getElementById("service").value;
        let amount = document.getElementById("amount").value;
        let cardNumber = document.getElementById("cardNumber").value;
        let expiry = document.getElementById("expiry").value;
        let cvv = document.getElementById("cvv").value;

        // Format card number for display
        let maskedCard = cardNumber.replace(/\d(?=\d{4})/g, "*");

        let serviceText = {
            "catering": "خدمات الطعام",
            "weddings": "الأفراح",
            "birthday": "أعياد الميلاد",
            "engagement": "الخطوبة",
            "photography": "التصوير",
            "music": "الموسيقى والدي جي",
            "dessert": "الحلويات"
        };

        let finalMessage =
            `طلب دفع جديد%0A%0A` +
            `الاسم الكامل: ${fullName}%0A` +
            `البريد الإلكتروني: ${email}%0A` +
            `رقم الهاتف: ${phone}%0A` +
            `الخدمة المطلوبة: ${serviceText[service] || service}%0A` +
            `المبلغ: ${amount} جنيه%0A` +
            `رقم البطاقة: ${maskedCard}%0A` +
            `تاريخ الانتهاء: ${expiry}%0A%0A` +
            `تم استلام طلب الدفع بنجاح!`;

        let phoneNumber = "201557857739";
        let url = `https://wa.me/${phoneNumber}?text=${finalMessage}`;

        window.open(url, "_blank");

        // Reset form after submission
        paymentForm.reset();
    });
}

// Card Number Formatting
const cardNumberInput = document.getElementById("cardNumber");
if (cardNumberInput) {
    cardNumberInput.addEventListener("input", function (e) {
        let value = e.target.value.replace(/\s/g, '');
        let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
        e.target.value = formattedValue;
    });
}

// Expiry Date Formatting  
const expiryInput = document.getElementById("expiry");
if (expiryInput) {
    expiryInput.addEventListener("input", function (e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length >= 2) {
            value = value.slice(0, 2) + '/' + value.slice(2, 4);
        }
        e.target.value = value;
    });
}

// CVV Input - Numbers Only
const cvvInput = document.getElementById("cvv");
if (cvvInput) {
    cvvInput.addEventListener("input", function (e) {
        e.target.value = e.target.value.replace(/\D/g, '');
    });
}