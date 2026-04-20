// ==========================================
// INICIALIZACIÓN Y CONFIGURACIÓN
// ==========================================

// ==========================================
// FUNCIONES DE VISTA PREVIA DE PDF
// ==========================================

function previewPDF(pdfPath) {
    const modal = document.getElementById('pdfModal');
    const iframe = document.getElementById('pdfViewer');
    const fileName = document.getElementById('pdfFileName');
    const downloadLink = document.getElementById('pdfDownloadLink');

    // Verificar si el archivo existe
    fetch(pdfPath, { method: 'HEAD' })
        .then(response => {
            if (response.ok) {
                // El archivo existe
                iframe.src = pdfPath;
                downloadLink.href = pdfPath;

                // Extraer nombre del archivo
                const name = pdfPath.split('/').pop();
                fileName.textContent = name;

                // Mostrar modal
                modal.classList.add('show');
                document.body.style.overflow = 'hidden';
            } else {
                showNotification('⚠️ El archivo PDF aún no está disponible');
            }
        })
        .catch(error => {
            console.log('Archivo no encontrado:', pdfPath);
            showNotification('⚠️ El archivo PDF aún no está disponible. Por favor, sube tus trabajos.');
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

// Cerrar modal con tecla ESC
document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
        closePDFModal();
    }
});

// ==========================================
// NAVEGACIÓN SUAVE Y ACTIVA
// ==========================================

document.addEventListener('DOMContentLoaded', function () {
    const navLinks = document.querySelectorAll('.nav-link');

    // Navegación suave (scroll smooth)
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                // Calcular la posición considerando la barra de navegación fija
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Marcar enlace activo según scroll
    function updateActiveLink() {
        const navHeight = document.querySelector('.navbar').offsetHeight;
        let current = '';

        const sections = document.querySelectorAll('section[id]');

        sections.forEach(section => {
            const sectionTop = section.offsetTop - navHeight - 100;
            const sectionHeight = section.clientHeight;

            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveLink);
});

// ==========================================
// INTERSECCIÓN OBSERVER - ANIMACIONES AL SCROLL
// ==========================================

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

// Observar todas las tarjetas
document.addEventListener('DOMContentLoaded', function () {
    const cards = document.querySelectorAll('.card, .trabajo-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.6s ease-out';
        observer.observe(card);
    });
});

// ==========================================
// EFECTO HOVER EN BOTONES
// ==========================================

document.addEventListener('DOMContentLoaded', function () {
    const buttons = document.querySelectorAll('.btn-trabajo, .contacto-link');

    buttons.forEach(button => {
        button.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-5px)';
        });

        button.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0)';
        });
    });
});

// ==========================================
// VALIDACIÓN DE ENLACES
// ==========================================

document.addEventListener('DOMContentLoaded', function () {
    const workLinks = document.querySelectorAll('.btn-trabajo');

    workLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            // Si el href es "#", mostrar un mensaje amistoso
            if (this.getAttribute('href') === '#') {
                e.preventDefault();
                showNotification('Este trabajo aún está en construcción. ¡Vuelve pronto! 🚀');
            }
        });
    });

    // Lo mismo para los enlaces de contacto
    const contactLinks = document.querySelectorAll('.contacto-link');
    contactLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            // Permitir que funcione normalmente los enlaces de mailto
            if (!this.getAttribute('href').startsWith('mailto:') &&
                !this.getAttribute('href').startsWith('http')) {
                e.preventDefault();
                showNotification('Enlace en construcción. ¡Actualiza pronto! 🔗');
            }
        });
    });
});

// ==========================================
// NOTIFICACIONES
// ==========================================

function showNotification(message) {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: linear-gradient(135deg, #3b82f6, #7c3aed);
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 1000;
        animation: slideInUp 0.4s ease-out;
        font-weight: 500;
        max-width: 300px;
    `;

    // Añadir estilo de animación si no existe
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

    // Remover después de 4 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOutDown 0.4s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 400);
    }, 4000);
}

// ==========================================
// ESTADÍSTICAS DE VISITA
// ==========================================

console.log('📊 Portfolio EST334 - Estadística Espacial UNAP 2026-I');
console.log('👤 Autor: Laymir Sebastian Apaza Ajrota');
console.log('📍 Ubicación: Puno, Perú');

// Verificar soporte de características
console.log('✅ CSS Grid: ' + (CSS.supports('display', 'grid') ? 'Soportado' : 'No soportado'));
console.log('✅ CSS Flexbox: ' + (CSS.supports('display', 'flex') ? 'Soportado' : 'No soportado'));
console.log('✅ Animaciones CSS: ' + (CSS.supports('animation', 'test 1s') ? 'Soportadas' : 'No soportadas'));

// ==========================================
// CONTADOR DE SESIÓN
// ==========================================

// Contar visitas localmente (en el navegador)
let visits = localStorage.getItem('portfolio-visits') || 0;
visits = parseInt(visits) + 1;
localStorage.setItem('portfolio-visits', visits);
console.log(`👁️ Visitas a este portafolio: ${visits}`);

// ==========================================
// DETECCIÓN DE CONEXIÓN
// ==========================================

if (navigator.onLine) {
    console.log('🌐 Conexión de Internet: Activa');
} else {
    console.log('🌐 Conexión de Internet: Sin conexión');
    showNotification('⚠️ Sin conexión a Internet. Algunos contenidos podrían no estar disponibles.');
}

window.addEventListener('online', function () {
    console.log('🌐 ¡Conexión restaurada!');
    showNotification('✅ ¡Conexión de Internet restaurada!');
});

window.addEventListener('offline', function () {
    console.log('🌐 Se perdió la conexión de Internet');
    showNotification('⚠️ Se perdió la conexión de Internet');
});

// ==========================================
// MEJORA DE ACCESIBILIDAD
// ==========================================

// Soporte para teclado en botones
document.addEventListener('DOMContentLoaded', function () {
    const buttons = document.querySelectorAll('.btn-trabajo, .contacto-link, .nav-link');

    buttons.forEach(button => {
        button.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
});

// ==========================================
// RENDIMIENTO Y LOGS
// ==========================================

window.addEventListener('load', function () {
    const performanceData = window.performance.timing;
    const pageLoadTime = performanceData.loadEventEnd - performanceData.navigationStart;
    console.log(`⏱️ Tiempo de carga: ${pageLoadTime}ms`);
    console.log(`✨ Portafolio cargado correctamente en ${(pageLoadTime / 1000).toFixed(2)}s`);
});

// ==========================================
// FUNCIONALIDADES EXTRAS (OPCIONAL)
// ==========================================

// Efecto de enfoque para mejor accesibilidad
document.addEventListener('keydown', function (e) {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-active');
    }
});

document.addEventListener('mousedown', function () {
    document.body.classList.remove('keyboard-active');
});

// Agregar estilos para focus visible
const focusStyle = document.createElement('style');
focusStyle.textContent = `
    body.keyboard-active *:focus {
        outline: 2px solid #3b82f6;
        outline-offset: 2px;
    }
`;
document.head.appendChild(focusStyle);