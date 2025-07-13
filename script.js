document.addEventListener("DOMContentLoaded", () => {

  // Mapa de requisitos (nombre del ramo: array de nombres de sus prerequisitos)
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
    "Diagnóstico e Intervención Organizacional": ["Psicología del Trabajo y las Organizaciones"],
    "Intervención Clínica Sistémica": ["Clínica Sistémica"],
    "Clínica Infantojuvenil": ["Psicopatología Infantojuvenil"],
    "Diagnóstico e Intervención Jurídica": ["Psicología Jurídica"],
    "Taller de Intervención Clínica": ["Integrador I: Taller de Investigación", "Psicología y Salud", "Taller de Diagnóstico e Intervención Social", "Electivo de Formación Profesional I", "Electivo de Formación Profesional II"],
    "Psicología y Salud": [],
    "Taller de Diagnóstico e Intervención Social": [],
    "Electivo de Formación Profesional I": [],
    "Electivo de Formación Profesional II": [],
    "Integrador II: Práctica Profesional": [
      "Taller de Intervención Clínica",
      "Psicología y Salud",
      "Taller de Diagnóstico e Intervención Social",
      "Electivo de Formación Profesional I",
      "Electivo de Formación Profesional II"
    ],
  };

  // Obtiene todos los ramos
  const ramos = document.querySelectorAll(".ramo");

  // Guarda estado en localStorage: { aprobado: true/false }
  const estadoKey = "mallaPsicologiaAprobados";
  let estado = {};

  // Carga estado guardado o crea vacío
  const cargarEstado = () => {
    const saved = localStorage.getItem(estadoKey);
    if (saved) {
      estado = JSON.parse(saved);
    }
  };

  // Guarda estado en localStorage
  const guardarEstado = () => {
    localStorage.setItem(estadoKey, JSON.stringify(estado));
  };

  // Verifica si se cumplen todos los requisitos para un ramo
  const requisitosCumplidos = (nombre) => {
    const reqs = requisitosMap[nombre];
    if (!reqs || reqs.length === 0) return true;
    return reqs.every(r => estado[r]);
  };

  // Actualiza el estado visual y de desbloqueo
  const actualizarEstadoVisual = () => {
    ramos.forEach(ramo => {
      const nombre = ramo.dataset.nombre;
      if (estado[nombre]) {
        ramo.classList.add("aprobado");
        ramo.classList.remove("activo");
        ramo.removeAttribute("title");
      } else {
        // Si cumple requisitos, se activa para click
        if (requisitosCumplidos(nombre)) {
          ramo.classList.add("activo");
          ramo.setAttribute("title", "Haz click para aprobar este ramo");
        } else {
          ramo.classList.remove("activo");
          ramo.removeAttribute("title");
        }
        ramo.classList.remove("aprobado");
      }
    });
  };

  // Toggle aprobación y actualizar desbloqueo
  const toggleAprobacion = (ramo) => {
    const nombre = ramo.dataset.nombre;
    if (!ramo.classList.contains("activo")) return; // solo si está activo

    estado[nombre] = !estado[nombre]; // alterna aprobado o no
    actualizarEstadoVisual();
    guardarEstado();
  };

  // Inicializa: carga estado, actualiza visual y agrega eventos
  const init = () => {
    cargarEstado();
    actualizarEstadoVisual();

    ramos.forEach(ramo => {
      ramo.addEventListener("click", () => {
        toggleAprobacion(ramo);
      });
    });
  };

  init();
});
