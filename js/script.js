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

    calcAccordeonNormalHeight(accordeon, accordeonContent);

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

// Пересчитываем требуемую высоту открытых аккордионов при изменении ширины окна
window.addEventListener("resize", function() {
  if (accordeons.length) {
    for (let i = 0; i < accordeons.length; i++) {
      const accordeon = accordeons[i];
      const accordeonContent = accordeon.querySelector(".accordeon__content");

      calcAccordeonNormalHeight(accordeon, accordeonContent);
    }
  }
});

function calcAccordeonNormalHeight(accordeon, content) {
  if (accordeon.open) {
    if (!accordeon.classList.contains("_open")) {
      accordeon.classList.add("_open");
    }
    content.style.height = null;
    content.normalHeight = content.offsetHeight + 'px';
    content.style.height = content.normalHeight;
  } else {
    accordeon.open = true;
    content.style.height = null;
    content.normalHeight = content.offsetHeight + 'px';
    accordeon.open = false;
    content.style.height = "0px";
  }
}
;

// Stats increment on scroll
const increments = document.querySelectorAll('.js-stats-increment');
const incrementSpeed = 100;

// Определяем свойства инкрементов
for (let i = 0; i < increments.length; i++) {
  const increment = increments[i];
  increment.plus = increment.nextElementSibling;
  increment.totalNumber = +increment.innerHTML;
  increment.visible = false;
  increment.innerHTML = '0';

  increment.style.cssText = 'transition: 0.5s; opacity: 0;';
  if (increment.plus) {
    increment.plus.style.cssText = 'transition: 0.2s; opacity: 0;';
  }
}

// При скролле, отображаем инкременты если они попадают в область просмотра
let isScrolling = false;

window.addEventListener('scroll', function(e) {
  if (!isScrolling) {
    window.requestAnimationFrame(function() {
      checkIncrementsReach(e);
      isScrolling = false;
    });
  }
  isScrolling = true;
});


function checkIncrementsReach(e) {
  for (let i = 0; i < increments.length; i++) {
    const increment = increments[i];
    if (!increment.visible && isElementFullVisible(increment)) {
      showIncrement(increment)
    }
  }
}

// Проверка
function isElementFullVisible(el) {
  const elementBoundary = el.getBoundingClientRect();
  const top = elementBoundary.top;
  const bottom = elementBoundary.bottom;

  return ((top >= 0) && (bottom <= window.innerHeight - window.innerHeight / 10));
}

function showIncrement(increment) {
  increment.style.opacity = '1';
  increment.visible = true;

  let timer = setInterval(function() {
    const currentNumber = +increment.innerHTML;
    if (currentNumber != increment.totalNumber) {
      increment.innerHTML = Math.min(
        currentNumber + Math.floor(increment.totalNumber/incrementSpeed),
        increment.totalNumber);
    } else {
      clearTimeout(timer);
      if (increment.plus) {
        increment.plus.style.opacity = '1';
      }
    }
  }, 10);
}
;

//Gallery slider for mobile
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
;

//Form validation and modal window

maskPhone("#form-phone");
// Источник: https://github.com/KatrinaNov/maskPhone
function maskPhone(selector, masked = '+7 (___) ___-__-__') {
	const elems = document.querySelectorAll(selector);

	function mask(event) {
		const keyCode = event.keyCode;
		const template = masked,
			def = template.replace(/\D/g, ""),
			val = this.value.replace(/\D/g, "");
		let i = 0,
			newValue = template.replace(/[_\d]/g, function (a) {
				return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
			});
		i = newValue.indexOf("_");
		if (i !== -1) {
			newValue = newValue.slice(0, i);
		}
		let reg = template.substr(0, this.value.length).replace(/_+/g,
			function (a) {
				return "\\d{1," + a.length + "}";
			}).replace(/[+()]/g, "\\$&");
		reg = new RegExp("^" + reg + "$");
		if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) {
			this.value = newValue;
		}
		if (event.type === "blur" && this.value.length < 5) {
			this.value = "";
		}

	}

	for (const elem of elems) {
		elem.addEventListener("input", mask);
		elem.addEventListener("focus", mask);
		elem.addEventListener("blur", mask);
	}
}
;
