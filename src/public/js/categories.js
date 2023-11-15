"use strict";

checkUlScroll();
function checkUlScroll() {
    let categoryUl = document.getElementById('category-ul');
    let listElements = categoryUl.childElementCount;

    if (listElements <= 5) {
        categoryUl.style.overflowY = 'initial';
    }
}
