// Mensaje de confirmacion en consola
console.log("Portafolio cargado correctamente");

document.addEventListener("DOMContentLoaded", function () {

    // ============================================================
    // 1) FONDO DE CONSTELACIONES (estrellas conectadas con lineas)
    // ============================================================

    const canvas = document.getElementById("constelacion");
    const ctx = canvas.getContext("2d");
    let ancho, alto, estrellas;

    // Ajusta el tamano del canvas al de la ventana
    function redimensionar() {
        ancho = canvas.width = window.innerWidth;
        alto = canvas.height = window.innerHeight;
        crearEstrellas();
    }

    // Genera las estrellas (cantidad segun el tamano de pantalla)
    function crearEstrellas() {
        const cantidad = Math.min(110, Math.floor((ancho * alto) / 16000));
        estrellas = [];
        for (let i = 0; i < cantidad; i++) {
            estrellas.push({
                x: Math.random() * ancho,
                y: Math.random() * alto,
                vx: (Math.random() - 0.5) * 0.25,  // velocidad horizontal
                vy: (Math.random() - 0.5) * 0.25,  // velocidad vertical
                r: Math.random() * 1.4 + 0.4       // radio del punto
            });
        }
    }

    // Dibuja cada cuadro de la animacion
    function animar() {
        ctx.clearRect(0, 0, ancho, alto);

        for (let i = 0; i < estrellas.length; i++) {
            const e = estrellas[i];

            // Mueve la estrella
            e.x += e.vx;
            e.y += e.vy;

            // Si toca un borde, rebota
            if (e.x < 0 || e.x > ancho) e.vx *= -1;
            if (e.y < 0 || e.y > alto) e.vy *= -1;

            // Dibuja el punto
            ctx.beginPath();
            ctx.arc(e.x, e.y, e.r, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(160, 190, 255, 0.7)";
            ctx.fill();

            // Conecta con estrellas cercanas mediante una linea
            for (let j = i + 1; j < estrellas.length; j++) {
                const o = estrellas[j];
                const dx = e.x - o.x;
                const dy = e.y - o.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 130) {
                    ctx.beginPath();
                    ctx.moveTo(e.x, e.y);
                    ctx.lineTo(o.x, o.y);
                    // La linea se hace mas tenue mientras mas lejos esten
                    ctx.strokeStyle = "rgba(90, 120, 200, " + (0.18 * (1 - dist / 130)) + ")";
                    ctx.lineWidth = 0.6;
                    ctx.stroke();
                }
            }
        }

        requestAnimationFrame(animar);
    }

    redimensionar();
    animar();
    window.addEventListener("resize", redimensionar);

    // ============================================================
    // 2) APARICION DE LAS TARJETAS AL HACER SCROLL
    // ============================================================

    const tarjetas = document.querySelectorAll(".tarea");

    const observador = new IntersectionObserver(function (entradas) {
        entradas.forEach(function (entrada, indice) {
            if (entrada.isIntersecting) {
                // Pequeno retraso escalonado para que aparezcan en cascada
                setTimeout(function () {
                    entrada.target.classList.add("visible");
                }, indice * 80);
                observador.unobserve(entrada.target);
            }
        });
    }, { threshold: 0.15 });

    tarjetas.forEach(function (tarjeta) {
        observador.observe(tarjeta);
    });

    // ============================================================
    // 3) SCROLL SUAVE EN LOS ENLACES INTERNOS DEL MENU
    // ============================================================

    document.querySelectorAll('a[href^="#"]').forEach(function (enlace) {
        enlace.addEventListener("click", function (evento) {
            const destino = document.querySelector(this.getAttribute("href"));
            if (destino) {
                evento.preventDefault();
                destino.scrollIntoView({ behavior: "smooth" });
            }
        });
    });

    // ============================================================
    // 4) MODAL DE VISTA PREVIA DE PDF
    // ============================================================

    const modal = document.getElementById("modal-pdf");
    const modalIframe = document.getElementById("modal-iframe");
    const modalTitulo = document.getElementById("modal-titulo");
    const botonesVer = document.querySelectorAll(".btn-ver");

    // Abre el modal con el PDF correspondiente
    function abrirModal(rutaPdf, titulo) {
        modalIframe.src = rutaPdf;
        modalTitulo.innerHTML = titulo || "Vista previa";
        modal.classList.add("abierto");
        modal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
    }

    // Cierra el modal y libera el iframe
    function cerrarModal() {
        modal.classList.remove("abierto");
        modal.setAttribute("aria-hidden", "true");
        modalIframe.src = "about:blank";
        document.body.style.overflow = "";
    }

    // Cada boton "Vista previa" abre el modal con su PDF
    botonesVer.forEach(function (boton) {
        boton.addEventListener("click", function () {
            const ruta = this.getAttribute("data-pdf");
            const titulo = this.getAttribute("data-titulo");
            abrirModal(ruta, titulo);
        });
    });

    // Cerrar: con el boton X o con el fondo oscuro
    modal.querySelector(".modal-cerrar").addEventListener("click", cerrarModal);
    modal.querySelector(".modal-backdrop").addEventListener("click", cerrarModal);

    // Cerrar tambien con la tecla Escape
    document.addEventListener("keydown", function (evento) {
        if (evento.key === "Escape" && modal.classList.contains("abierto")) {
            cerrarModal();
        }
    });

});