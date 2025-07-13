document.addEventListener('DOMContentLoaded', () => {
  const ramos = document.querySelectorAll('.ramo.clickable');
  const contadorElem = document.getElementById('contador');

  // Mapa: id ramo -> array ids desbloqueados
  const desbloqueos = {};
  ramos.forEach(ramo => {
    const id = ramo.dataset.id;
    const unlockStr = ramo.dataset.unlocks;
    desbloqueos[id] = unlockStr ? unlockStr.split(',').map(s => s.trim()) : [];
  });

  // Inicialmente bloqueamos todos los ramos que tengan prerrequisitos (es decir, que estén desbloqueados desde otro)
  // Para eso calculamos el set de ramos desbloqueados (los que no están en unlock)
  const desbloqueadosSet = new Set();
  // Consideramos que los ramos sin prerrequisitos (que desbloquean otros o no) están desbloqueados por defecto
  // Buscamos todos los ramos que no están en ningún unlocks
  const todosIds = new Set([...ramos].map(r => r.dataset.id));
  const desbloqueadosDesdeOtros = new Set();

  for (const unlocks of Object.values(desbloqueos)) {
    unlocks.forEach(id => desbloqueadosDesdeOtros.add(id));
  }

  // Los ramos que están desbloqueados inicialmente son los que no están en desbloqueadosDesdeOtros
  todosIds.forEach(id => {
    if (!desbloqueadosDesdeOtros.has(id)) {
      desbloqueadosSet.add(id);
    }
  });

  // Función para bloquear o desbloquear visualmente
  function bloquearRamo(ramoElem, bloquear = true) {
    if (bloquear) {
      ramoElem.classList.remove('clickable');
      ramoElem.style.pointerEvents = 'none';
      ramoElem.style.opacity = '0.5';
      ramoElem.tabIndex = -1;
    } else {
      ramoElem.classList.add('clickable');
      ramoElem.style.pointerEvents = '';
      ramoElem.style.opacity = '1';
      ramoElem.tabIndex = 0;
    }
  }

  // Inicializamos la visualización según prerrequisitos
  ramos.forEach(ramo => {
    const id = ramo.dataset.id;
    if (!desbloqueadosSet.has(id)) {
      bloquearRamo(ramo, true);
    } else {
      bloquearRamo(ramo, false);
    }
  });

  // Estado de aprobados
  const aprobados = new Set();

  // Actualizar contador
  function actualizarContador() {
    contadorElem.textContent = aprobados.size;
  }

  // Al hacer click en ramo
  ramos.forEach(ramo => {
    ramo.addEventListener('click', () => {
      if (!ramo.classList.contains('clickable')) return; // ignorar si está bloqueado

      const id = ramo.dataset.id;

      if (aprobados.has(id)) {
        // Si ya estaba aprobado, desmarcar y bloquear los desbloqueados recursivamente
        aprobados.delete(id);
        ramo.classList.remove('aprobado');
        // Bloquear recursivamente todos los desbloqueados que dependen de este ramo, si no tienen otro prerrequisito aprobado
        bloquearDesbloqueados(id);
      } else {
        // Marcar aprobado
        aprobados.add(id);
        ramo.classList.add('aprobado');
        // Desbloquear los que dependen de este ramo
        desbloquearDesbloqueados(id);
      }
      actualizarContador();
    });

    // Accesibilidad: activar con Enter o espacio
    ramo.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        ramo.click();
      }
    });
  });

  // Desbloquea los ramos que dependen del id si todos sus prerrequisitos están aprobados
  function desbloquearDesbloqueados(id) {
    const desbloqueados = Object.entries(desbloqueos)
      .filter(([_, arr]) => arr.includes(id))
      .map(([key]) => key);

    desbloqueados.forEach(ramoId => {
      // Verificar si todos sus prerrequisitos están aprobados
      const prerrequisitos = Object.entries(desbloqueos)
        .filter(([_, arr]) => arr.includes(ramoId))
        .map(([key]) => key);

      // En este esquema simple, sólo hay prerrequisito directo (padre)
      // Pero para robustez, verificamos todos
      const ramosPrerrequisitos = [];
      for (const [padreId, hijos] of Object.entries(desbloqueos)) {
        if (hijos.includes(ramoId)) ramosPrerrequisitos.push(padreId);
      }

      // Si todos los prerrequisitos están aprobados, desbloquear
      const todosAprobados = ramosPrerrequisitos.every(prId => aprobados.has(prId));

      if (todosAprobados) {
        const ramoElem = document.querySelector(`.ramo[data-id="${ramoId}"]`);
        if (ramoElem) bloquearRamo(ramoElem, false);
      }
    });
  }

  // Bloquear recursivamente los desbloqueados dependientes si el prerrequisito no está aprobado
  function bloquearDesbloqueados(id) {
    const desbloqueados = Object.entries(desbloqueos)
      .filter(([_, arr]) => arr.includes(id))
      .map(([key]) => key);

    desbloqueados.forEach(ramoId => {
      // Si existe otro prerrequisito aprobado, no bloquear
      const ramosPrerrequisitos = [];
      for (const [padreId, hijos] of Object.entries(desbloqueos)) {
        if (hijos.includes(ramoId)) ramosPrerrequisitos.push(padreId);
      }

      const otroPrerrequisitoAprobado = ramosPrerrequisitos.some(prId => prId !== id && aprobados.has(prId));

      if (!otroPrerrequisitoAprobado) {
        const ramoElem = document.querySelector(`.ramo[data-id="${ramoId}"]`);
        if (ramoElem) {
          bloquearRamo(ramoElem, true);
          if (aprobados.has(ramoId)) {
            aprobados.delete(ramoId);
            ramoElem.classList.remove('aprobado');
            // Recursividad para sus desbloqueados
            bloquearDesbloqueados(ramoId);
          }
        }
      }
    });
  }

  actualizarContador();
});
