const DEFAULT_VALUE_ANY = 'any';
const MAX_OFFERS = 10;


//создаем массив из всех фильтров, привильно ли я понял, чтобы создаем массив с помощью объекта Array, для того чтобы корректно работал метод every()
const filters = Array.from(document.querySelector('.map__filters').children);

//создаем массив из цен, где названия объектов соответсвуют возможным #housing-price.value
const prices = {
  'low': {
    start: 0,
    end: 10000,
  },
  'middle': {
    start: 10000,
    end: 50000,
  },
  'high': {
    start: 50000,
    end: Infinity,
  },
};

//создаем правила для фильтра, где каждое название метода соответствует с id фильтров
const filterRules = {

  //Проверяем, равно ли значение ключа offer.type из обьекта data[i] со значением фильтра, если да то возвращаем булевое значение true
  'housing-type': (data, filter) => data.offer.type === filter.value,

  //Проверяем значение ключа offer.price из обьекта data[i] с диапозоном из выбранного пользователем фильтра, и возвращаем true, или false. Например 2000 >= prices.low.start и 2000 < prices.low.end // true
  'housing-price': (data, filter) => data.offer.price >= prices[filter.value].start && data.offer.price < prices[filter.value].end,

  //Проверяем, равно ли значение ключа offer.type из обьекта data[i] со значением фильтра, если да то возвращаем булевое значение true. Так как мы используем строгое равенство, нужно либо значение filter.value перевести в число, либо число из объекта rooms в строку!
  'housing-rooms': (data, filter) => filter.value === data.offer.rooms.toString(),

  //Тоже самое что и выше
  'housing-guests': (data, filter) => filter.value === data.offer.guests.toString(),

  'housing-features': (data, filter) => {
    //Сначало проверяем, если ли у объекта data[i], есть ли свойсто offer.features и не является ли оно пустым
    if (data.offer.features) {
      //создаем массив из выбранных чекбоксов
      const checkboxList = Array.from(filter.querySelectorAll('input[type="checkbox"]:checked'));

      //возвращем true, или false, если выбранный чекбокс есть в объекте data[i].offer.features
      return checkboxList.every((checkbox) => data.offer.features.includes(checkbox.value));
    }

    //Возвращаем true, чтобы показывать объявления с пустым offer.features, если не выбран не один фильтр
    return true;
  },
};

//Создаем функцию фильтрации объекта data
const filterData = (data) => {
  //Создаем пустой массив, куда будем помещать объекты прошедшую фильрацию
  const filteredOffers = [];

  // Создаем пустую переменную, куда в последствии будем помещать результат выбполнения метода every() // true или false
  let result;

  //Создаем цикл for, так как я боюсь цикла while, где очень легко запустить бесконечный цикл)))
  for (let i = 0; i < data.length; i++) {

    //Создаем условия, чтобы остановить цикл, когда массив станет максимальной длины
    if (filteredOffers.length < MAX_OFFERS) {

      //Проверяем значение каждого фильтра, если какой либо фильтр выбран, то запускаем проверку это фильтра функцией filterRules
      result = filters.every((filter) => filter.value === DEFAULT_VALUE_ANY ? true : filterRules[filter.id](data[i], filter));

      //Если result вернул true то тогда добавляем этот объект в массив filteredOffers
      if (result) {
        filteredOffers.push(data[i]);
      }
    }
  }

  //Возращаем новый, отфильтрованный массив
  return filteredOffers;
};


export { filterData };
