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
