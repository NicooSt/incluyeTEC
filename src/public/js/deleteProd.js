"use strict";

const deleteBtns = document.querySelectorAll('.product__inp');
deleteBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        let id = e.target.getAttribute('name');
        let name = e.target.nextElementSibling.getAttribute('name');

        let body = document.querySelector('body');
        let footer = document.querySelector('footer');
        let deleteCont = document.createElement('div');
        let form = document.createElement('form');
        let title = document.createElement('p');
        let text = document.createElement('p');
        let deleteBtnCont = document.createElement('div');
        let confirmBtn = document.createElement('button');
        let cancelBtn = document.createElement('a');

        body.classList.add('body--scroll');
        deleteCont.setAttribute('id', 'confirm-delete__cont');
        deleteCont.classList.add('confirm-delete__cont');
        form.setAttribute('action', `/products/delete/${id}?_method=DELETE`);
        form.setAttribute('method', 'POST');
        form.classList.add('confirm-delete__form');
        title.classList.add('confirm-delete__title');
        title.innerHTML = '¿Seguro que desea eliminar?';
        text.classList.add('confirm-delete__text');
        text.innerHTML = `${name}`;
        deleteBtnCont.classList.add('confirm-delete__btn-cont');
        confirmBtn.setAttribute('type', 'submit');
        confirmBtn.classList.add('confirm-delete__btn--green');
        confirmBtn.innerHTML = 'Confirmar';
        cancelBtn.setAttribute('id', 'cancel__btn');
        cancelBtn.classList.add('confirm-delete__btn--red');
        cancelBtn.innerHTML = 'Cancelar';
        cancelBtn.addEventListener('click', cancelDelete);

        deleteBtnCont.appendChild(confirmBtn);
        deleteBtnCont.appendChild(cancelBtn);
        form.appendChild(title);
        form.appendChild(text);
        form.appendChild(deleteBtnCont);
        deleteCont.appendChild(form);
        body.insertBefore(deleteCont, footer);
    })
})

function cancelDelete(e) {
    let body = document.querySelector('body');
    let form = e.target.parentNode.parentNode;
    let formCont = form.parentNode;

    formCont.remove();
    body.classList.remove('body--scroll');
}