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
    "Psicología Educacional": ["Psicodiagnóstico Clínico II"],
    "Diagnóstico e Intervención Social": ["Psicología Social"],
    "Psicología del Trabajo y las Organizaciones": ["Diagnóstico e Intervención Social"],
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

  // Seleccionamos todos los ramos
  const ramos = document.querySelectorAll(".ramo");

  // Recuperar ramos aprobados de localStorage
  const guardado = localStorage.getItem("ramosAprobados");
  let aprobados = guardado ? JSON.parse(guardado) : [];

  // Función para actualizar estado y desbloqueo
  function actualizarEstados() {
    ramos.forEach((ramo) => {
      const nombre = ramo.dataset.nombre;
      if (aprobados.includes(nombre)) {
        ramo.classList.add("aprobado");
        ramo.classList.remove("activo");
        ramo.style.pointerEvents = "none";
      } else {
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

  actualizarEstados();

  // Evento click para aprobar/desaprobar
  ramos.forEach(ramo => {
    ramo.addEventListener("click", () => {
      if (!ramo.classList.contains("activo")) return;
      const nombre = ramo.dataset.nombre;
      if (aprobados.includes(nombre)) {
        aprobados = aprobados.filter(r => r !== nombre);
      } else {
        aprobados.push(nombre);
      }
      localStorage.setItem("ramosAprobados", JSON.stringify(aprobados));
      actualizarEstados();
    });
  });
});
