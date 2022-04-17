const PRICE_MAX_VALUE = 100000;
const START_DEFAULT = 1000;
const PRICE_SLIDER_MARGIN = '10px';

const priceSlider = document.querySelector('.ad-form__slider');
const priceField = document.querySelector('#price');
const buttonClear = document.querySelector('.ad-form__reset');


priceSlider.style.marginTop = PRICE_SLIDER_MARGIN;

noUiSlider.create(priceSlider, {
  range: {
    min: 0,
    max: PRICE_MAX_VALUE,
  },
  start: START_DEFAULT,
  step: 1,
  connect: 'lower',
  format: {
    to: (value) => value.toFixed(0),
    from: (value) => parseFloat(value),
  },
});

const clearNoUiSlider = () => {
  priceSlider.noUiSlider.updateOptions({
    start: START_DEFAULT,
  });
};

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

buttonClear.addEventListener('click', clearNoUiSlider);

export { clearNoUiSlider };
