"use strict";

const header = document.getElementById("header");
const barIcon = document.getElementById("header__icon");
const navUl = document.querySelector(".nav__ul");
const productLink = document.getElementById("nav__link--products");
const productMenu = productLink.nextElementSibling;
// Consulto la existencia del alert porque algunas paginas no lo usan
const alert = document.getElementById('alert-cont') ? document.getElementById('alert-cont') : null;

barIcon.addEventListener("click", () => {
    closeSubMenu(null);
    barIcon.classList.toggle("fa-bars");
    barIcon.classList.toggle("fa-bars-staggered");
    barIcon.classList.toggle("header__icon--rotate");
    navUl.classList.toggle("nav__ul--inactive");
    navUl.classList.toggle("nav__ul--active");

    // Se oculta el alert si se esta mostrando para no tapar
    if (alert) {
        alert.style.transform = `translateY(-34px)`;
    }
});

// Evento para abrir y cerrar el sub-menú de navegación de productos
productLink.addEventListener("click", () => {
    closeSubMenu(null);

    const productLinks = document.querySelectorAll(".dropdown__link");
    productLinks.forEach((link, index) => {
        if (index == 0) {
            link.classList.toggle('dropdown__link--first-border');
        } else if (index !== productLinks.length - 1) {
            link.classList.toggle('dropdown__link--border');
        } else {
            link.classList.toggle('dropdown__link--final-border');
        }
        link.classList.toggle("dropdown__link--active");
    });

    // Cambiamos la altura del menú de productos para mostrarlo u ocultarlo
    // Si la altura es 0 guardo en la variable la altura que necesita para mostrarse
    // Si no, guardo 0 en la variable para que no se muestre
    const height = productMenu.clientHeight === 0 ? `${productMenu.scrollHeight}px` : "0";
    // Le doy al elemento ul la altura guardada en la variable
    productMenu.style.height = height;
    productMenu.style.width = `${productLink.offsetWidth}px`;

    // Se oculta el alert si se esta mostrando para no tapar
    if (alert) {
        alert.style.transform = `translateY(-34px)`;
    }
});

// Evento para cerrar el menú si se hace clic en cualquier otro lugar de la página
document.addEventListener("click", (event) => {
    // Elemento que se hizo click
    const target = event.target;
    // Si el nav no es el target y tampoco es el icono
    if (!navUl.contains(target) && (target !== barIcon)) {
        closeSubMenu(target);
        navUl.classList.add("nav__ul--inactive");
        navUl.classList.remove("nav__ul--active");
        barIcon.classList.add("fa-bars");
        barIcon.classList.remove("fa-bars-staggered");
        barIcon.classList.remove("header__icon--rotate");
    }
});

// Función para quitar el sub-menu
// Si recibe el target se clickeo desde otro lugar de la pagina
function closeSubMenu(target) {
    const productLinks = document.querySelectorAll(".dropdown__link");
    productLinks.forEach((link) => {
        link.classList.remove(
            "dropdown__link--first-border",
            "dropdown__link--border",
            "dropdown__link--final-border"
        );

        if ((target != null) && (target != navUl)) {
            link.classList.remove("dropdown__link--active");
        }
    });

    productMenu.style.height = "0";

    // Se oculta el alert si se esta mostrando para no tapar
    // if (alert) {
    //     alert.style.transform = `translateY(-34px)`;
    // }
}

// Transicion de alerta 
window.onload = () => {
    const alert = document.getElementById('alert-cont');

    if (alert) {
        alert.style.transform = 'translateY(34px)';

        setTimeout(() => {
            alert.style.transform = 'translateY(-34px)';
        }, 4000);

        setTimeout(() => {
            alert.style.display = 'none';
        }, 4400);
    }
}