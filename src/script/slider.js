
/* Индекс слайда по умолчанию */
let slideIndex = 1;
showSlides(slideIndex);

//установка автопрокрутки
let sliderInterval = setInterval(() => {
    slideIndex += 1
    showSlides(slideIndex)
}, 3000);

/* Функция увеличивает индекс на 1, показывает следующй слайд*/
document.querySelector('.next').addEventListener('click', () => {
    showSlides(slideIndex += 1);
    clearInterval(sliderInterval);
});

/* Функция уменьшяет индекс на 1, показывает предыдущий слайд*/
document.querySelector('.prev').addEventListener('click', () => {
    showSlides(slideIndex -= 1);
    clearInterval(sliderInterval);
});

/* Устанавливает текущий слайд */
document.querySelectorAll('.slider-dots_item').forEach((e,i)=>{
    e.addEventListener('click', () => showSlides(slideIndex = i+1));
});

/* Основная функция слайдера */
function showSlides(n) {
    let slides = document.getElementsByClassName("item");
    let dots = document.getElementsByClassName("slider-dots_item");
    if (n > slides.length) {
        slideIndex = 1;
    }
    if (n < 1) {
        slideIndex = slides.length;
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
};

