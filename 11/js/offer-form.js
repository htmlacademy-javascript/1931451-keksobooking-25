import './price-slider.js';
import './status-form.js';
import { resetImages } from './image-preview.js';
import { resetMap } from './map.js';
import { openErrorPopup, openSuccessPopup } from './status-form.js';
import { makeRequest } from './data.js';


const form = document.querySelector('.ad-form');
const titleField = form.querySelector('#title');
const priceField = form.querySelector('#price');
const typeField = form.querySelector('#type');
const roomsField = form.querySelector('#room_number');
const capacityField = form.querySelector('#capacity');
const timeInField = form.querySelector('#timein');
const timeOutField = form.querySelector('#timeout');
const submitButton = form.querySelector('.ad-form__submit');
const clearButton = form.querySelector('.ad-form__reset');

// Правильно ли здесь именнование объекта?
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
const getErrorTextPrice = () => Number(priceField.value) < TYPE_PRICE_VALUES[typeField.value] ? `Минимальная цена ${TYPE_PRICE_VALUES[typeField.value].toLocaleString()}` : `Максимальная цена ${PRICE_MAX_VALUE.toLocaleString()}`;


pristine.addValidator(titleField, validateTitle, 'От 30 до 100 символов');
pristine.addValidator(priceField, validatePrice, getErrorTextPrice);
pristine.addValidator(capacityField, validateCapacity, getErrorTextCapacity);


// Эта функция выглядела ужасно, и помоему такой же и осталась(((
const getNumberCapacity = () => {
  const options = Array.from(capacityField.querySelectorAll('option'));

  //Пытался вставить index вместо ONE, TWO и т.д / не особо получилось, выдававался странный результат / потом пытался создать новый объект и также использовать index / тоже не получилось((
  options.forEach((option, /*index*/) => {
    const item = option.value.toString();

    let result;

    if (roomsField.value === RoomsValue.ONE) {
      result = ROOM_GUEST_CAPACITY[RoomsValue.ONE].includes(item);
    }

    if (roomsField.value === RoomsValue.TWO) {
      result = ROOM_GUEST_CAPACITY[RoomsValue.TWO].includes(item);
    }

    if (roomsField.value === RoomsValue.THREE) {
      result = ROOM_GUEST_CAPACITY[RoomsValue.THREE].includes(item);
    }

    if (roomsField.value === RoomsValue.HUNDRED) {
      result = ROOM_GUEST_CAPACITY[RoomsValue.HUNDRED].includes(item);
    }

    //console.log(ROOM_GUEST_CAPACITY[index].includes(item));
    //console.log(ROOM_GUEST_CAPACITY[RoomsValue[index]].includes(item));
    if (result) {
      option.disabled = result;
    }

    option.disabled = !result;
  });

  //Было так

  // if (roomsField.value === RoomsValue.ONE) {
  //   options[GuestsValue.UNAVAILABLE].disabled = true;
  //   options[GuestsValue.ONE].disabled = true;
  //   options[GuestsValue.TWO].disabled = false;
  //   options[GuestsValue.THREE].disabled = true;
  // }

  // if (roomsField.value === RoomsValue.TWO) {
  //   options[GuestsValue.UNAVAILABLE].disabled = true;
  //   options[GuestsValue.ONE].disabled = false;
  //   options[GuestsValue.TWO].disabled = false;
  //   options[GuestsValue.THREE].disabled = true;
  // }

  // if (roomsField.value === RoomsValue.THREE) {
  //   options[GuestsValue.UNAVAILABLE].disabled = false;
  //   options[GuestsValue.ONE].disabled = false;
  //   options[GuestsValue.TWO].disabled = false;
  //   options[GuestsValue.THREE].disabled = true;
  // }

  // if (roomsField.value === RoomsValue.HUNDRED) {
  //   options[GuestsValue.UNAVAILABLE].disabled = true;
  //   options[GuestsValue.ONE].disabled = true;
  //   options[GuestsValue.TWO].disabled = true;
  //   options[GuestsValue.THREE].disabled = false;
  // }
};

getNumberCapacity();

roomsField.addEventListener('change', () => {
  getNumberCapacity();
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

timeInField.addEventListener('change', () => {
  timeOutField.value = timeInField.value;
});

timeOutField.addEventListener('change', () => {
  timeInField.value = timeOutField.value;
});

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.style.opacity = '0.7';
  submitButton.textContent = 'Отправляю...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.style.opacity = '1';
  submitButton.textContent = 'Опубликовать';
};

const onClickClearButton = () => {
  resetMap();
  resetImages();
};

const clearForm = (evt) => {
  evt.target.reset();
};

clearButton.addEventListener('click', onClickClearButton);

const setOfferForm = (onSuccess) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      makeRequest(
        () => {
          onSuccess();
          openSuccessPopup();
          clearForm(evt);
          resetImages();
          unblockSubmitButton();
          resetMap();
        },
        () => {
          openErrorPopup();
          unblockSubmitButton();
        },
        'POST',
        new FormData(evt.target),
      );
    }
  });
};

export { setOfferForm };
