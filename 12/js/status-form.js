import { isEscapeKey } from './utils.js';

const successTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');
const errorTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');
const successContainer = successTemplate.querySelector('.success__message');
const errorContainer = errorTemplate.querySelector('.error__message');
const errorButton = errorTemplate.querySelector('.error__button');
const popupFragment = document.createDocumentFragment();

const onEscKeydownSuccess = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    removeElement(successTemplate);
  }
};

const onEscKeydownError = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    removeElement(errorTemplate);
  }
};

const checkRemoveElement = (evt, checked, remove) => {
  if (!evt.composedPath().includes(checked)) {
    removeElement(remove);
  }
};

const onClickRemoveSuccess = (evt) => {
  checkRemoveElement(evt, successContainer, successTemplate);
};

const onClickRemoveError = (evt) => {
  checkRemoveElement(evt, errorContainer, errorTemplate);
};

const onClickErrorButton = () => {
  removeElement(errorTemplate);
};

function appendElement(element) {
  popupFragment.append(element);
  document.body.append(popupFragment);

  if (element === successTemplate) {
    document.addEventListener('keydown', onEscKeydownSuccess);
    document.addEventListener('click', onClickRemoveSuccess);
  } else if (element === errorTemplate) {
    document.addEventListener('keydown', onEscKeydownError);
    document.addEventListener('click', onClickRemoveError);
    errorButton.addEventListener('click', onClickErrorButton);
  }
}

function removeElement(element) {
  element.remove();

  if (element === successTemplate) {
    document.removeEventListener('keydown', onEscKeydownSuccess);
    document.removeEventListener('click', onClickRemoveSuccess);
  } else if (element === errorTemplate) {
    document.removeEventListener('keydown', onEscKeydownError);
    document.removeEventListener('click', onClickRemoveError);
  }
}

const openErrorPopup = () => {
  appendElement(errorTemplate);
};

const openSuccessPopup = () => {
  appendElement(successTemplate);
};


export { openErrorPopup, openSuccessPopup };
