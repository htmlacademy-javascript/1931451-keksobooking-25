const DEFAULT_ALERT_TIME = 5000;
const DEFAULT_DEBOUNCE_TIMEOUT_DELAY = 500;


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

// Функция взята из интернета и доработана
// Источник - https://www.freecodecamp.org/news/javascript-debounce-example
const debounce = (callback, timeoutDelay = DEFAULT_DEBOUNCE_TIMEOUT_DELAY) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

// Функция взята из интернета и доработана
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_throttle
const throttle = (callback, delayBetweenFrames) => {
  let lastTime = 0;

  return (...rest) => {
    const now = new Date();

    if (now - lastTime >= delayBetweenFrames) {
      callback.apply(this, rest);
      lastTime = now;
    }
  };
};

export { isEscapeKey, showAlert, debounce, throttle };
