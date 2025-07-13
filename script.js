document.addEventListener('DOMContentLoaded', () => {
  const ramos = document.querySelectorAll('.ramo');
  const contador = document.getElementById('contador');

  // Mapa de ramos por ID para acceso rápido
  const ramosMap = {};
  ramos.forEach(r => {
    ramosMap[r.dataset.id] = r;
  });

  // Construir prerrequisitos inversos (quién desbloquea a quién)
  // data-unlocks = lista de ids que este ramo desbloquea
  const desbloqueadosPor = {};
  ramos.forEach(r => {
    const unlocks = r.dataset.unlocks;
    if (unlocks) {
      unlocks.split(',').forEach(idUnlock => {
        const idTrim = idUnlock.trim();
        if (!desbloqueadosPor[idTrim]) desbloqueadosPor[idTrim] = [];
        desbloqueadosPor[idTrim].push(r.dataset.id);
      });
    }
  });

  // Inicialmente bloquear ramos que tienen prerrequisitos
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
      const r = ramosMap[id];
      if (r && r.classList.contains('bloqueado')) {
        r.classList.remove('bloqueado');
        r.style.pointerEvents = 'auto';
        r.style.opacity = '1';
        r.style.cursor = 'pointer';
      }
    });
  }

  ramos.forEach(r => {
    r.addEventListener('click', () => {
      // Si está bloqueado, no hacer nada
      if (r.classList.contains('bloqueado')) return;

      // Toggle aprobado
      const aprobado = r.classList.toggle('aprobado');

      if (aprobado) {
        aprobados++;
        // desbloquear los que dependen de este ramo
        const unlocks = r.dataset.unlocks;
        if (unlocks) {
          desbloquearRamos(unlocks.split(',').map(x => x.trim()));
        }
      } else {
        aprobados--;
        // Si se desmarca, bloquear nuevamente los que dependen de este ramo
        const unlocks = r.dataset.unlocks;
        if (unlocks) {
          desbloquearRamos(unlocks.split(',').map(x => x.trim()).filter(id => {
            // Solo bloquear si ninguno de sus prerrequisitos está aprobado
            const prerrequisitos = desbloqueadosPor[id];
            return prerrequisitos.every(pr => !ramosMap[pr].classList.contains('aprobado'));
          }));
          unlocks.split(',').forEach(id => {
            const rDesbloqueado = ramosMap[id];
            if (rDesbloqueado && desbloqueadosPor[id].some(pr => !ramosMap[pr].classList.contains('aprobado'))) {
              rDesbloqueado.classList.add('bloqueado');
              rDesbloqueado.style.pointerEvents = 'none';
              rDesbloqueado.style.opacity = '0.4';
              rDesbloqueado.style.cursor = 'default';
              rDesbloqueado.classList.remove('aprobado');
              aprobados--;
            }
          });
        }
      }

      actualizarContador();
    });
  });

  actualizarContador();
});
