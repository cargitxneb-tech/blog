// app.js

// Cargar el footer
fetch('footer.html')
  .then(response => {
    if (!response.ok) {
      throw new Error('Error al cargar el footer.');
    }
    return response.text();
  })
  .then(html => {
    // Insertar el contenido del footer en el div con id="p5040"
    document.getElementById('p5040').innerHTML = html;
  })
  .catch(error => {
    console.error('No se pudo cargar el footer:', error);
  });
