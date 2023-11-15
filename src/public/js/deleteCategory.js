// Mostrar alerta de confirmacion de borrado
const cont = document.getElementById('confirm-delete__cont');
const body = document.querySelector('body');

document.getElementById('deleteCategory__btn').addEventListener('click', () => {
    const form = document.getElementById('confirm-delete__form');
    const select = document.getElementById('deleteCategory__select');
    const confirmDeleteTxt = document.getElementById('confirm-delete__text');

    cont.style.display = 'block';
    body.style.overflowY = 'hidden';
    form.setAttribute('action', `/categories/delete/${select.value}?_method=DELETE`);
    confirmDeleteTxt.textContent = `Categoria "${select.selectedOptions[0].textContent}"`;
});

document.getElementById('cancel__btn').addEventListener('click', () => {
    cont.style.display = 'none';
    body.style.overflowY = 'auto';
});