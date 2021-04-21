// Checking webp support
// Взято здесь: https://gist.github.com/Protoff/d6643387f03d47b44b2d7c3cf7b3e0a0

document.addEventListener('DOMContentLoaded', function() {
  testWebP(document.body)
})

function testWebP(elem) {
  const webP = new Image();
  webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  webP.onload = webP.onerror = function () {
    webP.height === 2 ? elem.classList.add('webp') : elem.classList.add('no-webp')
  }
};

// Menu burger
const  menuBtn = document.querySelector(".js-menu-btn");
const menuActiveClass = ("menu-open");

menuBtn.addEventListener("click", function() {
  document.body.classList.toggle(menuActiveClass)
});
;

// Team-list swiper

// Accordeons
const accordeons = document.querySelectorAll(".accordeon__item");
if (accordeons.length) {
  for (let i = 0; i < accordeons.length; i++) {
    const accordeon = accordeons[i];
    const accordeonBtn = accordeon.querySelector(".accordeon__title");
    const accordeonContent = accordeon.querySelector(".accordeon__content");

    if (accordeon.open) {
      accordeon.classList.add("_open");
      accordeonContent.normalHeight = accordeonContent.offsetHeight + 'px';
      accordeonContent.style.height = accordeonContent.normalHeight;
    } else {
      accordeon.open = true;
      accordeonContent.normalHeight = accordeonContent.offsetHeight + 'px';
      accordeon.open = false;
      accordeonContent.style.height = "0px";
    }

    accordeonContent.addEventListener("transitionend", function() {
      if (accordeon.open && !accordeon.classList.contains("_open")) {
        accordeon.open = false;
      }
    });

    accordeonBtn.addEventListener("click", function(e) {
      e.preventDefault();
      if (accordeon.open) {
        accordeonContent.style.height = "0px";
        accordeon.classList.remove("_open");
      } else {
        accordeon.classList.add("_open");
        accordeon.open = true;
        accordeon.offsetWidth = accordeon.offsetWidth;
        accordeonContent.style.height = accordeonContent.normalHeight;
      }
    });
  }
}
;
