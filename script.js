// Dependencias para desbloquear según requisito (simplificado para demo)
// Aquí configuras qué ramo desbloquea qué otro

const requisitos = {
  // Primer año
  "Inglés I": ["Inglés II"],
  "Inglés II": ["Inglés III"],
  "Inglés III": ["Inglés IV"],
  "Tópicos de Neurobiología": ["Procesos Psicológicos y Neurociencias"],
  "Habilidades Comunicativas": ["Razonamiento Científico y TICS"],
  // Segundo año
  "Psicoanálisis I": ["Psicoanálisis II", "Taller de Integración"],
  "Psicología del Desarrollo I": ["Psicología del Desarrollo II"],
  "Investigación I": ["Investigación II"],
  // Tercer año
  "Psicodiagnóstico Clínico I": ["Psicodiagnóstico Clínico II"],
  "Psicopatología y Psiquiatría I": ["Psicopatología y Psiquiatría II", "Psicopatología Infantojuvenil"],
  "Taller de Integración": ["Integrador I: Taller de Investigación"],
  "Psicología Social": ["Diagnóstico e Intervención Social"],
  // Sexto semestre
  "Psicología Educacional": ["Diagnóstico e Intervención Educacional"],
  "Psicología del Trabajo y las Organizaciones": ["Diagnóstico e Intervención Organizacional"],
  // Séptimo semestre
  "Psicología Jurídica": ["Diagnóstico e Intervención Jurídica", "Integrador I: Taller de Investigación"],
  // Noveno semestre
  "Taller de Intervención Clínica": ["Integrador II: Práctica Profesional"],
  "Psicología y Salud": ["Integrador II: Práctica Profesional"],
  "Taller de Diagnóstico e Intervención Social": ["Integrador II: Práctica Profesional"],
  "Electivo de Formación Profesional I": ["Integrador II: Práctica Profesional"],
  "Electivo de Formación Profesional II": ["Integrador II: Práctica Profesional"],
};

window.addEventListener("DOMContentLoaded", () => {
  const ramos = document.querySelectorAll(".ramo");

  // Al iniciar bloqueamos todos menos los primeros que no son requisito de nadie
  ramos.forEach(ramo => {
    ramo.classList.add("bloqueado");
  });

  // Se desbloquean los ramos que no son requisito de nadie (primeros)
  const ramosConRequisito = new Set();
  Object.values(requisitos).forEach(lista => lista.forEach(r => ramosConRequisito.add(r)));

  ramos.forEach(ramo => {
    const nombre = ramo.dataset.nombre;
    if (!ramosConRequisito.has(nombre)) {
      ramo.classList.remove("bloqueado");
    }
  });

  // Click en ramo
  ramos.forEach(ramo => {
    ramo.addEventListener("click", () => {
      if (ramo.classList.contains("bloqueado")) return;
      if (ramo.classList.contains("aprobado")) {
        // Si ya aprobado, quitar aprobación y bloquear sus desbloqueados
        ramo.classList.remove("aprobado");
        desbloquearSegunRequisito(ramo.dataset.nombre, false);
      } else {
        // Marcar aprobado y desbloquear los que dependen
        ramo.classList.add("aprobado");
        desbloquearSegunRequisito(ramo.dataset.nombre, true);
      }
    });
  });

  function desbloquearSegunRequisito(nombre, desbloquear) {
    const dependientes = requisitos[nombre];
    if (!dependientes) return;

    dependientes.forEach(dep => {
      const ramoDep = [...ramos].find(r => r.dataset.nombre === dep);
      if (!ramoDep) return;

      if (desbloquear) {
        // Quitar bloqueo solo si todas sus prereqs están aprobadas
        let prereqs = Object.entries(requisitos)
          .filter(([_, deps]) => deps.includes(dep))
          .map(([req, _]) => req);

        const todosAprobados = prereqs.every(prereq => {
          const prereqRamo = [...ramos].find(r => r.dataset.nombre === prereq);
          return prereqRamo && prereqRamo.classList.contains("aprobado");
        });
        if (todosAprobados) {
          ramoDep.classList.remove("bloqueado");
        }
      } else {
        // Bloquear si alguno de sus prereqs no está aprobado
        ramoDep.classList.add("bloqueado");
        // También quitar aprobado si estaba
        if (ramoDep.classList.contains("aprobado")) {
          ramoDep.classList.remove("aprobado");
          desbloquearSegunRequisito(ramoDep.dataset.nombre, false);
        }
      }
    });
  }
});
