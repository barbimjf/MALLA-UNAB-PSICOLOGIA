// Función para limpiar texto y comparar nombres
const normalize = (text) => text.toLowerCase().replace(/\s+/g, ' ').trim();

// Obtener todos los ramos
const ramos = Array.from(document.querySelectorAll('.ramo'));

// Mapeo nombre normalizado -> ramo DOM
const mapaRamos = new Map();
ramos.forEach(ramo => {
  const nombre = normalize(ramo.dataset.nombre || ramo.textContent);
  mapaRamos.set(nombre, ramo);
});

// Obtener prerequisitos que desbloquean un ramo (inverso de data-unlocks)
const prereqMap = new Map(); // nombre ramo -> array de nombres prereq
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

// Verifica si un ramo está desbloqueado (todos sus prereq aprobados)
function estaDesbloqueado(nombreRamo) {
  if (!prereqMap.has(nombreRamo)) return true; // Sin prerequisitos
  const prereqs = prereqMap.get(nombreRamo);
  return prereqs.every(prereq => {
    const r = mapaRamos.get(prereq);
    return r && r.classList.contains('aprobado');
  });
}

// Actualiza el estado de desbloqueo y habilita/deshabilita ramos
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
      ramo.style.opacity = '0.6';
      ramo.classList.remove('aprobado'); // Si ya estaba aprobado, quitarlo
    }
  });
}

// Inicializar estados al cargar página
window.addEventListener('DOMContentLoaded', () => {
  actualizarDesbloqueos();

  // Solo los desbloqueados pueden ser clickeables
  ramos.forEach(ramo => {
    ramo.addEventListener('click', () => {
      if (!ramo.classList.contains('desbloqueado')) return; // Ignorar click si no desbloqueado

      ramo.classList.toggle('aprobado');

      // Actualizar desbloqueos tras cambio
      actualizarDesbloqueos();
    });
  });
});
