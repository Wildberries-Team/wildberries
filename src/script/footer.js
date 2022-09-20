const acc = document.getElementsByClassName("accordion");


for (let i = 0; i < acc.length; i++) {

    acc[i].addEventListener("click", function() {

        this.classList.toggle("acc-activate");

        let footerList = this.nextElementSibling;

        if (footerList.style.display === "block") {

            footerList.style.display = "none";
        } else {
            footerList.style.display = "block";
        }
    });
}