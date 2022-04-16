const DEFAULT_VALUE_ANY = 'any';
const MAX_OFFERS = 10;

const filters = Array.from(document.querySelector('.map__filters').children);

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

const filterRules = {
  'housing-type': (data, filter) => data.offer.type === filter.value,
  'housing-price': (data, filter) => data.offer.price >= prices[filter.value].start && data.offer.price < prices[filter.value].end,
  'housing-rooms': (data, filter) => filter.value === data.offer.rooms.toString(),
  'housing-guests': (data, filter) => filter.value === data.offer.guests.toString(),
  'housing-features': (data, filter) => {
    if (data.offer.features) {
      const checkboxList = Array.from(filter.querySelectorAll('input[type="checkbox"]:checked'));

      return checkboxList.every((checkbox) => data.offer.features.includes(checkbox.value));
    }

    return true;
  },
};

const filterData = (data) => {
  const filteredOffers = [];
  let result;

  for (let i = 0; i < data.length; i++) {
    if (filteredOffers.length < MAX_OFFERS) {
      result = filters.every((filter) => filter.value === DEFAULT_VALUE_ANY ? true : filterRules[filter.id](data[i], filter));

      if (result) {
        filteredOffers.push(data[i]);
      }
    }
  }

  return filteredOffers;
};


export { filterData };
