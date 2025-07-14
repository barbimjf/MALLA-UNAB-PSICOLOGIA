const mallaContainer = document.getElementById('malla-container');
const tooltip = document.createElement('div');
tooltip.id = 'tooltip';
document.body.appendChild(tooltip);

const cursos = [
  // PRIMER AÑO
  { nombre: "Historia y Fundamentos de la Psicología", ambito: 2, prerrequisitos: [], año: 1, semestre: 1 },
  { nombre: "Tópicos de Neurobiología", ambito: 2, prerrequisitos: [], año: 1, semestre: 1 },
  { nombre: "Psicología y Sociedad", ambito: 2, prerrequisitos: [], año: 1, semestre: 1 },
  { nombre: "Inglés I", ambito: 1, prerrequisitos: [], año: 1, semestre: 1 },
  { nombre: "Eje de Formación Interdisciplinaria I", ambito: 1, prerrequisitos: [], año: 1, semestre: 1 },

  { nombre: "Sistemas Psicológicos", ambito: 2, prerrequisitos: [], año: 1, semestre: 2 },
  { nombre: "Procesos Psicológicos y Neurociencias", ambito: 2, prerrequisitos: ["Tópicos de Neurobiología"], año: 1, semestre: 2 },
  { nombre: "Psicología y Epistemología", ambito: 5, prerrequisitos: [], año: 1, semestre: 2 },
  { nombre: "Inglés II", ambito: 1, prerrequisitos: ["Inglés I"], año: 1, semestre: 2 },
  { nombre: "Habilidades Comunicativas", ambito: 1, prerrequisitos: [], año: 1, semestre: 2 },

  // SEGUNDO AÑO
  { nombre: "Psicoanálisis I", ambito: 2, prerrequisitos: [], año: 2, semestre: 3 },
  { nombre: "Psicología del Desarrollo I", ambito: 2, prerrequisitos: [], año: 2, semestre: 3 },
  { nombre: "Investigación I", ambito: 5, prerrequisitos: [], año: 2, semestre: 3 },
  { nombre: "Inglés III", ambito: 1, prerrequisitos: ["Inglés II"], año: 2, semestre: 3 },
  { nombre: "Razonamiento Científico y TICS", ambito: 1, prerrequisitos: ["Habilidades Comunicativas"], año: 2, semestre: 3 },

  { nombre: "Psicoanálisis II", ambito: 2, prerrequisitos: ["Psicoanálisis I"], año: 2, semestre: 4 },
  { nombre: "Psicología del Desarrollo II", ambito: 2, prerrequisitos: ["Psicología del Desarrollo I"], año: 2, semestre: 4 },
  { nombre: "Investigación II", ambito: 5, prerrequisitos: ["Investigación I"], año: 2, semestre: 4 },
  { nombre: "Inglés IV", ambito: 1, prerrequisitos: ["Inglés III"], año: 2, semestre: 4 },
  { nombre: "Eje de Formación Interdisciplinaria II", ambito: 1, prerrequisitos: [], año: 2, semestre: 4 },

  // ... Aquí seguirías con el resto de años y semestres ...
];

// Estado de cursos aprobados (set de nombres)
const aprobados = new Set();

function crearCursoElemento(curso) {
  const div = document.createElement('div');
  div.classList.add('curso', 'bloqueado', `ambito${curso.ambito}`);
  div.textContent = curso.nombre;

  // Verifica desbloqueo
  if (curso.prerrequisitos.every(pr => aprobados.has(pr)) || curso.prerrequisitos.length === 0) {
    div.classList.remove('bloqueado');
  }

  div.addEventListener('click', () => {
    if (div.classList.contains('bloqueado') || div.classList.contains('aprobado')) return;
    aprobados.add(curso.nombre);
    div.classList.add('aprobado');
    actualizarCursos();
  });

  div.addEventListener('mousemove', (e) => {
    tooltip.style.opacity = 1;
    tooltip.style.left = e.pageX + 15 + 'px';
    tooltip.style.top = e.pageY + 15 + 'px';
    const pre = curso.prerrequisitos.length > 0 ? curso.prerrequisitos.join(', ') : 'Ninguno';
    tooltip.textContent = `Prerrequisitos: ${pre}`;
  });

  div.addEventListener('mouseleave', () => {
    tooltip.style.opacity = 0;
  });

  return div;
}

function actualizarCursos() {
  document.querySelectorAll('.curso').forEach(div => {
    const nombre = div.textContent;
    const curso = cursos.find(c => c.nombre === nombre);
    const desbloqueado = curso.prerrequisitos.every(pr => aprobados.has(pr)) || curso.prerrequisitos.length === 0;

    if (desbloqueado) {
      div.classList.remove('bloqueado');
    } else {
      div.classList.add('bloqueado');
      div.classList.remove('aprobado');
      aprobados.delete(nombre);
    }
  });
}

function renderMalla() {
  // Agrupa cursos por año y semestre
  const años = [...new Set(cursos.map(c => c.año))].sort((a,b) => a-b);

  años.forEach(año => {
    const divAño = document.createElement('div');
    divAño.classList.add('anio');

    const tituloAño = document.createElement('h2');
    tituloAño.classList.add('anio-title');
    tituloAño.textContent = `Año ${año}`;
    divAño.appendChild(tituloAño);

    // Obtener semestres del año
    const semestres = cursos
      .filter(c => c.año === año)
      .map(c => c.semestre);
    const semestresUnicos = [...new Set(semestres)].sort((a,b) => a-b);

    const divSemestres = document.createElement('div');
    divSemestres.classList.add('semestres');

    semestresUnicos.forEach(semestre => {
      const divSemestre = document.createElement('div');
      divSemestre.classList.add('semestre');

      const tituloSemestre = document.createElement('h3');
      tituloSemestre.classList.add('semestre-title');
      tituloSemestre.textContent = `Semestre ${semestre}`;
      divSemestre.appendChild(tituloSemestre);

      cursos
        .filter(c => c.año === año && c.semestre === semestre)
        .forEach(curso => {
          const divCurso = crearCursoElemento(curso);
          divSemes
