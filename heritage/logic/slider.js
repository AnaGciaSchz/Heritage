if (process.browser) {
const slider = document.querySelector("#slider");
let sliderSection = document.querySelectorAll(".slider-section");
let sliderSectionLast = sliderSection[sliderSection.length-1];

const btnRight = document.querySelector("#btn-right");
const btnLeft = document.querySelector("#btn-left");
btnRight.addEventListener('click',()=>next());
btnLeft.addEventListener('click',()=>after());

slider.insertAdjacentElement('afterbegin',sliderSectionLast);

function next(){
let sliderSectionFirst = document.querySelectorAll(".slider-section")[0];
slider.style.marginLeft = "-200%";
//slider.style.transition = "all 0.5s";
setTimeout(function(){
    //slider.style.transition = "none";
    slider.insertAdjacentElement('beforeend',sliderSectionFirst);
    slider.style,marginLeft="-100%";
}, 500);
}

function after(){
    let sliderSectionLast = document.querySelectorAll(".slider-section")[sliderSection.length-1];
    slider.style.marginLeft = "0";
    //slider.style.transition = "all 0.5s";
    setTimeout(function(){
        //slider.style.transition = "none";
        slider.insertAdjacentElement('afterbegin',sliderSectionLast);
        slider.style,marginLeft="-100%";
    },500);
}

//setInterval(() =>next(), 50000);
}