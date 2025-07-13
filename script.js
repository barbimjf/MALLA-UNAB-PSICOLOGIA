document.addEventListener("DOMContentLoaded", () => {
  const requisitosMap = {
    "Procesos Psicológicos y Neurociencias": ["Tópicos de Neurobiología"],
    "Inglés II": ["Inglés I"],
    "Inglés III": ["Inglés II"],
    "Inglés IV": ["Inglés III"],
    "Razonamiento Científico y TICS": ["Habilidades Comunicativas"],
    "Psicoanálisis II": ["Psicoanálisis I"],
    "Psicología del Desarrollo II": ["Psicología del Desarrollo I"],
    "Taller de Integración": ["Psicoanálisis I", "Psicología del Desarrollo II"],
    "Investigación II": ["Investigación I"],
    "Psicodiagnóstico Clínico II": ["Psicodiagnóstico Clínico I"],
    "Psicopatología y Psiquiatría II": ["Psicopatología y Psiquiatría I"],
    "Psicopatología Infantojuvenil": ["Psicopatología y Psiquiatría I"],
    "Integrador I: Taller de Investigación": ["Taller de Integración"],
    "Diagnóstico e Intervención Social": ["Psicología Social"],
    "Psicología Educacional": ["Psicopatología y Psiquiatría II"],
    "Diagnóstico e Intervención Educacional": ["Psicología Educacional"],
    "Psicología Jurídica": ["Diagnóstico e Intervención Educacional"],
    "Diagnóstico e Intervención Jurídica": ["Psicología Jurídica"],
    "Diagnóstico e Intervención Organizacional": ["Psicología del Trabajo y las Organizaciones"],
    "Intervención Clínica Sistémica": ["Clínica Sistémica"],
    "Clínica Infantojuvenil": ["Psicopatología Infantojuvenil"],
    "Integrador II: Práctica Profesional": [
      "Taller de Intervención Clínica",
      "Psicología y Salud",
      "Taller de Diagnóstico e Intervención Social",
      "Electivo de Formación Profesional I",
      "Electivo de Formación Profesional II"
    ],
  };

  // Tomamos todos los ramos
  const ramos = document.querySelectorAll(".ramo");

  // Guardamos el estado aprobado en localStorage para persistencia
  const guardado = localStorage.getItem("ramosAprobados");
  let aprobados = guardado ? JSON.parse(guardado) : [];

  // Funcion para actualizar estados y desbloquear
  function actualizarEstados() {
    ramos.forEach((ramo) => {
      const nombre = ramo.dataset.nombre;
      // Si está aprobado
      if (aprobados.includes(nombre)) {
        ramo.classList.add("aprobado");
        ramo.classList.remove("activo");
        ramo.style.pointerEvents = "none";
      } else {
        // Revisar si está desbloqueado (sin requisitos o requisitos aprobados)
        const requisitos = requisitosMap[nombre];
        if (!requisitos || requisitos.every(r => aprobados.includes(r))) {
          ramo.classList.add("activo");
          ramo.style.pointerEvents = "auto";
        } else {
          ramo.classList.remove("activo");
          ramo.style.pointerEvents = "none";
        }
      }
    });
  }

  // Inicializamos
  actualizarEstados();

  // Al click en ramo activo, se aprueba o desaprueba
  ramos.forEach((ramo) => {
    ramo.addEventListener("click", () => {
      if (!ramo.classList.contains("activo")) return; // solo activo puede clickear
      const nombre = ramo.dataset.nombre;
      if (aprobados.includes(nombre)) {
        // Desaprobar
        aprobados = aprobados.filter(r => r !== nombre);
      } else {
        // Aprobar
        aprobados.push(nombre);
      }
      // Guardar estado
      localStorage.setItem("ramosAprobados", JSON.stringify(aprobados));
      actualizarEstados();
    });
  });
});
