const form = document.querySelector('.ad-form');
const titleField = form.querySelector('#title');
const priceField = form.querySelector('#price');
const typeField = form.querySelector('#type');
const roomsField = form.querySelector('#room_number');
const capacityField = form.querySelector('#capacity');
//const priceSlider = form.querySelector('.ad-form__slider');

const TITLE_LENGTH = {
  MIN: 30,
  MAX: 100,
};
const PRICE_MAX_VALUE = 100000;

const TYPE_PRICE_VALUES = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};

const RoomsValue = {
  ONE: '1',
  TWO: '2',
  THREE: '3',
  HUNDRED: '100',
};

const GuestsValue = {
  ONE: '1',
  TWO: '2',
  THREE: '3',
  UNAVAILABLE: '0',
};

const ROOM_GUEST_CAPACITY = {
  [RoomsValue.ONE]: GuestsValue.ONE,
  [RoomsValue.TWO]: [GuestsValue.ONE, GuestsValue.TWO],
  [RoomsValue.THREE]: [GuestsValue.ONE, GuestsValue.TWO, GuestsValue.THREE],
  [RoomsValue.HUNDRED]: GuestsValue.UNAVAILABLE,
};

const pristine = new Pristine(form, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'ad-form__element--error',
});


const validateTitle = (value) => value.length <= TITLE_LENGTH.MAX && value.length >= TITLE_LENGTH.MIN;
const validatePrice = (value) => value <= PRICE_MAX_VALUE && value >= TYPE_PRICE_VALUES[typeField.value];
const validateCapacity = () => ROOM_GUEST_CAPACITY[roomsField.value].includes(capacityField.value);
const getErrorTextCapacity = () => Number(roomsField.value) === Number(RoomsValue.HUNDRED) ? 'Комнаты не для гостей' : 'Недостаточно места';
const getErrorTextPrice = () => Number(priceField.value) < TYPE_PRICE_VALUES[typeField.value] ? `Минимальная цена ${TYPE_PRICE_VALUES[typeField.value].toLocaleString()}` : `Максмимальная цена ${PRICE_MAX_VALUE.toLocaleString()}`;


pristine.addValidator(titleField, validateTitle, 'От 30 до 100 символов');
pristine.addValidator(priceField, validatePrice, getErrorTextPrice);
pristine.addValidator(capacityField, validateCapacity, getErrorTextCapacity);


roomsField.addEventListener('change', () => {
  pristine.validate(capacityField);
});

typeField.addEventListener('change', (evt) => {
  const typeValue = TYPE_PRICE_VALUES[evt.target.value];
  priceField.placeholder = typeValue;
  priceField.setAttribute('min', typeValue);
  pristine.validate(priceField);
});

titleField.addEventListener('input', (evt) => {
  if (evt.target.value.length === TITLE_LENGTH.MAX) {
    evt.target.style.opacity = 0.5;
    document.querySelector('.ad-form__element--error').style.display = 'block';
    document.querySelector('.ad-form__element--error').textContent = 'Максимальное количество символов';
  } else {
    titleField.style.opacity = 1;
  }
});


form.addEventListener('submit', (evt) => {
  const isValid = pristine.validate();

  if (!isValid) {
    evt.preventDefault();
  }

});
