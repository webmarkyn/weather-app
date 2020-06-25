const mainInput = document.getElementById('mainInput');
const loader = document.getElementById('loader');
const citySubmit = document.getElementById('citySubmit');
const cityInput = document.getElementById('cityInput');
const errorPopup = document.getElementById('popupWrapper');
const overlay = document.getElementById('overlay');
const weatherInfo = document.getElementById('weather-info');
const unitsBtn = document.querySelectorAll('.units-btn');
const toStart = document.getElementById('toStart');

export {
  mainInput,
  loader,
  cityInput,
  citySubmit,
  overlay,
  weatherInfo,
  unitsBtn,
  toStart,
  errorPopup
};
