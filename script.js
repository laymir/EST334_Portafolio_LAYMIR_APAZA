// ===== PDF PREVIEW FUNCTIONS =====

function previewPDF(pdfPath) {
    const modal = document.getElementById('pdfModal');
    const iframe = document.getElementById('pdfViewer');
    const fileName = document.getElementById('pdfFileName');
    const downloadLink = document.getElementById('pdfDownloadLink');

    fetch(pdfPath, { method: 'HEAD' })
        .then(response => {
            if (response.ok) {
                iframe.src = pdfPath;
                downloadLink.href = pdfPath;
                const name = pdfPath.split('/').pop();
                fileName.textContent = name;
                modal.classList.add('show');
                document.body.style.overflow = 'hidden';
            } else {
                showNotification('⚠️ El archivo PDF aún no está disponible');
            }
        })
        .catch(error => {
            console.log('Archivo no encontrado:', pdfPath);
            showNotification('⚠️ El archivo PDF aún no está disponible');
        });
}

function closePDFModal() {
    const modal = document.getElementById('pdfModal');
    const iframe = document.getElementById('pdfViewer');
    modal.classList.remove('show');
    iframe.src = '';
    document.body.style.overflow = 'auto';
}

// Cerrar modal al hacer click fuera
document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('pdfModal');
    if (modal) {
        modal.addEventListener('click', function (event) {
            if (event.target === modal) {
                closePDFModal();
            }
        });
    }
});

// Cerrar modal con ESC
document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
        closePDFModal();
    }
});

// ===== SMOOTH SCROLL =====
document.addEventListener('DOMContentLoaded', function () {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                document.querySelector(href).scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// ===== NOTIFICATIONS =====
function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: linear-gradient(135deg, #3b82f6, #7c3aed);
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 1000;
        animation: slideInUp 0.4s ease-out;
        font-weight: 500;
        max-width: 300px;
    `;

    if (!document.querySelector('style[data-notification]')) {
        const style = document.createElement('style');
        style.setAttribute('data-notification', 'true');
        style.textContent = `
            @keyframes slideInUp {
                from {
                    transform: translateY(100px);
                    opacity: 0;
                }
                to {
                    transform: translateY(0);
                    opacity: 1;
                }
            }
            @keyframes slideOutDown {
                from {
                    transform: translateY(0);
                    opacity: 1;
                }
                to {
                    transform: translateY(100px);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutDown 0.4s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 400);
    }, 4000);
}

// ===== INTERSECTION OBSERVER PARA ANIMACIONES =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', function () {
    const cards = document.querySelectorAll('.tarea-card, .info-box, .stat-box');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.6s ease-out';
        observer.observe(card);
    });
});

// ===== STATS =====
console.log('📊 Portafolio EST334 - Estadística Espacial UNAP 2026-I');
console.log('👤 Autor: Laymir Sebastián Apaza Ajrota');
console.log('📍 Ubicación: Puno, Perú');

let visits = localStorage.getItem('portfolio-visits') || 0;
visits = parseInt(visits) + 1;
localStorage.setItem('portfolio-visits', visits);
console.log(`👁️ Visitas: ${visits}`);

// ===== CONNECTION DETECTION =====
if (navigator.onLine) {
    console.log('🌐 Conexión: Activa');
} else {
    showNotification('⚠️ Sin conexión a Internet');
}

window.addEventListener('online', function () {
    showNotification('✅ Conexión restaurada');
});

window.addEventListener('offline', function () {
    showNotification('⚠️ Se perdió la conexión');
});

// ===== KEYBOARD SUPPORT =====
document.addEventListener('DOMContentLoaded', function () {
    const buttons = document.querySelectorAll('.btn-preview, .btn-download, .btn-video, .btn-youtube');
    buttons.forEach(button => {
        button.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
});

// ===== PERFORMANCE =====
window.addEventListener('load', function () {
    const performanceData = window.performance.timing;
    const pageLoadTime = performanceData.loadEventEnd - performanceData.navigationStart;
    console.log(`⏱️ Tiempo de carga: ${pageLoadTime}ms (${(pageLoadTime / 1000).toFixed(2)}s)`);
});