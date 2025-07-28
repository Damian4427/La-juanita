function toggleMenu() { // menu hamburguesa
    const menu = document.getElementById("menu");
    menu.style.display = menu.style.display === "flex" ? "none" : "flex";
  }

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

crearIndicadores();
  