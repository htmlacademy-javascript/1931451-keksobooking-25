const offerForm = document.querySelector('.ad-form');
const offerFields = offerForm.querySelectorAll('.ad-form__element');
const mapForm = document.querySelector('.map__filters');
const mapFields = mapForm.querySelectorAll('.housing-type');
const DISABLED_СLASSES = ['map__filters--disabled', 'ad-form--disabled'];

const getInactiveState = (form, fields, addClass) => {
  form.classList.add(addClass);
  fields.forEach((field) => {
    field.disabled = true;
  });
};

const getActiveState = (form, fields, addClass) => {
  form.classList.remove(addClass);
  fields.forEach((field) => {
    field.disabled = false;
  });
};

getInactiveState(mapForm, mapFields, DISABLED_СLASSES[0]);
getInactiveState(offerForm, offerFields, DISABLED_СLASSES[1]);

const showPage = () => {
  getActiveState(mapForm, mapFields, DISABLED_СLASSES[0]);
  getActiveState(offerForm, offerFields, DISABLED_СLASSES[1]);
};

export { showPage };
