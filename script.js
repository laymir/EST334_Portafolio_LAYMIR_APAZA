// Mensaje de confirmacion en consola
console.log("Portafolio cargado correctamente");

// Esperamos a que todo el HTML este listo antes de ejecutar
document.addEventListener("DOMContentLoaded", function () {

    // Tomamos todos los enlaces del menu y todas las secciones
    const enlaces = document.querySelectorAll(".menu a");
    const secciones = document.querySelectorAll("section");

    // --- 1) RESALTAR EL ENLACE DE LA SECCION QUE SE ESTA VIENDO ---

    function resaltarMenu() {

        let actual = "";

        // Recorremos cada seccion y vemos cual esta en pantalla
        secciones.forEach(function (seccion) {

            const inicio = seccion.offsetTop - 120;

            if (window.scrollY >= inicio) {
                actual = seccion.getAttribute("id");
            }

        });

        // Activamos solo el enlace que coincide con la seccion actual
        enlaces.forEach(function (enlace) {

            enlace.classList.remove("activo");

            if (enlace.getAttribute("href") === "#" + actual) {
                enlace.classList.add("activo");
            }

        });

    }

    // Lo ejecutamos al cargar y cada vez que el usuario hace scroll
    resaltarMenu();
    window.addEventListener("scroll", resaltarMenu);

    // --- 2) SCROLL SUAVE AL HACER CLIC EN EL MENU ---
    // (Refuerza el scroll-behavior del CSS para navegadores antiguos)

    enlaces.forEach(function (enlace) {

        enlace.addEventListener("click", function (evento) {

            evento.preventDefault();

            const destino = document.querySelector(this.getAttribute("href"));

            if (destino) {
                destino.scrollIntoView({ behavior: "smooth" });
            }

        });

    });

});