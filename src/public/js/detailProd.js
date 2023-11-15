"use strict";

// Mostrar mensaje de info precio especial
const priceIcon = document.getElementById('special-price-icon');
const priceInfo = document.getElementById('special-price-info');

priceIcon.addEventListener('mouseover', () => {
    priceInfo.style.display = 'block';
});

priceIcon.addEventListener('mouseout', () => {
    priceInfo.style.display = 'none';
});

// Mostrar alerta de confirmacion de borrado
const cont = document.getElementById('confirm-delete__cont');
const body = document.querySelector('body');

document.getElementById('detailProd__delete-btn').addEventListener('click', () => {
    cont.style.display = 'block';
    body.style.overflowY = 'hidden';
});

document.getElementById('cancel__btn').addEventListener('click', () => {
    cont.style.display = 'none';
    body.style.overflowY = 'auto';
});