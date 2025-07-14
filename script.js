document.addEventListener('DOMContentLoaded', () => {
    const courses = document.querySelectorAll('.course');
    const approvedCourses = new Set(JSON.parse(localStorage.getItem('approvedCourses')) || []);

    // Mapeo de IDs de cursos a sus nombres completos para el tooltip
    const courseNames = {
        "historiaFundamentos": "Historia y Fundamentos de la Psicología",
        "topicosNeurobiologia": "Tópicos de Neurobiología",
        "psicologiaSociedad": "Psicología y Sociedad",
        "ingles1": "Inglés I",
        "ejeInterdisciplinaria1": "Eje de Formación Interdisciplinaria I",
        "sistemasPsicologicos": "Sistemas Psicológicos",
        "procesosPsicologicosNeurociencias": "Procesos Psicológicos y Neurociencias",
        "psicologiaEpistemologia": "Psicología y Epistemología",
        "ingles2": "Inglés II",
        "habilidadesComunicativas": "Habilidades Comunicativas",
        "psicoanalisis1": "Psicoanálisis I",
        "psicologiaDesarrollo1": "Psicología del Desarrollo I",
        "investigacion1": "Investigación I",
        "ingles3": "Inglés III",
        "razonamientoCientificoTICS": "Razonamiento Científico y TICS",
        "psicoanalisis2": "Psicoanálisis II",
        "psicologiaDesarrollo2": "Psicología del Desarrollo II",
        "investigacion2": "Investigación II",
        "ingles4": "Inglés IV",
        "ejeInterdisciplinaria2": "Eje de Formación Interdisciplinaria II",
        "psicodiagnosticoClinico1": "Psicodiagnóstico Clínico I",
        "psicopatologiaPsiquiatria1": "Psicopatología y Psiquiatría I",
        "tallerIntegracion": "Taller de Integración",
        "psicologiaSocial": "Psicología Social",
        "ejeInterdisciplinaria3": "Eje de Formación Interdisciplinaria III",
        "psicodiagnosticoClinico2": "Psicodiagnóstico Clínico II",
        "psicopatologiaPsiquiatria2": "Psicopatología y Psiquiatría II",
        "psicologiaEducacional": "Psicología Educacional",
        "diagnosticoIntervencionSocial": "Diagnóstico e Intervención Social",
        "psicologiaTrabajoOrganizaciones": "Psicología del Trabajo y las Organizaciones",
        "clinicaSistemica": "Clínica Sistémica",
        "psicopatologiaInfantojuvenil": "Psicopatología Infantojuvenil",
        "diagnosticoIntervencionEducacional": "Diagnóstico e Intervención Educacional",
        "psicologiaJuridica": "Psicología Jurídica",
        "diagnosticoIntervencionOrganizacional": "Diagnóstico e Intervención Organizacional",
        "intervencionClinicaSistemica": "Intervención Clínica Sistémica",
        "clinicaInfantojuvenil": "Clínica Infantojuvenil",
        "integrador1TallerInvestigacion": "Integrador I: Taller de Investigación",
        "diagnosticoIntervencionJuridica": "Diagnóstico e Intervención Jurídica",
        "clinicaPsicoanalitica": "Clínica Psicoanalítica",
        "tallerIntervencionClinica": "Taller de Intervención Clínica",
        "psicologiaSalud": "Psicología y Salud",
        "tallerDiagnosticoIntervencionSocial": "Taller de Diagnóstico e Intervención Social",
        "electivoFormacionProfesional1": "Electivo de Formación Profesional I",
        "electivoFormacionProfesional2": "Electivo de Formación Profesional II",
        "integrador2PracticaProfesional": "Integrador II: Práctica Profesional"
    };

    const updateCourseStates = () => {
        courses.forEach(course => {
            const courseId = course.dataset.id;
            const prerequisites = (course.dataset.prerequisites || '').split(',').filter(id => id.trim() !== '');

            // Si el curso está aprobado, añadir la clase 'approved'
            if (approvedCourses.has(courseId)) {
                course.classList.add('approved');
                course.classList.remove('prerequisite-not-met'); // Asegurarse de quitar la clase de no cumplido
            } else {
                course.classList.remove('approved');
                // Verificar prerrequisitos si el curso no está aprobado
                const allPrerequisitesMet = prerequisites.every(prereqId => approvedCourses.has(prereqId.trim()));
                if (prerequisites.length > 0 && !allPrerequisitesMet) {
                    course.classList.add('prerequisite-not-met');
                    // Preparar el string de nombres de prerrequisitos para el tooltip
                    const prereqNames = prerequisites
                        .filter(prereqId => !approvedCourses.has(prereqId.trim()))
                        .map(prereqId => courseNames[prereqId.trim()] || prereqId.trim())
                        .join(', ');
                    course.dataset.prerequisiteNames = prereqNames;
                } else {
                    course.classList.remove('prerequisite-not-met');
                    course.removeAttribute('data-prerequisite-names');
                }
            }
        });
    };

    // Inicializar el estado de los cursos al cargar la página
    updateCourseStates();

    courses.forEach(course => {
        course.addEventListener('click', () => {
            const courseId = course.dataset.id;
            const prerequisites = (course.dataset.prerequisites || '').split(',').filter(id => id.trim() !== '');

            // Si el curso ya está aprobado, lo desaprueba
            if (approvedCourses.has(courseId)) {
                approvedCourses.delete(courseId);
                // Si este curso se desaprueba, los cursos que lo tienen como prerrequisito y están aprobados
                // deben ser desaprobados también para mantener la consistencia
                courses.forEach(c => {
                    const cPrerequisites = (c.dataset.prerequisites || '').split(',').filter(id => id.trim() !== '');
                    if (cPrerequisites.includes(courseId) && approvedCourses.has(c.dataset.id)) {
                        approvedCourses.delete(c.dataset.id);
                    }
                });
            } else {
                // Intenta aprobar el curso
                const allPrerequisitesMet = prerequisites.every(prereqId => approvedCourses.has(prereqId.trim()));
                if (prerequisites.length === 0 || allPrerequisitesMet) {
                    approvedCourses.add(courseId);
                } else {
                    // Mostrar un mensaje o indicar visualmente que faltan prerrequisitos
                    alert('Debes aprobar los prerrequisitos antes de tomar este ramo.');
                }
            }

            localStorage.setItem('approvedCourses', JSON.stringify(Array.from(approvedCourses)));
            updateCourseStates(); // Actualizar el estado de todos los cursos
        });
    });
});
