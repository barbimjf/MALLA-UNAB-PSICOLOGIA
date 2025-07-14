document.addEventListener('DOMContentLoaded', () => {
    const ramos = document.querySelectorAll('.ramo');
    const contadorAprobados = document.getElementById('contador-aprobados');
    let approvedCount = 0;

    // Objeto para mapear nombres de ramos a sus elementos DOM
    // Esto es crucial para buscar ramos por su nombre de forma eficiente
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
    // (Este atributo 'data-prerequisito-desbloquea' se usa para la lógica de propagación)
    const getRamosToUnlock = (ramo) => {
        const unlockString = ramo.dataset.prerequisitoDesbloquea;
        return unlockString ? unlockString.split(',').map(s => s.trim()) : [];
    };

    // Función para verificar si un ramo puede ser aprobado (todos sus prerrequisitos están aprobados)
    const canApprove = (ramo) => {
        const prerequisitos = getPrerequisitos(ramo);
        if (prerequisitos.length === 0) {
            return true; // No tiene prerrequisitos, se puede aprobar directamente
        }
        // Verifica si TODOS los prerrequisitos están aprobados
        return prerequisitos.every(prereqName => {
            const prereqElement = ramoElements[prereqName];
            return prereqElement && prereqElement.classList.contains('aprobado');
        });
    };

    // Actualiza el estado de todos los ramos (habilitado/deshabilitado)
    // Se ejecuta en un bucle para asegurar la propagación de todos los cambios
    const updateRamosState = () => {
        let changed = true;
        while (changed) {
            changed = false; // Si no hay cambios en esta iteración, el bucle terminará
            ramos.forEach(ramo => {
                if (!ramo.classList.contains('aprobado')) { // Solo actualiza si el ramo no está aprobado
                    if (canApprove(ramo)) {
                        // Si puede ser aprobado y estaba deshabilitado, lo habilita
                        if (ramo.classList.contains('deshabilitado')) {
                            ramo.classList.remove('deshabilitado');
                            changed = true; // Hubo un cambio
                        }
                    } else {
                        // Si no puede ser aprobado y no estaba deshabilitado, lo deshabilita
                        if (!ramo.classList.contains('deshabilitado')) {
                            ramo.classList.add('deshabilitado');
                            changed = true; // Hubo un cambio
                        }
                    }
                }
            });
        }
        updateApprovedCount(); // Actualiza el contador después de cada cambio de estado
    };

    // Actualiza el contador de ramos aprobados en la interfaz
    const updateApprovedCount = () => {
        approvedCount = document.querySelectorAll('.ramo.aprobado').length;
        contadorAprobados.textContent = `Ramos aprobados: ${approvedCount}`;
    };

    // Asigna los eventos de clic a cada ramo
    ramos.forEach(ramo => {
        ramo.addEventListener('click', () => {
            if (ramo.classList.contains('deshabilitado')) {
                alert('¡Atención! Debes aprobar los prerrequisitos de este ramo primero.');
                return; // Sale de la función si el ramo está deshabilitado
            }
            if (!ramo.classList.contains('aprobado')) {
                // Marca el ramo como aprobado
                ramo.classList.add('aprobado');
                updateRamosState(); // Recalcula el estado de todos los ramos
            }
            // Si ya está aprobado, un clic no hace nada. Si quisieras desaprobar, se necesitaría más lógica.
        });
    });

    // Añade el texto inicial a cada ramo y aplica los saltos de línea forzados
    ramos.forEach(ramo => {
        const nombre = ramo.dataset.nombre;
        // Divide el nombre en partes para insertar <br> estratégicamente
        let formattedName = nombre
            .replace(/ y /g, '<br>y ')
            .replace(/ e /g, '<br>e ')
            .replace(/ de /g, '<br>de ')
            .replace(/ del /g, '<br>del ')
            .replace(/ las /g, '<br>las ')
            .replace(/ en /g, '<br>en ')
            .replace(/ la /g, '<br>la ')
            .replace(/ los /g, '<br>los ')
            .replace(/ a /g, '<br>a ')
            .replace(/: /g, ':<br>');
        ramo.innerHTML = formattedName;
    });

    // Llama a la inicialización y actualización del estado al cargar la página
    // Esto asegura que todos los ramos estén en su estado correcto (deshabilitados o habilitados)
    // basándose en sus prerrequisitos al inicio.
    updateRamosState();
});
