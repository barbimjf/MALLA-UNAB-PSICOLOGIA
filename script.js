// Normaliza texto para comparar nombres de ramos
const normalize = (text) => text.toLowerCase().replace(/\s+/g, ' ').trim();

window.addEventListener('DOMContentLoaded', () => {
  const ramos = Array.from(document.querySelectorAll('.ramo'));
  const mapaRamos = new Map();

  // Mapa nombre normalizado -> ramo element
  ramos.forEach(ramo => {
    const nombre = normalize(ramo.dataset.nombre || ramo.textContent);
    mapaRamos.set(nombre, ramo);
  });

  // Mapa prerequisito -> lista de ramos que requieren ese prereq
  const prereqMap = new Map();

  ramos.forEach(ramo => {
    if (ramo.dataset.unlocks) {
      const desbloqueados = ramo.dataset.unlocks.split(',').map(s => normalize(s));
      desbloqueados.forEach(dest => {
        if (!prereqMap.has(dest)) prereqMap.set(dest, []);
        const nombreRamo = normalize(ramo.dataset.nombre || ramo.textContent);
        prereqMap.get(dest).push(nombreRamo);
      });
    }
  });

  // Verifica si un ramo está desbloqueado (todos sus prereqs aprobados)
  function estaDesbloqueado(nombreRamo) {
    if (!prereqMap.has(nombreRamo)) return true; // sin prerequisitos
    const prereqs = prereqMap.get(nombreRamo);
    return prereqs.every(prereq => {
      const r = mapaRamos.get(prereq);
      return r && r.classList.contains('aprobado');
    });
  }

  // Actualiza el estado de desbloqueo y estilos
  function actualizarDesbloqueos() {
    ramos.forEach(ramo => {
      const nombre = normalize(ramo.dataset.nombre || ramo.textContent);
      if (estaDesbloqueado(nombre)) {
        ramo.classList.add('desbloqueado');
        ramo.style.pointerEvents = 'auto';
        ramo.style.opacity = '1';
      } else {
        ramo.classList.remove('desbloqueado');
        ramo.style.pointerEvents = 'none';
        ramo.style.opacity = '0.5';
        ramo.classList.remove('aprobado');
      }
    });
  }

  // Inicializar estados al cargar
  actualizarDesbloqueos();

  // Click para aprobar/desaprobar solo desbloqueados
  ramos.forEach(ramo => {
    ramo.addEventListener('click', () => {
      if (!ramo.classList.contains('desbloqueado')) return;
      ramo.classList.toggle('aprobado');
      actualizarDesbloqueos();
    });
  });
});
