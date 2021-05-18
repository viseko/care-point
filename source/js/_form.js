
maskPhone("#form-phone");

// Подставление маски при вводе тел. номера. Взято здесь: https://github.com/KatrinaNov/maskPhone
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

// Модальное окно при отправке формы
const appointmentForm = document.querySelector(".js-appointment-form");

appointmentForm.addEventListener("submit", function(e) {
	e.preventDefault();

	// Здесь как-бы отправляем данные формы аяксом (пока не умею)
	// ... Отправили, получили ответ, что всё хорошо
	// Теперь очищаем форму
	appointmentForm.reset();
	// И выводим модальное окно
	showModal();
});

// Скрипты для модального окна
const modalWrapper = document.querySelector(".js-modal-wrapper");
const modalWindow = document.querySelector(".js-modal-window");
const btnCloseModal = document.querySelector(".js-modal-close");

btnCloseModal.addEventListener("click", closeModal);

function showModal() {
  lockBodyOverflow();
  modalWrapper.classList.add("_show");
  modalWindow.classList.add("_show");
}

function closeModal() {
  unlockBodyOverflow();
  modalWrapper.classList.remove("_show");
  modalWindow.classList.remove("_show");
}

function lockBodyOverflow() {
  document.body.style.overflow = "hidden";
  document.body.style.paddingRight = `${getScrollBarWidth()}px`;
}

function unlockBodyOverflow() {
  document.body.style.overflow = "auto";
  document.body.style.paddingRight = "0";
}

// Доп. функция - вычисление ширины скроллбара
function getScrollBarWidth () {
  var inner = document.createElement('p');
  inner.style.width = "100%";
  inner.style.height = "200px";

  var outer = document.createElement('div');
  outer.style.position = "absolute";
  outer.style.top = "0px";
  outer.style.left = "0px";
  outer.style.visibility = "hidden";
  outer.style.width = "200px";
  outer.style.height = "150px";
  outer.style.overflow = "hidden";
  outer.appendChild (inner);

  document.body.appendChild (outer);
  var w1 = inner.offsetWidth;
  outer.style.overflow = 'scroll';
  var w2 = inner.offsetWidth;
  if (w1 == w2) w2 = outer.clientWidth;

  document.body.removeChild (outer);

  return (w1 - w2);
};
