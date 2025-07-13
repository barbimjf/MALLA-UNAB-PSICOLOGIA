document.addEventListener('DOMContentLoaded', () => {
    const ramos = document.querySelectorAll('.ramo');
    const approvedCounter = document.getElementById('counter');
    let approvedCount = 0;

    // Object to store approved status of each ramo (true/false)
    const approvedRamos = {};

    // Define prerequisites (ramoId: [prerequisite1Id, prerequisite2Id, ...])
    const prerequisitesMap = {
        'ramo2-2': ['ramo1-2'], // Psicología del Desarrollo I requires Tópicos de Neurobiología
        'ramo1-5': ['ramo1-4'], // Inglés II requires Inglés I (correction from user's data, check if ram1-5 is Inglés II)
        'ramo2-4': ['ramo1-9'], // Inglés III requires Inglés II
        'ramo2-5': ['ramo1-10'], // Razonamiento Científico y TICS requires Habilidades Comunicativas
        'ramo2-6': ['ramo2-1'], // Psicoanálisis II requires Psicoanálisis I
        'ramo2-7': ['ramo2-2'], // Psicología del Desarrollo II requires Psicología del Desarrollo I
        'ramo2-8': ['ramo2-3'], // Investigación II requires Investigación I
        'ramo2-9': ['ramo2-4'], // Inglés IV requires Inglés III

        'ramo3-1': [], // Psicodiagnóstico Clínico I
        'ramo3-2': [], // Psicopatología y Psiquiatría I
        'ramo3-3': ['ramo2-1', 'ramo2-7'], // Taller de Integración requires Psicoanálisis I AND Psicología del Desarrollo II
        'ramo3-4': ['ramo2-4'], // Psicología Social requires Inglés III (recheck if this is the correct prereq based on name)
        'ramo3-6': ['ramo3-1'], // Psicodiagnóstico Clínico II requires Psicodiagnóstico Clínico I
        'ramo3-7': ['ramo3-2'], // Psicopatología y Psiquiatría II requires Psicopatología y Psiquiatría I
        'ramo3-9': ['ramo3-4'], // Diagnóstico e Intervención Social requires Psicología Social
        'ramo3-10': [], // Psicología del Trabajo y las Organizaciones

        'ramo4-1': [], // Clínica Sistémica
        'ramo4-2': ['ramo3-2'], // Psicopatología Infantojuvenil requires Psicopatología y Psiquiatría I
        'ramo4-3a': ['ramo3-8'], // Diagnóstico e Intervención Educacional requires Psicología Educacional
        'ramo4-4': [], // Psicología Jurídica
        'ramo4-5': ['ramo3-10'], // Diagnóstico e Intervención Organizacional requires Psicología del Trabajo y las Organizaciones
        'ramo4-6': ['ramo4-1'], // Intervención Clínica Sistémica requires Clínica Sistémica
        'ramo4-7': ['ramo4-2'], // Clínica Infantojuvenil requires Psicopatología Infantojuvenil
        'ramo4-3': ['ramo3-3', 'ramo4-4'], // Integrador I: Taller de Investigación requires Taller de Integración AND Psicología Jurídica
        'ramo4-9': ['ramo4-4'], // Diagnóstico e Intervención Jurídica requires Psicología Jurídica
        'ramo4-10': [], // Clínica Psicoanalítica

        'ramo5-1': ['ramo4-6', 'ramo4-7', 'ramo4-3', 'ramo4-9', 'ramo4-10'], // Taller de Intervención Clínica requires Intervención Clínica Sistémica, Clínica Infantojuvenil, Integrador I: Taller de Investigación, Diagnóstico e Intervención Jurídica, Clínica Psicoanalítica
        'ramo5-2': ['ramo4-6', 'ramo4-7', 'ramo4-3', 'ramo4-9', 'ramo4-10'], // Psicología y Salud requires (same as above)
        'ramo5-3': ['ramo4-6', 'ramo4-7', 'ramo4-3', 'ramo4-9', 'ramo4-10'], // Taller de Diagnóstico e Intervención Social requires (same as above)
        'ramo5-4': ['ramo4-6', 'ramo4-7', 'ramo4-3', 'ramo4-9', 'ramo4-10'], // Electivo de Formación Profesional I requires (same as above)
        'ramo5-5': ['ramo4-6', 'ramo4-7', 'ramo4-3', 'ramo4-9', 'ramo4-10'], // Electivo de Formación Profesional II requires (same as above)
        'ramo5-6': ['ramo5-1', 'ramo5-2', 'ramo5-3', 'ramo5-4', 'ramo5-5'] // Integrador II: Práctica Profesional requires all Semestre IX ramos
    };

    // Initialize ramos status and apply locked class where necessary
    function initializeRamos() {
        ramos.forEach(ramo => {
            const ramoId = ramo.id;
            approvedRamos[ramoId] = false; // All ramos are initially not approved
            ramo.classList.remove('approved'); // Ensure no previous approved state
            
            // Apply initial locked state
            checkRamoLockStatus(ramo);
        });
        updateCounter();
    }

    // Check if a ramo should be locked (all prerequisites not met)
    function checkRamoLockStatus(ramo) {
        const ramoId = ramo.id;
        const prerequisites = prerequisitesMap[ramoId];

        if (!prerequisites || prerequisites.length === 0) {
            ramo.classList.remove('locked'); // No prerequisites, always unlocked
            return true;
        }

        const allPrerequisitesMet = prerequisites.every(prereqId => approvedRamos[prereqId]);
        if (allPrerequisitesMet) {
            ramo.classList.remove('locked');
            return true;
        } else {
            ramo.classList.add('locked');
            return false;
        }
    }

    // Update the counter of approved ramos
    function updateCounter() {
        approvedCount = Object.values(approvedRamos).filter(status => status).length;
        approvedCounter.textContent = approvedCount;
    }

    // Function to unlock dependent ramos
    function unlockDependentRamos(approvedRamoId) {
        ramos.forEach(ramo => {
            if (ramo.classList.contains('approved')) return; // Don't unlock already approved ramos

            const ramoPrerequisites = prerequisitesMap[ramo.id];
            if (ramoPrerequisites && ramoPrerequisites.includes(approvedRamoId)) {
                // If this ramo depends on the recently approved one, check if all its prerequisites are now met
                checkRamoLockStatus(ramo);
            }
        });
        // Also check all ramos that have multiple prerequisites where this might be one
        ramos.forEach(ramo => {
            if (ramo.classList.contains('approved')) return;
            checkRamoLockStatus(ramo);
        });
    }

    // Event listener for each ramo
    ramos.forEach(ramo => {
        ramo.addEventListener('click', () => {
            const ramoId = ramo.id;

            if (ramo.classList.contains('locked') && !approvedRamos[ramoId]) {
                alert('Debes aprobar los prerrequisitos antes de cursar este ramo.');
                return;
            }

            if (approvedRamos[ramoId]) {
                // If already approved, unmark it
                ramo.classList.remove('approved');
                approvedRamos[ramoId] = false;
            } else {
                // Mark as approved
                ramo.classList.add('approved');
                approvedRamos[ramoId] = true;
            }

            updateCounter();
            unlockDependentRamos(ramoId); // Check and unlock any ramos that depend on this one
        });
    });

    // Initial setup
    initializeRamos();
});
