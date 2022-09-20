document.getElementById('btn-open-chat').addEventListener('click', () => {
    document.querySelector('.chat-block').style.display = "block";
});

document.querySelector('.header__btn-chat').addEventListener('click', () => {
    document.querySelector('.chat-block').style.display = "block";
});

document.querySelector('.btn-close-chat').addEventListener('click', () => {
    document.querySelector('.chat-block').style.display = "none";
});

//массив для хранения в ЛокалСессион

let textUser = [];


//функция конструктор
function Textarry(text) {
    this.text = text;
    this.time = new Date().toLocaleTimeString()
}

//отрисовка блоков
function blockChat(){
    document.querySelector(".block_text_content").innerHTML = "";
    if (textUser.length > 0) {
        textUser.forEach((item) => {
            let blockMes = `
                            <div class="chat-user-text-question">
                                <div class="container-text-question">
                                    <p class="chat-user-question">${item.text}</p>
                                    <span class="time-chat">${item.time}</span>
                                </div>
                            </div>
            `;
            document.querySelector(".block_text_content").innerHTML += blockMes;
        });
    }
}

//добавление на стрелочку
document.querySelector('.btn-chat-send').addEventListener('click', () => {
    if(document.getElementById('text_user-chat').value)
    {
        textUser.push(new Textarry(document.getElementById('text_user-chat').value));
        blockChat();
        document.getElementById('text_user-chat').value = "";
    }
});

//добавление на интер
document.getElementById('text_user-chat').addEventListener( 'keyup', event => {
        if (event.code === 'Enter') {
                textUser.push(new Textarry(document.getElementById('text_user-chat').value));
                blockChat();
                document.getElementById('text_user-chat').value = "";
    };
});