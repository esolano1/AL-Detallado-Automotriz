import './style.css'

const btn = document.getElementById("mobileMenuBtn")
const menu = document.getElementById("mobileMenu")

if (btn && menu) {
  btn.addEventListener("click", () => {
    menu.classList.toggle("hidden")
  })
}

const form = document.getElementById("contactForm")

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault()

    const nombre = document.getElementById("nombre").value.trim()
    const correo = document.getElementById("correo").value.trim()
    const telefono = document.getElementById("telefono").value.trim()
    const servicio = document.getElementById("servicio").value
    const mensaje = document.getElementById("mensaje").value.trim()

    const numero = "524425673188"

    if (!nombre || !telefono || !mensaje) {
      alert("Por favor completa los campos obligatorios")
      return
    }

    const texto =
      `Hola, me gustaría solicitar información:%0A%0A` +
      `Nombre: ${encodeURIComponent(nombre)}%0A` +
      `Correo: ${encodeURIComponent(correo)}%0A` +
      `Teléfono: ${encodeURIComponent(telefono)}%0A` +
      `Servicio: ${encodeURIComponent(servicio)}%0A%0A` +
      `Mensaje:%0A${encodeURIComponent(mensaje)}`

    const url = `https://wa.me/${numero}?text=${texto}`

    window.open(url, "_blank")
  })
}

document.addEventListener("DOMContentLoaded", () => {
  function actualizarEstadoNegocio() {
    const estado = document.getElementById("estadoNegocio")
    if (!estado) return

    const ahora = new Date()
    const hora = ahora.getHours()
    const dia = ahora.getDay()

    let apertura
    let cierre
    let abierto = false

    // Lunes a Viernes
    if (dia >= 1 && dia <= 5) {
      apertura = 9
      cierre = 19
      abierto = hora >= apertura && hora < cierre
    }

    // Sábado
    else if (dia === 6) {
      apertura = 10
      cierre = 16
      abierto = hora >= apertura && hora < cierre
    }

    // Domingo (cerrado)
    else {
      abierto = false
    }

    if (abierto) {
      estado.classList.remove("bg-red-500/10", "text-red-500")
      estado.classList.add("bg-green-500/10", "text-green-500")
      estado.innerHTML = `
        <span class="relative flex h-2 w-2">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span class="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
        </span>
        Abierto ahora
      `
    } else {
      estado.classList.remove("bg-green-500/10", "text-green-500")
      estado.classList.add("bg-red-500/10", "text-red-500")

      let texto = "Cerrado"

      if (dia === 0) {
        texto = "Cerrado (Domingo)"
      }

      estado.innerHTML = `
        <span class="relative flex h-2 w-2">
          <span class="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
        </span>
        ${texto}
      `
    }
  }

  actualizarEstadoNegocio()
  setInterval(actualizarEstadoNegocio, 60000)
})




// Botones de Agenda Ahora (cards de servicios)
const botonesAgenda = document.querySelectorAll(".agenda-whatsapp")

botonesAgenda.forEach((boton) => {
  boton.addEventListener("click", function (e) {
    e.preventDefault()

    const numero = "524425673188"
    const servicio = this.dataset.service || "un paquete"
    const precio = this.dataset.price || ""

    // 🔥 Obtener el article (card completo)
    const card = this.closest("article")

    // 🔥 Obtener todos los textos de los check
    const checks = card.querySelectorAll(".border-t div")

    let listaServicios = ""

    checks.forEach((check) => {
  /*    const texto = check.innerText.trim() */
  const texto = check.childNodes[check.childNodes.length - 1].textContent.trim()
      listaServicios += `- ${texto}\n`
    })

    const texto =
      `Hola, me gustaría adquirir el siguiente paquete:\n\n` +
      `Paquete: ${servicio}\n` +
      `${precio ? `Precio desde: ${precio}\n\n` : "\n"}` +
      `Incluye:\n${listaServicios}\n` +
      `¿Me podrían dar más información, por favor?`

    const url = `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`
    window.open(url, "_blank", "noopener,noreferrer")
  })
})


// BUSCADOR GLOBAL DEL SITIO

function initSiteSearch() {
  const searchInput = document.getElementById("siteSearch");
  const mobileSearchInput = document.getElementById("siteSearchMobile");
  const clearBtn = document.getElementById("clearSearch");
  const searchMeta = document.getElementById("searchMeta");

  if (!searchInput && !mobileSearchInput) return;

  const normalizeText = (text) => {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^\w\s-]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  };

  const searchItems = [
    // =================
    // PÁGINAS PRINCIPALES
    // =================
    {
      title: "Inicio",
      url: "index.html",
      category: "Página",
      keywords: ["inicio", "home", "principal", "pagina principal"]
    },
    {
      title: "Servicios",
      url: "services.html",
      category: "Página",
      keywords: ["servicios", "servicio", "paquetes", "precios", "catalogo", "cotizacion", "cotizar"]
    },
    {
      title: "Galería",
      url: "gallery.html",
      category: "Página",
      keywords: ["galeria", "fotos", "imagenes", "trabajos", "resultados", "antes y despues"]
    },
    {
      title: "Contacto",
      url: "contact.html",
      category: "Página",
      keywords: ["contacto", "telefono", "correo", "email", "whatsapp", "ubicacion", "direccion", "mapa", "horarios"]
    },
    {
      title: "Nosotros",
      url: "about-us.html",
      category: "Página",
      keywords: ["nosotros", "historia", "empresa", "origen", "trayectoria", "equipo"]
    },
    {
      title: "Términos y Condiciones",
      url: "terms.html",
      category: "Página",
      keywords: ["terminos", "condiciones", "privacidad", "pagos", "cancelaciones", "garantias", "responsabilidad"]
    },

    // =================
    // HOME
    // =================

    {
      title: "Soluciones Premium",
      url: "index.html#services",
      category: "Sección",
      keywords: ["soluciones premium", "servicios premium", "servicios", "tratamientos"]
    },
    {
      title: "Galería principal",
      url: "index.html#gallery",
      category: "Sección",
      keywords: ["galeria principal", "galeria home", "fotos home", "imagenes home"]
    },
    {
      title: "Ubicación principal",
      url: "index.html#location",
      category: "Sección",
      keywords: ["ubicacion", "direccion", "mapa", "donde estan", "donde se ubican", "taller"]
    },

    // =================
    // SERVICIOS
    // =================
    {
      title: "Paquetes disponibles",
      url: "services.html#paquetes",
      category: "Sección",
      keywords: ["paquetes", "precios", "catalogo", "servicios disponibles", "cotizacion"]
    },
    {
      title: "Encerado",
      url: "services.html#encerado",
      category: "Servicio",
      keywords: [
        "encerado",
        "cera",
        "aplicacion de cera",
        "proteccion de superficie",
        "brillo"
      ]
    },
    {
      title: "Detallado Completo Interiores",
      url: "services.html#detallado-interiores",
      category: "Servicio",
      keywords: [
        "detallado completo interiores",
        "interiores",
        "lavado de interiores",
        "detallado de interiores",
        "limpieza interior",
        "tapiceria",
        "lavado de tapiceria",
        "lavado de cielo",
        "lavado de alfombras",
        "lavado de tapetes",
        "lavado de asientos",
        "limpieza de consola central",
        "limpieza de puertas",
        "limpieza de cristales",
        "limpieza de pilares",
        "limpieza de marcos de puerta",
        "hidratado de plasticos interiores"
      ]
    },
    {
      title: "Corrección de Pintura",
      url: "services.html#correccion-pintura",
      category: "Servicio",
      keywords: [
        "correccion de pintura",
        "pulido",
        "pulido de carroceria",
        "descontaminado de pintura",
        "descontaminacion",
        "abrillantado",
        "abrillantado y encerado",
        "carroceria",
        "pintura",
        "rayones",
        "marcas en pintura",
        "limpieza de tolvas"
      ]
    },
    {
      title: "Limpieza de Motor",
      url: "services.html#limpieza-motor",
      category: "Servicio",
      keywords: [
        "limpieza de motor",
        "lavado de motor",
        "motor",
        "desengrasado de motor",
        "compartimento del motor",
        "hidratado de mangueras",
        "plasticos del motor"
      ]
    },
    {
      title: "Servicio de frenos",
      url: "services.html#servicio-frenos",
      category: "Servicio",
      keywords: [
        "frenos",
        "servicio de frenos",
        "cambio de balatas",
        "balatas",
        "cambio de discos",
        "discos",
        "liquido de frenos",
        "cambio de liquido de frenos"
      ]
    },
    {
      title: "Mantenimiento Preventivo",
      url: "services.html#mantenimiento-preventivo",
      category: "Servicio",
      keywords: [
        "mantenimiento",
        "mantenimiento preventivo",
        "cambio de aceite",
        "filtros",
        "cambio de aceite y filtros",
        "afinaciones",
        "afinacion"
      ]
    },

    // =================
    // GALERÍA
    // =================
    {
      title: "Galería de trabajos",
      url: "gallery.html",
      category: "Página",
      keywords: [
        "galeria",
        "trabajos realizados",
        "fotos",
        "imagenes",
        "resultados",
        "antes y despues",
        "proyectos"
      ]
    },
    {
      title: "Trabajos de interiores",
      url: "gallery.html",
      category: "Sección",
      keywords: [
        "interiores",
        "lavado de interiores",
        "asientos",
        "cielo",
        "postes",
        "tapiceria"
      ]
    },
    {
      title: "Trabajos de exterior",
      url: "gallery.html",
      category: "Sección",
      keywords: [
        "exterior",
        "pulido",
        "encerado",
        "rines",
        "faros",
        "motor"
      ]
    },

    // =================
    // CONTACTO
    // =================
    {
      title: "Envíanos un mensaje",
      url: "contact.html#contactsection",
      category: "Sección",
      keywords: [
        "enviar mensaje",
        "mensaje",
        "formulario",
        "contactar",
        "cotizar",
        "cotizacion",
        "agendar",
        "agenda",
        "reservar"
      ]
    },
    {
      title: "Horarios",
      url: "contact.html",
      category: "Sección",
      keywords: [
        "horarios",
        "horario",
        "abierto",
        "cerrado",
        "dias de atencion",
        "lunes a viernes",
        "sabado",
        "domingo"
      ]
    },
    {
      title: "Ubicación y mapa",
      url: "contact.html",
      category: "Sección",
      keywords: [
        "ubicacion",
        "direccion",
        "mapa",
        "google maps",
        "donde estan",
        "queretaro",
        "buenavista",
        "fernando de tapia"
      ]
    },
    {
      title: "WhatsApp",
      url: "contact.html",
      category: "Sección",
      keywords: [
        "whatsapp",
        "chat",
        "mandar whatsapp",
        "hablar por whatsapp"
      ]
    },
    {
      title: "Teléfono",
      url: "contact.html",
      category: "Sección",
      keywords: [
        "telefono",
        "llamar",
        "llamada",
        "numero"
      ]
    },
    {
      title: "Correo",
      url: "contact.html",
      category: "Sección",
      keywords: [
        "correo",
        "email",
        "gmail",
        "mail"
      ]
    },

    // =================
    // NOSOTROS
    // =================
        {
      title: "Nuestra Historia",
      url: "about-us.html",
      category: "Sección",
      keywords: ["nuestra historia", "historia", "quienes son", "quienes somos"]
    },
    {
      title: "Nuestro Origen",
      url: "about-us.html",
      category: "Sección",
      keywords: ["nuestro origen", "origen", "fundacion", "fundada en 2018"]
    },
    {
      title: "El ADN de la Excelencia",
      url: "about-us.html",
      category: "Sección",
      keywords: [
        "adn de la excelencia",
        "valores",
        "precision quirurgica",
        "exclusividad absoluta",
        "integridad pura"
      ]
    },
    {
      title: "Nuestra Trayectoria",
      url: "about-us.html",
      category: "Sección",
      keywords: [
        "trayectoria",
        "historia del taller",
        "2018",
        "2020",
        "2023",
        "2026"
      ]
    },
    {
      title: "Detrás de la Máquina",
      url: "about-us.html",
      category: "Sección",
      keywords: [
        "detras de la maquina",
        "equipo",
        "tecnicos",
        "experiencia",
        "pasion",
        "maestria"
      ]
    },

    // =================
    // TÉRMINOS
    // =================
    {
      title: "Introducción",
      url: "terms.html#intro",
      category: "Sección",
      keywords: ["introduccion", "terminos", "terminos y condiciones"]
    },
    {
      title: "Definiciones del Servicio",
      url: "terms.html#services",
      category: "Sección",
      keywords: ["definiciones del servicio", "servicios legales", "detallado premium", "proteccion ceramica"]
    },
    {
      title: "Responsabilidades del Cliente",
      url: "terms.html#client-resp",
      category: "Sección",
      keywords: ["responsabilidades del cliente", "cliente", "pertenencias", "articulos personales"]
    },
    {
      title: "Pagos y Cancelaciones",
      url: "terms.html#payments",
      category: "Sección",
      keywords: ["pagos", "cancelaciones", "deposito", "reembolso", "no presentacion"]
    },
    {
      title: "Responsabilidad y Garantías",
      url: "terms.html#liability",
      category: "Sección",
      keywords: ["responsabilidad", "garantias", "danos", "condiciones preexistentes"]
    },
    {
      title: "Política de Privacidad",
      url: "terms.html#privacy",
      category: "Sección",
      keywords: ["privacidad", "datos personales", "informacion personal"]
    }
  ];

  const preparedItems = searchItems.map((item) => {
    const allTerms = [item.title, ...(item.keywords || [])];
    const normalizedTerms = allTerms.map(normalizeText);

    return {
      ...item,
      normalizedTerms
    };
  });

  function scoreItem(query, item) {
    let score = 0;

    for (const term of item.normalizedTerms) {
      if (term === query) score += 120;
      else if (term.startsWith(query)) score += 80;
      else if (term.includes(query)) score += 50;
      else {
        const queryWords = query.split(" ").filter(Boolean);
        const matchedWords = queryWords.filter((word) => term.includes(word));
        score += matchedWords.length * 12;
      }
    }

    return score;
  }

  function findResults(rawQuery, limit = 6) {
    const query = normalizeText(rawQuery);
    if (!query) return [];

    return preparedItems
      .map((item) => ({
        ...item,
        score: scoreItem(query, item)
      }))
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);
  }

  function findBestResult(rawQuery) {
    return findResults(rawQuery, 1)[0] || null;
  }

  function updateMeta(query) {
    if (!searchMeta) return;

    const normalizedQuery = normalizeText(query);

    if (!normalizedQuery) {
      searchMeta.textContent = "";
      return;
    }

    const results = findResults(query, 6);

    if (results.length > 0) {
      searchMeta.textContent = `${results.length} resultado${results.length > 1 ? "s" : ""}`;
    } else {
      searchMeta.textContent = "Sin coincidencias";
    }
  }

  function createSuggestionsBox(input) {
    const wrapper = input.parentElement;
    if (!wrapper) return null;

    let box = wrapper.querySelector(".search-suggestions");

    if (!box) {
      box = document.createElement("div");
      box.className =
        "search-suggestions hidden absolute left-0 right-0 top-full mt-2 rounded-xl border border-white/10 bg-[var(--card-dark)]/95 backdrop-blur-md shadow-2xl overflow-hidden z-[80]";
      wrapper.appendChild(box);
    }

    return box;
  }

  const desktopBox = searchInput ? createSuggestionsBox(searchInput) : null;
  const mobileBox = mobileSearchInput ? createSuggestionsBox(mobileSearchInput) : null;

  let activeIndexDesktop = -1;
  let activeIndexMobile = -1;

  function hideSuggestions(box) {
    if (!box) return;
    box.classList.add("hidden");
    box.innerHTML = "";
  }

  function renderSuggestions(box, results, source) {
    if (!box) return;

    if (!results.length) {
      box.innerHTML = `
        <div class="px-4 py-3 text-sm text-slate-400">
          Sin resultados
        </div>
      `;
      box.classList.remove("hidden");
      return;
    }

    box.innerHTML = results
      .map((item, index) => {
        return `
          <button
            type="button"
            class="search-suggestion-item w-full text-left px-4 py-3 border-b border-white/5 last:border-b-0 hover:bg-white/5 transition"
            data-url="${item.url}"
            data-index="${index}"
            data-source="${source}"
          >
            <span class="block text-sm font-semibold text-white">${item.title}</span>
            <span class="block text-xs text-slate-400 mt-1 uppercase tracking-wide">${item.category || ""}</span>
          </button>
        `;
      })
      .join("");

    box.classList.remove("hidden");
  }

  function highlightActiveSuggestion(box, activeIndex) {
    if (!box) return;

    const items = box.querySelectorAll(".search-suggestion-item");

    items.forEach((item, index) => {
      if (index === activeIndex) {
        item.classList.add("bg-white/10");
      } else {
        item.classList.remove("bg-white/10");
      }
    });
  }

  function goToUrl(url) {
    if (!url) return;
    window.location.href = url;
  }

  function goToSearchResult(query) {
    const best = findBestResult(query);

    if (!best) {
      if (searchMeta) {
        searchMeta.textContent = "No encontramos resultados para esa búsqueda.";
      }
      return;
    }

    goToUrl(best.url);
  }

  function syncInputs(value, source = "desktop") {
    if (source !== "desktop" && searchInput) {
      searchInput.value = value;
    }

    if (source !== "mobile" && mobileSearchInput) {
      mobileSearchInput.value = value;
    }

    if (clearBtn) {
      clearBtn.classList.toggle("hidden", !value.trim());
    }

    updateMeta(value);
  }

  function renderForInput(value, source) {
    const results = findResults(value, 6);

    if (source === "desktop") {
      activeIndexDesktop = -1;
      renderSuggestions(desktopBox, results, "desktop");
      hideSuggestions(mobileBox);
    } else {
      activeIndexMobile = -1;
      renderSuggestions(mobileBox, results, "mobile");
      hideSuggestions(desktopBox);
    }

    if (!value.trim()) {
      if (source === "desktop") hideSuggestions(desktopBox);
      if (source === "mobile") hideSuggestions(mobileBox);
    }
  }

  function handleArrowNavigation(event, source) {
    const box = source === "desktop" ? desktopBox : mobileBox;
    if (!box || box.classList.contains("hidden")) return;

    const items = box.querySelectorAll(".search-suggestion-item");
    if (!items.length) return;

    if (source === "desktop") {
      if (event.key === "ArrowDown") {
        event.preventDefault();
        activeIndexDesktop = (activeIndexDesktop + 1) % items.length;
        highlightActiveSuggestion(box, activeIndexDesktop);
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        activeIndexDesktop =
          activeIndexDesktop <= 0 ? items.length - 1 : activeIndexDesktop - 1;
        highlightActiveSuggestion(box, activeIndexDesktop);
      }

      if (event.key === "Enter") {
        event.preventDefault();

        if (activeIndexDesktop >= 0 && items[activeIndexDesktop]) {
          goToUrl(items[activeIndexDesktop].dataset.url);
          return;
        }

        goToSearchResult(event.target.value.trim());
      }
    } else {
      if (event.key === "ArrowDown") {
        event.preventDefault();
        activeIndexMobile = (activeIndexMobile + 1) % items.length;
        highlightActiveSuggestion(box, activeIndexMobile);
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        activeIndexMobile =
          activeIndexMobile <= 0 ? items.length - 1 : activeIndexMobile - 1;
        highlightActiveSuggestion(box, activeIndexMobile);
      }

      if (event.key === "Enter") {
        event.preventDefault();

        if (activeIndexMobile >= 0 && items[activeIndexMobile]) {
          goToUrl(items[activeIndexMobile].dataset.url);
          return;
        }

        goToSearchResult(event.target.value.trim());
      }
    }

    if (event.key === "Escape") {
      hideSuggestions(box);
    }
  }

  function handleInput(input, source) {
    if (!input) return;

    input.addEventListener("input", (e) => {
      const value = e.target.value;
      syncInputs(value, source);
      renderForInput(value, source);
    });

    input.addEventListener("focus", (e) => {
      const value = e.target.value;
      if (value.trim()) {
        renderForInput(value, source);
      }
    });

    input.addEventListener("keydown", (e) => {
      const allowedKeys = ["ArrowDown", "ArrowUp", "Enter", "Escape"];
      if (allowedKeys.includes(e.key)) {
        handleArrowNavigation(e, source);
      }
    });
  }

  handleInput(searchInput, "desktop");
  handleInput(mobileSearchInput, "mobile");

  function bindBoxClicks(box) {
    if (!box) return;

    box.addEventListener("click", (e) => {
      const button = e.target.closest(".search-suggestion-item");
      if (!button) return;

      goToUrl(button.dataset.url);
    });
  }

  bindBoxClicks(desktopBox);
  bindBoxClicks(mobileBox);

  document.addEventListener("click", (e) => {
    const clickedDesktop = searchInput && searchInput.contains(e.target);
    const clickedMobile = mobileSearchInput && mobileSearchInput.contains(e.target);
    const clickedDesktopBox = desktopBox && desktopBox.contains(e.target);
    const clickedMobileBox = mobileBox && mobileBox.contains(e.target);

    if (!clickedDesktop && !clickedMobile && !clickedDesktopBox && !clickedMobileBox) {
      hideSuggestions(desktopBox);
      hideSuggestions(mobileBox);
    }
  });

  if (clearBtn && searchInput) {
    clearBtn.addEventListener("click", () => {
      syncInputs("");
      hideSuggestions(desktopBox);
      hideSuggestions(mobileBox);
      searchInput.focus();
    });
  }
}

initSiteSearch();

/*

// BUSCADOR GLOBAL DEL SITIO

function initSiteSearch() {
  const searchInput = document.getElementById("siteSearch");
  const mobileSearchInput = document.getElementById("siteSearchMobile");
  const clearBtn = document.getElementById("clearSearch");
  const searchMeta = document.getElementById("searchMeta");

  if (!searchInput && !mobileSearchInput) return;

  const normalizeText = (text) => {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^\w\s-]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  };

  const searchItems = [
    // PÁGINAS
    { title: "Inicio", url: "index.html", category: "Página", keywords: ["inicio", "home"] },
    { title: "Servicios", url: "services.html", category: "Página", keywords: ["servicios", "paquetes", "precios"] },
    { title: "Galería", url: "gallery.html", category: "Página", keywords: ["galeria", "fotos"] },
    { title: "Contacto", url: "contact.html", category: "Página", keywords: ["contacto", "telefono", "whatsapp"] },
    { title: "Nosotros", url: "about-us.html", category: "Página", keywords: ["nosotros", "historia"] },
    { title: "Términos", url: "terms.html", category: "Página", keywords: ["terminos", "privacidad"] },

    // SERVICIOS
    { title: "Encerado", url: "services.html#encerado", category: "Servicio", keywords: ["encerado", "cera"] },
    { title: "Interiores", url: "services.html#detallado-interiores", category: "Servicio", keywords: ["interiores", "tapiceria"] },
    { title: "Corrección de Pintura", url: "services.html#correccion-pintura", category: "Servicio", keywords: ["pulido", "pintura"] },
    { title: "Limpieza de Motor", url: "services.html#limpieza-motor", category: "Servicio", keywords: ["motor", "lavado de motor"] },
    { title: "Frenos", url: "services.html#servicio-frenos", category: "Servicio", keywords: ["frenos", "balatas"] },
    { title: "Mantenimiento", url: "services.html#mantenimiento-preventivo", category: "Servicio", keywords: ["aceite", "afinacion"] },

    // SECCIONES
    { title: "Cotización", url: "contact.html#contactsection", category: "Sección", keywords: ["cotizar", "mensaje"] },
    { title: "Ubicación", url: "contact.html", category: "Sección", keywords: ["direccion", "mapa"] }
  ];

  const preparedItems = searchItems.map((item) => {
    const terms = [item.title, ...(item.keywords || [])].map(normalizeText);
    return { ...item, terms };
  });

  function score(query, item) {
    let s = 0;
    for (const term of item.terms) {
      if (term === query) s += 100;
      else if (term.startsWith(query)) s += 60;
      else if (term.includes(query)) s += 40;
    }
    return s;
  }

  function findResults(q) {
    const query = normalizeText(q);
    if (!query) return [];

    return preparedItems
      .map((item) => ({ ...item, score: score(query, item) }))
      .filter((i) => i.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 6);
  }

  function createBox(input) {
    const wrapper = input.parentElement;
    let box = wrapper.querySelector(".search-box");

    if (!box) {
      box = document.createElement("div");
      box.className = "search-box hidden absolute top-full left-0 right-0 mt-2 bg-[var(--card-dark)] border border-white/10 rounded-xl overflow-hidden z-50";
      wrapper.appendChild(box);
    }
    return box;
  }

  const desktopBox = searchInput ? createBox(searchInput) : null;
  const mobileBox = mobileSearchInput ? createBox(mobileSearchInput) : null;

  function render(box, results) {
    if (!box) return;

    if (!results.length) {
      box.innerHTML = `<div class="p-3 text-slate-400 text-sm">Sin resultados</div>`;
      box.classList.remove("hidden");
      return;
    }

    box.innerHTML = results.map(item => `
      <button class="w-full text-left p-3 hover:bg-white/5 transition" data-url="${item.url}">
        <div class="text-white font-semibold text-sm">${item.title}</div>
        <div class="text-xs text-slate-400 uppercase">${item.category}</div>
      </button>
    `).join("");

    box.classList.remove("hidden");
  }

  function handleInput(input, box) {
    if (!input) return;

    input.addEventListener("input", (e) => {
      const value = e.target.value;
      const results = findResults(value);

      render(box, results);

      if (clearBtn) {
        clearBtn.classList.toggle("hidden", !value);
      }
    });

    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        const best = findResults(input.value)[0];
        if (best) window.location.href = best.url;
      }
    });
  }

  handleInput(searchInput, desktopBox);
  handleInput(mobileSearchInput, mobileBox);

  function bindClicks(box) {
    if (!box) return;

    box.addEventListener("click", (e) => {
      const btn = e.target.closest("button");
      if (!btn) return;
      window.location.href = btn.dataset.url;
    });
  }

  bindClicks(desktopBox);
  bindClicks(mobileBox);

  document.addEventListener("click", (e) => {
    if (
      !searchInput?.contains(e.target) &&
      !mobileSearchInput?.contains(e.target) &&
      !desktopBox?.contains(e.target) &&
      !mobileBox?.contains(e.target)
    ) {
      desktopBox?.classList.add("hidden");
      mobileBox?.classList.add("hidden");
    }
  });

  if (clearBtn && searchInput) {
    clearBtn.addEventListener("click", () => {
      searchInput.value = "";
      mobileSearchInput.value = "";
      desktopBox?.classList.add("hidden");
      mobileBox?.classList.add("hidden");
      searchInput.focus();
    });
  }
}

initSiteSearch();

*/