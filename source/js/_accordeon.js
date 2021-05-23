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
        accordeon.offsetWidth;
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
  if (accordeon.open || accordeon.dataset.ieOpen === "true") {
    if (!accordeon.classList.contains("_open")) {
      accordeon.classList.add("_open");
      accordeon.open = true; // Для IE, не знакомого с details
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
