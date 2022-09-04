const buttonBurger = document.querySelector('.nav-elem');
const burgerMenu = document.querySelector('.burger');
const body = document.querySelector('body');

buttonBurger.addEventListener('click', function (evt) {
    burgerMenu.classList.remove('burger_trans')
    body.classList.add('body-overflow')

    const overlayBurger = document.createElement('div')
    burgerMenu.after(overlayBurger)
    overlayBurger.classList.add('overlay_burger')

    function closeMenu() {
        burgerMenu.classList.add('burger_trans');
        body.classList.remove('body-overflow')
        overlayBurger.remove()
    }

    const buttonBurgerClose = document.querySelector('.burger__close');
    buttonBurgerClose.addEventListener('click',  closeMenu)

    body.addEventListener('click', function (evt) {
        if (evt.target.className === 'overlay_burger') {
            closeMenu()
        }
    })
})
