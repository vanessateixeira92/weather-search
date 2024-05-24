function searchCity(event) {
  event.preventDefault();
  let inputElement = document.querySelector("#search-city");
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = inputElement.value;
}

let formElement = document.querySelector("#search-form-input");
formElement.addEventListener("submit", searchCity);
