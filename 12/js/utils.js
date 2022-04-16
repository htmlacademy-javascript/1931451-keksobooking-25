const DEFAULT_ALERT_TIME = 5000;
const DEBOUNCE_INTERVAL = 500;


const isEscapeKey = (evt) => evt.key === 'Escape';

const showAlert = (time = DEFAULT_ALERT_TIME, color = 'red') => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '1000';
  alertContainer.style.position = 'fixed';
  alertContainer.style.top = '0';
  alertContainer.style.left = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px';
  alertContainer.style.color = '#fff';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = color;

  alertContainer.textContent = 'Не удалось загрузить данные, попробуйте перезагрузить страницу';

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, time);
};

const debounce = (callback, timeoutDelay = DEBOUNCE_INTERVAL) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};


export { isEscapeKey, showAlert, debounce };
