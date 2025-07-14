document.addEventListener('DOMContentLoaded', () => {
    const contadorAprobados = document.getElementById('contador-aprobados');
    const ramosElementos = document.querySelectorAll('.ramo'); // Nodos DOM de todos los ramos

    // Objeto que almacenará el estado de aprobación de cada ramo
    // { "Nombre del Ramo": true/false }
    let estadoAprobacion = {}; 

    // --- Definición COMPLETA de todos los ramos, sus ámbitos y prerrequisitos ---
    // ¡Asegúrate de que los nombres aquí COINCIDAN EXACTAMENTE con los data-nombre en tu HTML!
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
        "Psicodiagnóstico Clínico I": { ambito: "III", prereq: [] }, // No tiene prerrequisito en la lista, pero suele tenerlo de Psicoanálisis II
        "Psicopatología y Psiquiatría I": { ambito: "II", prereq: [] }, // No tiene prerrequisito en la lista
        "Taller de Integración": { ambito: "VI", prereq: ["Psicoanálisis I", "Psicología del Desarrollo II"] }, // Actualizado con los 2 prerrequisitos
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
        "Integrador I: Taller de Investigación": { ambito: "VI", prereq: ["Taller de Integración", "Investigación II", "Psicología Jurídica"] }, // Agregados prerrequisitos
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

    // Función para actualizar el estado visual de todos los ramos
    // Esta función se ejecuta en un bucle para propagar los cambios
    function actualizarEstadoDeRamos() {
        let cambiosRealizados;
        do {
            cambiosRealizados = false;
            ramosElementos.forEach(ramoDOM => {
                const nombreRamo = ramoDOM.dataset.nombre;
                const info = infoRamos[nombreRamo];

                if (!info) {
                    console.warn(`Información no encontrada para el ramo: ${nombreRamo}. Verifique data-nombre en HTML y infoRamos en JS.`);
                    return; // Saltar si el ramo no está definido en infoRamos
                }

                // Si el ramo ya está aprobado, no se modifica su estado de bloqueo/aprobación
                if (estadoAprobacion[nombreRamo]) {
                    if (!ramoDOM.classList.contains('aprobado')) {
                        ramoDOM.classList.add('aprobado');
                        ramoDOM.classList.remove('bloqueado');
                        cambiosRealizados = true;
                    }
                } else {
                    // El ramo no está aprobado, verificar si está bloqueado por prerrequisitos
                    const prerrequisitosCumplidos = info.prereq.every(prereqNombre => {
                        return estadoAprobacion[prereqNombre] === true;
                    });

                    if (prerrequisitosCumplidos) {
                        // Si los prerrequisitos están cumplidos, el ramo ya no está bloqueado
                        if (ramoDOM.classList.contains('bloqueado')) {
                            ramoDOM.classList.remove('bloqueado');
                            cambiosRealizados = true;
                        }
                    } else {
                        // Si los prerrequisitos NO están cumplidos, el ramo debe estar bloqueado
                        if (!ramoDOM.classList.contains('bloqueado')) {
                            ramoDOM.classList.add('bloqueado');
                            cambiosRealizados = true;
                        }
                    }
                    // Asegurarse de que no tenga la clase 'aprobado' si no lo está
                    if (ramoDOM.classList.contains('aprobado')) {
                        ramoDOM.classList.remove('aprobado');
                        cambiosRealizados = true;
                    }
                }
            });
        } while (cambiosRealizados); // Repetir mientras se sigan realizando cambios

        // Actualizar el contador de ramos aprobados
        totalAprobados = Object.values(estadoAprobacion).filter(Boolean).length;
        contadorAprobados.textContent = `Ramos aprobados: ${totalAprobados}`;
    }

    // --- Inicialización y Event Listeners ---

    // 1. Inicializar el estado de aprobación de todos los ramos a false
    ramosElementos.forEach(ramoDOM => {
        const nombreRamo = ramoDOM.dataset.nombre;
        estadoAprobacion[nombreRamo] = false; // Inicialmente ningún ramo está aprobado

        // Asignar las clases de ámbito desde JS (o asegurar que estén en HTML)
        const ambito = infoRamos[nombreRamo]?.ambito;
        if (ambito) {
            // Asegurarse de que no haya clases de ámbito antiguas
            ramoDOM.classList.forEach(cls => {
                if (cls.startsWith('ambito-')) {
                    ramoDOM.classList.remove(cls);
                }
            });
            ramoDOM.classList.add(`ambito-${ambito}`);
        } else {
            console.warn(`Ámbito no definido para el ramo: ${nombreRamo}`);
        }

        // Insertar el texto del nombre del ramo con saltos de línea forzados
        // Se puede personalizar más esta lógica de salto de línea si es necesario
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

    // 2. Asignar los event listeners de clic
    ramosElementos.forEach(ramoDOM => {
        const nombreRamo = ramoDOM.dataset.nombre;

        ramoDOM.addEventListener('click', () => {
            // Si está bloqueado, mostrar alerta y no hacer nada
            if (ramoDOM.classList.contains('bloqueado')) {
                alert('Debes aprobar los prerrequisitos para este ramo primero.');
                return;
            }

            // Cambiar el estado de aprobación
            estadoAprobacion[nombreRamo] = !estadoAprobacion[nombreRamo]; // Alternar entre true y false

            // Actualizar el estado visual de todos los ramos y el contador
            actualizarEstadoDeRamos();
        });
    });

    // 3. Ejecutar la actualización inicial para configurar el estado visual al cargar la página
    actualizarEstadoDeRamos();
});
