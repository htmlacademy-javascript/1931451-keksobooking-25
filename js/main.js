import { setMainMarkerDefaultCoordinate } from './map.js';
import { setOfferForm } from './offer-form.js';
import { clearNoUiSlider } from './price-slider.js';
import './status-form.js';


setOfferForm(() => {
  setMainMarkerDefaultCoordinate();
  clearNoUiSlider();
});
