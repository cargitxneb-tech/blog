// --- CARGA DEL HEADER ---
fetch('/conf/barrainfo.html') // Ruta relativa del archivo HTML del menú
  .then(response => response.text())  // Convierte el contenido en texto
  .then(html => {
    // Inyectar el HTML dentro del contenedor
    const contenedor = document.getElementById('miHeaderNav');
    contenedor.innerHTML = html;

    // --- Inicializa la lógica del menú ---
    inicializarMenu();
  })
  .catch(err => console.error('Error al cargar barrainfo.html:', err));


// --- Inicializa los eventos del menú ---
function inicializarMenu() {
  const hamburger = document.querySelector('#b40 .hamburger');
  const bottomPanel = document.querySelector('#b40 .bottom-panel');
  const overlay = document.querySelector('#b40 .overlay');
  const submenuToggles = document.querySelectorAll('#b40 .toggle-submenu');
  const navbar = document.querySelector('#b40 .navbar');

  if (!hamburger || !bottomPanel || !overlay || !navbar) {
    console.warn('Elementos del navbar no encontrados, omitiendo inicialización.');
    return;
  }

  // --- Abrir/cerrar el panel con la hamburguesa ---
  hamburger.addEventListener('click', () => {
    bottomPanel.classList.toggle('show');
    overlay.classList.toggle('show');
    hamburger.classList.toggle('active');
    document.body.classList.toggle('no-scroll', bottomPanel.classList.contains('show'));
  });

  // --- Submenús ---
  submenuToggles.forEach(toggle => {
    toggle.addEventListener('click', (ev) => {
      ev.preventDefault();  // Prevenir navegación
      const subMenu = toggle.nextElementSibling;  // El siguiente <ul> con la clase sub-menu
      if (subMenu) {
        subMenu.classList.toggle('show');
        toggle.classList.toggle('active');
      }
    });
  });

  // --- Cerrar el menú cuando se hace clic en el overlay ---
  overlay.addEventListener('click', () => {
    bottomPanel.classList.remove('show');
    overlay.classList.remove('show');
    hamburger.classList.remove('active');
    document.body.classList.remove('no-scroll');
  });

  // --- Fijar la barra al hacer scroll ---
  window.addEventListener('scroll', () => {
    if (window.scrollY > 55) {
      navbar.classList.add('fixed');
      bottomPanel.style.position = 'fixed';
      bottomPanel.style.top = '65px';
    } else {
      navbar.classList.remove('fixed');
      bottomPanel.style.position = 'absolute';
      bottomPanel.style.top = '';
    }
  });
}
