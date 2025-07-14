const contador = document.getElementById('contador-aprobados');
const ramos = document.querySelectorAll('.ramo');

let estado = {}; // { "nombreRamo": true/false }
let totalAprobados = 0;

// Definir ámbitos y prerrequisitos según tu lista completa.
// Aquí un ejemplo con algunos (debes completarlo):
const infoRamos = {
  "Historia y Fundamentos de la Psicología": { ambito: "II", prereq: [] },
  "Tópicos de Neurobiología": { ambito: "II", prereq: [] },
  "Procesos Psicológicos y Neurociencias": { ambito: "II", prereq: ["Tópicos de Neurobiología"] },
  "Psicología y Sociedad": { ambito: "II", prereq: [] },
  "Inglés I": { ambito: "I", prereq: [] },
  "Inglés II": { ambito: "I", prereq: ["Inglés I"] },
  "Inglés III": { ambito: "I", prereq: ["Inglés II"] },
  "Inglés IV": { ambito: "I", prereq: ["Inglés III"] },
  "Eje de Formación Interdisciplinaria I": { ambito: "I", prereq: [] },
  "Habilidades Comunicativas": { ambito: "I", prereq: [] },
  "Razonamiento Científico y TICS": { ambito: "I", prereq: ["Habilidades Comunicativas"] },
  "Sistemas Psicológicos": { ambito: "II", prereq: [] },
  "Psicología y Epistemología": { ambito: "II", prereq: [] },
  "Psicoanálisis I": { ambito: "II", prereq: [] },
  "Psicoanálisis II": { ambito: "II", prereq: ["Psicoanálisis I"] },
  "Psicología del Desarrollo I": { ambito: "II", prereq: [] },
  "Psicología del Desarrollo II": { ambito: "II", prereq: ["Psicología del Desarrollo I"] },
  "Investigación I": { ambito: "V", prereq: [] },
  "Investigación II": { ambito: "V", prereq: ["Investigación I"] },
  "Psicodiagnóstico Clínico I": { ambito: "III", prereq: [] },
  "Psicodiagnóstico Clínico II": { ambito: "III", prereq: ["Psicodiagnóstico Clínico I"] },
  "Psicopatología y Psiquiatría I": { ambito: "III", prereq: [] },
  "Psicopatología y Psiquiatría II": { ambito: "III", prereq: ["Psicopatología y Psiquiatría I"] },
  "Taller de Integración": { ambito: "VI", prereq: ["Psicoanálisis I"] },
  "Psicología Social": { ambito: "II", prereq: [] },
  "Psicología Educacional": { ambito: "III", prereq: [] },
  "Diagnóstico e Intervención Social": { ambito: "III", prereq: [] },
  "Psicología del Trabajo y las Organizaciones": { ambito: "III", prereq: [] },
  "Clínica Sistémica": { ambito: "IV", prereq: [] },
  "Psicopatología Infantojuvenil": { ambito: "III", prereq: ["Psicopatología y Psiquiatría I"] },
  "Diagnóstico e Intervención Educacional": { ambito: "III", prereq: [] },
  "Psicología Jurídica": { ambito: "III", prereq: [] },
  "Diagnóstico e Intervención Organizacional": { ambito: "III", prereq: [] },
  "Intervención Clínica Sistémica": { ambito: "IV", prereq: ["Clínica Sistémica"] },
  "Clínica Infantojuvenil": { ambito: "IV", prereq: ["Psicopatología Infantojuvenil"] },
  "Integrador I: Taller de Investigación": { ambito: "VI", prereq: ["Investigación II"] },
  "Diagnóstico e Intervención Jurídica": { ambito: "III", prereq: [] },
  "Clínica Psicoanalítica": { ambito: "IV", prereq: ["Psicoanálisis II"] },
  "Taller de Intervención Clínica": { ambito: "VI", prereq: [] },
  "Psicología y Salud": { ambito: "III", prereq: [] },
  "Taller de Diagnóstico e Intervención Social": { ambito: "VI", prereq: [] },
  "Electivo de Formación Profesional I": { ambito: "VI", prereq: [] },
  "Electivo de Formación Profesional II": { ambito: "VI", prereq: [] },
  "Integrador II: Práctica Profesional": { ambito: "VI", prereq: [] },
};

function actualizarEstado() {
  totalAprobados = 0;
  ramos.forEach(ramo => {
    const nombre = ramo.dataset.nombre;
    const aprobado = estado[nombre] === true;
    if (aprobado) totalAprobados++;

    // Poner clase aprobado si corresponde
    if (aprobado) {
      ramo.classList.add('aprobado');
      ramo.classList.remove('bloqueado');
    } else {
      // Verificar prerrequisitos
      const prereqs = infoRamos[nombre]?.prereq || [];
      const bloqueado = prereqs.some(pr => !estado[pr]);
      if (bloqueado) {
        ramo.classList.add('bloqueado');
        ramo.classList.remove('aprobado');
      } else {
        ramo.classList.remove('aprobado');
        ramo.classList.remove('bloqueado');
      }
    }
  });

  contador.textContent = `Ramos aprobados: ${totalAprobados}`;
}

ramos.forEach(ramo => {
  const nombre = ramo.dataset.nombre;
  // Asignar ámbito
  const ambito = infoRamos[nombre]?.ambito;
  if (ambito) ramo.setAttribute('data-ambito', ambito);

  ramo.addEventListener('click', () => {
    if (ramo.classList.contains('bloqueado')) return; // No clickeable si bloqueado
    if (ramo.classList.contains('aprobado')) {
      estado[nombre] = false;
    } else {
      estado[nombre] = true;
    }
    actualizarEstado();
  });
});

// Inicializar
actualizarEstado();
