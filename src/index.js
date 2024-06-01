function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature-value");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#temperature-icon");

  cityElement.innerHTML = response.data.city;
  timeElement.innerHTML = formatDate(date);

  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;
  temperatureElement.innerHTML = Math.round(temperature);
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="current-temperature-icon"/>`;

  getForecast(response.data.city);
}

function formatDate(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "ec00aa08afab6385c60b468o5877e14t";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayTemperature);
}

function searchSubmit(event) {
  event.preventDefault();
  let inputElement = document.querySelector("#search-city");
  searchCity(inputElement.value);
}

function getForecast(city) {
  let apiKey = "ec00aa08afab6385c60b468o5877e14t";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let days = ["Tue", "Wed", "Thu", "Fri", "Sat"];
  let forecastHtml = "";

  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `
          <div class="weather-forecast-day">
            <div class="weather-forecast-date">${day}</div>
            <div class="weather-forecast-icon">🌞</div>
            <div class="weather-forecast-temperature">
              <div class="weather-forecast-temperature-max">
                <strong>25</strong>
              </div>
              <div class="weather-forecast-temperature-min">12</div>
            </div>
          </div>
          `;
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

let formElement = document.querySelector("#search-form-input");
formElement.addEventListener("submit", searchSubmit);

searchCity("Porto");
