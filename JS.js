function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[dayIndex];

  return `${day} ${hours}:${minutes}`;
}

function displayWeatherCondition(response) {
  document.querySelector("#currentCity").innerHTML = response.data.name;
  document.querySelector("#currentNo").innerHTML = Math.round(
    response.data.main.temp);
    iconElement.setAttribute("src", 
   `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#windSpeed").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#weatherNow").innerHTML =
    response.data.weather[0].main;
}

function searchCity(city) {
  let apiKey = "7a56de110c21e2a9b823cd23ef62bce1";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#inputData").value;
  searchCity(city);

  //let cityElement = document.querySelector("#currentCity");
  //let cityInput = document.querySelector("#inputData");
  //cityElement.innerHTML = cityInput.value;
}

function searchLocation(position) {
  let apiKey = "7a56de110c21e2a9b823cd23ef62bce1";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let dateElement = document.querySelector("#currentTime");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);
let iconElement = document.querySelector("#icon")

let currentLocationButton = document.querySelector("#currentLocationButton");
currentLocationButton.addEventListener("click", getCurrentLocation);
searchCity("London");
