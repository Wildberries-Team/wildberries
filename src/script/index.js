import '../index.html';
import '../css/style.css';
import {blockCard, blockCardBig, lowblockCard} from './cards.js';
"use strict";

let URL = 'https://script.googleusercontent.com/macros/echo?user_content_key=-qbop0LDT4llMXLCk9Tq5k9BNwhjV7HqV2J0LFe6NOkTVHRHc5nsTi9GX5sCkMkDy_4QluvOPNqyOUkWMuV_Yrs5iFEMemSgm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnBUthoLTvLyooO4Gr0kkK0OicYlMkfxhYcoRufbODgSqvRlzi-BrffY3G2tauRDTcJtNrQ_GbamaPHlYt5S2ShejoWkwaDsuYNz9Jw9Md8uu&lib=MpocQWBEmsKNBALSiNCwBGji98K7VbvaB'

//получение Данных с сервера
const getCards = async () => {
    const obj = await fetch(URL);
    const cardsArray = await obj.json();
    blockCard(cardsArray);
    lowblockCard(cardsArray);
    const burgerUl = document.querySelector('.burger__list');

    function burgerSort(evt) {
        const liClick = evt.target.closest('li');

        if (liClick) {
            let filterCards = cardsArray.filter((card) => card.category === liClick.textContent);
            blockCard(filterCards)
        }
    }

    burgerUl.addEventListener('click', burgerSort)
};
getCards();

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
                                    <img src=${item.img} alt="" class="users-goods-basket_img">
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
                                    <span class="sum-withdiscount"><span id="withdiscount-sum-basket">${(item.col * (Number(item.price) * (1 - Number(item.percent) / 100))).toFixed(0)}</span> руб</span>
                                    <span class="sum-nodiscount"><span id="nodiscount-sum-basket">${(item.price * item.col).toFixed(0)}</span> руб</span>
                                </div>
                            </div>
            `;
            document.querySelector(".container-item-goods").innerHTML += blockGoods;
        });
    }
    lenthBasket();
    sumPriceInBasket();
    }


//функция конструктор
function GoodsInBasket(goods) {
    this.img = goods.img; //ссылка на фото
    this.id = goods.id + basketGoods.length; //айди
    this.title = goods.title; //название карточки
    this.col = 1; //количество едениц
    this.price = Number(goods.price); //цена со скидкой
    this.percent = goods.percent; // цена без скидки
}


//перенос в корзину и открытие карточки верхний блок
document.querySelector('.cards-bulk__list').onclick = function (e) {
    let targetClick = e.target;
    let parentid = targetClick.closest('.goods__item').id;
    console.log(parentid);
    if(targetClick.id === "sendInbasket"){
        data(URL);
        async function data (url){
            let response = await fetch(url);
            let data = await response.json()
            dataFromArry(data);
        }
        function dataFromArry(data){
            data.forEach(item => {
                    if (item.id === parentid) {
                        basketGoods.push(new GoodsInBasket(item));
                        lenthBasket();
                        blockbasket();
                        sumPriceInBasket();
                    }
                }
            )
        }
    }
    if(targetClick.id === "open-card"){
        moreData(URL)
        async function moreData(url){
            let response = await fetch(url);
            let data = await response.json()
            bigCard(data);
        }
        function bigCard(data){
            data.forEach(item => {
                    if (item.id === parentid) {
                        blockCardBig(item);
                    }
                }
            )
        }

    }
}




//перенос в корзину и открытие карточки нижний блок
document.querySelector('.goods__list').onclick = function (e) {
    let targetClick = e.target;
    let parentid = targetClick.closest('.goods__item').id;
    console.log(parentid);
    if(targetClick.id === "sendInbasket"){
        data(URL);
        async function data (url){
            let response = await fetch(url);
            let data = await response.json()
            dataFromArry(data);
        }
        function dataFromArry(data){
            data.forEach(item => {
                    if (item.id === parentid) {
                        basketGoods.push(new GoodsInBasket(item));
                        lenthBasket();
                        blockbasket();
                        sumPriceInBasket();
                    }
                }
            )
        }
    }
    if(targetClick.id === "open-card"){
        moreData(URL)
        async function moreData(url){
            let response = await fetch(url);
            let data = await response.json()
            bigCard(data);
        }
        function bigCard(data){
            data.forEach(item => {
                    if (item.id === parentid) {
                        blockCardBig(item);
                    }
                }
            )
        }

    }
}


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
    let sum = Number(0);
    let sumNoDiscont = Number(0);
    let colSum = Number(0);
    basketGoods.forEach(item => {
        sum += (item.col * (Number(item.price) * (1 - Number(item.percent) / 100)));
        sumNoDiscont += (item.col * Number(item.price));
        colSum += Number(item.col);
    })
    document.getElementById('sum-basket').innerHTML = sum.toFixed(0);
    document.getElementById('sum-basket-nodicount').innerHTML = sumNoDiscont.toFixed(0);
    document.getElementById('sum-basket-discount').innerHTML = (sumNoDiscont - sum).toFixed(0);
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

//закрытие большой карточки при клике на пустую область (не на нее), по нажатию на крестик
 document.onclick = (event) => {
     if (event.target.id === "close-big-block") {

         document.querySelector(".big-card-block").innerHTML = ""
     }
     if (event.target.classList == "goods__big-container") {
         document.querySelector(".big-card-block").innerHTML = ""
     }
     if (event.target.classList == " good-card__add-big") {
         let parentid = event.target.closest('.goods__big-card').id;
         dataMore(URL);
          async function dataMore(url){
              let response = await fetch(url);
              let data = await response.json()
              dataBasketFromBig(data);
          }
          function dataBasketFromBig(data){
              data.forEach(item => {
                      if (item.id === parentid) {
                          basketGoods.push(new GoodsInBasket(item));
                          lenthBasket();
                          blockbasket();
                          sumPriceInBasket();
                      }
                  }
              )
          }

     }
 };
