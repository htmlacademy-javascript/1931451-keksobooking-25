//Получаем случайное целое число из выбранного диапазона
const getRandomNumber = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  if (min < 0 || max < 0) {
    return null;
  }

  if (min === max) {
    return max;
  }

  if (min > max) {
    return Math.floor(Math.random() * (min - max + 1)) + max;
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
};
//https://developer.mozilla.org


//Получаем случайное число с плавающей точкой из выбранного диапазона
const generateCoordinate = (min, max, float = 1) => {
  let coordinate;

  if (min < 0 || max < 0) {
    return null;
  }

  if (min.toFixed() || max.toFixed()) {
    coordinate = Math.random() * (min - max) + max;
    return coordinate.toFixed(float);
  }

  if (min > max) {
    coordinate = Math.random() * (min - max + 1) + max;
    return coordinate.toFixed(float);
  }

  coordinate = Math.random() * (max - min + 1) + min;
  return coordinate.toFixed(float);
};

//Получаем случайный элемент из массива
const getRandomArrayElement = (element) => element[getRandomNumber(0, element.length - 1)];


//Получаем новый массив случайной длины в разном порядке из другого массива
const getArray = (element) => {
  const lengthOfArray = getRandomNumber(1, element.length);
  const array = [];

  while (array.length < lengthOfArray) {
    const indexOfEl = getRandomNumber(0, element.length - 1);
    const el = element[indexOfEl];

    if (!array.includes(el)) {
      array.push(el);
    }
  }

  return array;
};


//Получаем новый массив из цифр в случайном порядке, где параметр arrayLength длина нужного массива (в связке с getIdNumber)
const getShuffleArray = (arrayLength) => {
  const newArray = Array.from({ length: arrayLength }, (value, index) => ++index);

  for (let i = newArray.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    const swap = newArray[i];
    newArray[i] = newArray[randomIndex];
    newArray[randomIndex] = swap;
  }

  return newArray;
};

//Получаем случайное случайное уникальное число из массива (в связке с getShuffleArray)
const getIdNumber = (element) => {
  // eslint-disable-next-line no-use-before-define
  const imgNumber = element.splice(utils.getRandomNumber(element), 1);
  return (imgNumber > 9) ? imgNumber : `0${imgNumber}`;
};


// объект из методов файла utils.js
const utils = {
  getRandomNumber,
  generateCoordinate,
  getRandomArrayElement,
  getArray,
  getShuffleArray,
  getIdNumber
};

const isEscapeKey = (evt) => evt.key === 'Escape';

export { utils, isEscapeKey };
