const mainInput = document.getElementById("mainInput");
const loader = document.getElementById("loader");
const citySubmit = document.getElementById("citySubmit");
const cityInput = document.getElementById("cityInput");
const overlay = document.getElementById("overlay");
const weatherInfo = document.getElementById("weather-info");
const unitsBtn = document.querySelectorAll(".units-btn");
const toStart = document.getElementById("toStart");
let city;
let units = "metric";

async function getWeather(city) {
  return new Promise(async resolve => {
    const url = `https://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=1a7d76daf845e6d9571a1071f31062f1`;
    const response = await fetch(url);
    const data = await response.json();
    resolve(data);
  });
}

const weatherColor = {
  Clear: {
    color: "#34e7e4",
    icon: '🔆'
  },
  Snow: {
    color: "#f5f6fa",
    icon: '❄️'
  },
  Fog: {
    color: "#d2dae2",
    icon: '🌁'
  },
  Mist: {
    color: "#d2dae2",
    icon: '🌁'
  },
  Rain: {
    color: "#808e9b",
    icon: '☂️'
  },
  Clouds: {
    color: "#dcdde1",
    icon: '☁️'
  }
};

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
      loadWeather();
    });
  } else {
    alert("City can't be blank");
  }
});

[...unitsBtn].forEach(el => {
  el.addEventListener("click", e => {
    units = el.dataset.value;
    loadWeather();
  });
});

toStart.addEventListener("click", e => {
  openPopup(overlay);
  openPopup(mainInput);
  openPopup(overlay);
});

function loadWeather() {
  openPopup(loader);
  getWeather(city).then(data => {
    openPopup(overlay);
    closePopup(loader);
    if (data.cod !== 200) {
      openPopup(mainInput);
    }
    closePopup(overlay);
    renderWeather(data);
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

function openPopup(popup) {
  popup.style.visibility = "visible";
  popup.style.opacity = "1";
}

function closePopup(popup) {
  return new Promise(resolve => {
    popup.style.opacity = "0";
    const trans = () => {
      popup.style.visibility = "hidden";
      popup.removeEventListener("transitionend", trans);
      resolve();
    };
    popup.addEventListener("transitionend", trans);
  });
}
