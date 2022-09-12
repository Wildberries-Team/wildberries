import '../index.html';
import '../css/style.css';
import {blockCard, lowblockCard, bigCard} from './cards.js';
import {searchProduct} from './search.js';
import {burgerSort} from './burger_menu.js';
import {dataFromArray, blockBasket, openBasketAndCard} from "./basket.js"

"use strict";

// обновление страницы по клику на лого
document.querySelector('.logo__img').addEventListener('click', () => window.location.reload());

//функция для запуска действий при загрузке страницы
const getCards = async () => {
    const URL = 'https://script.googleusercontent.com/macros/echo?user_content_key=-qbop0LDT4llMXLCk9Tq5k9BNwhjV7HqV2J0LFe6NOkTVHRHc5nsTi9GX5sCkMkDy_4QluvOPNqyOUkWMuV_Yrs5iFEMemSgm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnBUthoLTvLyooO4Gr0kkK0OicYlMkfxhYcoRufbODgSqvRlzi-BrffY3G2tauRDTcJtNrQ_GbamaPHlYt5S2ShejoWkwaDsuYNz9Jw9Md8uu&lib=MpocQWBEmsKNBALSiNCwBGji98K7VbvaB';
    const obj = await fetch(URL);
    const cardsArray = await obj.json();
    removeAnimationLoader();
    let goods = Number(30)
    blockCard(cardsArray.slice(0, goods));
    lowblockCard(cardsArray.slice(50, 65));

 //функция по клику добавлять больше карточек
    document.querySelector('.btn-show-more').addEventListener('click', () => {
        if(goods <= cardsArray.length) {
            goods += 30;
            blockCard(cardsArray.slice(0, goods));
        }  else {
            goods = cardsArray.length;
        }

    })

// функция поиска
    document.getElementById('searchInput').addEventListener("keyup", (e) => searchProduct(e, cardsArray));

// функция сортировки в бургер меню
    document.querySelector('.burger__list').addEventListener('click', (e) => burgerSort(e, cardsArray));

//перенос в корзину и открытие карточки все блоки
    document.querySelectorAll(".goods__item").forEach(box =>
        box.addEventListener("click", (e) => openBasketAndCard(e, cardsArray))
    )

//закрытие большой карточки при клике на пустую область (не на нее), по нажатию на крестик
    document.addEventListener('click', (e) => {
        clickOnField(e, cardsArray);
    });
};

//порядок загрузки при загрузки страницы
document.addEventListener('DOMContentLoaded', getCards);

//удаление анимации загрузки
function removeAnimationLoader() {
    document.querySelector('.loader').style.display = "none";
    document.querySelector('.next-loader').style.display = "none";
}

//массив товаров в карзине - хранить в Локале
let basketGoods = [];

//открытие карзины
document.getElementById('basket-btn').addEventListener("click", () => {
    document.querySelector(".background-color-container").style.display = "block";
});

//закрытие корзины вне контейнера
document.addEventListener('click', (e) => {
    if(e.target.classList == "background-color-container") {
        document.querySelector(".background-color-container").style.display = "none";
    };
});

//закрытие контенера на X
document.querySelector(".close-basket").addEventListener("click", () => {
    document.querySelector(".background-color-container").style.display = "none";
});

//добаление количества, сокращение кол-ва, удаление позиции
document.querySelector('.container-item-goods').onclick = function (e) {
    let targetClick = e.target;
    let parentId = targetClick.closest('.users-goods-basket').id;
    if (targetClick.id === "plus-btn") {
        basketGoods.forEach(item => {
            if (item.id === parentId) {
                item.col += 1;
            }
        });
    }
    if (targetClick.id === "minus-btn") {
        basketGoods.forEach((item, ind) => {
            if (item.id === parentId) {
                item.col -= 1;
                if (item.col <= 0) {
                    basketGoods.splice(ind, 1);
                } else {
                    item.col -= 1;
                }
            }
        });
    }
    if (targetClick.className == "delete-item-basket") {
        basketGoods.forEach((item, ind) => {
            if (item.id === parentId) {
                basketGoods.splice(ind, 1);
            }
        });
    }
    blockBasket();
}

//подтверждение заказов *пока что очищаем массив в корзине потом придумаем куда отпралять
document.getElementById('order-btn').addEventListener("click", () => {
    if (document.querySelector('input[type=checkbox]').checked) {
        basketGoods.length = 0;
    } else {
        alert("Ознакомьтесь с правилами")
    }
    blockBasket();
});

//btn up page
window.addEventListener('scroll', function (e) {
    if (window.pageYOffset > 600) {
        document.querySelector('.btn-quick-nav').style.display = "block";
    }
    if (pageYOffset < 600) {
        document.querySelector('.btn-quick-nav').style.display = "none";
    }
});

//при нажатии поднятие вверх
document.querySelector('.btn-quick-nav').addEventListener('click', () => {
    window.scrollTo(pageYOffset, 0);
});

//проверки при кликах на области
function clickOnField(e, array){
    if (e.target.id === "close-big-block") {
        document.querySelector(".big-card-block").innerHTML = "";
    }
    if (e.target.classList == "goods__big-container") {
        document.querySelector(".big-card-block").innerHTML = "";
    }
    if (e.target.classList == " good-card__add-big") {
        let parentId = event.target.closest('.goods__big-card').id;
        dataFromArray(parentId, array);
    }
};


 export {basketGoods}