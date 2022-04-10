import { createMarker, mainMarkerDefaultCoordinate } from './map.js';
import { showAlert } from './utils.js';
import { setOfferForm } from './offer-form.js';
import { getData } from './api.js';

getData(createMarker, showAlert);

setOfferForm(mainMarkerDefaultCoordinate);
