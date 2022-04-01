const priceSlider = document.querySelector('.ad-form__slider');
const priceField = document.querySelector('#price');
const buttonClear = document.querySelector('.ad-form__reset');
const PRICE_MAX_VALUE = 100000;

priceSlider.style.marginTop = `${10}px`;

noUiSlider.create(priceSlider, {
  range: {
    min: 0,
    max: PRICE_MAX_VALUE,
  },
  start: 1000,
  step: 1,
  connect: 'lower',
  format: {
    to: function (value) {
      return value.toFixed(0);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

priceSlider.noUiSlider.on('slide', () => {
  priceField.value = priceSlider.noUiSlider.get();
});

priceSlider.noUiSlider.on('update', () => {
  if (priceField.value) {
    priceField.value = priceSlider.noUiSlider.get();
  }
});

priceField.addEventListener('change', () => {
  priceSlider.noUiSlider.set([priceField.value, null]);
});

buttonClear.addEventListener('click', () => {
  priceSlider.noUiSlider.updateOptions({
    start: 1000,
  });
});

export { };
