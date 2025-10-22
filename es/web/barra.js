// --- CARGA DEL HEADER ---
fetch('es/web/barrainfo.html')
  .then(response => response.text())
  .then(html => {
    const contenedor = document.getElementById('miHeaderNav');
    contenedor.innerHTML = html;

    // --- Una vez inyectado el HTML, inicializamos toda la lógica ---
    inicializarMenu();
  })
  .catch(err => console.error('Error al cargar barrainfo.html:', err));


// --- FUNCIÓN DE INICIALIZACIÓN ---
function inicializarMenu() {
  const cont = document.getElementById('miHeaderNav');
  const header = cont.querySelector('.header');
  const menuBtn = cont.querySelector('#menuBtn');
  const menuList = cont.querySelector('#menuList');
  const overlay = cont.querySelector('#overlay');

  if (!header || !menuBtn || !menuList || !overlay) {
    console.warn('Elementos del menú no encontrados');
    return;
  }

  // --- MENÚ MÓVIL ---
  menuBtn.addEventListener('click', () => {
    const visible = menuList.style.display === 'block';
    menuList.style.display = visible ? 'none' : 'block';
    overlay.classList.toggle('active', !visible);
    menuBtn.classList.toggle('active', !visible);
    menuBtn.setAttribute('aria-expanded', String(!visible));
    document.body.style.overflow = visible ? '' : 'hidden';
  });

  // --- Cerrar al tocar overlay ---
  overlay.addEventListener('click', () => {
    menuList.style.display = 'none';
    overlay.classList.remove('active');
    menuBtn.classList.remove('active');
    document.body.style.overflow = '';
  });

  // --- Submenús móviles ---
  cont.querySelectorAll('.mobile-toggle').forEach(toggle => {
    toggle.addEventListener('click', () => {
      const submenu = toggle.nextElementSibling;
      const chevron = toggle.querySelector('.chevron');
      const open = submenu.style.display === 'block';
      cont.querySelectorAll('.mobile-submenu').forEach(sm => {
        sm.style.display = 'none';
        sm.previousElementSibling.querySelector('.chevron').classList.remove('open');
      });
      submenu.style.display = open ? 'none' : 'block';
      chevron.classList.toggle('open', !open);
    });
  });

  // --- Submenús en escritorio (click) ---
  const desktopButtons = cont.querySelectorAll('.navlinks > li > button');
  desktopButtons.forEach(btn => {
    const submenu = btn.nextElementSibling;
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = submenu.style.display === 'block';
      cont.querySelectorAll('.submenu').forEach(sm => sm.style.display = 'none');
      cont.querySelectorAll('.chevron').forEach(ch => ch.classList.remove('open'));
      if (!isOpen) {
        submenu.style.display = 'block';
        btn.querySelector('.chevron').classList.add('open');
      }
    });
  });

  // --- Cerrar submenús al hacer clic fuera ---
  document.addEventListener('click', (e) => {
    if (!cont.contains(e.target)) {
      cont.querySelectorAll('.submenu').forEach(sm => sm.style.display = 'none');
      cont.querySelectorAll('.chevron').forEach(ch => ch.classList.remove('open'));
    }
  });

  // --- Cerrar submenús al hacer scroll ---
  window.addEventListener('scroll', () => {
    cont.querySelectorAll('.submenu').forEach(sm => sm.style.display = 'none');
    cont.querySelectorAll('.chevron').forEach(ch => ch.classList.remove('open'));
  });

  // --- Header fijo dependiendo del tamaño ---
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    const width = window.innerWidth;

    let limit = 50;
    let height = '50px';

    if (width >= 1200) {
      limit = 70;
      height = '70px';
    } else if (width >= 720) {
      limit = 60;
      height = '60px';
    }

    if (y > limit) {
      header.style.position = 'fixed';
      header.style.top = '0';
      header.style.width = '100%';
      header.style.zIndex = '200';
      header.style.height = height;
    } else {
      header.style.position = 'sticky';
      header.style.top = '0';
      header.style.height = height;
    }
  });
}
