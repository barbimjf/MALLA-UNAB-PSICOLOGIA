// Datos para manejar prerrequisitos y desbloqueo

// Mapa id ramo → array de id(s) que desbloquea
const prerrequisitos = {
  1: [2],
  2: [7],
  4: [9],
  9: [11],
  10: [13],
  11: [12, 21],
  12: [22],
  13: [14],
  14: [15],
  21: [31],
  22: [23, 24],
  23: [25, 26],
  27: [28],
  28: [30],
  30: [32],
  31: [34],
  34: [35, 36],
  36: [37, 38, 39, 40],
  41: [42],
  42: [43],
  43: [44],
  44: [45],
  45: [46]
};

// Inicializamos contador de aprobados
let aprobadosCount = 0;

// Función para actualizar contador en pantalla
function actualizarContador() {
  document.getElementById('contador').textContent = aprobadosCount;
}

// Función para desbloquear ramos dependientes de un ramo
function desbloquearRamos(id) {
  if (!prerrequisitos[id]) return;
  prerrequisitos[id].forEach(depId => {
    const ramo = document.querySelector(`.ramo[data-id="${depId}"]`);
    if (ramo && !ramo.classList.contains('aprobado')) {
      ramo.classList.add('desbloqueable');
      ramo.style.opacity = "1";
      ramo.style.pointerEvents = "auto";
    }
  });
}

// Al cargar la página, deshabilitar todos los ramos no desbloqueables
document.addEventListener('DOMContentLoaded', () => {
  const ramos = document.querySelectorAll('.ramo');
  ramos.forEach(ramo => {
    if (!ramo.classList.contains('desbloqueable')) {
      ramo.style.opacity = "0.6";
      ramo.style.pointerEvents = "none";
    }
  });
  actualizarContador();
});

// Evento click para cada ramo
document.addEventListener('click', e => {
  const ramo = e.target.closest('.ramo');
  if (!ramo || ramo.classList.contains('aprobado') || !ramo.classList.contains('desbloqueable')) return;

  // Marcar aprobado
  ramo.classList.add('aprobado');
  aprobadosCount++;
  actualizarContador();

  // Desbloquear prerrequisitos
  const id = ramo.dataset.id;
  desbloquearRamos(id);
});

// Soporte accesibilidad: tecla Enter para aprobar ramo
document.addEventListener('keydown', e => {
  if (e.key === 'Enter' || e.key === ' ') {
    const ramo = document.activeElement;
    if (ramo && ramo.classList.contains('ramo') && !ramo.classList.contains('aprobado') && ramo.classList.contains('desbloqueable')) {
      ramo.click();
      e.preventDefault();
    }
  }
});
