import { showPage, setDisableMapFilters } from './status-page.js';
import { renderOffer } from './render-offer.js';
import { isEscapeKey, showAlert } from './utils.js';
import { filterData } from './filter.js';
import { makeRequest } from './data.js';


const RENTAL_AD_COUNT = 10;
const MARKER_RESET_TIME = 0;

const mapfilters = document.querySelector('.map__filters');
const addressField = document.querySelector('#address');

const CURRENT_COORDINATE = {
  LAT: 35.6846743,
  LNG: 139.7535566,
};
const IconsData = {
  REDICON: {
    url: './img/main-pin.svg',
    size: [52, 52],
    anchor: [26, 52],
  },
  BLUEICON: {
    url: './img/pin.svg',
    size: [40, 40],
    anchor: [20, 40],
  },
};

const map = L.map('map-canvas');

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainIconMarker = L.icon({
  iconUrl: IconsData.REDICON.url,
  iconSize: IconsData.REDICON.size,
  iconAnchor: IconsData.REDICON.anchor,
});

const iconMarker = L.icon({
  iconUrl: IconsData.BLUEICON.url,
  iconSize: IconsData.BLUEICON.size,
  iconAnchor: IconsData.BLUEICON.anchor,
});

const markerGroup = L.layerGroup().addTo(map);

const createMarker = (object) => {
  const { lat, lng } = object.location;
  const marker = L.marker(
    {
      lat,
      lng,
    },
    {
      icon: iconMarker,
    },
  );

  marker
    .addTo(markerGroup)
    .bindPopup(renderOffer(object));
};

const mainMarker = L.marker(
  {
    lat: CURRENT_COORDINATE.LAT,
    lng: CURRENT_COORDINATE.LNG,
  },
  {
    icon: mainIconMarker,
    draggable: true,
  }
);
mainMarker.addTo(map);

const getCoordinate = () => `${mainMarker._latlng.lat.toFixed(5)}, ${mainMarker._latlng.lng.toFixed(5)}`;

const mapDefaultCoordinate = () => {
  map.setView({
    lat: CURRENT_COORDINATE.LAT,
    lng: CURRENT_COORDINATE.LNG,
  }, 12);
};
const mainMarkerDefaultCoordinate = () => {
  mainMarker.setLatLng({
    lat: CURRENT_COORDINATE.LAT,
    lng: CURRENT_COORDINATE.LNG,
  });
  addressField.value = getCoordinate();
};

//// Правильно ли здесь именнование функции? Или лучше переменовать на onCoordinateClick?
const onClickCoordinate = (evt) => {
  mainMarker.setLatLng(evt.latlng);
  addressField.value = getCoordinate();
};
const onDraggableCoordinate = (evt) => {
  addressField.value = `${evt.target.getLatLng().lat.toFixed(5)}, ${evt.target.getLatLng().lng.toFixed(5)}`;
};

const resetMap = () => {
  mapDefaultCoordinate();
  resetMapFilters();
  map.closePopup();
  setTimeout(() => {
    mainMarkerDefaultCoordinate();
  }, MARKER_RESET_TIME);
};

const onEscKeydownReset = (evt) => {
  if (isEscapeKey(evt)) {
    resetMap();
  }
};

addressField.value = getCoordinate();

map.on('click', onClickCoordinate);
mainMarker.on('moveend', onDraggableCoordinate);

document.querySelector('#map-canvas').addEventListener('keydown', onEscKeydownReset);
mapfilters.addEventListener('keydown', onEscKeydownReset);

const createMarkers = (markers) => {
  markers.forEach((marker) => {
    createMarker(marker);
  });
};

const removeMarker = () => {
  markerGroup.clearLayers();
};

let offers = [];

function resetMapFilters() {
  mapfilters.reset();
  removeMarker();
  createMarkers(filterData(offers));
}

const onMapFilterCahnge = () => {
  removeMarker();
  createMarkers(filterData(offers));
};

const onSuccess = (data) => {
  offers = data.slice();

  createMarkers(offers.slice(0, RENTAL_AD_COUNT));

  mapfilters.addEventListener('change', onMapFilterCahnge);
};

const onFail = () => {
  showAlert();
  setDisableMapFilters();
};

map.on('load', () => {
  makeRequest(onSuccess, onFail, 'GET');
  showPage();
})
  .setView({
    lat: CURRENT_COORDINATE.LAT,
    lng: CURRENT_COORDINATE.LNG,
  }, 12);

export { mainMarkerDefaultCoordinate, resetMap };
