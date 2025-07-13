document.addEventListener('DOMContentLoaded', () => {
  const ramos = document.querySelectorAll('.ramo.clickable');
  const contadorSpan = document.getElementById('contador');
  let aprobadosCount = 0;

  // Al iniciar, bloqueamos los ramos que tienen prerrequisitos pendientes
  // (En este caso, no se bloquean inicialmente, pero la lógica está preparada para uso futuro)
  // Si quieres bloquear los que dependen de prerrequisitos no aprobados, acá puede implementarse.

  ramos.forEach(ramo => {
    ramo.addEventListener('click', () => {
      if (ramo.classList.contains('aprobado')) return; // ya aprobado, no hace nada

      // Marcar aprobado: tachado en texto y atenuar color con opacity
      ramo.classList.add('aprobado');

      // Incrementar contador
      aprobadosCount++;
      contadorSpan.textContent = aprobadosCount;

      // Desbloquear los ramos que dependen de este ramo (los que están en data-unlocks)
      const unlocks = ramo.dataset.unlocks;
      if (!unlocks) return;

      unlocks.split(',').forEach(id => {
        const desbloqueado = document.querySelector(`.ramo[data-id="${id.trim()}"]`);
        if (desbloqueado && desbloqueado.classList.contains('aprobado') === false) {
          desbloqueado.style.pointerEvents = 'auto';
          desbloqueado.style.opacity = '1';
          desbloqueado.style.filter = 'none';
        }
      });
    });
  });
});
