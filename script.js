document.addEventListener("DOMContentLoaded", () => {

  // Mapeo de requisitos para desbloqueo
  const requisitosMap = {
    "Procesos Psicológicos y Neurociencias": ["Tópicos de Neurobiología"],
    "Inglés II": ["Inglés I"],
    "Inglés III": ["Inglés II"],
    "Inglés IV": ["Inglés III"],
    "Razonamiento Científico y TICS": ["Habilidades Comunicativas"],
    "Psicoanálisis II": ["Psicoanálisis I"],
    "Taller de Integración": ["Psicoanálisis I", "Psicología del Desarrollo II"],
    "Psicología del Desarrollo II": ["Psicología del Desarrollo I"],
    "Investigación II": ["Investigación I"],
    "Psicodiagnóstico Clínico II": ["Psicodiagnóstico Clínico I"],
    "Psicopatología y Psiquiatría II": ["Psicopatología y Psiquiatría I"],
    "Psicopatología Infantojuvenil": ["Psicopatología y Psiquiatría I"],
    "Integrador I: Taller de Investigación": ["Taller de Integración", "Psicología Jurídica"],
    "Diagnóstico e Intervención Social": ["Psicología Social"],
    "Diagnóstico e Intervención Educacional": ["Psicología Educacional"],
    "Diagnóstico e Intervención Organizacional": ["Psicología del Trabajo y las Organizaciones"],
    "Diagnóstico e Intervención Jurídica": ["Psicología Jurídica"],
    "Intervención Clínica Sistémica": ["Clínica Sistémica"],
    "Clínica Infantojuvenil": ["Psicopatología Infantojuvenil"],
    "Integrador II: Práctica Profesional": [
      "Taller de Intervención Clínica",
      "Psicología y Salud",
      "Taller de Diagnóstico e Intervención Social",
      "Electivo de Formación Profesional I",
      "Electivo de Formación Profesional II"
    ]
  };

  const ramosDivs = document.querySelectorAll(".ramo");

  // Activar ramos sin requisitos al cargar
  ramosDivs.forEach(div => {
    const nombre = div.dataset.nombre;
    if (!requisitosMap.hasOwnProperty(nombre)) {
      div.classList.add("activo");
      div.style.opacity = "1";
    } else {
      div.style.opacity = "0.5";
    }
  });

  function desbloquearRamos(nombreAprobado) {
    for (const [ramo, requisitos] of Object.entries(requisitosMap)) {
      if (requisitos.includes(nombreAprobado)) {
        const todosAprobados = requisitos.every(req => {
          const elem = document.querySelector(`.ramo[data-nombre="${CSS.escape(req)}"]`);
          return elem && elem.classList.contains("aprobado");
        });

        if (todosAprobados) {
          const elem = document.querySelector(`.ramo[data-nombre="${CSS.escape(ramo)}"]`);
          if (elem && !elem.classList.contains("activo")) {
            elem.classList.add("activo");
            elem.style.opacity = "1";
          }
        }
      }
    }
  }

  // Click para aprobar y desbloquear
  ramosDivs.forEach(div => {
    div.addEventListener("click", () => {
      if (!div.classList.contains("activo") || div.classList.contains("aprobado")) return;
      div.classList.add("aprobado");
      div.classList.remove("activo");
      desbloquearRamos(div.dataset.nombre);
    });
  });

});
