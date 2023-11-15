// localStorage.removeItem('dark-mode');
const darkMode = document.getElementById("dark-mode");
darkMode.addEventListener('click', toogleDarkMode);

loadCss('/css/dark-mode.css', localStorage.getItem('dark-mode'));

function toogleDarkMode() {
    // Si el modo esta en true (oscuro) cambia a false (claro)
    if (localStorage.getItem('dark-mode') == 'true') {
        loadCss('/css/dark-mode.css', 'false');
        localStorage.setItem('dark-mode', 'false');
    } else {
        // Si el modo esta en false (claro) cambia a true (oscuro)
        loadCss('/css/dark-mode.css', 'true');
        localStorage.setItem('dark-mode', 'true');
    }
}

function loadCss(file, state = 'false') {
    let link = document.querySelector(`link[href="${file}"]`);

    if (state == null) {
        // Se ejecuta la primera vez y se pone en false (claro)
        localStorage.setItem('dark-mode', 'false');
    } else if (state == 'true') {
        // Se crea y se agrega el link del css del modo oscuro
        darkMode.classList.add("dark-mode--inactive");
        link = document.createElement('link');
        link.rel = "stylesheet";
        link.href = file;
        link.type = "text/css";
        link.media = "screen,print";
        document.head.appendChild(link);
    } else {
        // Evito error en la consola
        if (link) {
            // Se remueve el link del css del modo oscuro
            darkMode.classList.remove("dark-mode--inactive");
            link.remove();
        }
    }
}