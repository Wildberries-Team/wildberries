//функция для отображения маленькой карточки на странице вверхней части блока
import {openBasketAndCard} from "./basket";

function blockCard(cardsArray) {
    document.querySelector(".goods__list").innerHTML = "";
        cardsArray.forEach((item, ind) => {
            let cardTemplate = miniCardHTML(item);
            document.querySelector(".goods__list").innerHTML += cardTemplate;
        });
    //перенос в корзину и открытие карточки все блоки
    document.querySelectorAll(".goods__item").forEach(box => {
        box.addEventListener("click", (e) => openBasketAndCard(e, cardsArray))
    })
};

//функция для отображения маленькой карточки на странице нижней части блока
function lowblockCard(cardsArray) {
    document.querySelector(".cards-bulk__list").innerHTML = "";
        cardsArray.forEach((item, ind) => {
            let cardTemplate = miniCardHTML(item);
            document.querySelector(".cards-bulk__list").innerHTML += cardTemplate;
        });
    //перенос в корзину и открытие карточки все блоки
    document.querySelectorAll(".goods__item").forEach(box => {
        box.addEventListener("click", (e) => openBasketAndCard(e, cardsArray))
    })
};

//верстка маленькой карточки
function miniCardHTML(item) {
    return `
        <li class="goods__item card" id="${item.id}">
            <div class="card__inner goods">
                <div class="goods__img-wrap">
                    <img class="goods__img" src="${item.img}" alt="">
                    <button class="goods__preview-btn view-btn" id="open-card">Быстрый просмотр</button>
                    <button class = "good-card__add" id="sendInBasket">В корзину</button>
                    <p class="goods__discount">-<span>${item.percent}</span>%</p>
                </div>
                <div class="goods__info">
                    <p class="goods__price">
                        <span class="goods__price-now price-now">${(item.price).toLocaleString()} р.</span>
                        <del class="goods__price-last price-last">${(Number((item.price * 100) / (100-item.percent)).toFixed(0)).replace(/(\d)(?=(\d{3})+$)/g, '$1 ')} р.</del>
                    </p>
                    <p class="goods__desc">
                        <span class="goods__desc_brand">${item.category}</span>
                        <span class="goods__desc_name">/ ${item.title}</span>
                    </p>
                </div>
            </div>
        </li>
            `
};

//функция для отображения большой карточки на странице
function blockCardBig(item) {
    let cardTemplateBig = `
        <div class="goods__big-container">
            <div class="goods__big-card" id="${item.id}">
                <div class="goods__big">
                    <div class=" goods__img-wrap-big">
                        <img class=" goods__img-big" src=" ${item.img}" alt="">
                    </div>
                    <div class=" goods__info-big">
                        <button class="good-card__close" id="close-big-block">X</button>
                            <p class=" goods__desc-big">
                                <span class=" goods__desc_brand-big">${item.category}</span>
                                <span class=" goods__desc_name-big">/ ${item.title}</span>
                            </p>
                            <p class=" goods__price-big">
                                <span class=" goods__price-now-big price-now"><span id="withdiscount-sum-basket">${(Number(item.price) * (1 - Number(item.percent) / 100)).toFixed(0)}</span> р.</span>
                                <del class=" goods__price-last-big price-last"><span id="nodiscount-sum-basket">${(item.price)}</span> р.</del>
                            </p>
                            <button class=" good-card__add-big">Добавить в корзину</button>
                            <p class="description-big"><span class="description-big-title">Описание:</span><br><br>${item.description}</p>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.querySelector('.big-card-block').innerHTML += cardTemplateBig;
};

//функция открытия большой картчоки
function bigCard(idCard, array) {
    array.forEach(item => {
            if (item.id === idCard) {
                blockCardBig(item);
            };
        });
};

export {blockCard, lowblockCard, bigCard, blockCardBig}