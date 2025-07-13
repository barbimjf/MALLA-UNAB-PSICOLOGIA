(() => {
  const ramos = Array.from(document.querySelectorAll(".ramo"));
  const contador = document.getElementById("contador-aprobados");
  const totalRamos = ramos.length;

  const ramoMap = new Map(ramos.map(r => [r.dataset.nombre, r]));

  const prereqMap = new Map();
  ramos.forEach(ramo => {
    const prereqsRaw = ramo.dataset.prereqs || "";
    const prereqs = prereqsRaw.split(",").map(s => s.trim()).filter(Boolean);
    prereqMap.set(ramo.dataset.nombre, prereqs);
  });

  let aprobados = new Set();

  const saved = localStorage.getItem("ramos-aprobados");
  if (saved) {
    try {
      aprobados = new Set(JSON.parse(saved));
    } catch {
      aprobados = new Set();
    }
  }

  function puedeAprobar(nombre) {
    const prereqs = prereqMap.get(nombre) || [];
    return prereqs.every(pr => aprobados.has(pr));
  }

  function actualizarEstados() {
    ramos.forEach(ramo => {
      const nombre = ramo.dataset.nombre;
      const puede = puedeAprobar(nombre);

      if (aprobados.has(nombre)) {
        ramo.classList.add("aprobado");
        ramo.classList.remove("bloqueado");
        ramo.setAttribute("aria-pressed", "true");
      } else if (puede) {
        ramo.classList.remove("bloqueado");
        ramo.classList.remove("aprobado");
        ramo.setAttribute("aria-pressed", "false");
      } else {
        ramo.classList.add("bloqueado");
        ramo.classList.remove("aprobado");
        ramo.setAttribute("aria-pressed", "false");
      }
    });

    contador.textContent = `Ramos aprobados: ${aprobados.size} / ${totalRamos}`;
    localStorage.setItem("ramos-aprobados", JSON.stringify(Array.from(aprobados)));
  }

  function toggleRamo(event) {
    const ramo = event.currentTarget;
    const nombre = ramo.dataset.nombre;

    if (ramo.classList.contains("bloqueado")) {
      alert("Debes aprobar los ramos prerrequisitos antes.");
      return;
    }

    if (aprobados.has(nombre)) {
      aprobados.delete(nombre);
    } else {
      aprobados.add(nombre);
    }

    actualizarEstados();
  }

  // Accesibilidad y eventos
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
