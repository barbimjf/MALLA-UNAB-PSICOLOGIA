// Variables globales
const ramos = document.querySelectorAll(".ramo");
const contador = document.getElementById("contador-aprobados");
const totalRamos = ramos.length;

let aprobados = new Set();

// Inicializar bloqueo de ramos según prerequisitos
function inicializarBloqueos() {
  ramos.forEach(ramo => {
    const desbloqueados = (ramo.dataset.unlocks || "").split(",").map(x => x.trim());
    // Si un ramo tiene prereq (lo desbloquean otros), está bloqueado hasta que apruebes prereqs
    // Por defecto desbloqueado si nadie lo bloquea (sin prereq)
    // Aquí no se hace bloqueo inicial porque solo desbloqueas cuando apruebas
    // Pero puedes desactivar ramos sin prereq si quieres (No recomendado)
  });
}

// Función para actualizar la interfaz y bloqueo/desbloqueo de ramos
function actualizarEstado() {
  // Marcar los ramos que deben desbloquearse
  ramos.forEach(ramo => {
    // Si está aprobado, desbloqueado
    if (aprobados.has(ramo.dataset.nombre)) {
      ramo.classList.add("aprobado");
      ramo.classList.remove("bloqueado");
      return;
    }
    // Si algún ramo que desbloquea este ramo está aprobado, desbloquear
    const prereqs = [];
    ramos.forEach(r => {
      const unlocks = (r.dataset.unlocks || "").split(",").map(x => x.trim());
      if (unlocks.includes(ramo.dataset.nombre)) {
        prereqs.push(r.dataset.nombre);
      }
    });
    // Si tiene prereqs, verificar si alguno está aprobado
    if (prereqs.length > 0) {
      // Si al menos uno de los prereqs está aprobado, desbloquear
      const algunoAprobado = prereqs.some(p => aprobados.has(p));
      if (algunoAprobado) {
        ramo.classList.remove("bloqueado");
      } else {
        ramo.classList.add("bloqueado");
      }
    } else {
      // No tiene prereqs, desbloqueado por defecto (excepto si aprobado)
      if (!aprobados.has(ramo.dataset.nombre)) {
        ramo.classList.remove("bloqueado");
      }
    }
  });

  // Actualizar contador
  contador.textContent = `Aprobados: ${aprobados.size} / ${totalRamos}`;
}

// Evento clic para aprobar o desaprobar ramo
function toggleAprobado(e) {
  const ramo = e.currentTarget;
  // Si está bloqueado, no hacer nada
  if (ramo.classList.contains("bloqueado")) {
    alert("Debes aprobar el ramo requisito primero.");
    return;
  }
  const nombre = ramo.dataset.nombre;
  if (aprobados.has(nombre)) {
    aprobados.delete(nombre);
    ramo.classList.remove("aprobado");
  } else {
    aprobados.add(nombre);
    ramo.classList.add("aprobado");
  }
  actualizarEstado();
}

// Inicialización
ramos.forEach(ramo => {
  ramo.addEventListener("click", toggleAprobado);
  ramo.addEventListener("keydown", e => {
    if(e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleAprobado({ currentTarget: e.currentTarget });
    }
  });
});
/* Elimina cualquier ::after que haga tachado diagonal */

.ramo.aprobado {
  color: #999;
}

.ramo.aprobado span {
  text-decoration: line-through;
}


// Primera actualización al cargar
actualizarEstado();

