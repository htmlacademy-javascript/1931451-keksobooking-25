const DISABLED_СLASSES = ['map__filters--disabled', 'ad-form--disabled'];

const forms = document.querySelectorAll('.ad-form, .map__filters');
const fieldsForms = document.querySelectorAll('fieldset, .map__filter');
const mapFilterFields = document.querySelectorAll('.map__filter');


const setDisableClass = () => {
  forms[0].classList.toggle(DISABLED_СLASSES[0]);
  forms[1].classList.toggle(DISABLED_СLASSES[1]);
};

const setDisableState = () => {
  setDisableClass();
  fieldsForms.forEach((field) => {
    field.disabled = !field.disabled;
  });
};

const setDisableMapFilters = () => {
  forms[0].classList.add(DISABLED_СLASSES[0]);
  mapFilterFields.forEach((field) => {
    field.disabled = true;
  });
};

const showPage = () => {
  setDisableState();
};

setDisableState();


export { showPage, setDisableMapFilters };
