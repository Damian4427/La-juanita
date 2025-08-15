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
// --- Carrusel Coverflow Adaptativo ---
let index = 0;
const carruselFotos = document.getElementById('carruselFotos');
const totalSlides = document.querySelectorAll('.carrusel').length;
let auto = null;

// Coverflow: asigna clases para móvil/tablet
function actualizarCarruselCoverflow() {
  const carruseles = document.querySelectorAll('.carrusel');
  carruseles.forEach((el, i) => {
    el.classList.remove('activa', 'lateral-izq', 'lateral-der');
    if (i === index) {
      el.classList.add('activa');
    } else if (i === (index - 1 + totalSlides) % totalSlides) {
      el.classList.add('lateral-izq');
    } else if (i === (index + 1) % totalSlides) {
      el.classList.add('lateral-der');
    }
  });
}

// Slider tradicional para PC
function actualizarCarrusel() {
  // Mueve el carrusel en múltiplos de 100/12 por cada grupo de 4
  carruselFotos.style.transform = `translateX(-${(index * 100) / totalSlides}%)`;
}

// Decide qué modo usar según pantalla
function actualizarCarruselResponsive() {
  if (window.innerWidth <= 900) {
    actualizarCarruselCoverflow();
    carruselFotos.style.transform = ""; // quita el translateX
  } else {
    // Quita clases coverflow
    document.querySelectorAll('.carrusel').forEach(el => {
      el.classList.remove('activa', 'lateral-izq', 'lateral-der');
    });
    actualizarCarrusel();
  }
}

// Mover carrusel
function moverCarrusel(direccion) {
  if (window.innerWidth > 900) {
    // PC: Avanza de a 4 (0, 4, 8, vuelve a 0)
    const maxIndex = totalSlides - cantidadVisible; // 12 - 4 = 8
    index += direccion * cantidadVisible;
    if (index > maxIndex) index = 0;
    if (index < 0) index = maxIndex;
  } else {
    // Coverflow móvil/tablet, avanza de a 1
    index = (index + direccion + totalSlides) % totalSlides;
  }
  actualizarCarruselResponsive();
  reiniciarAuto();
  actualizarIndicadores();
}

// Auto avance
function iniciarAuto() {
  auto = setInterval(() => {
    moverCarrusel(1);
  }, 5000);
}
function reiniciarAuto() {
  clearInterval(auto);
  iniciarAuto();
}

// Indicadores (igual que antes)
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
  const indexActivo = Math.floor(index / cantidadVisible);
  if (dots[indexActivo]) {
    dots[indexActivo].classList.add('activo');
  }
}

function moverACarrusel(indice) {
  index = indice * cantidadVisible;
  actualizarCarruselResponsive();
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

// Inicialización
window.addEventListener('resize', actualizarCarruselResponsive);
document.addEventListener('DOMContentLoaded', () => {
  actualizarCarruselResponsive();
  crearIndicadores();
  iniciarAuto();
});

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