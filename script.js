document.addEventListener('DOMContentLoaded', () => {
    const courses = document.querySelectorAll('.course');
    // Cargar el estado de los cursos aprobados desde localStorage
    const approvedCourses = new Set(JSON.parse(localStorage.getItem('approvedCourses')) || []);

    // Mapeo de IDs de cursos a sus nombres completos para el tooltip de prerrequisitos
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
        "psicoanalisis2": "Psicoanalisis II",
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

    /**
     * Verifica si los prerrequisitos de un curso se cumplen, considerando la lógica 'and' u 'or'.
     * @param {Array<string>} prerequisites - Array de IDs de los prerrequisitos.
     * @param {string} logic - Lógica a aplicar ('and' o 'or').
     * @returns {boolean} - True si los prerrequisitos se cumplen, false en caso contrario.
     */
    const arePrerequisitesMet = (prerequisites, logic) => {
        if (prerequisites.length === 0) {
            return true; // No hay prerrequisitos, siempre se cumplen
        }

        if (logic === 'or') {
            // Se cumple si al menos UNO de los prerrequisitos está aprobado
            return prerequisites.some(prereqId => approvedCourses.has(prereqId.trim()));
        } else { // Por defecto, lógica 'and'
            // Se cumple si TODOS los prerrequisitos están aprobados
            return prerequisites.every(prereqId => approvedCourses.has(prereqId.trim()));
        }
    };

    /**
     * Actualiza el estado visual de todos los cursos en la malla.
     */
    const updateCourseStates = () => {
        courses.forEach(course => {
            const courseId = course.dataset.id;
            // Obtener los IDs de los prerrequisitos, eliminando espacios en blanco y vacíos
            const prerequisites = (course.dataset.prerequisites || '').split(',').filter(id => id.trim() !== '');
            // Obtener la lógica de los prerrequisitos (por defecto 'and')
            const prerequisiteLogic = course.dataset.prerequisiteLogic || 'and';

            // Si el curso está marcado como aprobado en el almacenamiento local
            if (approvedCourses.has(courseId)) {
                course.classList.add('approved');
                course.classList.remove('prerequisite-not-met'); // Asegurarse de quitar la clase de no cumplido
                course.removeAttribute('data-prerequisite-names'); // Limpiar el tooltip
            } else {
                course.classList.remove('approved');
                // Verificar si los prerrequisitos se cumplen para este curso
                const canApprove = arePrerequisitesMet(prerequisites, prerequisiteLogic);

                if (prerequisites.length > 0 && !canApprove) {
                    // Si hay prerrequisitos y no se cumplen, añadir la clase de no cumplido
                    course.classList.add('prerequisite-not-met');
                    // Preparar el string de nombres de prerrequisitos FALTANTES para el tooltip
                    const missingPrereqNames = prerequisites
                        .filter(prereqId => !approvedCourses.has(prereqId.trim()))
                        .map(prereqId => courseNames[prereqId.trim()] || prereqId.trim()) // Usar nombre completo o ID
                        .join(', ');
                    course.dataset.prerequisiteNames = missingPrereqNames;
                } else {
                    course.classList.remove('prerequisite-not-met');
                    course.removeAttribute('data-prerequisite-names'); // Limpiar el tooltip
                }
            }
        });
    };

    // Inicializar el estado de los cursos al cargar la página
    updateCourseStates();

    // Añadir el event listener a cada curso
    courses.forEach(course => {
        course.addEventListener('click', () => {
            const courseId = course.dataset.id;
            const prerequisites = (course.dataset.prerequisites || '').split(',').filter(id => id.trim() !== '');
            const prerequisiteLogic = course.dataset.prerequisiteLogic || 'and';

            // Si el curso ya está aprobado, lo desaprueba
            if (approvedCourses.has(courseId)) {
                approvedCourses.delete(courseId);

                // Propagar la desaprobación: si este curso se desaprueba, cualquier curso que lo tenga
                // como prerrequisito y que esté aprobado, también debe desaprobarse para mantener la consistencia.
                // Esto es crucial para la lógica de la malla.
                courses.forEach(c => {
                    const cPrerequisites = (c.dataset.prerequisites || '').split(',').filter(id => id.trim() !== '');
                    const cPrereqLogic = c.dataset.prerequisiteLogic || 'and';

                    // Si el curso 'c' estaba aprobado y ahora, al desaprobar 'courseId',
                    // ya no cumple sus propios prerrequisitos, entonces 'c' también se desaprueba.
                    if (approvedCourses.has(c.dataset.id) && cPrerequisites.includes(courseId)) {
                        if (!arePrerequisitesMet(cPrerequisites, cPrereqLogic)) {
                            approvedCourses.delete(c.dataset.id);
                        }
                    }
                });

            } else {
                // Intenta aprobar el curso
                const canApprove = arePrerequisitesMet(prerequisites, prerequisiteLogic);

                if (canApprove) {
                    approvedCourses.add(courseId);
                } else {
                    // Mostrar un mensaje claro al usuario si faltan prerrequisitos
                    const missingPrereqNames = prerequisites
                        .filter(prereqId => !approvedCourses.has(prereqId.trim()))
                        .map(prereqId => courseNames[prereqId.trim()] || prereqId.trim())
                        .join(', ');
                    alert(`Para aprobar "${course.textContent.trim()}", primero debes aprobar: ${missingPrereqNames}.`);
                }
            }

            // Guardar el estado actualizado en localStorage
            localStorage.setItem('approvedCourses', JSON.stringify(Array.from(approvedCourses)));
            // Actualizar el estado visual de todos los cursos después del cambio
            updateCourseStates();
        });
    });
});
