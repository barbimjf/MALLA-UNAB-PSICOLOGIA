// script.js

(() => {

    // Mapas para ramos y dependencias
    const ramosMap = new Map();
    const dependenciasMap = new Map();
    const aprobados = new Set();

    // Contador visible
    const contadorElem = document.getElementById("contador-aprobados");

    // Todos los ramos
    const ramosElems = Array.from(document.querySelectorAll(".ramo"));

    // Cargar prerrequisitos y construir dependencias inversas
    ramosElems.forEach(ramo => {
        const id = ramo.dataset.id.trim();
        ramosMap.set(id, ramo);

        const prereqStr = ramo.dataset.prerrequisitos.trim();
        let prereqs = [];
        if (prereqStr.length > 0) {
            prereqs = prereqStr.split(",").map(s => s.trim()).filter(s => s.length > 0);
        }
        ramo.prerrequisitos = prereqs;

        // Registrar que este ramo es desbloqueado por sus prerrequisitos
        prereqs.forEach(prer => {
            if (!dependenciasMap.has(prer)) dependenciasMap.set(prer, []);
            dependenciasMap.get(prer).push(id);
        });
    });

    // Bloquear todos los ramos que tengan prerrequisitos
    ramosElems.forEach(ramo => {
        if (ramo.prerrequisitos.length > 0) {
            bloquearRamo(ramo);
        }
    });

    // Desbloquear los que no tienen prerrequisitos
    ramosElems.forEach(ramo => {
        if (ramo.prerrequisitos.length === 0) {
            desbloquearRamo(ramo);
        }
    });

    // Evento click para aprobar ramo
    ramosElems.forEach(ramo => {
        ramo.addEventListener("click", () => {
            const id = ramo.dataset.id;
            if (aprobados.has(id)) return;
            if (ramo.classList.contains("bloqueado")) return;

            aprobarRamo(id);
        });
    });

    function aprobarRamo(id) {
        if (!ramosMap.has(id)) return;
        const ramo = ramosMap.get(id);

        // Visual: tachar texto y atenuar color
        ramo.classList.add("aprobado");

        // Bloquear interacciones posteriores
        ramo.style.pointerEvents = "none";

        aprobados.add(id);

        // Desbloquear dependientes que cumplan prerrequisitos
        if (dependenciasMap.has(id)) {
            dependenciasMap.get(id).forEach(depId => {
                if (!aprobados.has(depId)) {
                    const depRamo = ramosMap.get(depId);
                    if (cumplePrerrequisitos(depRamo)) {
                        desbloquearRamo(depRamo);
                    }
                }
            });
        }

        actualizarContador();
    }

    // Bloquear ramo
    function bloquearRamo(ramoElem) {
        ramoElem.classList.add("bloqueado");
        ramoElem.style.pointerEvents = "none";
        ramoElem.style.opacity = "0.3";
        ramoElem.style.userSelect = "none";
    }

    // Desbloquear ramo
    function desbloquearRamo(ramoElem) {
        ramoElem.classList.remove("bloqueado");
        ramoElem.style.pointerEvents = "auto";
        ramoElem.style.opacity = "1";
        ramoElem.style.userSelect = "auto";
    }

    // Verificar que todos prerrequisitos estén aprobados
    function cumplePrerrequisitos(ramoElem) {
        for (let prereq of ramoElem.prerrequisitos) {
            if (!aprobados.has(prereq)) return false;
        }
        return true;
    }

    // Actualizar contador en pantalla
    function actualizarContador() {
        contadorElem.textContent = `Ramos aprobados: ${aprobados.size}`;
    }

    // Inicializar contador
    actualizarContador();

})();
