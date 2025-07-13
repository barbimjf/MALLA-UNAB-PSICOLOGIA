// script.js

const ramos = [
  {
    nombre: "Historia y Fundamentos de la Psicología",
    tipo: "bases",
    requisitos: [],
  },
  {
    nombre: "Tópicos de Neurobiología",
    tipo: "bases",
    requisitos: [],
    desbloquea: ["Procesos Psicológicos y Neurociencias"]
  },
  {
    nombre: "Psicología y Sociedad",
    tipo: "bases",
    requisitos: []
  },
  {
    nombre: "Inglés I",
    tipo: "interdisciplina",
    requisitos: [],
    desbloquea: ["Inglés II"]
  },
  {
    nombre: "Eje de Formación Interdisciplinaria I",
    tipo: "interdisciplina",
    requisitos: []
  },
  {
    nombre: "Sistemas Psicológicos",
    tipo: "bases",
    requisitos: []
  },
  {
    nombre: "Procesos Psicológicos y Neurociencias",
    tipo: "bases",
    requisitos: ["Tópicos de Neurobiología"]
  },
  {
    nombre: "Psicología y Epistemología",
    tipo: "investigacion",
    requisitos: []
  },
  {
    nombre: "Inglés II",
    tipo: "interdisciplina",
    requisitos: ["Inglés I"],
    desbloquea: ["Inglés III"]
  },
  {
    nombre: "Habilidades Comunicativas",
    tipo: "interdisciplina",
    requisitos: [],
    desbloquea: ["Razonamiento Científico y TICS"]
  },
  {
    nombre: "Inglés III",
    tipo: "interdisciplina",
    requisitos: ["Inglés II"],
    desbloquea: ["Inglés IV"]
  },
  {
    nombre: "Razonamiento Científico y TICS",
    tipo: "interdisciplina",
    requisitos: ["Habilidades Comunicativas"]
  }
  // Aquí puedes seguir agregando los demás ramos siguiendo el mismo formato
];

const mallaDiv = document.getElementById("malla");

function crearRamo(ramo) {
  const div = document.createElement("div");
  div.textContent = ramo.nombre;
  div.className = `ramo ${ramo.tipo}`;
  div.dataset.nombre = ramo.nombre;

  if (!ramo.requisitos || ramo.requisitos.length === 0) {
    div.classList.add("activo");
    div.style.opacity = "1";
  }

  div.addEventListener("click", () => {
    if (!div.classList.contains("activo")) return;
    if (div.classList.contains("aprobado")) return;

    div.classList.add("aprobado");
    desbloquearRamos(ramo.nombre);
  });

  return div;
}

function desbloquearRamos(nombreRamoAprobado) {
  ramos.forEach((ramo) => {
    if (
      ramo.requisitos &&
      ramo.requisitos.includes(nombreRamoAprobado)
    ) {
      const requisitosAprobados = ramo.requisitos.every((req) => {
        const el = document.querySelector(`[data-nombre='${req}']`);
        return el && el.classList.contains("aprobado");
      });
      if (requisitosAprobados) {
        const el = document.querySelector(`[data-nombre='${ramo.nombre}']`);
        if (el) {
          el.classList.add("activo");
          el.style.opacity = "1";
        }
      }
    }
  });
}

function renderMalla() {
  const contenedor = document.createElement("div");
  contenedor.className = "semestre";
  contenedor.innerHTML = `<h2>Semestres Iniciales</h2>`;
  ramos.forEach((ramo) => {
    const el = crearRamo(ramo);
    contenedor.appendChild(el);
  });
  mallaDiv.appendChild(contenedor);
}

renderMalla();
