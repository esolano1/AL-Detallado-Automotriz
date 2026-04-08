import './style.css'

const btn = document.getElementById("mobileMenuBtn")
const menu = document.getElementById("mobileMenu")

btn.addEventListener("click", () => {
  menu.classList.toggle("hidden")
})


 const form = document.getElementById("contactForm");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const servicio = document.getElementById("servicio").value;
    const mensaje = document.getElementById("mensaje").value.trim();

    const numero = "524425673188"; //

if (!nombre || !telefono || !mensaje) {
  alert("Por favor completa los campos obligatorios");
  return;
}

    const texto =
      `Hola, me gustaría solicitar información:%0A%0A` +
      `Nombre: ${encodeURIComponent(nombre)}%0A` +
      `Correo: ${encodeURIComponent(correo)}%0A` +
      `Teléfono: ${encodeURIComponent(telefono)}%0A` +
      `Servicio: ${encodeURIComponent(servicio)}%0A%0A` +
      `Mensaje:%0A${encodeURIComponent(mensaje)}`;

    const url = `https://wa.me/${numero}?text=${texto}`;

    window.open(url, "_blank");
  });



document.addEventListener("DOMContentLoaded", () => {

  function actualizarEstadoNegocio() {
    const estado = document.getElementById("estadoNegocio");
    if (!estado) return;

    const ahora = new Date();
    const hora = ahora.getHours();
    const dia = ahora.getDay();

    let apertura;
    let cierre;
    let abierto = false;

    // Lunes a Viernes
    if (dia >= 1 && dia <= 5) {
      apertura = 9;
      cierre = 19;
      abierto = hora >= apertura && hora < cierre;
    }

    // Sábado
    else if (dia === 6) {
      apertura = 10;
      cierre = 16;
      abierto = hora >= apertura && hora < cierre;
    }

    // Domingo (cerrado)
    else {
      abierto = false;
    }

    if (abierto) {
      estado.classList.remove("bg-red-500/10", "text-red-500");
      estado.classList.add("bg-green-500/10", "text-green-500");
      estado.innerHTML = `
        <span class="relative flex h-2 w-2">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span class="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
        </span>
        Abierto ahora
      `;
    } else {
      estado.classList.remove("bg-green-500/10", "text-green-500");
      estado.classList.add("bg-red-500/10", "text-red-500");

      let texto = "Cerrado";

      if (dia === 0) {
        texto = "Cerrado (Domingo)";
      }

      estado.innerHTML = `
        <span class="relative flex h-2 w-2">
          <span class="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
        </span>
        ${texto}
      `;
    }
  }

  actualizarEstadoNegocio();
  setInterval(actualizarEstadoNegocio, 60000);

});