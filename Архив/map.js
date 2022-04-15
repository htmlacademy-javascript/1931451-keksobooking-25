import { showPage } from './status-page.js';
import { renderOffer } from './render-offer.js';
import { isEscapeKey, showAlert } from './utils.js';
import { makeRequest } from './api.js';

const RENTAL_AD_COUNT = 10;

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
    size: [52, 52],
    anchor: [26, 52],
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
    .addTo(map)
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

const addressField = document.querySelector('#address');
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

const onClickCoordinate = (evt) => {
  mainMarker.setLatLng(evt.latlng);
  addressField.value = getCoordinate();
};
const onDraggableCoordinate = (evt) => {
  addressField.value = `${evt.target.getLatLng().lat.toFixed(5)}, ${evt.target.getLatLng().lng.toFixed(5)}`;
};

addressField.value = getCoordinate();
addressField.style.opacity = '0.6';

map.on('click', onClickCoordinate);
mainMarker.on('moveend', onDraggableCoordinate);


document.querySelector('#map-canvas').addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    mapDefaultCoordinate();
    mainMarkerDefaultCoordinate();
  }
});

const createMarkers = (markers) => {
  markers.forEach((marker) => {
    createMarker(marker);
  });
};

let offers = [];

const onSuccess = (data) => {
  offers = data.slice();

  createMarkers(offers.slice(0, RENTAL_AD_COUNT));
};

map.on('load', () => {
  makeRequest(onSuccess, showAlert, 'GET');
  showPage();
}).setView({
  lat: CURRENT_COORDINATE.LAT,
  lng: CURRENT_COORDINATE.LNG,
}, 12);

export { createMarker, mainMarkerDefaultCoordinate };
