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


const fillElementAvatar = (container, className, element) => {
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

const fillElementCapacity = (container, className, rooms, guests) => {
  let textRooms = 'комнаты';
  if (rooms === TextRoomsSpelling.MIN_VALUE) {
    textRooms = 'комната';
  } else if (rooms >= TextRoomsSpelling.MAX_VALUE) {
    textRooms = 'комнат';
  }

  let textGuests = 'гостей';
  if (guests === MIN_NUMBER_GUESTS) {
    textGuests = 'гостя';
  }

  if (!rooms) {
    container.querySelector('.popup__text--capacity').remove();
  } else if (!guests) {
    container.querySelector('.popup__text--capacity').textContent = `${rooms} ${textRooms}`;
  } else {
    container.querySelector('.popup__text--capacity').textContent = `${rooms} ${textRooms} для ${guests} ${textGuests}`;
  }
};

const fillElementTimes = (container, className, checkin, checkout) => {
  if (!checkin) {
    container.querySelector(className).textContent = `Выезд до ${checkout}`;
  } else if (!checkout) {
    container.querySelector(className).textContent = `Заезд после ${checkin}`;
  } else {
    container.querySelector(className).textContent = `Заезд после ${checkin}, выезд до ${checkout}`;
  }
};


const renderOffer = (element) => {
  const card = cardTemplate.cloneNode(true);

  fillElementFeatures(card, element.offer.features);

  fillElementAvatar(card, '.popup__avatar', element.author.avatar);
  fillElementTextContent(card, '.popup__title', element.offer.title);
  fillElementTextContent(card, '.popup__text--address', element.offer.address);
  fillElementTextContent(card, '.popup__text--price', element.offer.price);
  fillElementTextContent(card, '.popup__description', element.offer.description);
  fillElementType(card, '.popup__type', element.offer.type);

  fillElementCapacity(card, '.popup__text--capacity', element.offer.rooms, element.offer.guests);
  fillElementTimes(card, '.popup__text--time', element.offer.checkin, element.offer.checkout);

  fillElementPhotos(card, element.offer.photos);

  return card;
};


export { renderOffer };
