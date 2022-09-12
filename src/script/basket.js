import {basketGoods} from "./index.js";
import {bigCard} from "./cards";

//сумирование итогов со скидкой
function sumPriceInBasket() {
    let sum = Number(0);
    let sumNoDiscont = Number(0);
    let colSum = Number(0);
    basketGoods.forEach(item => {
        sum += (item.col * (Number(item.price) * (1 - Number(item.percent) / 100)));
        sumNoDiscont += (item.col * Number(item.price));
        colSum += Number(item.col);
    });
    document.getElementById('sum-basket').innerHTML = sum.toFixed(0);
    document.getElementById('sum-basket-nodicount').innerHTML = sumNoDiscont.toFixed(0);
    document.getElementById('sum-basket-discount').innerHTML = (sumNoDiscont - sum).toFixed(0);
    document.getElementById('sum-basket-col').innerHTML = colSum;
};

//функция проверки для добавления в корзину и отрисовки большой карточки
function openBasketAndCard(e, array) {
    let targetClick = e.target;
        let parentId = targetClick.closest('.goods__item').id;
        if (targetClick.id === "sendInBasket") {
            dataFromArray(parentId, array);
        }
        if (targetClick.id === "open-card") {
            bigCard(parentId, array);
        }


};

//функция переноса в корзину
function dataFromArray(idCard, array) {
        array.forEach(item => {
            if (item.id === idCard) {
                basketGoods.push(new GoodsInBasket(item));
                lengthBasket();
                blockBasket();
                sumPriceInBasket();
            }
        });
    };

//функция конструктор
function GoodsInBasket(goods) {
    this.img = goods.img; //ссылка на фото
    this.id = goods.id; //айди
    this.title = goods.title; //название карточки
    this.col = 1; //количество едениц
    this.price = Number(goods.price); //цена со скидкой
    this.percent = goods.percent; // цена без скидки
};

//формирование блока в корзине
function blockBasket() {
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
    };
    sumPriceInBasket();
    lengthBasket();
};

//счетик длинны корзины
function lengthBasket() {
    if (basketGoods.length > 0) {
        document.getElementById('basket-col').innerHTML = basketGoods.length;
    };
};

export {dataFromArray, blockBasket, openBasketAndCard}