{
    const sliders = document.querySelectorAll(".intro__slider");
    const interval = 5000;
    const animDuration = 6000;

    for (let i = 0; i < sliders.length; ++i) {
        const slider = sliders[i];
        const dots = slider.querySelector(".dots");
        const sliderImgs = slider.querySelectorAll(".intro__data");
        let currImg = 0;
        let prevImg = sliderImgs.length - 1;
        let intrvl;
        let timeout;

        // Creates dots and add listeners
        for (let i = 0; i < sliderImgs.length; ++i) {
            const dot = document.createElement("div");
            dot.classList.add("dot");
            dots.appendChild(dot);
            dot.addEventListener("click", dotClick.bind(null, i), false);
        }
        const allDots = dots.querySelectorAll(".dot");
        allDots[0].classList.add("active-dot");

        sliderImgs[0].style.left = "0";
        timeout = setTimeout(() => {
            animateSlider();
            sliderImgs[0].style.left = "";
            intrvl = setInterval(animateSlider, interval);
        }, animDuration);

        function animateSlider(nextImg, right) {
            if (!nextImg)
                nextImg = currImg + 1 < sliderImgs.length ? currImg + 2 : 1;

            --nextImg;
            sliderImgs[prevImg].style.animationName = "";

            if (!right) {
                sliderImgs[nextImg].style.animationName = "leftNext";
                sliderImgs[currImg].style.animationName = "leftCurr";
            }
            else {
                sliderImgs[nextImg].style.animationName = "rightNext";
                sliderImgs[currImg].style.animationName = "rightCurr";
            }
            prevImg = currImg;
            currImg = nextImg;

            currDot = allDots[currImg];
            currDot.classList.add("active-dot");
            prevDot = allDots[prevImg];
            prevDot.classList.remove("active-dot");
        }

        function dotClick(num) {
            if (num === currImg)
                return false;

            clearTimeout(timeout);
            clearInterval(intrvl);

            if (num > currImg)
                animateSlider(num + 1);
            else
                animateSlider(num + 1, true);

            intrvl = setInterval(animateSlider, interval);
        }
    }
}