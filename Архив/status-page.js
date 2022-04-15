const offerForm = document.querySelector('.ad-form');
const offerFields = offerForm.querySelectorAll('.ad-form__element');
const mapForm = document.querySelector('.map__filters');
const mapFields = mapForm.querySelectorAll('.housing-type');
const DISABLED_СLASSES = ['map__filters--disabled', 'ad-form--disabled'];


const elements = document.querySelectorAll('fieldset, .map__filter');

const setDisableState = () => {
  elements.forEach((field) => {
    field.disabled = !field.disabled;
  });
};

/*
const getInactiveState = (form, fields, addClass) => {
  form.classList.add(addClass);
  fields.forEach((field) => {
    field.disabled = true;
  });
};

const getInactiveState = (form, fields, addClass) => {
  form.classList.add(addClass);
  fields.forEach((field) => {
    field.disabled = true;
  });
};

getInactiveState(mapForm, mapFields, DISABLED_СLASSES[0]);
getInactiveState(offerForm, offerFields, DISABLED_СLASSES[1]);

*/

const setActiveState = (form, fields, addClass) => {
  form.classList.remove(addClass);
};

const showPage = () => {
  setActiveState(mapForm, mapFields, DISABLED_СLASSES[0]);
  setActiveState(offerForm, offerFields, DISABLED_СLASSES[1]);
  setDisableState();
};

export { setDisableState, showPage };
