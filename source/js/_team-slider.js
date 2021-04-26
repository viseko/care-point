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
