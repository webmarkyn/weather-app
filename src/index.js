import { openPopup, closePopup } from './events';
import loadWeather from './weather';
import {
  citySubmit,
  cityInput,
  mainInput,
  overlay,
  unitsBtn,
  toStart,
} from './dom';

let city;
let units = 'metric';

cityInput.addEventListener('input', () => {
  if (cityInput.value.length > 0) {
    citySubmit.classList.add('active');
  } else {
    citySubmit.classList.remove('active');
  }
});

citySubmit.addEventListener('click', () => {
  if ([...citySubmit.classList].includes('active')) {
    city = cityInput.value;
    cityInput.value = '';
    citySubmit.classList.remove('active');
    closePopup(mainInput).then(() => {
      loadWeather(city, units);
    });
  } else {
    // eslint-disable-next-line no-alert
    alert("City can't be blank");
  }
});

[...unitsBtn].forEach((el) => {
  el.addEventListener('click', () => {
    units = el.dataset.value;
    loadWeather(city, units);
  });
});

toStart.addEventListener('click', () => {
  openPopup(overlay);
  openPopup(mainInput);
  openPopup(overlay);
});
