/* eslint-disable no-console */
const TYPE_APARTMENT = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const TIMES = ['12:00', '13:00', '14:00'];
const FEATURES_APARTMENT = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const PHOTOS_APARTMENT = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];
const LAT_COORDINATE = [35.65000, 35.70000];
const LNG_COORDINATE = [139.70000, 139.80000];
const FLOATING_POINT = 5;
const RENTAL_AD_COUNT = 10;

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
const generateCoordinate = (min, max, float) => {
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


const getRandomArrayElement = (element) => element[getRandomNumber(0, element.length - 1)];


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


//Получаем новый массив из цифр в случайном порядке, где параметр arrayLength длина нужного массива
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

const getImgNumber = (element) => {
  const imgNumber = element.splice(getRandomNumber(element), 1);
  return (imgNumber > 9) ? imgNumber : `0${imgNumber}`;
};

const usersIdShuffle = getShuffleArray(RENTAL_AD_COUNT);


function createObjAd() {
  return ({
    author: {
      avatar: `img/avatars/user-${getImgNumber(usersIdShuffle)}.png`
    },
    offer: {
      title: 'Загаловок',
      address: `${generateCoordinate(LAT_COORDINATE[0], LAT_COORDINATE[1], FLOATING_POINT)} ${generateCoordinate(LNG_COORDINATE[0], LNG_COORDINATE[1], FLOATING_POINT)}`,
      price: getRandomNumber(200, 2000),
      type: getRandomArrayElement(TYPE_APARTMENT),
      rooms: getRandomNumber(1, 5),
      guests: getRandomNumber(1, 5),
      checkin: getRandomArrayElement(TIMES),
      checkout: getRandomArrayElement(TIMES),
      features: getArray(FEATURES_APARTMENT),
      description: 'Здесь могла быть ваша реклама!',
      photos: getArray(PHOTOS_APARTMENT),
    },
    location: {
      lat: generateCoordinate(LAT_COORDINATE[0], LAT_COORDINATE[1], FLOATING_POINT),
      lng: generateCoordinate(LNG_COORDINATE[0], LNG_COORDINATE[1], FLOATING_POINT)
    }
  });
}

const arrayAds = Array.from({ length: RENTAL_AD_COUNT }, createObjAd);
