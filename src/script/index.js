import '../index.html';
import '../css/style.css';

"use strict";

let URL = 'https://script.googleusercontent.com/macros/echo?user_content_key=-qbop0LDT4llMXLCk9Tq5k9BNwhjV7HqV2J0LFe6NOkTVHRHc5nsTi9GX5sCkMkDy_4QluvOPNqyOUkWMuV_Yrs5iFEMemSgm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnBUthoLTvLyooO4Gr0kkK0OicYlMkfxhYcoRufbODgSqvRlzi-BrffY3G2tauRDTcJtNrQ_GbamaPHlYt5S2ShejoWkwaDsuYNz9Jw9Md8uu&lib=MpocQWBEmsKNBALSiNCwBGji98K7VbvaB'

//получение Данных с сервера
const getCards = async () => {
    const obj = await fetch(URL);
    const cardsArray = await obj.json();
    blockCard(cardsArray);
};

getCards();

//отрисовка маленьких карточек
function blockCard(cardsArray) {
    document.querySelector(".goods__list").innerHTML = "";
    let easyArr = cardsArray.splice(0, 7)
    if (cardsArray.length > 0) {
        easyArr.forEach((item, ind) => {
            let cardTemplate = `
                    <li class="goods__item card" id="${item.id}">
                    <div class="goods__small-card" id="${item.id}>
                        <a href="#" class="card__inner goods">
                            <div class="goods__img-wrap">
                                <img class="goods__img" src="${item.img}" alt="">
                                <button class="goods__preview-btn view-btn">Быстрый просмотр</button>
                                <button class = "good-card__add">В корзину</button>
                                <p class="goods__discount">-<span>${item.percent}</span>%</p>
                            </div>
                            <div class="goods__info">
                                <p class="goods__price">
                                    <span class="goods__price-now price-now">${item.price} р</span>
                                    <del class="goods__price-last price-last"></del>
                                </p>
                                <p class="goods__desc">
                                    <span class="goods__desc_brand">${item.category}</span>
                                    <span class="goods__desc_name">/ ${item.title}</span>
                                </p>
                            </div>
                        </a>
                    </div>
                </li>
            `;
        document.querySelector(".goods__list").innerHTML += cardTemplate;
        })
    }
};

//Basket block
//массив товаров в карзине - хранить в Локале
let basketGoods = [];

//открытие карзины
document.getElementById('basket-btn').addEventListener("click", () => {
    document.querySelector(".background-color-container").style.display = "block";
});

//счетик длинны корзины
function lenthBasket() {
    if (basketGoods.length > 0) {
        document.getElementById('basket-col').innerHTML = basketGoods.length;
    }
}

//закрытие корзины вне контейнера
document.onclick = (event) => {
    if (event.target.classList == "background-color-container") {
        document.querySelector(".background-color-container").style.display = "none";
    }
};

//закрытие контенера на X
document.querySelector(".close-basket").addEventListener("click", () => {
    document.querySelector(".background-color-container").style.display = "none";
});

//формирование блока в корзине
function blockbasket() {
    document.querySelector(".container-item-goods").innerHTML = "";
    if (basketGoods.length > 0) {
        basketGoods.forEach((item) => {
            let blockGoods = `
                            <div class="users-goods-basket" id="${item.id}">
                                <div class="users-goods-basket_foto">
                                    <img src=${item.url} alt="" class="users-goods-basket_img">
                                </div>
                                <div class="users-goods-basket_title">
                                    <span>${item.title}</span>
                                </div>
                                <div class="users-goods-basket_col">
                                    <div class="components-col">
                                        <button id="minus-btn">-</button>
                                        <span id="col-goods">${item.col}</span>
                                        <button id="plus-btn">+</button>
                                    </div>
                                    <span class="delete-item-basket">Удалить</span>
                                </div>
                                <div class="users-goods-basket_sum">
                                    <span class="sum-withdiscount"><span id="withdiscount-sum-basket">${item.col * (Number(item.price) * (1 - Number(item.percent) / 100))}</span> руб</span>
                                    <span class="sum-nodiscount"><span id="nodiscount-sum-basket">${item.price * item.col}</span> руб</span>
                                </div>
                            </div>
            `;
            document.querySelector(".container-item-goods").innerHTML += blockGoods;
        });

    }
    lenthBasket();
    sumPriceInBasket();
    }

//тестовая основная функция -- когда будут карточки брать из основного Массива Объектов
let goods = [{
    url: "./1.jpg",
    id: 1,
    title: "Робот-пылесос PVCR 0726W (POLARIS), Polaris",
    price: 500,
    percent: 15,
}];

//функция конструктор
function GoodsInBasket(goods) {
    this.url = goods.url; //ссылка на фото
    this.id = goods.id + basketGoods.length; //айди
    this.title = goods.title; //название карточки
    this.col = 1; //количество едениц
    this.price = Number(goods.price); //цена со скидкой
    this.percent = goods.percent; // цена без скидки
}

//перенос в корзину
document.getElementById('sendInbasket').addEventListener("click", () => {
    basketGoods.push(new GoodsInBasket(goods[0]));
    lenthBasket();
    blockbasket();
    sumPriceInBasket();
});

//добаление количества, сокращение кол-ва, удаление позиции
document.querySelector('.container-item-goods').onclick = function (e) {
    let targetClick = e.target;
    let parentid = targetClick.closest('.users-goods-basket').id;
    if (targetClick.id == "plus-btn") {
        basketGoods.forEach(item => {
            if (item.id == parentid) {
                item.col += 1;
            }
        });
    }
    if (targetClick.id == "minus-btn") {
        basketGoods.forEach((item, ind) => {
            if (item.id == parentid) {
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
            if (item.id == parentid) {
                basketGoods.splice(ind, 1);
            }
        });
    }
    blockbasket();
}

//сумирование итогов со скидкой
function sumPriceInBasket() {
    let sum = 0;
    let sumNoDiscont = 0;
    let colSum = 0;
    basketGoods.forEach(item => {
        sum += (item.col * (Number(item.price) * (1 - Number(item.percent) / 100)));
        sumNoDiscont += (item.col * Number(item.price));
        colSum += Number(item.col);
    })
    document.getElementById('sum-basket').innerHTML = sum;
    document.getElementById('sum-basket-nodicount').innerHTML = sumNoDiscont;
    document.getElementById('sum-basket-discount').innerHTML = sumNoDiscont - sum;
    document.getElementById('sum-basket-col').innerHTML = colSum;
}

//подтверждение заказов *пока что очищаем массив в корзине потом придумаем куда отпралять
document.getElementById('order-btn').addEventListener("click", () => {
    if (document.querySelector('input[type=checkbox]').checked) {
        basketGoods.length = 0;
    } else {
        alert("Ознакомьтесь с правилами")
    }
    blockbasket();
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

//открытие большой карточки по нажатию на быстрый просмотр
document.querySelector('.goods__preview-btn').addEventListener('click', function () {
    blockCardBig ();
    document.querySelector(".goods__big-container").style.display = "block";
    });

//закрытие большой карточки по нажатию на крестик
document.querySelector(".good-card__close").addEventListener("click", () => {
    document.querySelector(".goods__big-container").style.display = "none";
    document.querySelector(".goods__big-card").style.display = "none";
});

//закрытие большой карточки при клике на пустую область (не на нее)
document.onclick = (event) => {
    if (event.target.classList == "goods__big-container") {
        document.querySelector(".goods__big-container").style.display = "none";
        document.querySelector(".goods__big-card").style.display = "none";
    }
};

//функция для отображения маленькой карточки на странице


//функция для отображения большой карточки на странице
// function blockCardBig() {
//
//     if (cardsArray.length > 0) {
//         cardsArray.forEach((item, ind) => {
//             let cardTemplateBig = `
// <li class="goods__item-big card" id="${item.id}">
//     <div class="goods__big-container" id="${item.id}>
//         <div class=" goods__big-card" id="${item.id}>
//             <div class=" goods__big">
//                 <div class=" goods__img-wrap-big">
//                     <img class=" goods__img-big" src=" ${item.url}" alt="">
//                 </div>
//                 <div class=" goods__info-big">
//                     <button class=" good-card__close">X</button>
//                     <p class=" goods__desc-big">
//                         <span class=" goods__desc_brand-big">${item.categories}</span>
//                         <span class=" goods__desc_name-big">/ ${item.title}</span>
//                     </p>
//                     <p class=" goods__price-big">
//                         <span class=" goods__price-now-big price-now">${item.price}</span>
//                         <del class=" goods__price-last-big price-last"></del>
//                     </p>
//                     <button class=" good-card__add-big">Добавить в корзину</button>
//                 </div>
//             </div>
//         </div>
//     </div>
//     </li>
// `;
//             document.querySelector(".goods__list").innerHTML += cardTemplateBig;
//         })
//     }}
