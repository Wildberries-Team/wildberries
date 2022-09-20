//открытие меню авторизации
document.getElementById('log-in__btn').addEventListener("click", () => {
    document.querySelector(".log-in__container").style.display = "block";
});

//закрытие меню авторизации на X
document.querySelector(".log-in__close").addEventListener("click", () => {
    document.querySelector(".log-in__container").style.display = "none";
});

//закрытие меню авторизации вне контейнера
document.addEventListener('click', (e) => {
    if(e.target.classList == "log-in__container") {
        document.querySelector(".log-in__container").style.display = "none";
    };
});

//закрытие окна авторизации при нажатии на кнопку войти и удаление введенных данных
document.querySelector(".log-in__button").addEventListener("click", () => {
    document.querySelector(".log-in__container").style.display = "none";
    document.querySelector(".log-in__email").value = "";
    document.querySelector(".log-in__password").value = "";

});
