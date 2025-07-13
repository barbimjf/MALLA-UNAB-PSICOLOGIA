document.querySelectorAll('.ramo').forEach(ramo => {
  ramo.addEventListener('click', () => {
    const isApproved = ramo.classList.toggle('aprobado');

    // Si no desbloquea otros ramos, salimos
    if (!ramo.dataset.unlocks) return;

    // Obtener lista de nombres desbloqueados
    const unlockedNames = ramo.dataset.unlocks.split(',').map(s => s.trim());

    unlockedNames.forEach(nombre => {
      // Buscar ramo(s) cuyo texto coincide con nombre (ignorando espacios y saltos)
      document.querySelectorAll('.ramo').forEach(destino => {
        const textoDestino = destino.textContent.replace(/\s+/g, '').toLowerCase();
        const textoNombre = nombre.replace(/\s+/g, '').toLowerCase();

        if (textoDestino === textoNombre) {
          if (isApproved) {
            destino.classList.add('desbloqueado');
            destino.style.pointerEvents = 'auto';
            destino.style.opacity = '1';
          } else {
            // Verificar si otro requisito está aprobado para este ramo
            const otrosQueLoDesbloquean = Array.from(document.querySelectorAll('.ramo'))
              .filter(r => r !== ramo && r.dataset.unlocks?.toLowerCase().includes(textoNombre) && r.classList.contains('aprobado'));

            if (otrosQueLoDesbloquean.length === 0) {
              destino.classList.remove('desbloqueado');
              destino.style.pointerEvents = 'none';
              destino.style.opacity = '0.6';
              destino.classList.remove('aprobado'); // Si estaba aprobado, lo quita
            }
          }
        }
      });
    });
  });
});

// Inicial: bloquear todos los ramos que requieren desbloqueo hasta aprobar su prereq
document.querySelectorAll('.ramo').forEach(ramo => {
  if (!ramo.classList.contains('ambito1') && !ramo.classList.contains('ambito2') && !ramo.classList.contains('ambito6')) {
    // Si no es ámbito 1 o 2 o 6 (que son los primeros que pueden estar abiertos), bloquear
    if (!ramo.dataset.unlocks) {
      // no desbloquea otros, pero tampoco desbloqueado aún, lo bloqueamos por default si no es base
      ramo.style.pointerEvents = 'none';
      ramo.style.opacity = '0.6';
    }
  }
});
