import { mainMarkerDefaultCoordinate } from './map.js';
import { setOfferForm } from './offer-form.js';
import { clearNoUiSlider } from './price-slider.js';
import './status-form.js';


setOfferForm(() => {
  mainMarkerDefaultCoordinate();
  clearNoUiSlider();
});


// Отрисовка соответствующих выбранным фильтрам меток должна происходить не чаще, чем раз в полсекунды (устранение дребезга).
// Проверка на количество евентов
