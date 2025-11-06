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
  const navbar = document.querySelector('#b03 .navbar');
  const menuItems = document.querySelectorAll('#b03 .nav-links > li');
  const threshold = 70;  // Distancia en px para fijar la barra

  // Fijar la barra al hacer scroll
  window.addEventListener('scroll', function() {
    if (window.scrollY > threshold) {
      navbar.classList.add('fixed');
    } else {
      navbar.classList.remove('fixed');
    }
  });

  // Manejo de apertura/cierre de submenús
  menuItems.forEach(item => {
    item.addEventListener('click', function(event) {
      if (item.classList.contains('open')) {
        item.classList.remove('open');
      } else {
        menuItems.forEach(innerItem => innerItem.classList.remove('open'));
        item.classList.add('open');
      }
      event.stopPropagation();
    });
  });

  // Cerrar submenús al hacer clic fuera de la barra
  document.addEventListener('click', function(event) {
    if (!event.target.closest('#b03 .navbar')) {
      menuItems.forEach(item => item.classList.remove('open'));
    }
  });
} 
