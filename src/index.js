import { openPopup, closePopup } from "./events";
import loadWeather from "./weather";
import {
  citySubmit,
  cityInput,
  mainInput,
  overlay,
  unitsBtn,
  toStart
} from "./dom";

let city;
let units = "metric";

cityInput.addEventListener("input", e => {
  if (cityInput.value.length > 0) {
    citySubmit.classList.add("active");
  } else {
    citySubmit.classList.remove("active");
  }
});

citySubmit.addEventListener("click", e => {
  if ([...citySubmit.classList].includes("active")) {
    city = cityInput.value;
    cityInput.value = "";
    citySubmit.classList.remove("active");
    closePopup(mainInput).then(() => {
      loadWeather(city, units);
    });
  } else {
    alert("City can't be blank");
  }
});

[...unitsBtn].forEach(el => {
  el.addEventListener("click", e => {
    units = el.dataset.value;
    loadWeather(city, units);
  });
});

toStart.addEventListener("click", e => {
  openPopup(overlay);
  openPopup(mainInput);
  openPopup(overlay);
});
