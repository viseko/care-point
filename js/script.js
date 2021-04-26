// Menu burger
const  menuBtn = document.querySelector(".js-menu-btn");
const menuActiveClass = ("menu-open");

menuBtn.addEventListener("click", function() {
  document.body.classList.toggle(menuActiveClass)
});
;

// Team-list swiper
const teamSlider = new Swiper('.js-team-slider', {
  wrapperClass: "js-team-list",
  slideClass: "js-team-slide",

  direction: "horizontal",
  loop: false,
  slidesPerView: "1",

  pagination: {
    el: ".js-team__pagination",
    bulletClass: "slider__bullet",
    bulletActiveClass: "slider__bullet--active",
    bulletElement: "button",
    clickable: true,
    clickableClass: "slider__pagination__clickable"
  },

  navigation: {
    nextEl: ".js-team-next",
    prevEl: ".js-team-prev",
    disabledClass: "slider__nav--disabled",
  },

  followFinger: false,

  breakpoints: {
    1000: {
      slidesPerView: 4
    },

    750: {
      slidesPerView: 3
    },

    600: {
      slidesPerView: 2
    }
  }
});

checkSlidesLength(teamSlider, teamSlider.params);

teamSlider.on("breakpoint", function(swiper, params) {
  checkSlidesLength(swiper, params);
});

// Если количество отображаемых слайдов равно числу слайдов - фиксируем слайдер и прячем элементы управления
function checkSlidesLength(swiper, params) {
  const slidesPerView = params.slidesPerView;
  const slidesLength = swiper.slides.length;

  if (slidesPerView === slidesLength) {
    swiper.params.followFinger = false;
    swiper.$el[0].parentElement.classList.add("_slider-lock");
  } else if (slidesPerView < slidesLength) {
    swiper.params.followFinger = true;
    if (swiper.$el[0].parentElement.classList.contains("_slider-lock")) {
      swiper.$el[0].parentElement.classList.remove("_slider-lock");
    }
  }
}
;

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
