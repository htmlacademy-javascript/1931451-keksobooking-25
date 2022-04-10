import { utils } from './utils.js';

const TYPES_APARTMENT = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const TIMES = ['12:00', '13:00', '14:00'];
const FEATURES_APARTMENT = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const PHOTOS_APARTMENT = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];
const MIN_PRICE = 200;
const MAX_PRICE = 2000;
const RENTAL_AD_COUNT = 10;

const TYPES_APARTMENT_RU = TYPES_APARTMENT.map((value, index) => {
  const array = ['Дворец', 'Квартира', 'Дом', 'Бунгало', 'Отель'];
  value = array[index];
  return value;
});


const shuffleArray = utils.getShuffleArray(RENTAL_AD_COUNT);

function createOffers() {
  const idNumber = utils.getIdNumber(shuffleArray);
  const lat = utils.generateCoordinate(35.65000, 35.70000, 5);
  const lng = utils.generateCoordinate(139.70000, 139.80000, 5);
  const rooms = utils.getRandomNumber(1, 5);
  const quests = rooms + 1;

  return ({
    author: {
      avatar: `img/avatars/user${idNumber}.png`
    },
    offer: {
      title: 'Загаловок',
      address: `${lat} ${lng}`,
      price: utils.getRandomNumber(MIN_PRICE, MAX_PRICE),
      type: utils.getRandomArrayElement(TYPES_APARTMENT_RU),
      rooms: rooms,
      guests: quests,
      checkin: utils.getRandomArrayElement(TIMES),
      checkout: utils.getRandomArrayElement(TIMES),
      features: utils.getArray(FEATURES_APARTMENT),
      description: 'Здесь могла быть ваша реклама!',
      photos: utils.getArray(PHOTOS_APARTMENT),
    },
    location: {
      lat: lat,
      lng: lng
    }
  });
}

const arrayOffers = () => Array.from({ length: RENTAL_AD_COUNT }, createOffers);

export { arrayOffers, RENTAL_AD_COUNT };
