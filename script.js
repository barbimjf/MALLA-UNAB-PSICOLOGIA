(() => {
  const ramos = Array.from(document.querySelectorAll(".ramo"));
  const contador = document.getElementById("contador-aprobados");
  const totalRamos = ramos.length;

  // Mapa para acceder rápido a cada ramo por nombre
  const ramoMap = new Map(ramos.map(r => [r.dataset.nombre, r]));

  // Mapa de prerrequisitos, de cada ramo a su lista de prerrequisitos
  const prereqMap = new Map();

  ramos.forEach(ramo => {
    const prereqsRaw = ramo.dataset.prereqs || "";
    const prereqs = prereqsRaw.split(",").map(s => s.trim()).filter(Boolean);
    prereqMap.set(ramo.dataset.nombre, prereqs);
  });

  // Cargar ramos aprobados guardados localmente
  let aprobados = new Set();

  const saved = localStorage.getItem("ramos-aprobados");
  if (saved) {
    try {
      aprobados = new Set(JSON.parse(saved));
    } catch {
      aprobados = new Set();
    }
  }

  // Función para saber si un ramo puede aprobarse (prerrequisitos aprobados)
  function puedeAprobar(nombre) {
    const prereqs = prereqMap.get(nombre) || [];
    return prereqs.every(pr => aprobados.has(pr));
  }

  // Actualiza los estados visuales y accesibilidad de cada ramo
  function actualizarEstados() {
    ramos.forEach(ramo => {
      const nombre = ramo.dataset.nombre;
      if (aprobados.has(nombre)) {
        ramo.classList.add("aprobado");
        ramo.classList.remove("bloqueado");
        ramo.setAttribute("aria-pressed", "true");
        ramo.setAttribute("tabindex", "0");
      } else if (puedeAprobar(nombre)) {
        ramo.classList.remove("bloqueado");
        ramo.classList.remove("aprobado");
        ramo.setAttribute("aria-pressed", "false");
        ramo.setAttribute("tabindex", "0");
      } else {
        ramo.classList.add("bloqueado");
        ramo.classList.remove("aprobado");
        ramo.setAttribute("aria-pressed", "false");
        ramo.setAttribute("tabindex", "-1");
      }
    });

    contador.textContent = `Ramos aprobados: ${aprobados.size} / ${totalRamos}`;

    localStorage.setItem("ramos-aprobados", JSON.stringify(Array.from(aprobados)));
  }

  // Alterna estado aprobado/bloqueado al hacer click o tecla enter/espacio
  function toggleRamo(event) {
    const ramo = event.currentTarget;
    const nombre = ramo.dataset.nombre;

    if (ramo.classList.contains("bloqueado")) {
      alert("Debes aprobar los ramos prerequisitos primero.");
      return;
    }

    if (aprobados.has(nombre)) {
      aprobados.delete(nombre);
    } else {
      aprobados.add(nombre);
    }
    actualizarEstados();
  }

  // Añade manejadores y atributos ARIA para accesibilidad
  ramos.forEach(ramo => {
    ramo.setAttribute("role", "button");
    ramo.setAttribute("tabindex", "0");
    ramo.setAttribute("aria-pressed", aprobados.has(ramo.dataset.nombre) ? "true" : "false");

    ramo.addEventListener("click", toggleRamo);
    ramo.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggleRamo(e);
      }
    });
  });

  // Inicializa estados al cargar la página
  actualizarEstados();
})();
