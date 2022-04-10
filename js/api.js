const RENTAL_AD_COUNT = 10;

const getData = (onSuccess, onFail) => {
  fetch('https://25.javascript.pages.academy/keksobooking/data')
    .then((response) => response.json())
    .then((offers) => {
      const lastOffers = offers.slice(-RENTAL_AD_COUNT);

      lastOffers.forEach((offer) => {
        onSuccess(offer);
      });
    })
    .catch(() => {
      onFail('Не удалось загрузить данные, попробуйте перезагрузить страницу');
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch('https://25.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body: body,
    },
  ).then((response) => {
    if (response.ok) {
      onSuccess();
    } else {
      onFail('Не удалось отправить форму. Попробуйте ещё раз');
    }
  })
    .catch(() => {
      onFail('Не удалось отправить форму. Попробуйте ещё раз');
    });
};

export { getData, sendData };
