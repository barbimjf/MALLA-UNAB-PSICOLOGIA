document.addEventListener('DOMContentLoaded', () => {
    const contadorAprobados = document.getElementById('contador-aprobados');
    const ramosElementos = document.querySelectorAll('.ramo'); // Todos los elementos DOM con clase 'ramo'

    // Objeto para almacenar el estado de aprobación de cada ramo (true si aprobado, false si no)
    let estadoAprobacion = {}; 

    // --- Definición COMPLETA y CORRECTA de todos los ramos, sus ámbitos y PRERREQUISITOS ---
    // ¡Es CRÍTICO que los nombres (claves del objeto) COINCIDAN EXACTAMENTE con los 'data-nombre' en tu HTML!
    // Si hay una tilde, un espacio extra, una mayúscula/minúscula diferente, no funcionará.
    const infoRamos = {
        // PRIMER AÑO
        "Historia y Fundamentos de la Psicología": { ambito: "II", prereq: [] },
        "Tópicos de Neurobiología": { ambito: "II", prereq: [] },
        "Psicología y Sociedad": { ambito: "II", prereq: [] },
        "Inglés I": { ambito: "I", prereq: [] },
        "Eje de Formación Interdisciplinaria I": { ambito: "I", prereq: [] },
        "Sistemas Psicológicos": { ambito: "II", prereq: [] },
        "Procesos Psicológicos y Neurociencias": { ambito: "II", prereq: ["Tópicos de Neurobiología"] },
        "Psicología y Epistemología": { ambito: "II", prereq: [] },
        "Inglés II": { ambito: "I", prereq: ["Inglés I"] },
        "Habilidades Comunicativas": { ambito: "II", prereq: [] },

        // SEGUNDO AÑO
        "Psicoanálisis I": { ambito: "II", prereq: [] },
        "Psicología del Desarrollo I": { ambito: "II", prereq: [] },
        "Investigación I": { ambito: "V", prereq: [] },
        "Inglés III": { ambito: "I", prereq: ["Inglés II"] },
        "Razonamiento Científico y TICS": { ambito: "II", prereq: ["Habilidades Comunicativas"] },
        "Psicoanálisis II": { ambito: "II", prereq: ["Psicoanálisis I"] },
        "Psicología del Desarrollo II": { ambito: "II", prereq: ["Psicología del Desarrollo I"] },
        "Investigación II": { ambito: "V", prereq: ["Investigación I"] },
        "Inglés IV": { ambito: "I", prereq: ["Inglés III"] },
        "Eje de Formación Interdisciplinaria II": { ambito: "I", prereq: [] },

        // TERCER AÑO
        "Psicodiagnóstico Clínico I": { ambito: "III", prereq: ["Psicoanálisis II"] }, // Añadido prerrequisito
        "Psicopatología y Psiquiatría I": { ambito: "II", prereq: [] },
        "Taller de Integración": { ambito: "VI", prereq: ["Psicoanálisis I", "Psicología del Desarrollo II"] },
        "Psicología Social": { ambito: "II", prereq: [] },
        "Eje de Formación Interdisciplinaria III": { ambito: "I", prereq: [] },
        "Psicodiagnóstico Clínico II": { ambito: "III", prereq: ["Psicodiagnóstico Clínico I"] },
        "Psicopatología y Psiquiatría II": { ambito: "II", prereq: ["Psicopatología y Psiquiatría I"] },
        "Psicología Educacional": { ambito: "IV", prereq: [] },
        "Diagnóstico e Intervención Social": { ambito: "IV", prereq: ["Psicología Social"] },
        "Psicología del Trabajo y las Organizaciones": { ambito: "IV", prereq: [] },

        // CUARTO AÑO
        "Clínica Sistémica": { ambito: "IV", prereq: [] },
        "Psicopatología Infantojuvenil": { ambito: "III", prereq: ["Psicopatología y Psiquiatría I"] },
        "Diagnóstico e Intervención Educacional": { ambito: "IV", prereq: ["Psicología Educacional"] },
        "Psicología Jurídica": { ambito: "II", prereq: [] },
        "Diagnóstico e Intervención Organizacional": { ambito: "IV", prereq: ["Psicología del Trabajo y las Organizaciones"] },
        "Intervención Clínica Sistémica": { ambito: "IV", prereq: ["Clínica Sistémica"] },
        "Clínica Infantojuvenil": { ambito: "IV", prereq: ["Psicopatología Infantojuvenil"] },
        "Integrador I: Taller de Investigación": { ambito: "VI", prereq: ["Taller de Integración", "Investigación II", "Psicología Jurídica"] },
        "Diagnóstico e Intervención Jurídica": { ambito: "IV", prereq: ["Psicología Jurídica"] },
        "Clínica Psicoanalítica": { ambito: "IV", prereq: ["Psicoanálisis II"] },

        // QUINTO AÑO
        "Taller de Intervención Clínica": { ambito: "VI", prereq: ["Intervención Clínica Sistémica", "Clínica Infantojuvenil", "Integrador I: Taller de Investigación", "Diagnóstico e Intervención Jurídica", "Clínica Psicoanalítica"] },
        "Psicología y Salud": { ambito: "II", prereq: ["Intervención Clínica Sistémica", "Clínica Infantojuvenil", "Integrador I: Taller de Investigación", "Diagnóstico e Intervención Jurídica", "Clínica Psicoanalítica"] },
        "Taller de Diagnóstico e Intervención Social": { ambito: "VI", prereq: ["Intervención Clínica Sistémica", "Clínica Infantojuvenil", "Integrador I: Taller de Investigación", "Diagnóstico e Intervención Jurídica", "Clínica Psicoanalítica"] },
        "Electivo de Formación Profesional I": { ambito: "I", prereq: ["Psicodiagnóstico Clínico II", "Psicopatología y Psiquiatría II", "Diagnóstico e Intervención Social", "Psicología del Trabajo y las Organizaciones", "Diagnóstico e Intervención Educacional", "Psicología Jurídica"] },
        "Electivo de Formación Profesional II": { ambito: "I", prereq: ["Intervención Clínica Sistémica", "Clínica Infantojuvenil", "Integrador I: Taller de Investigación", "Diagnóstico e Intervención Jurídica", "Clínica Psicoanalítica"] },
        "Integrador II: Práctica Profesional": { ambito: "VI", prereq: ["Taller de Intervención Clínica", "Psicología y Salud", "Taller de Diagnóstico e Intervención Social", "Electivo de Formación Profesional I", "Electivo de Formación Profesional II"] },
    };
    // --- FIN de la definición de infoRamos ---

    // Función principal para actualizar el estado visual y lógico de todos los ramos
    function actualizarEstadoDeRamos() {
        let cambiosRealizados; // Bandera para saber si hubo cambios en la iteración
        
        do {
            cambiosRealizados = false; // Reiniciar para cada iteración del bucle
            ramosElementos.forEach(ramoDOM => {
                const nombreRamo = ramoDOM.dataset.nombre;
                const info = infoRamos[nombreRamo];

                if (!info) {
                    console.warn(`[ERROR]: Información no encontrada para el ramo '${nombreRamo}'. Verifique 'data-nombre' en HTML y las claves en 'infoRamos' en JS.`);
                    return; // Saltamos este ramo si no está definido en infoRamos
                }

                // 1. Manejo del estado 'aprobado'
                if (estadoAprobacion[nombreRamo]) {
                    // Si el ramo está marcado como aprobado en 'estadoAprobacion'
                    if (!ramoDOM.classList.contains('aprobado')) {
                        ramoDOM.classList.add('aprobado');
                        cambiosRealizados = true;
                    }
                    if (ramoDOM.classList.contains('bloqueado')) {
                        ramoDOM.classList.remove('bloqueado'); // Un ramo aprobado no puede estar bloqueado
                        cambiosRealizados = true;
                    }
                } else {
                    // Si el ramo NO está marcado como aprobado
                    if (ramoDOM.classList.contains('aprobado')) {
                        ramoDOM.classList.remove('aprobado');
                        cambiosRealizados = true;
                    }

                    // 2. Manejo del estado 'bloqueado' por prerrequisitos
                    const prerrequisitosCumplidos = info.prereq.every(prereqNombre => {
                        return estadoAprobacion[prereqNombre] === true;
                    });

                    if (prerrequisitosCumplidos) {
                        // Si todos los prerrequisitos están cumplidos, el ramo ya NO está bloqueado
                        if (ramoDOM.classList.contains('bloqueado')) {
                            ramoDOM.classList.remove('bloqueado');
                            cambiosRealizados = true;
                        }
                    } else {
                        // Si AL MENOS UN prerrequisito NO está cumplido, el ramo DEBE estar bloqueado
                        if (!ramoDOM.classList.contains('bloqueado')) {
                            ramoDOM.classList.add('bloqueado');
                            cambiosRealizados = true;
                        }
                    }
                }
            });
        } while (cambiosRealizados); // El bucle se repite hasta que no haya más cambios en el habilitado/deshabilitado

        // Actualizar el contador de ramos aprobados
        const totalAprobados = Object.values(estadoAprobacion).filter(Boolean).length;
        contadorAprobados.textContent = `Ramos aprobados: ${totalAprobados}`;
    }

    // --- Inicialización de la Malla al Cargar la Página ---
    ramosElementos.forEach(ramoDOM => {
        const nombreRamo = ramoDOM.dataset.nombre;
        const info = infoRamos[nombreRamo];

        if (!info) {
            console.error(`[CRÍTICO]: El ramo '${nombreRamo}' en el HTML no tiene información en el objeto 'infoRamos' del JS. Esto causará fallos.`);
            ramoDOM.style.border = "2px solid red"; // Resaltar visualmente el error
            ramoDOM.innerHTML = `ERROR:<br>${nombreRamo}`;
            return; 
        }

        // Inicialmente, ningún ramo está aprobado
        estadoAprobacion[nombreRamo] = false; 

        // Asignar las clases de ámbito desde JS (para asegurar que los colores se apliquen correctamente)
        ramoDOM.classList.forEach(cls => { // Limpiar clases de ámbito antiguas si existen
            if (cls.startsWith('ambito-')) {
                ramoDOM.classList.remove(cls);
            }
        });
        ramoDOM.classList.add(`ambito-${info.ambito}`);

        // Insertar el texto del nombre del ramo con saltos de línea forzados para mejor visualización
        let formattedName = nombreRamo
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
        ramoDOM.innerHTML = formattedName;
    });

    // --- Event Listeners (para hacer los ramos clickeables) ---
    ramosElementos.forEach(ramoDOM => {
        const nombreRamo = ramoDOM.dataset.nombre;

        ramoDOM.addEventListener('click', () => {
            if (ramoDOM.classList.contains('bloqueado')) {
                // Si el ramo está bloqueado, no se puede hacer clic y se informa al usuario
                alert('Debes aprobar los prerrequisitos para este ramo primero.');
                return;
            }

            // Alternar el estado de aprobación del ramo
            estadoAprobacion[nombreRamo] = !estadoAprobacion[nombreRamo];

            // Recalcular y actualizar el estado visual de toda la malla
            actualizarEstadoDeRamos();
        });
    });

    // Llamada inicial para configurar el estado de la malla al cargar la página
    // Esto asegura que los ramos sin prerrequisitos estén habilitados y los demás bloqueados
    actualizarEstadoDeRamos();
});
