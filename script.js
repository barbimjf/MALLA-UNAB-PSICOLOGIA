// script.js
// Controla la lógica de ramos aprobados, prerrequisitos, tachado y desbloqueo

(() => {
    // Mapa para acceso rápido a los elementos ramos
    const ramosMap = new Map();

    // Mapa para prerrequisitos: clave = ramo id, valor = array de prerrequisitos (id string)
    // Ya definido en HTML con atributo data-prerrequisitos: cadena separada por coma

    // Mapa inverso: clave = ramo que desbloquea, valor = array de ramos que dependen de este
    // Para acelerar desbloqueo
    const dependenciasMap = new Map();

    // Set para ramos aprobados
    const aprobados = new Set();

    // Contador HTML
    const contadorElem = document.getElementById("contador");

    // Todos los ramos del DOM
    const ramosElems = Array.from(document.querySelectorAll(".ramo"));

    // Parsear prerrequisitos y llenar dependenciasMap
    ramosElems.forEach(ramo => {
        const id = ramo.dataset.id.trim();
        ramosMap.set(id, ramo);

        let prereqStr = ramo.dataset.prerrequisitos.trim();
        // Puede ser vacío o con múltiples prerrequisitos separados por coma y espacios
        let prereqs = [];
        if(prereqStr.length > 0) {
            prereqs = prereqStr.split(",").map(s => s.trim()).filter(s => s.length > 0);
        }
        ramo.prerrequisitos = prereqs;

        // Por cada prerrequisito, registrar que este desbloquea el ramo actual
        prereqs.forEach(prer => {
            if (!dependenciasMap.has(prer)) dependenciasMap.set(prer, []);
            dependenciasMap.get(prer).push(id);
        });
    });

    // Inicializar: bloqueamos todos los ramos que tengan prerrequisitos
    ramosElems.forEach(ramo => {
        if(ramo.prerrequisitos.length > 0) {
            ramo.classList.add("bloqueado");
            ramo.style.pointerEvents = "none";
            ramo.style.opacity = "0.3";
            ramo.style.userSelect = "none";
        }
    });

    // Excepción: si ramo no tiene prerrequisitos, desbloqueado desde inicio
    ramosElems.forEach(ramo => {
        if(ramo.prerrequisitos.length === 0) {
            desbloquearRamo(ramo.dataset.id);
        }
    });

    // Al hacer click en ramo desbloqueado
    ramosElems.forEach(ramo => {
        ramo.addEventListener("click", () => {
            const id = ramo.dataset.id;
            if(aprobados.has(id)) return; // ya aprobado no hacer nada
            if(ramo.classList.contains("bloqueado")) return; // bloqueado no hacer nada

            // Marcar como aprobado
            aprobarRamo(id);
        });
    });

    // Función aprobar ramo
    function aprobarRamo(id) {
        if(!ramosMap.has(id)) return;
        const ramo = ramosMap.get(id);

        // Marcar visualmente aprobado
        ramo.classList.add("aprobado");

        // Bloquear para que no se pueda clickear más
        ramo.style.pointerEvents = "none";
        ramo.style.opacity = "0.6";

        aprobados.add(id);

        // Desbloquear ramos dependientes que tienen este ramo como prerrequisito
        if(dependenciasMap.has(id)) {
            dependenciasMap.get(id).forEach(depId => {
                if(!aprobados.has(depId)) {
                    const depRamo = ramosMap.get(depId);
                    // Chequear si se cumplen todos los prerrequisitos para desbloquear
                    if (seCumplenPrerrequisitos(depRamo)) {
                        desbloquearRamo(depId);
                    }
                }
            });
        }

        actualizarContador();
    }

    // Chequear si un ramo cumple todos sus prerrequisitos
    function seCumplenPrerrequisitos(ramoElem) {
        if(!ramoElem) return false;
        for(let prereq of ramoElem.prerrequisitos) {
            if(!aprobados.has(prereq)) return false;
        }
        return true;
    }

    // Desbloquear ramo
    function desbloquearRamo(id) {
        const ramo = ramosMap.get(id);
        if(!ramo) return;
        ramo.classList.remove("bloqueado");
        ramo.style.pointerEvents = "auto";
        ramo.style.opacity = "1";
        ramo.style.userSelect = "auto";
    }

    // Actualiza el contador de aprobados
    function actualizarContador() {
        contadorElem.textContent = aprobados.size;
    }

    // Inicialización final
    actualizarContador();

})();
