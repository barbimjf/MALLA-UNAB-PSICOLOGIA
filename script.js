document.addEventListener('DOMContentLoaded', () => {
  const ramos = document.querySelectorAll('.ramo');
  const contador = document.getElementById('contador');

  const ramosMap = {};
  ramos.forEach(r => {
    ramosMap[r.dataset.id] = r;
  });

  // Invertir prerrequisitos: para cada ramo que es desbloqueado por otro
  // map: id_ramo -> lista de prerrequisitos que lo desbloquean
  const desbloqueadosPor = {};

  ramos.forEach(r => {
    const desbloquea = r.dataset.unlocks;
    if (desbloquea) {
      desbloquea.split(',').forEach(id => {
        id = id.trim();
        if (!desbloqueadosPor[id]) desbloqueadosPor[id] = [];
        desbloqueadosPor[id].push(r.dataset.id);
      });
    }
  });

  // Inicialmente bloqueamos todos los ramos que tienen prerrequisitos
  ramos.forEach(r => {
    if (desbloqueadosPor[r.dataset.id]) {
      r.classList.add('bloqueado');
      r.style.pointerEvents = 'none';
      r.style.opacity = '0.4';
      r.style.cursor = 'default';
    }
  });

  let aprobados = 0;

  function actualizarContador() {
    contador.textContent = aprobados;
  }

  function desbloquearRamos(ids) {
    ids.forEach(id => {
      const ramo = ramosMap[id];
      if (!ramo) return;
      // desbloquear solo si todos sus prerrequisitos están aprobados
      const prereqs = desbloqueadosPor[id];
      const todosAprobados = prereqs.every(pr => ramosMap[pr].classList.contains('aprobado'));
      if (todosAprobados) {
        ramo.classList.remove('bloqueado');
        ramo.style.pointerEvents = 'auto';
        ramo.style.opacity = '1';
        ramo.style.cursor = 'pointer';
      }
    });
  }

  ramos.forEach(r => {
    r.addEventListener('click', () => {
      if (r.classList.contains('bloqueado')) return;

      const aprobado = r.classList.toggle('aprobado');
      if (aprobado) {
        aprobados++;
        // desbloquear los que dependen de este ramo
        const desbloquea = r.dataset.unlocks;
        if (desbloquea) {
          desbloquearRamos(desbloquea.split(',').map(x => x.trim()));
        }
      } else {
        aprobados--;
        // Al desmarcar, bloqueamos los que dependen de este ramo si ya no cumplen prerrequisitos
        const desbloquea = r.dataset.unlocks;
        if (desbloquea) {
          desbloquea.split(',').forEach(id => {
            const ramoDependiente = ramosMap[id];
            if (!ramoDependiente) return;
            // si alguno de sus prerrequisitos NO está aprobado, bloquearlo
            const prereqs = desbloqueadosPor[id];
            const cumplePrerreqs = prereqs.every(pr => ramosMap[pr].classList.contains('aprobado'));
            if (!cumplePrerreqs) {
              ramoDependiente.classList.add('bloqueado');
              ramoDependiente.classList.remove('aprobado');
              ramoDependiente.style.pointerEvents = 'none';
              ramoDependiente.style.opacity = '0.4';
              ramoDependiente.style.cursor = 'default';
              aprobados = Math.max(0, aprobados - 1);
            }
          });
        }
      }
      actualizarContador();
    });
  });

  actualizarContador();
});
