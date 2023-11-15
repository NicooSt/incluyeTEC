// Debes cargar primero el script que tiene la función loadCss()

// Obtener checkbox
let dark_mode = document.getElementById("dark-mode");
// Escuchar cambios
dark_mode.addEventListener('click', () => {
    // Cargar y activar o desactivar de acuerdo al estado del checkbox
    // Enviar falso cuando el checkbox está marcado para activar
    // O verdadero para desactivar

    loadCss('/css/dark-mode.css', checkMode());
});

function loadCss(file, disable = false) {
    // Evitar cargar más de una vez
    let link = document.querySelector(`link[href="${file}"]`);

    if (!link) {
        // Si todavía no se ha cargado el archivo, crear elemento y asignar propiedades
        link = document.createElement('link');
        link.href = file;
        link.type = "text/css";
        link.rel = "stylesheet";
        link.media = "screen,print";
        document.head.appendChild(link);
    }
    // Activar o desactivar
    link.disabled = disable;
    console.log(disable);
}

function checkMode() {
    let dark_mode = document.getElementById("dark-mode");

    dark_mode.classList.toggle("dark-mode--inactive");
    if (dark_mode.classList.contains("dark-mode--inactive")) {
        return false;
    } else {
        return true;
    }
}