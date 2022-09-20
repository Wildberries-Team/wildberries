import {blockCard} from "./cards";

const buttonBurger = document.querySelector('.nav-elem');
const burgerMenu = document.querySelector('.burger');
const body = document.querySelector('body');
const overlayBurger = document.querySelector('.black_burger');

// функция закрытия бургера

function closeMenu() {
    burgerMenu.classList.add('burger_trans');
    body.classList.remove('body-overflow');
    overlayBurger.classList.remove('overlay_burger');
}

// открытие бургера

buttonBurger.addEventListener('click', function () {

    burgerMenu.classList.remove('burger_trans');
    body.classList.add('body-overflow');
    overlayBurger.classList.add('overlay_burger');
})

// события закрытия бургера

overlayBurger.addEventListener('click', closeMenu);
document.querySelector('.burger__close').addEventListener('click', closeMenu);
document.querySelector('.burger__list').addEventListener('click', function (evt) {

    if (evt.target.closest('li')) closeMenu();
})

// фильтр карточек по категории, убирает слайдер, добавляет кнопку "Убрать фильтр"

function burgerSort(evt, cardsArray) {
    const liClick = evt.target.closest('li');

    if (liClick) {
        let filterCards = cardsArray.filter((card) => card.category === liClick.textContent).slice(0, 36);
        blockCard(filterCards);
        document.querySelector('.main__banner').classList.add('display_none');
        document.querySelector('.container__remove_filter').classList.remove('display_none');
        document.querySelector('.btn-show-more').classList.add('display_none');

    }

}

// добавляет слайдер, убирает кнопку "Убрать фильтр"

function removeFilerBurger(){
    document.querySelector('.main__banner').classList.remove('display_none');
    document.querySelector('.container__remove_filter').classList.add('display_none');
    document.querySelector('.btn-show-more').classList.remove('display_none');
}

export {burgerSort, removeFilerBurger}