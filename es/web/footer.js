// app.js

// Cargar el footer desde la ruta /es/web/footer.html
fetch('/es/web/footer.html')
  .then(response => {
    if (!response.ok) {
      throw new Error('Error al cargar el footer.');
    }
    return response.text();
  })
  .then(html => {
    document.getElementById('p5040').innerHTML = html;
  })
  .catch(error => {
    console.error('No se pudo cargar el footer:', error);
  });
