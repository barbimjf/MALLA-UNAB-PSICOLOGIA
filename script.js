document.addEventListener("DOMContentLoaded", () => {
  const ramos = Array.from(document.querySelectorAll(".ramo"));

  function normalizar(texto) {
    return texto.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  function parsearRequisitos(raw) {
    if (!raw) return [];
    return raw
      .split(",")
      .map((r) => r.trim())
      .filter((r) => r.length > 0)
      .map(normalizar);
  }

  // Mapea ramos por su nombre normalizado para acceso rápido
  const mapaRamos = {};
  ramos.forEach((r) => {
    mapaRamos[normalizar(r.dataset.nombre)] = r;
  });

  // Desbloquea ramos cuyos requisitos estén aprobados
  function actualizarDesbloqueo() {
    ramos.forEach((r) => {
      if (r.classList.contains("aprobado")) {
        r.classList.remove("bloqueado");
        r.style.pointerEvents = "auto";
        r.title = "";
        return;
      }

      const requisitosRaw = r.dataset.requisitos || "";
      const requisitos = parsearRequisitos(requisitosRaw);

      if (requisitos.length === 0) {
        r.classList.remove("bloqueado");
        r.style.pointerEvents = "auto";
        r.title = "";
        return;
      }

      const todosAprobados = requisitos.every((req) => {
        const ramoReq = mapaRamos[req];
        return ramoReq && ramoReq.classList.contains("aprobado");
      });

      if (todosAprobados) {
        r.classList.remove("bloqueado");
        r.style.pointerEvents = "auto";
        r.title = "";
      } else {
        r.classList.add("bloqueado");
        r.style.pointerEvents = "none";
        r.title = "Debes aprobar: " + requisitosRaw;
      }
    });
  }

  // Al hacer click en un ramo
  ramos.forEach((r) => {
    r.addEventListener("click", () => {
      if (r.classList.contains("bloqueado")) return;

      r.classList.toggle("aprobado");

      actualizarDesbloqueo();
    });
  });

  // Inicializa estados
  actualizarDesbloqueo();
});
