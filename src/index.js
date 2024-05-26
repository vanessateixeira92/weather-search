function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature-value");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = Math.round(temperature);
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

let formElement = document.querySelector("#search-form-input");
formElement.addEventListener("submit", searchSubmit);

searchCity("Porto");
