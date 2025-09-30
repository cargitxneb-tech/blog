// Función para inicializar el menú de escritorio
function initMenu() {
    // Variables
    const logo = document.querySelector('#menu-container .logo');
    const menuHorizontal = document.querySelector('#menu-container .menu-horizontal');
    const arrowIcon = document.querySelector('#menu-container .logo i');
    const dropdowns = document.querySelectorAll('#menu-container .dropdown');

    if (!logo || !menuHorizontal || !arrowIcon) {
        console.warn("El menú aún no está en el DOM.");
        return;
    }

    let isMenuOpen = false;

    // Abrir/cerrar menú al hacer clic en el logo
    logo.addEventListener('click', () => {
        isMenuOpen = !isMenuOpen;
        menuHorizontal.classList.toggle('active', isMenuOpen);
        arrowIcon.classList.toggle('fa-chevron-up', isMenuOpen);
        arrowIcon.classList.toggle('fa-chevron-down', !isMenuOpen);
    });

    // Submenús desplegables
    dropdowns.forEach(dropdown => {
        const arrow = dropdown.querySelector('i');

        dropdown.addEventListener('click', (event) => {
            if (event.target.tagName.toLowerCase() === 'a') return; // Permitir navegación cuando se haga clic en un enlace

            event.preventDefault(); // Evitar comportamiento por defecto

            // Cerrar otros submenús
            dropdowns.forEach(otherDropdown => {
                if (otherDropdown !== dropdown) {
                    otherDropdown.classList.remove('active');
                    const otherArrow = otherDropdown.querySelector('i');
                    if (otherArrow) {
                        otherArrow.classList.remove('fa-chevron-up');
                        otherArrow.classList.add('fa-chevron-down');
                    }
                }
            });

            // Alternar el submenú actual
            dropdown.classList.toggle('active');
            arrow.classList.toggle('fa-chevron-up');
            arrow.classList.toggle('fa-chevron-down');
        });
    });

    // Cerrar menú al salir el mouse
    menuHorizontal.addEventListener('mouseleave', () => {
        if (!isMenuOpen) {
            menuHorizontal.classList.remove('active');
            arrowIcon.classList.remove('fa-chevron-up');
            arrowIcon.classList.add('fa-chevron-down');
        }
    });
}

// Función para inicializar el menú móvil
function initMenu2() {
    // Variables específicas para el menú móvil
    const logo2 = document.querySelector('#menu2-container .logo');
    const menuMobile2 = document.querySelector('#menu2-container .menu-mobile');
    const arrowIcon2 = document.querySelector('#menu2-container .logo i');
    const dropdowns2 = document.querySelectorAll('#menu2-container .dropdown');

    let isMenuOpen2 = false;

    // Alternar el menú móvil (menú 2)
    logo2.addEventListener('click', () => {
        isMenuOpen2 = !isMenuOpen2;
        menuMobile2.classList.toggle('active', isMenuOpen2);
        arrowIcon2.classList.toggle('fa-chevron-up', isMenuOpen2);
        arrowIcon2.classList.toggle('fa-chevron-down', !isMenuOpen2);
    });

    // Mostrar/ocultar submenús en el menú móvil
    dropdowns2.forEach(dropdown => {
        const arrow2 = dropdown.querySelector('i');

        dropdown.addEventListener('click', (event) => {
            // Permitir que los enlaces <a> funcionen normalmente
            if (event.target.tagName.toLowerCase() === 'a') return;

            event.preventDefault();

            // Cerrar otros submenús
            dropdowns2.forEach(otherDropdown => {
                if (otherDropdown !== dropdown) {
                    otherDropdown.classList.remove('active');
                    otherDropdown.querySelector('i').classList.remove('fa-chevron-up');
                    otherDropdown.querySelector('i').classList.add('fa-chevron-down');
                }
            });

            // Alternar el submenú de cada ítem
            dropdown.classList.toggle('active');
            arrow2.classList.toggle('fa-chevron-up');
            arrow2.classList.toggle('fa-chevron-down');
        });
    });
}

// Llamar a las funciones para inicializar los menús una vez cargue el DOM
document.addEventListener('DOMContentLoaded', () => {
    initMenu();  // Inicializa el menú de escritorio
    initMenu2(); // Inicializa el menú móvil
});
