<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Malla Psicología UNAB</title>
    <style>
        body {
            font-family: 'Inter', sans-serif; /* Usando Inter para una mejor estética */
            margin: 0;
            padding: 20px;
            background: #fff0f5; /* Fondo suave */
            color: #333;
        }
        h1 {
            text-align: center;
            color: #b30059; /* Color principal */
            margin-bottom: 5px; /* Reducido para dejar espacio para la autoría */
        }
        .author-info {
            text-align: center;
            color: #880e4f;
            font-size: 0.9em;
            margin-bottom: 20px;
        }

        /* Contenedor principal de información (contador y PPA) */
        .info-container {
            display: flex;
            justify-content: center;
            flex-wrap: wrap; /* Permite que los elementos se envuelvan en pantallas pequeñas */
            gap: 15px; /* Espacio entre los contadores */
            margin-bottom: 20px;
        }

        .info-box {
            background: #ffeaf3;
            color: #b30059;
            padding: 10px 20px;
            border-radius: 8px;
            font-weight: bold;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
            border: 1px solid #e2b5c6;
            text-align: center;
        }

        /* Estilos de la malla principal */
        .malla {
            display: flex;
            overflow-x: auto; /* Permite desplazamiento horizontal si hay muchos semestres */
            gap: 20px;
            padding-bottom: 40px; /* Espacio para la barra de desplazamiento */
            justify-content: flex-start; /* Alinea los grupos de años al inicio */
        }

        /* Agrupación por año */
        .year-group {
            display: flex;
            flex-direction: column; /* Título del año arriba de los semestres */
            gap: 15px; /* Espacio entre el título del año y los semestres */
            align-items: center; /* Centra el título del año */
            min-width: 400px; /* Ancho mínimo para dos semestres + gap */
            padding: 10px;
            background: #ffeaf3;
            border-radius: 12px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            border: 1px solid #e2b5c6;
        }

        /* Título del año dentro del grupo */
        .year-group .anio {
            writing-mode: horizontal-tb; /* Vuelve a horizontal */
            transform: none; /* Elimina la rotación */
            border-left: none; /* Elimina el borde izquierdo */
            border-bottom: 4px solid #b30059; /* Borde inferior para el título del año */
            padding: 8px 15px;
            width: fit-content;
            margin-bottom: 5px;
            font-size: 1.3em;
            color: #b30059;
            background: #fce4ec;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        }

        /* Contenedor de los semestres dentro de un año */
        .semestres-del-anio {
            display: flex;
            gap: 20px; /* Espacio entre los semestres */
        }

        .semestre {
            display: flex;
            flex-direction: column;
            background: #fff; /* Fondo blanco para los semestres */
            border-radius: 10px;
            padding: 10px;
            min-width: 180px;
            border: 1px solid #e2b5c6;
            box-shadow: 0 2px 5px rgba(0,0,0,0.05);
        }
        .semestre h3 {
            text-align: center;
            color: #b30059;
            margin: 5px 0;
            font-size: 1.1em;
        }
        .ramo {
            padding: 8px;
            border-radius: 8px;
            margin: 5px 0;
            cursor: pointer;
            text-align: center;
            transition: 0.3s;
            opacity: 0.5; /* Ramos inactivos con menor opacidad */
            font-size: 0.9em;
            box-shadow: 0 1px 3px rgba(0,0,0,0.05);
        }
        .ramo.activo {
            opacity: 1; /* Ramos activos con opacidad completa */
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        .ramo.aprobado {
            text-decoration: line-through;
            background-color: #d63384 !important; /* Color más oscuro para aprobados */
            color: white;
            opacity: 1; /* Asegura que los aprobados siempre se vean claros */
            box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        }

        /* Estilos para los separadores de Licenciatura y Título Profesional (VERTICALES) */
        .separator, .titulo-final {
            writing-mode: vertical-lr; /* Orientación vertical del texto */
            transform: rotate(180deg); /* Rotar 180 grados para que el texto se lea de abajo a arriba */
            text-align: center;
            font-weight: bold;
            color: #880e4f; /* Color más oscuro para el texto de los separadores */
            background: #ffe6f0;
            padding: 10px; /* Reducido para un mejor ajuste vertical */
            border-left: 4px solid #880e4f;
            font-size: 1.1em; /* Ajustado para vertical */
            white-space: nowrap; /* Evita que el texto se divida en varias líneas */
            display: flex; /* Para centrar el texto verticalmente en el contenedor */
            align-items: center; /* Centrado vertical */
            justify-content: center; /* Centrado horizontal (después de rotar) */
            margin: 0 10px; /* Espacio a los lados para separarlos de los años */
            flex-shrink: 0; /* Evita que se encojan */
        }

        .titulo-final {
            border-color: #b30059;
            color: #b30059;
            background: #fce4ec;
        }

        /* Colores de los ámbitos */
        .ambito1 { background: #fce4ec; } /* Interdisciplina e Inglés */
        .ambito2 { background: #f8bbd0; } /* Conceptuales Transversales */
        .ambito3 { background: #f48fb1; } /* Diagnóstico */
        .ambito4 { background: #f06292; } /* Intervención */
        .ambito5 { background: #ec407a; } /* Investigación */
        .integradora { background: #f3c2d3; } /* Experiencias Integradoras */

        /* Sección de Notas */
        .grades-section {
            margin-top: 40px;
            background: #ffeaf3;
            padding: 25px;
            border-radius: 12px;
            box-shadow: 0 4px 10px rgba(0,0,0,0.1);
            border: 1px solid #e2b5c6;
        }

        .grades-section h2 {
            text-align: center;
            color: #b30059;
            margin-bottom: 25px;
            font-size: 1.8em;
        }

        #gradesInputContainer {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); /* Grid responsivo */
            gap: 20px;
        }

        .grade-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px 15px;
            background: #fff;
            border-radius: 8px;
            border: 1px solid #e2b5c6;
            box-shadow: 0 2px 5px rgba(0,0,0,0.05);
        }

        .grade-item span {
            font-size: 1em;
            color: #555;
            flex-grow: 1;
            margin-right: 10px;
        }

        .grade-item input[type="number"] {
            width: 70px; /* Ancho fijo para el input de nota */
            padding: 8px;
            border: 1px solid #ccc;
            border-radius: 5px;
            text-align: center;
            font-size: 1em;
            -moz-appearance: textfield; /* Elimina flechas en Firefox */
        }
        .grade-item input[type="number"]::-webkit-outer-spin-button,
        .grade-item input[type="number"]::-webkit-inner-spin-button {
            -webkit-appearance: none; /* Elimina flechas en Chrome/Safari */
            margin: 0;
        }

        /* Estilo para inputs deshabilitados */
        .grade-item input[type="number"]:disabled {
            background-color: #f0f0f0; /* Fondo gris para indicar deshabilitado */
            cursor: not-allowed;
        }

        /* Leyenda de Ámbitos (nueva posición) */
        .leyenda {
            margin-top: 40px; /* Espacio superior */
            margin-bottom: 40px; /* Espacio inferior antes de las notas */
            background: #ffeaf3;
            padding: 25px;
            border-radius: 12px;
            box-shadow: 0 4px 10px rgba(0,0,0,0.1);
            border: 1px solid #e2b5c6;
            display: flex; /* Para que los items se muestren en fila */
            justify-content: center; /* Centra los items de la leyenda */
            flex-wrap: wrap; /* Permite que los items salten de línea */
            gap: 10px; /* Espacio entre los items */
        }
        /* Asegura que los items de la leyenda tomen el color de su ámbito */
        .leyenda-item {
            display: flex;
            align-items: center;
            gap: 5px;
            font-size: 0.9em;
            padding: 5px 10px;
            border-radius: 5px;
            /* Los colores de fondo ya se aplican por las clases ambitoX */
            border: 1px solid #e2b5c6; /* Borde sutil */
            box-shadow: 0 1px 3px rgba(0,0,0,0.05);
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
            .malla {
                flex-direction: column; /* Apila los grupos de años en pantallas pequeñas */
                align-items: center;
            }
            .year-group {
                min-width: unset;
                width: 95%;
            }
            .semestres-del-anio {
                flex-direction: column; /* Apila los semestres dentro del año */
            }
            .leyenda, .grades-section {
                padding: 15px;
            }
            #gradesInputContainer {
                grid-template-columns: 1fr; /* Una columna en móviles */
            }
            .separator, .titulo-final {
                font-size: 1.2em;
                padding: 10px 20px;
                /* En móvil, si se apilan los años, estos separadores podrían ir horizontales de nuevo o ajustarse */
                writing-mode: horizontal-tb;
                transform: none;
                border-left: none;
                border-bottom: 4px solid; /* Mantener borde inferior */
                margin: 20px auto;
            }
        }
    </style>
</head>
<body>

    <h1>Malla Psicología – UNAB</h1>
    <p class="author-info">Por Barbi Jerez Figueroa</p>

    <div class="info-container">
        <div class="info-box">
            Ramos Aprobados: <span id="ramosAprobadosCount">0</span>
        </div>
        <div class="info-box">
            PPA: <span id="ppaValue">N/A</span>
        </div>
    </div>

    <div class="malla" id="malla">
        <!-- Los grupos de años y semestres se insertarán aquí por JavaScript -->
    </div>

    <!-- La leyenda de ámbitos se mueve aquí, entre la malla y la sección de notas -->
    <div class="leyenda">
        <div class="leyenda-item ambito1">Ámbito I: Interdisciplina e Inglés</div>
        <div class="leyenda-item ambito2">Ámbito II: Conceptuales Transversales</div>
        <div class="leyenda-item ambito3">Ámbito III: Diagnóstico</div>
        <div class="leyenda-item ambito4">Ámbito IV: Intervención</div>
        <div class="leyenda-item ambito5">Ámbito V: Investigación</div>
        <div class="leyenda-item integradora">Experiencias Integradoras</div>
    </div>

    <div class="grades-section">
        <h2>Ingreso de Notas</h2>
        <div id="gradesInputContainer">
            <!-- Las entradas de notas se generarán aquí por JavaScript -->
        </div>
    </div>

    <script>
        // Definición de los ramos con sus IDs, nombres, semestres, ámbitos, prerrequisitos y CRÉDITOS
        const ramos = [
            { id: 'historia', nombre: 'Historia y Fundamentos de la Psicología', semestre: 1, ambito: 'ambito2', prereq: [], creditos: 15 },
            { id: 'neurobio', nombre: 'Tópicos de Neurobiología', semestre: 1, ambito: 'ambito2', prereq: [], creditos: 14 },
            { id: 'sociedad', nombre: 'Psicología y Sociedad', semestre: 1, ambito: 'ambito2', prereq: [], creditos: 15 },
            { id: 'ingles1', nombre: 'Inglés I', semestre: 1, ambito: 'ambito1', prereq: [], creditos: 12 },
            { id: 'interdisc1', nombre: 'Eje Formación Interdisciplinaria I', semestre: 1, ambito: 'ambito1', prereq: [], creditos: 12 },

            { id: 'sistemas', nombre: 'Sistemas Psicológicos', semestre: 2, ambito: 'ambito2', prereq: [], creditos: 16 },
            { id: 'procesos', nombre: 'Procesos Psicológicos y Neurociencias', semestre: 2, ambito: 'ambito2', prereq: ['neurobio'], creditos: 16 },
            { id: 'epistemologia', nombre: 'Psicología y Epistemología', semestre: 2, ambito: 'ambito5', prereq: [], creditos: 15 },
            { id: 'ingles2', nombre: 'Inglés II', semestre: 2, ambito: 'ambito1', prereq: ['ingles1'], creditos: 12 },
            { id: 'comunicativas', nombre: 'Habilidades Comunicativas', semestre: 2, ambito: 'ambito1', prereq: [], creditos: 8 },

            { id: 'psico1', nombre: 'Psicoanálisis I', semestre: 3, ambito: 'ambito2', prereq: [], creditos: 15 },
            { id: 'desarrollo1', nombre: 'Psicología del Desarrollo I', semestre: 3, ambito: 'ambito2', prereq: [], creditos: 16 },
            { id: 'investigacion1', nombre: 'Investigación I', semestre: 3, ambito: 'ambito5', prereq: [], creditos: 18 },
            { id: 'ingles3', nombre: 'Inglés III', semestre: 3, ambito: 'ambito1', prereq: ['ingles2'], creditos: 12 },
            { id: 'tic', nombre: 'Razonamiento Científico y TICS', semestre: 3, ambito: 'ambito1', prereq: ['comunicativas'], creditos: 6 },

            { id: 'psico2', nombre: 'Psicoanálisis II', semestre: 4, ambito: 'ambito2', prereq: ['psico1'], creditos: 12 },
            { id: 'desarrollo2', nombre: 'Psicología del Desarrollo II', semestre: 4, ambito: 'ambito2', prereq: ['desarrollo1'], creditos: 14 },
            { id: 'investigacion2', nombre: 'Investigación II', semestre: 4, ambito: 'ambito5', prereq: ['investigacion1'], creditos: 17 },
            { id: 'ingles4', nombre: 'Inglés IV', semestre: 4, ambito: 'ambito1', prereq: ['ingles3'], creditos: 12 },
            { id: 'interdisc2', nombre: 'Eje Formación Interdisciplinaria II', semestre: 4, ambito: 'ambito1', prereq: [], creditos: 11 },

            { id: 'psicodiag1', nombre: 'Psicodiagnóstico Clínico I', semestre: 5, ambito: 'ambito3', prereq: [], creditos: 12 },
            { id: 'psicopato1', nombre: 'Psicopatología y Psiquiatría I', semestre: 5, ambito: 'ambito3', prereq: [], creditos: 14 },
            { id: 'integracion', nombre: 'Taller de Integración', semestre: 5, ambito: 'integradora', prereq: ['psico1', 'desarrollo2'], creditos: 16 },
            { id: 'social', nombre: 'Psicología Social', semestre: 5, ambito: 'ambito2', prereq: [], creditos: 15 },
            { id: 'interdisc3', nombre: 'Eje Formación Interdisciplinaria III', semestre: 5, ambito: 'ambito1', prereq: [], creditos: 12 },

            { id: 'psicodiag2', nombre: 'Psicodiagnóstico Clínico II', semestre: 6, ambito: 'ambito3', prereq: ['psicodiag1'], creditos: 12 },
            { id: 'psicopato2', nombre: 'Psicopatología y Psiquiatría II', semestre: 6, ambito: 'ambito3', prereq: ['psicopato1'], creditos: 12 },
            { id: 'educacional', nombre: 'Psicología Educacional', semestre: 6, ambito: 'ambito3', prereq: [], creditos: 15 },
            { id: 'interv_social', nombre: 'Diagnóstico e Intervención Social', semestre: 6, ambito: 'ambito3', prereq: ['social'], creditos: 15 },
            { id: 'trabajo_org', nombre: 'Psicología del Trabajo y las Organizaciones', semestre: 6, ambito: 'ambito3', prereq: [], creditos: 14 },

            { id: 'sistemica', nombre: 'Clínica Sistémica', semestre: 7, ambito: 'ambito3', prereq: [], creditos: 14 },
            { id: 'infanto_pato', nombre: 'Psicopatología Infantojuvenil', semestre: 7, ambito: 'ambito3', prereq: ['psicopato1'], creditos: 12 },
            { id: 'interv_educ', nombre: 'Diagnóstico e Intervención Educacional', semestre: 7, ambito: 'ambito3', prereq: ['educacional'], creditos: 15 },
            { id: 'juridica', nombre: 'Psicología Jurídica', semestre: 7, ambito: 'ambito3', prereq: [], creditos: 15 },
            { id: 'org_interv', nombre: 'Diagnóstico e Intervención Organizacional', semestre: 7, ambito: 'ambito3', prereq: ['trabajo_org'], creditos: 15 },

            { id: 'interv_sistemica', nombre: 'Intervención Clínica Sistémica', semestre: 8, ambito: 'ambito4', prereq: ['sistemica'], creditos: 13 },
            { id: 'infanto_clinica', nombre: 'Clínica Infantojuvenil', semestre: 8, ambito: 'ambito4', prereq: ['infanto_pato'], creditos: 11 },
            { id: 'integrador1', nombre: 'Integrador I: Taller de Investigación', semestre: 8, ambito: 'integradora', prereq: ['integracion', 'juridica'], creditos: 16 },
            { id: 'interv_juridica', nombre: 'Diagnóstico e Intervención Jurídica', semestre: 8, ambito: 'ambito3', prereq: ['juridica'], creditos: 15 },
            { id: 'psicoanalitica', nombre: 'Clínica Psicoanalítica', semestre: 8, ambito: 'ambito4', prereq: [], creditos: 11 },

            // Este es un "ramo" ficticio para marcar el separador de Licenciatura
            { id: 'licenciado_separator', nombre: 'LICENCIADO/A EN PSICOLOGÍA', semestre: 8.5, separator: true, creditos: 0 }, // Separator has 0 credits

            { id: 'interv_clinica', nombre: 'Taller de Intervención Clínica', semestre: 9, ambito: 'ambito4', prereq: ['interv_sistemica', 'infanto_clinica', 'integrador1', 'interv_juridica', 'psicoanalitica'], creditos: 20 },
            { id: 'salud', nombre: 'Psicología y Salud', semestre: 9, ambito: 'ambito4', prereq: ['interv_sistemica', 'infanto_clinica', 'integrador1', 'interv_juridica', 'psicoanalitica'], creditos: 11 },
            { id: 'interv_psicosocial', nombre: 'Taller de Diagnóstico e Intervención Psicosocial', semestre: 9, ambito: 'ambito4', prereq: ['interv_sistemica', 'infanto_clinica', 'integrador1', 'interv_juridica', 'psicoanalitica'], creditos: 22 },
            { id: 'electivo1', nombre: 'Electivo de Formación Profesional I', semestre: 9, ambito: 'ambito3', prereq: ['psicodiag2', 'psicopato2', 'interv_social', 'trabajo_org', 'interv_educ', 'juridica'], creditos: 7 },
            { id: 'electivo2', nombre: 'Electivo de Formación Profesional II', semestre: 9, ambito: 'ambito4', prereq: ['interv_sistemica', 'infanto_clinica', 'integrador1', 'interv_juridica', 'psicoanalitica'], creditos: 7 },

            { id: 'integrador2', nombre: 'Integrador II: Práctica Profesional', semestre: 10, ambito: 'integradora', prereq: ['interv_clinica', 'salud', 'interv_psicosocial', 'electivo1', 'electivo2'], creditos: 66 },
        ];

        // Referencias a elementos del DOM
        const contenedorMalla = document.getElementById('malla');
        const ramosAprobadosCountElement = document.getElementById('ramosAprobadosCount');
        const ppaValueElement = document.getElementById('ppaValue');
        const gradesInputContainer = document.getElementById('gradesInputContainer');

        // Cargar datos persistentes de localStorage
        const approvedRamosSet = new Set(JSON.parse(localStorage.getItem('approvedRamos')) || []);
        const grades = JSON.parse(localStorage.getItem('mallaGrades')) || {};

        // Función para obtener el nombre del año en texto
        function getNombreAño(num) {
            const nombres = ["PRIMER", "SEGUNDO", "TERCER", "CUARTO", "QUINTO"];
            return nombres[num - 1] || `AÑO ${num}`;
        }

        // Función para actualizar el contador de ramos aprobados
        function updateApprovedCounter() {
            ramosAprobadosCountElement.textContent = approvedRamosSet.size;
        }

        // Función para calcular y actualizar el PPA
        function calculatePPA() {
            let totalPuntos = 0;
            let totalCreditos = 0;

            ramos.forEach(ramo => {
                // Solo considera ramos que no son separadores y que tienen una nota válida
                const grade = grades[ramo.id];
                if (!ramo.separator && grade !== undefined && grade !== null && !isNaN(grade) && grade >= 1.0 && grade <= 7.0) {
                    totalPuntos += grade * ramo.creditos;
                    totalCreditos += ramo.creditos;
                }
            });

            if (totalCreditos === 0) {
                ppaValueElement.textContent = 'N/A';
            } else {
                const ppa = totalPuntos / totalCreditos;
                ppaValueElement.textContent = ppa.toFixed(2); // Formatear a 2 decimales
            }
        }

        // Función para actualizar el estado 'activo' de todos los ramos
        // Basado en los prerrequisitos y los ramos aprobados
        function updateRamoStates() {
            document.querySelectorAll('.ramo').forEach(ramoEl => {
                const prereqs = JSON.parse(ramoEl.dataset.prereq);
                const cumplePrereqs = prereqs.every(p => approvedRamosSet.has(p));

                if (cumplePrereqs) {
                    ramoEl.classList.add('activo');
                } else {
                    ramoEl.classList.remove('activo');
                    // Si un ramo deja de cumplir sus prerrequisitos, se desmarca como aprobado
                    if (ramoEl.classList.contains('aprobado')) {
                        ramoEl.classList.remove('aprobado');
                        approvedRamosSet.delete(ramoEl.dataset.id); // Elimina del conjunto de aprobados
                    }
                }
            });
            localStorage.setItem('approvedRamos', JSON.stringify(Array.from(approvedRamosSet)));
            updateApprovedCounter();
            updateGradeInputStates(); // Llama a esta función para actualizar el estado de los inputs
            calculatePPA(); // Recalcular PPA después de actualizar estados
        }

        // Función para actualizar el estado (habilitado/deshabilitado) de todos los inputs de notas
        function updateGradeInputStates() {
            document.querySelectorAll('#gradesInputContainer input[type="number"]').forEach(inputEl => {
                const ramoId = inputEl.dataset.id;
                if (approvedRamosSet.has(ramoId)) {
                    inputEl.disabled = false; // Habilitar si el ramo está aprobado
                } else {
                    inputEl.disabled = true; // Deshabilitar si el ramo no está aprobado
                    inputEl.value = ''; // Borrar la nota
                    delete grades[ramoId]; // Eliminar la nota del objeto de notas
                    localStorage.setItem('mallaGrades', JSON.stringify(grades)); // Guardar cambios
                }
            });
            calculatePPA(); // Recalcular PPA después de posibles borrados de notas
        }


        // Función para manejar el clic en un ramo (marcar/desmarcar como aprobado)
        function toggleAprobado(el) {
            const ramoId = el.dataset.id;
            const wasApproved = el.classList.contains('aprobado');

            // Si el ramo no está activo y no estaba aprobado, no permitir el clic
            if (!el.classList.contains('activo') && !wasApproved) {
                return;
            }

            if (wasApproved) {
                // Si estaba aprobado, ahora se desmarca
                el.classList.remove('aprobado');
                approvedRamosSet.delete(ramoId);
            } else {
                // Si no estaba aprobado, ahora se marca
                el.classList.add('aprobado');
                approvedRamosSet.add(ramoId);
            }
            
            updateRamoStates(); // Esto recalculará los estados y llamará a updateGradeInputStates() y calculatePPA()
        }

        // Función para poblar la sección de ingreso de notas
        function populateGradesInput() {
            gradesInputContainer.innerHTML = ''; // Limpia entradas previas
            ramos.forEach(ramo => {
                if (ramo.separator) return; // Ignora el separador de licenciatura

                const gradeItem = document.createElement('div');
                gradeItem.className = 'grade-item';
                
                const inputDisabled = !approvedRamosSet.has(ramo.id) ? 'disabled' : ''; // Determina si el input debe estar deshabilitado inicialmente
                const inputValue = grades[ramo.id] || ''; // Obtiene la nota guardada o vacía

                gradeItem.innerHTML = `
                    <span>${ramo.nombre} (${ramo.creditos} Créditos):</span>
                    <input type="number" step="0.1" min="1.0" max="7.0" data-id="${ramo.id}" value="${inputValue}" ${inputDisabled}>
                `;
                gradesInputContainer.appendChild(gradeItem);

                // Añade un listener para guardar la nota cuando cambia el input y recalcular PPA
                gradeItem.querySelector('input').addEventListener('change', (event) => {
                    const value = parseFloat(event.target.value);
                    if (value >= 1.0 && value <= 7.0) {
                        grades[ramo.id] = value;
                    } else {
                        // Limpiar el valor si está fuera de rango o no es un número válido
                        event.target.value = '';
                        delete grades[ramo.id]; // Eliminar si el valor no es válido
                    }
                    localStorage.setItem('mallaGrades', JSON.stringify(grades));
                    calculatePPA(); // Recalcular PPA después de cada cambio de nota
                });
            });
        }

        // --- Lógica de Construcción de la Malla ---
        const totalAños = 5; // 5 años para 10 semestres

        for (let año = 1; año <= totalAños; año++) {
            const yearGroup = document.createElement('div');
            yearGroup.className = 'year-group';
            contenedorMalla.appendChild(yearGroup);

            // Añade el título del año
            const anioDiv = document.createElement('div');
            anioDiv.className = 'anio';
            anioDiv.innerText = `${getNombreAño(año)} AÑO`;
            yearGroup.appendChild(anioDiv);

            // Contenedor para los semestres de este año
            const semestresDelAño = document.createElement('div');
            semestresDelAño.className = 'semestres-del-anio';
            yearGroup.appendChild(semestresDelAño);

            // Añade los dos semestres correspondientes a este año
            const semestreInicial = (año - 1) * 2 + 1;
            const semestreFinal = año * 2;

            for (let i = semestreInicial; i <= semestreFinal; i++) {
                const sem = document.createElement('div');
                sem.className = 'semestre';
                sem.id = 'sem' + i; // Asigna un ID para poder insertar los ramos
                const h = document.createElement('h3');
                h.textContent = `Semestre ${i}`;
                sem.appendChild(h);
                semestresDelAño.appendChild(sem);
            }

            // Inserta el separador de Licenciatura después del 4º año (Semestre 8)
            if (año === 4) {
                const sepLicenciatura = document.createElement('div');
                sepLicenciatura.className = 'separator';
                sepLicenciatura.innerText = 'LICENCIADO/A EN PSICOLOGÍA';
                // Se añade al contenedor principal de la malla, no dentro del year-group
                contenedorMalla.appendChild(sepLicenciatura); 
            }
        }

        // Añade el título profesional al final de la malla principal
        const tituloProfesional = document.createElement('div');
        tituloProfesional.className = 'titulo-final';
        tituloProfesional.innerText = 'TÍTULO PROFESIONAL: PSICÓLOGO/A';
        contenedorMalla.appendChild(tituloProfesional);

        // --- Renderizado de Ramos y Inicialización ---
        ramos.forEach(ramo => {
            if (ramo.separator) return; // No renderiza el "ramo" separador

            const div = document.createElement('div');
            div.className = `ramo ${ramo.ambito}`; // Añade clase de ámbito para el color
            div.dataset.id = ramo.id; // Guarda el ID del ramo
            div.dataset.prereq = JSON.stringify(ramo.prereq); // Guarda los prerrequisitos
            div.textContent = ramo.nombre; // Muestra el nombre

            div.onclick = () => toggleAprobado(div); // Asigna el manejador de clic

            // Aplica la clase 'aprobado' si el ramo ya estaba marcado en localStorage
            if (approvedRamosSet.has(ramo.id)) {
                div.classList.add('aprobado');
            }

            // Añade el ramo al semestre correspondiente
            const semestreElement = document.getElementById('sem' + ramo.semestre);
            if (semestreElement) {
                semestreElement.appendChild(div);
            } else {
                console.warn(`Advertencia: No se encontró el elemento para el semestre ${ramo.semestre} para el ramo ${ramo.nombre}.`);
            }
        });

        // Llama a las funciones de inicialización
        updateRamoStates(); // Actualiza los estados 'activo' y el contador al cargar
        populateGradesInput(); // Rellena la sección de notas
        calculatePPA(); // Calcula y muestra el PPA inicial
    </script>

</body>
</html>
