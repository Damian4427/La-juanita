  function toggleMenu() {
    document.getElementById("sideMenu").classList.toggle("abierto");
  }

  // Control submenús
  document.querySelectorAll(".dropdown > a").forEach(link => {
    link.addEventListener("click", function(e) {
      if (window.innerWidth <= 900) {
        e.preventDefault();
        
        const parent = this.parentElement;
        const isActive = parent.classList.contains("activo");

        // Cierra todos los demás
        document.querySelectorAll(".dropdown").forEach(drop => drop.classList.remove("activo"));

        // Si no estaba activo, lo abre
        if (!isActive) {
          parent.classList.add("activo");
        }
      }
    });
  });


const menu = document.getElementById("sideMenu");
const hamburger = document.getElementById("hamburgerBtn");

document.addEventListener("click", function(event) {
  // Verificar si el menú está abierto usando classList
  if (menu.classList.contains("abierto") && 
      !menu.contains(event.target) && 
      !hamburger.contains(event.target)) {
    menu.classList.remove("abierto");
    menu.classList.add("cerrado");
  }
});
 // carrusel
let index = 0;
  const carruselFotos = document.getElementById('carruselFotos');
  const totalSlides = document.querySelectorAll('.carrusel').length;

  function actualizarCarrusel() {
    carruselFotos.style.transform = `translateX(-${index * 100}%)`;
  }

  function moverCarrusel(direccion) {
    index = (index + direccion + totalSlides) % totalSlides;
    actualizarCarrusel();
    reiniciarAuto();
  }

  // Auto avance
  let auto = setInterval(() => {
    moverCarrusel(1);
  }, 5000);

  // Reset automático si el usuario toca los botones
  function reiniciarAuto() {
    clearInterval(auto);
    auto = setInterval(() => {
      moverCarrusel(1);
    }, 15000);
  }

const carruselIndicadores = document.getElementById('carruselIndicadores');

let slideActual = 0;
const cantidadVisible = 4; // ajustar si mostrás más de una foto a la vez

function crearIndicadores() {
  const totalIndicadores = Math.ceil(totalSlides / cantidadVisible);
  carruselIndicadores.innerHTML = '';

  for (let i = 0; i < totalIndicadores; i++) {
    const dot = document.createElement('span');
    dot.addEventListener('click', () => moverACarrusel(i));
    carruselIndicadores.appendChild(dot);
  }

  actualizarIndicadores();
}

function actualizarIndicadores() {
  const dots = carruselIndicadores.children;
  for (let i = 0; i < dots.length; i++) {
    dots[i].classList.remove('activo');
  }
  const indexActivo = Math.floor(slideActual / cantidadVisible);
  if (dots[indexActivo]) {
    dots[indexActivo].classList.add('activo');
  }
}

function moverCarrusel(direccion) {
  slideActual += direccion * cantidadVisible;
  if (slideActual >= totalSlides) {
    slideActual = 0;
  } else if (slideActual < 0) {
    slideActual = totalSlides - cantidadVisible;
    if (slideActual < 0) slideActual = 0;
  }

  carruselFotos.style.transform = `translateX(-${slideActual * 100}%)`;
  actualizarIndicadores();
}

function moverACarrusel(indice) {
  slideActual = indice * cantidadVisible;
  carruselFotos.style.transform = `translateX(-${slideActual * 100}%)`;
  actualizarIndicadores();
}

// Swipe para móviles
let startX = 0;
carruselFotos.addEventListener("touchstart", e => {
  startX = e.touches[0].clientX;
});

carruselFotos.addEventListener("touchend", e => {
  let endX = e.changedTouches[0].clientX;
  if (startX - endX > 50) moverCarrusel(1); // izquierda
  if (endX - startX > 50) moverCarrusel(-1); // derecha
});

actualizarCarrusel();

crearIndicadores();
  
// Contadores animados
document.querySelectorAll('#LaHuella h6').forEach(counter => {
  const target = counter.getAttribute('data-target'); // número final
  counter.textContent = '0'; // iniciar en 0
  const duration = 2000; // duración total en ms
  let startTime = null; 

  // Función de animación
  function animate(timestamp) {
    if (!startTime) startTime = timestamp;
    const progress = timestamp - startTime;
    const current = Math.min(Math.floor((progress / duration) * target), target);
    counter.textContent = current;
    if (progress < duration) {
      requestAnimationFrame(animate);
    } else {
      counter.textContent = target; // asegurar valor final exacto
    }
  }

  requestAnimationFrame(animate);
});