(() => {
  const ramos = Array.from(document.querySelectorAll(".ramo"));
  const contador = document.getElementById("contador-aprobados");
  const totalRamos = ramos.length;

  // Construimos un mapa para acceso rápido por nombre
  const ramoMap = new Map(ramos.map(r => [r.dataset.nombre, r]));

  // Creamos un mapa de prerequisitos: nombre ramo -> array de prereqs (names)
  const prereqMap = new Map();

  // Extraemos prerequisitos de cada ramo (por data-prereqs separados por coma)
  ramos.forEach(ramo => {
    const prereqsRaw = ramo.dataset.prereqs || "";
    const prereqs = prereqsRaw.split(",").map(s => s.trim()).filter(Boolean);
    prereqMap.set(ramo.dataset.nombre, prereqs);
  });

  // Estado: aprobados (Set de nombres)
  let aprobados = new Set();

  // Leer estado guardado (si existe)
  const saved = localStorage.getItem("ramos-aprobados");
  if (saved) {
    try {
      aprobados = new Set(JSON.parse(saved));
    } catch { aprobados = new Set(); }
  }

  // Función para verificar si un ramo puede desbloquearse (todos sus prereqs aprobados)
  function puedeAprobar(nombre) {
    const prereqs = prereqMap.get(nombre) || [];
    return prereqs.every(pr => aprobados.has(pr));
  }

  // Actualiza clases y estados visuales
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

    // Guardar estado
    localStorage.setItem("ramos-aprobados", JSON.stringify(Array.from(aprobados)));
  }

  // Maneja clic o teclado para toggle aprobado
  function toggleRamo(event) {
    const ramo = event.currentTarget;
    const nombre = ramo.dataset.nombre;

    if (ramo.classList.contains("bloqueado")) {
      alert("Debes aprobar los ramos requisitos primero.");
      return;
    }

    if (aprobados.has(nombre)) {
      aprobados.delete(nombre);
    } else {
      aprobados.add(nombre);
    }
    actualizarEstados();
  }

  // Asignar listeners y roles para accesibilidad
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

  actualizarEstados();
})();
