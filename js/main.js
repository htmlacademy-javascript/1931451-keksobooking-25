const TYPE_APARTMENT = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const CHECKIN = ['12:00', '13:00', '14:00'];
const CHECKOUT = ['12:00', '13:00', '14:00'];
const FEATURES_APARTMENT = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const PHOTOS_APARTMENT = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];
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

getRandomNumber(1.5, 2.1);


//Получаем случайное число с плавающей точкой из выбранного диапазона
const generateСoordinate = (min, max, float) => {
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

generateСoordinate(1.1, 1.2, 3);


const getNumber = (min, max) => {
  let number = getRandomNumber(min, max);

  if (number < 10) {
    number = `0${number}`;
  }

  return String(number);
};


const getRandomArrayElement = (element) => element[getRandomNumber(0, element.length - 1)];


const getArray = (element) => {
  //const maxLength = features.length;  Стоит ли здесь объявить переменную и использовать её?
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


const createObjAd = () => ({
  autor: {
    avatar: `img/avatars/user-${getNumber(1, RENTAL_AD_COUNT)}.png` //Непонятно как здесь сделать чтобы список не повторялся, и шел друг за другом.
  },
  offer: {
    title: 'Загаловок',
    address: `${generateСoordinate(35.65000, 35.70000, 5)} ${generateСoordinate(139.70000, 139.80000, 5)}`,
    price: getRandomNumber(200, 2000),
    type: getRandomArrayElement(TYPE_APARTMENT),
    rooms: getRandomNumber(1, 5),
    guests: getRandomNumber(1, 5), //Хотел сделать чтобы значением этого свойства было this.rooms + 1, но не получилось, т.к. в браузере ключ rooms объявляется после этого, так и не понял как можно так сделать. Поэтому сделал так как нужно было в задании.
    checkin: getRandomArrayElement(CHECKIN),
    checkout: getRandomArrayElement(CHECKOUT),
    features: getArray(FEATURES_APARTMENT),
    description: 'Здесь могла быть ваша реклама!',
    photos: getArray(PHOTOS_APARTMENT),
  },
  location: {
    lat: generateСoordinate(35.65000, 35.70000, 5),
    lng: generateСoordinate(139.70000, 139.80000, 5)
  }
});

const arrayAds = Array.from({ length: RENTAL_AD_COUNT }, createObjAd);

// eslint-disable-next-line no-console
console.log(arrayAds);
