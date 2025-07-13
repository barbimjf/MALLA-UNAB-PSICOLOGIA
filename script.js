// script.js

document.addEventListener('DOMContentLoaded', () => {
  const ramos = document.querySelectorAll('.ramo');
  const contador = document.getElementById('contador');

  // Mapear ramos por id para acceso rápido
  const ramosMap = {};
  ramos.forEach(r => {
    const id = r.dataset.id;
    ramosMap[id] = r;
    // Al inicio, deshabilitar todos que tienen prerrequisitos (no tienen desbloqueo previo)
    // Solo dejamos habilitados los que no son desbloqueables (sin prerrequisitos)
    // Pero para simplificar, todos habilitados al inicio menos los que se desbloquean después
    // Se entiende que si un ramo tiene prerrequisitos, será desbloqueado por otro
    // Por eso, bloqueamos los que tienen "data-unlocks" apuntando a ellos
  });

  // Construimos el mapa de prerrequisitos inverso: ramo_id -> lista de ids que lo desbloquean
  // En este diseño el "data-unlocks" es para ramos que este desbloquea, entonces invertimos para saber quién depende de quién
  const desbloqueadosPor = {};
  ramos.forEach(r => {
    const unlocks = r.dataset.unlocks;
    if (unlocks) {
      unlocks.split(',').forEach(idUnlock => {
        idUnlock = idUnlock.trim();
        if (!desbloqueadosPor[idUnlock]) desbloqueadosPor[idUnlock] = [];
        desbloqueadosPor[idUnlock].push(r.dataset.id);
      });
    }
  });

  // Ahora deshabilitamos los ramos que tienen prerrequisitos (o sea, que aparecen en desbloqueadosPor)
  ramos.forEach(r => {
    const id = r.dataset.id;
    if (desbloqueadosPor[id]) {
      r.classList.add('bloqueado');
      r.style.pointerEvents = 'none';
      r.style.opacity = '0.4';
      r.style.cursor = 'default';
    }
  });

  // Contador de aprobados
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
      if (r.classList.contains('aprobado') || r.classList.contains('bloqueado')) return;

      // Marcar aprobado
      r.classList.add('aprobado');
      aprobados++;
      actualizarContador();

      // Desbloquear los ramos que dependen de este
      const unlocks = r.dataset.unlocks;
      if (unlocks) {
        desbloquearRamos(unlocks.split(',').map(id => id.trim()));
      }
    });
  });

  actualizarContador();
});
