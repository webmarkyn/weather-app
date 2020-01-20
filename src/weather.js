import weatherColor from "./colors";
import { loader, overlay, mainInput, weatherInfo} from "./dom";
import {openPopup, closePopup} from './events'

async function getWeather(city, units) {
  return new Promise(async resolve => {
    const url = `https://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=1a7d76daf845e6d9571a1071f31062f1`;
    const response = await fetch(url);
    const data = await response.json();
    resolve(data);
  });
}

function renderWeather(data) {
  weatherInfo.innerHTML = `
      <h2 class="weather-city">${data.name}</h2>
      <div class="weather-color" style="background: ${
        weatherColor[data.weather[0].main].color
      }">
        ${weatherColor[data.weather[0].main].icon}
      </div>
      <div class="weather-desc">${data.weather[0].main}</div>
      <div class="weather-temp">${data.main.temp}°</div>
    `;
}

export default function loadWeather(city, units) {
  openPopup(loader);
  getWeather(city, units).then(data => {
    openPopup(overlay);
    closePopup(loader);
    if (data.cod !== 200) {
      openPopup(mainInput);
    }
    closePopup(overlay);
    renderWeather(data);
  });
}
