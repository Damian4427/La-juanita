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


  // Cierra el menú al hacer clic fuera
document.addEventListener("click", function(event) {
  const menu = document.getElementById("menu");
  const hamburger = document.querySelector(".hamburger");

   //Si el menú está visible y el clic no fue dentro del menú ni en el botón hamburguesa
  if (menu.style.display === "flex" &&
      !menu.contains(event.target) &&
      !hamburger.contains(event.target)) {
    menu.style.display = "none";
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

crearIndicadores();
  