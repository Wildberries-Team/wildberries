const buttonBurger = document.querySelector('.nav-elem');
const burgerMenu = document.querySelector('.burger');
const body = document.querySelector('body');
const overlayBurger = document.createElement('div')

function closeMenu() {
    burgerMenu.classList.add('burger_trans');
    body.classList.remove('body-overflow')
    overlayBurger.remove()
}

buttonBurger.addEventListener('click', function () {

    burgerMenu.classList.remove('burger_trans')
    body.classList.add('body-overflow')
    burgerMenu.after(overlayBurger)
    overlayBurger.classList.add('overlay_burger')

})

const buttonBurgerClose = document.querySelector('.burger__close');
buttonBurgerClose.addEventListener('click', closeMenu)

body.addEventListener('click', function (evt) {
    if (evt.target.className === 'overlay_burger') {
        closeMenu()
    }
})

const burgerUl = document.querySelector('.burger__list');
const li = burgerUl.querySelectorAll('li')
burgerUl.addEventListener('click', function (evt){

    for(let i of li){
        if (evt.target === i) {
            closeMenu()
        }
    }
})