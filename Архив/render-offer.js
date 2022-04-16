const cardTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');

//const cardFragment = document.createDocumentFragment();


const renderOffer = (element) => {
  const card = cardTemplate.cloneNode(true);
  const TextRoomsSpelling = {
    MIN_VALUE: 1,
    MAX_VALUE: 5,
  };

  if (!element.offer.features) {
    element.offer.features = [];
  }
  const arrayFeatures = element.offer.features;
  const featureItems = card.querySelectorAll('.popup__feature');

  featureItems.forEach((featureItem) => {
    const isNecessary = arrayFeatures.some(
      (arrayFeature) => featureItem.classList.contains(`popup__feature--${arrayFeature}`),
    );

    if (!isNecessary) {
      featureItem.remove();
    }
  });


  if (!element.author.avatar) {
    card.querySelector('.popup__avatar').style.display = 'none';
  }
  card.querySelector('.popup__avatar').src = element.author.avatar;
  card.querySelector('.popup__title').textContent = element.offer.title || null;
  card.querySelector('.popup__text--address').textContent = element.offer.address || null;

  if (element.offer.price) {
    card.querySelector('.popup__text--price').textContent = `${element.offer.price} ₽/ночь`;
  } else {
    card.querySelector('.popup__text--price').remove();
  }

  card.querySelector('.popup__type').textContent = element.offer.type || null;


  let textRooms = 'комнаты';
  if (element.offer.rooms === TextRoomsSpelling.MIN_VALUE) {
    textRooms = 'комната';
  } else if (element.offer.rooms >= TextRoomsSpelling.MAX_VALUE) {
    textRooms = 'комнат';
  }

  if (!element.offer.rooms) {
    card.querySelector('.popup__text--capacity').style.display = 'none';
  } else if (!element.offer.guests) {
    card.querySelector('.popup__text--capacity').textContent =
      `${element.offer.rooms} ${textRooms}`;
  } else {
    card.querySelector('.popup__text--capacity').textContent =
      `${element.offer.rooms} ${textRooms} для ${element.offer.guests} гостей.`;
  }


  if (!element.offer.checkin) {
    card.querySelector('.popup__text--time').textContent =
      `Выезд до ${element.offer.checkout}`;
  } else if (!element.offer.checkout) {
    card.querySelector('.popup__text--time').textContent =
      `Заезд после ${element.offer.checkin}`;
  } else {
    card.querySelector('.popup__text--time').textContent =
      `Заезд после ${element.offer.checkin}, выезд до ${element.offer.checkout}`;
  }


  card.querySelector('.popup__description').textContent = element.offer.description || null;

  if (!element.offer.photos) {
    element.offer.photos = [];
  }
  const photoList = card.querySelector('.popup__photos');
  const photoArray = element.offer.photos;
  const photoTemplate = card.querySelector('.popup__photo');
  photoList.innerHTML = '';

  photoArray.forEach((photo) => {
    const newPhoto = photoTemplate.cloneNode(true);
    newPhoto.src = photo;
    photoList.appendChild(newPhoto);
  });

  //photoList.innerHTML += '<img src="" class="popup__photo" width="45" height="40" alt="Фотография жилья">';
  //const photoItem = photoList.querySelectorAll('.popup__photo');
  //photoItem[i].src = photoArray[i];
  //}

  return card;
};


export { renderOffer };
