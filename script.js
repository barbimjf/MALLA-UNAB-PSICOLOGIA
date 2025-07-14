document.addEventListener('DOMContentLoaded', () => {
    const ramos = document.querySelectorAll('.ramo');
    const contadorAprobados = document.getElementById('contador-aprobados');
    let approvedCount = 0;

    // Objeto para mapear nombres de ramos a sus elementos DOM
    const ramoElements = {};
    ramos.forEach(ramo => {
        ramoElements[ramo.dataset.nombre] = ramo;
    });

    // Función para obtener los nombres de los prerrequisitos de un ramo
    const getPrerequisitos = (ramo) => {
        const prereqString = ramo.dataset.prerequisito;
        return prereqString ? prereqString.split(',').map(s => s.trim()) : [];
    };

    // Función para obtener los nombres de los ramos que este ramo desbloquea
    const getRamosToUnlock = (ramo) => {
        const unlockString = ramo.dataset.prerequisitoDesbloquea;
        return unlockString ? unlockString.split(',').map(s => s.trim()) : [];
    };

    // Función para verificar si un ramo puede ser aprobado (todos sus prerrequisitos están aprobados)
    const canApprove = (ramo) => {
        const prerequisitos = getPrerequisitos(ramo);
        if (prerequisitos.length === 0) {
            return true; // No tiene prerrequisitos
        }
        return prerequisitos.every(prereqName => {
            const prereqElement = ramoElements[prereqName];
            return prereqElement && prereqElement.classList.contains('aprobado');
        });
    };

    // Inicializa el estado de los ramos (deshabilitados si tienen prerrequisitos no aprobados)
    const initializeRamos = () => {
        ramos.forEach(ramo => {
            ramo.classList.remove('aprobado', 'deshabilitado'); // Limpiar estados previos
            const prerequisitos = getPrerequisitos(ramo);
            if (prerequisitos.length > 0) {
                ramo.classList.add('deshabilitado');
            }
        });
        updateRamosState(); // Asegura que el estado inicial sea correcto
    };

    // Actualiza el estado de todos los ramos
    const updateRamosState = () => {
        let changed = true;
        while (changed) {
            changed = false;
            ramos.forEach(ramo => {
                if (!ramo.classList.contains('aprobado')) {
                    if (canApprove(ramo)) {
                        if (ramo.classList.contains('deshabilitado')) {
                            ramo.classList.remove('deshabilitado');
                            changed = true;
                        }
                    } else {
                        if (!ramo.classList.contains('deshabilitado')) {
                            ramo.classList.add('deshabilitado');
                            changed = true;
                        }
                    }
                }
            });
        }
        updateApprovedCount();
    };

    // Actualiza el contador de ramos aprobados
    const updateApprovedCount = () => {
        approvedCount = document.querySelectorAll('.ramo.aprobado').length;
        contadorAprobados.textContent = `Ramos aprobados: ${approvedCount}`;
    };

    // Asigna los eventos de clic
    ramos.forEach(ramo => {
        ramo.addEventListener('click', () => {
            if (ramo.classList.contains('deshabilitado')) {
                alert('Debes aprobar los prerrequisitos de este ramo primero.');
                return;
            }
            if (!ramo.classList.contains('aprobado')) {
                ramo.classList.add('aprobado');
                updateApprovedCount();
                updateRamosState(); // Recalcula el estado de todos los ramos
            }
        });
    });

    // Añade el texto inicial a cada ramo
    ramos.forEach(ramo => {
        const nombre = ramo.dataset.nombre;
        // Reemplaza los espacios con <br> para forzar el salto de línea si hay muchos en el nombre.
        // Se podría mejorar con un algoritmo que cuente palabras o longitud si fuera necesario.
        ramo.innerHTML = nombre.replace(/ y | e /g, '<br>y ').replace(/ de | del | las /g, '<br>de ').replace(/ en /g, '<br>en ').replace(/ la /g, '<br>la ').replace(/ los /g, '<br>los ').replace(/ a /g, '<br>a ').replace(/: /g, ':<br>');
    });

    initializeRamos(); // Llama a la inicialización al cargar la página
});
