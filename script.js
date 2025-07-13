document.addEventListener('DOMContentLoaded', () => {
    const ramos = document.querySelectorAll('.ramo');
    const approvedCounter = document.getElementById('counter');
    let approvedCount = 0;

    // Object to store approved status of each ramo (true/false)
    const approvedRamos = {};

    // Define prerequisites (ramoId: [prerequisite1Id, prerequisite2Id, ...])
    // This map defines what a ramo REQUIRES to be unlocked.
    const prerequisitesMap = {
        'ramo1-9': ['ramo1-4'], // Inglés II requiere Inglés I
        'ramo2-2': ['ramo1-2'], // Psicología del Desarrollo I requiere Tópicos de Neurobiología
        'ramo2-4': ['ramo1-9'], // Inglés III requiere Inglés II
        'ramo2-5': ['ramo1-10'], // Razonamiento Científico y TICS requiere Habilidades Comunicativas
        'ramo2-6': ['ramo2-1'], // Psicoanálisis II requiere Psicoanálisis I
        'ramo2-7': ['ramo2-2'], // Psicología del Desarrollo II requiere Psicología del Desarrollo I
        'ramo2-8': ['ramo2-3'], // Investigación II requiere Investigación I
        'ramo2-9': ['ramo2-4'], // Inglés IV requiere Inglés III

        'ramo3-3': ['ramo2-1', 'ramo2-7'], // Taller de Integración requiere Psicoanálisis I Y Psicología del Desarrollo II
        'ramo3-4': ['ramo2-4'], // Psicología Social requiere Inglés III
        'ramo3-6': ['ramo3-1'], // Psicodiagnóstico Clínico II requiere Psicodiagnóstico Clínico I
        'ramo3-7': ['ramo3-2'], // Psicopatología y Psiquiatría II requiere Psicopatología y Psiquiatría I
        'ramo3-9': ['ramo3-4'], // Diagnóstico e Intervención Social requiere Psicología Social
        'ramo4-5': ['ramo3-10'], // Diagnóstico e Intervención Organizacional requiere Psicología del Trabajo y las Organizaciones

        'ramo4-2': ['ramo3-2'], // Psicopatología Infantojuvenil requiere Psicopatología y Psiquiatría I
        'ramo4-3a': ['ramo3-8'], // Diagnóstico e Intervención Educacional requiere Psicología Educacional
        'ramo4-3': ['ramo3-3', 'ramo4-4'], // Integrador I: Taller de Investigación requiere Taller de Integración Y Psicología Jurídica
        'ramo4-6': ['ramo4-1'], // Intervención Clínica Sistémica requiere Clínica Sistémica
        'ramo4-7': ['ramo4-2'], // Clínica Infantojuvenil requiere Psicopatología Infantojuvenil
        'ramo4-9': ['ramo4-4'], // Diagnóstico e Intervención Jurídica requiere Psicología Jurídica
        // 'ramo4-10': [] -> Clínica Psicoanalítica no tiene prerrequisitos de otros ramos.

        // Ramos del IX semestre (todos requieren el grupo de ramos del VIII semestre)
        'ramo5-1': ['ramo4-6', 'ramo4-7', 'ramo4-3', 'ramo4-9', 'ramo4-10'], // Taller de Intervención Clínica
        'ramo5-2': ['ramo4-6', 'ramo4-7', 'ramo4-3', 'ramo4-9', 'ramo4-10'], // Psicología y Salud
        'ramo5-3': ['ramo4-6', 'ramo4-7', 'ramo4-3', 'ramo4-9', 'ramo4-10'], // Taller de Diagnóstico e Intervención Social
        'ramo5-4': ['ramo4-6', 'ramo4-7', 'ramo4-3', 'ramo4-9', 'ramo4-10'], // Electivo de Formación Profesional I
        'ramo5-5': ['ramo4-6', 'ramo4-7', 'ramo4-3', 'ramo4-9', 'ramo4-10'], // Electivo de Formación Profesional II
        
        // Ramo del X semestre
        'ramo5-6': ['ramo5-1', 'ramo5-2', 'ramo5-3', 'ramo5-4', 'ramo5-5'] // Integrador II: Práctica Profesional
    };

    // Initialize ramos status and apply locked class where necessary
    function initializeRamos() {
        ramos.forEach(ramo => {
            const ramoId = ramo.id;
            approvedRamos[ramoId] = false; // All ramos are initially not approved
            
            // Ensure the text is wrapped in a span for targeted text-decoration
            if (!ramo.querySelector('span')) {
                const text = ramo.innerHTML;
                ramo.innerHTML = `<span>${text}</span>`;
            }
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

    // Function to recheck all ramo lock statuses after a change
    function recheckAllRamoLocks() {
        ramos.forEach(ramo => {
            if (!approvedRamos[ramo.id]) { // Only re-check ramos that are not yet approved
                checkRamoLockStatus(ramo);
            }
        });
    }

    // Event listener for each ramo
    ramos.forEach(ramo => {
        ramo.addEventListener('click', () => {
            const ramoId = ramo.id;

            // Prevent clicking if locked, unless it's already approved (to allow un-approving)
            if (ramo.classList.contains('locked') && !approvedRamos[ramoId]) {
                alert('Debes aprobar los prerrequisitos antes de cursar este ramo.');
                return;
            }

            // Toggle approved status
            approvedRamos[ramoId] = !approvedRamos[ramoId];
            ramo.classList.toggle('approved', approvedRamos[ramoId]);
            
            updateCounter();
            recheckAllRamoLocks(); // Recheck all ramos' lock status after a change
        });
    });

    // Initial setup
    initializeRamos();
});
