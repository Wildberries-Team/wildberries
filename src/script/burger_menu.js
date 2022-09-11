import {blockCard, lowblockCard} from "./cards";

const buttonBurger = document.querySelector('.nav-elem');
const burgerMenu = document.querySelector('.burger');
const body = document.querySelector('body');
const overlayBurger = document.createElement('div');

function closeMenu() {
    burgerMenu.classList.add('burger_trans');
    body.classList.remove('body-overflow');
    overlayBurger.remove();
}

buttonBurger.addEventListener('click', function () {

    burgerMenu.classList.remove('burger_trans');
    body.classList.add('body-overflow');
    burgerMenu.after(overlayBurger);
    overlayBurger.classList.add('overlay_burger');
})

document.querySelector('.burger__close').addEventListener('click', closeMenu);

body.addEventListener('click', function (evt) {

    if (evt.target.className === 'overlay_burger') closeMenu();
})

document.querySelector('.burger__list').addEventListener('click', function (evt){

        if (evt.target.closest('li')) closeMenu();
})

function burgerSort(evt, cardsArray) {
    const liClick = evt.target.closest('li');

    if (liClick) {
        let filterCards = cardsArray.filter((card) => card.category === liClick.textContent);
        blockCard(filterCards);
    }
}

export {burgerSort}