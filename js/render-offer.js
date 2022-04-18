const MIN_NUMBER_GUESTS = 1;
const TYPES_APARTMENT_RU = {
  'palace': 'Дворец',
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalow': 'Бунгало',
  'hotel': 'Отель',
};

const TextRoomsSpelling = {
  MIN_VALUE: 1,
  MAX_VALUE: 5,
};


const cardTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');


const fillElementSrc = (container, className, element) => {
  if (element) {
    container.querySelector(className).src = element;
  } else {
    container.querySelector(className).remove();
  }
};

const fillElementTextContent = (container, className, element) => {
  if (element) {
    container.querySelector(className).src = element;
  } else {
    container.querySelector(className).remove();
  }
};

const fillElementType = (container, className, element) => {
  if (element) {
    container.querySelector(className).textContent = TYPES_APARTMENT_RU[element];
  } else {
    container.querySelector(className).remove();
  }
};

const fillElementPhotos = (container, photos) => {
  if (!photos) {
    photos = [];
  }
  const photoArray = photos;
  const photoList = container.querySelector('.popup__photos');
  const photoTemplate = photoList.querySelector('.popup__photo');
  photoList.innerHTML = '';

  photoArray.forEach((photo) => {
    const newPhoto = photoTemplate.cloneNode();
    newPhoto.src = photo;

    photoList.append(newPhoto);
  });
};

const fillElementFeatures = (container, features) => {
  if (!features) {
    features = [];
  }
  const arrayFeatures = features;
  const featureItems = container.querySelectorAll('.popup__feature');

  featureItems.forEach((featureItem) => {
    const isNecessary = arrayFeatures.some(
      (arrayFeature) => featureItem.classList.contains(`popup__feature--${arrayFeature}`),
    );

    if (!isNecessary) {
      featureItem.remove();
    }
  });
};


const renderOffer = (element) => {
  const card = cardTemplate.cloneNode(true);

  fillElementFeatures(card, element.offer.features);

  fillElementSrc(card, '.popup__avatar', element.author.avatar);
  fillElementTextContent(card, '.popup__title', element.offer.title);
  fillElementTextContent(card, '.popup__text--address', element.offer.address);
  fillElementTextContent(card, '.popup__text--price', element.offer.price);
  fillElementTextContent(card, '.popup__description', element.offer.description);
  fillElementType(card, '.popup__type', element.offer.type);

  let textRooms = 'комнаты';
  if (element.offer.rooms === TextRoomsSpelling.MIN_VALUE) {
    textRooms = 'комната';
  } else if (element.offer.rooms >= TextRoomsSpelling.MAX_VALUE) {
    textRooms = 'комнат';
  }

  let textGuests = 'гостей';
  if (element.offer.guests === MIN_NUMBER_GUESTS) {
    textGuests = 'гостя';
  }

  if (!element.offer.rooms) {
    card.querySelector('.popup__text--capacity').remove();
  } else if (!element.offer.guests) {
    card.querySelector('.popup__text--capacity').textContent = `${element.offer.rooms} ${textRooms}`;
  } else {
    card.querySelector('.popup__text--capacity').textContent = `${element.offer.rooms} ${textRooms} для ${element.offer.guests} ${textGuests}`;
  }

  if (!element.offer.checkin) {
    card.querySelector('.popup__text--time').textContent = `Выезд до ${element.offer.checkout}`;
  } else if (!element.offer.checkout) {
    card.querySelector('.popup__text--time').textContent = `Заезд после ${element.offer.checkin}`;
  } else {
    card.querySelector('.popup__text--time').textContent = `Заезд после ${element.offer.checkin}, выезд до ${element.offer.checkout}`;
  }

  fillElementPhotos(card, element.offer.photos);

  return card;
};


export { renderOffer };
