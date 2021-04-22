const  menuBtn = document.querySelector(".js-menu-btn");
const menuActiveClass = ("menu-open");

menuBtn.addEventListener("click", function() {
  document.body.classList.toggle(menuActiveClass)
});
