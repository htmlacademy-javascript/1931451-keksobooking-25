import { arrayOffers } from './data.js';

const container = document.querySelector('#map-canvas');
const cardTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');

const offers = arrayOffers();

const cardFragment = document.createDocumentFragment();


const offer = () => {
  const card = cardTemplate.cloneNode(true);
  const TextRoomsSpelling = {
    MIN_VALUE: 1,
    MAX_VALUE: 5,
  };

  if (!offers[0].offer.features) {
    offers[0].offer.features = [];
  }
  const arrayFeatures = offers[0].offer.features;
  const featureItems = card.querySelectorAll('.popup__feature');

  featureItems.forEach((featureItem) => {
    const isNecessary = arrayFeatures.some(
      (arrayFeature) => featureItem.classList.contains(`popup__feature--${arrayFeature}`),
    );

    if (!isNecessary) {
      featureItem.remove();
    }
  });


  if (!offers[0].author.avatar) {
    card.querySelector('.popup__avatar').style.display = 'none';
  }
  card.querySelector('.popup__avatar').src = offers[0].author.avatar;
  card.querySelector('.popup__title').textContent = offers[0].offer.title || null;
  card.querySelector('.popup__text--address').textContent = offers[0].offer.address || null;

  if (!offers[0].offer.price) {
    card.querySelector('.popup__text--price').style.display = 'none';
  }
  card.querySelector('.popup__text--price').textContent = `${offers[0].offer.price} ₽/ночь`;
  card.querySelector('.popup__type').textContent = offers[0].offer.type || null;


  let textRooms = 'комнаты';
  if (offers[0].offer.rooms === TextRoomsSpelling.MIN_VALUE) {
    textRooms = 'комната';
  } else if (offers[0].offer.rooms >= TextRoomsSpelling.MAX_VALUE) {
    textRooms = 'комнат';
  }

  if (!offers[0].offer.rooms) {
    card.querySelector('.popup__text--capacity').style.display = 'none';
  } else if (!offers[0].offer.guests) {
    card.querySelector('.popup__text--capacity').textContent =
      `${offers[0].offer.rooms} ${textRooms}`;
  } else {
    card.querySelector('.popup__text--capacity').textContent =
      `${offers[0].offer.rooms} ${textRooms} для ${offers[0].offer.guests} гостей.`;
  }


  if (!offers[0].offer.checkin) {
    card.querySelector('.popup__text--time').textContent =
      `Выезд до ${offers[0].offer.checkout}`;
  } else if (!offers[0].offer.checkout) {
    card.querySelector('.popup__text--time').textContent =
      `Заезд после ${offers[0].offer.checkin}`;
  } else {
    card.querySelector('.popup__text--time').textContent =
      `Заезд после ${offers[0].offer.checkin}, выезд до ${offers[0].offer.checkout}`;
  }


  card.querySelector('.popup__description').textContent = offers[0].offer.description || null;

  if (!offers[0].offer.photos) {
    offers[0].offer.photos = [];
  }
  const photoList = card.querySelector('.popup__photos');
  const photoArray = offers[0].offer.photos;
  photoList.innerHTML = '';

  for (let i = 0; i < photoArray.length; i++) {
    photoList.innerHTML += '<img src="" class="popup__photo" width="45" height="40" alt="Фотография жилья">';

    const photoItem = photoList.querySelectorAll('.popup__photo');

    photoItem[i].src = photoArray[i];
  }

  cardFragment.append(card);
  container.append(cardFragment);
};


offer();
