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


