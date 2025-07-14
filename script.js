document.addEventListener("DOMContentLoaded", () => {
  const ramos = document.querySelectorAll(".ramo");
  const estado = {};

  ramos.forEach(ramo => {
    const id = ramo.dataset.id;
    const prereqs = obtenerPrerequisitos(id);
    if (prereqs.length === 0) {
      ramo.classList.add("unlocked");
    }

    ramo.addEventListener("click", () => {
      if (!ramo.classList.contains("unlocked") || ramo.classList.contains("aprobado")) return;

      ramo.classList.add("aprobado");
      estado[id] = true;

      const desbloqueos = ramo.dataset.unlocks?.split(",") || [];
      desbloqueos.forEach(targetId => {
        const target = document.querySelector(`[data-id="${targetId}"]`);
        if (target && requisitosCumplidos(targetId)) {
          target.classList.add("unlocked");
        }
      });
    });
  });

  function obtenerPrerequisitos(idObjetivo) {
    const prerequisitos = [];
    ramos.forEach(r => {
      const unlocks = r.dataset.unlocks?.split(",") || [];
      if (unlocks.includes(idObjetivo)) {
        prerequisitos.push(r.dataset.id);
      }
    });
    return prerequisitos;
  }

  function requisitosCumplidos(idObjetivo) {
    const prereqs = obtenerPrerequisitos(idObjetivo);
    return prereqs.every(p => estado[p]);
  }
});
