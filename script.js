document.addEventListener('DOMContentLoaded', () => {
    const courses = document.querySelectorAll('.course');
    let approvedCourses = new Set(); // Para almacenar los IDs de los ramos aprobados

    // Cargar estado guardado (si existe)
    loadState();

    // Inicializar el estado de los ramos (bloqueado/desbloqueado)
    updateCourseStates();

    courses.forEach(course => {
        course.addEventListener('click', () => {
            const courseId = course.dataset.id;

            // Si el ramo no está aprobado y no está bloqueado, se puede "aprobar"
            if (!course.classList.contains('approved') && !course.classList.contains('locked')) {
                // Marcar como aprobado
                course.classList.add('approved');
                approvedCourses.add(courseId);
                console.log(`Ramo aprobado: ${course.textContent}`);

                // Guardar el estado
                saveState();

                // Actualizar el estado de todos los ramos
                updateCourseStates();
            } else if (course.classList.contains('locked')) {
                // Mostrar un mensaje si el ramo está bloqueado
                alert(`Para tomar "${course.textContent}", primero debes aprobar los requisitos.`);
            }
        });
    });

    // Función para actualizar el estado de los ramos (bloqueado/desbloqueado/aprobado)
    function updateCourseStates() {
        courses.forEach(course => {
            const courseId = course.dataset.id;
            const requires = course.dataset.requires ? course.dataset.requires.split(',') : [];

            if (approvedCourses.has(courseId)) {
                course.classList.add('approved');
                course.classList.remove('locked', 'unlocked');
            } else {
                // Verificar si todos los requisitos están aprobados
                const allRequirementsMet = requires.every(reqId => approvedCourses.has(reqId.trim()));

                if (requires.length === 0 || allRequirementsMet) {
                    course.classList.remove('locked');
                    course.classList.add('unlocked');
                } else {
                    course.classList.add('locked');
                    course.classList.remove('unlocked');
                }
            }
        });
    }

    // Función para guardar el estado en el almacenamiento local
    function saveState() {
        localStorage.setItem('approvedCoursesUNABPsicologia', JSON.stringify(Array.from(approvedCourses)));
    }

    // Función para cargar el estado del almacenamiento local
    function loadState() {
        const savedState = localStorage.getItem('approvedCoursesUNABPsicologia');
        if (savedState) {
            approvedCourses = new Set(JSON.parse(savedState));
        }
    }
});
