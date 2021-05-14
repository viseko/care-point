let gallerySlider = null;
const mobileBreakpoint = window.matchMedia("(min-width: 501px)");

mobileBreakpoint.addEventListener("change", mobileBreakpointChecker);
mobileBreakpointChecker();

function mobileBreakpointChecker() {
  if (mobileBreakpoint.matches) {
    if (gallerySlider) {
      gallerySlider.destroy();
    }
  } else {
    initGallerySlider();
  }
}

function initGallerySlider() {
  gallerySlider = new Swiper(".js-gallery-slider", {
    wrapperClass: "js-gallery-list",
    slideClass: "js-gallery-slide",

    direction: "horizontal",
    loop: false,
    slidesPerView: "1",

    pagination: {
      el: ".js-gallery__pagination",
      bulletClass: "slider__bullet",
      bulletActiveClass: "slider__bullet--active",
      bulletElement: "button",
      clickable: true,
      clickableClass: "slider__pagination__clickable"
    },

    navigation: {
      nextEl: ".js-gallery-next",
      prevEl: ".js-gallery-prev",
      disabledClass: "slider__nav--disabled",
    },

    followFinger: true
  });
}
