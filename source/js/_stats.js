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
