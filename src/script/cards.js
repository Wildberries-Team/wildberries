//функция для отображения маленькой карточки на странице

function blockCard(cardsArray) {
    document.querySelector(".goods__list").innerHTML = "";
    let easyArr = cardsArray.splice(0, 50)
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
}

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


export {blockCard}