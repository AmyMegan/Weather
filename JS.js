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

function getForcast(coordinates) {
  console.log(coordinates);

  let apiKey = `7a56de110c21e2a9b823cd23ef62bce1`;
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&unit=metric`
  console.log(apiURL)
  axios.get(apiURL).then(displayForcast);
}

function displayWeatherCondition(response) {
  celsiusTemperature = response.data.main.temp;
  document.querySelector("#currentCity").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp);
    iconElement.setAttribute("src", 
   `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#windSpeed").innerHTML = Math.round(
    celsiusTemperature
  );
  document.querySelector("#weatherNow").innerHTML =
    response.data.weather[0].main;


 getForcast(response.data.coord)

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

function displayForcast(response) {
  console.log(response.data.daily);
  let forcastElement = document.querySelector("#forcast");

  let days = ["Thu", "Fri", "Sat", "Sun", "Mon"];
  let forcastHTML = `<div class="row">`
  days.forEach (function (day) {
      forcastHTML = forcastHTML +  
          `
          <div class="col">
            ${day}
            <div>
              <img>❄️</img>

              <p class="temp">
                1°C / 5°C
              </p>
            </div>
          </div>
         `
  });

  forcastHTML = forcastHTML + `</div>`;
  forcastElement.innerHTML = forcastHTML;
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

function displayFahrenheitTemperature(event) {
event.preventDefault();
let temperatureElement = document.querySelector("#temperature")
let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
temperatureElement.innerHTML = Math.round(fahrenheitTemperature);

celsiusTemperature = response.data.main.temp;
}

function displayCelsiusTemperature(event) {
  let temperatureElement = document.querySelector("#temperature")
  temperatureElement.innerHTML  = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let dateElement = document.querySelector("#currentTime");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);
let iconElement = document.querySelector("#icon")

let currentLocationButton = document.querySelector("#currentLocationButton");
currentLocationButton.addEventListener("click", getCurrentLocation);

let fahrenheitLink = document.querySelector("#Fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#Celsius-link")
celsiusLink.addEventListener("click", displayCelsiusTemperature)

searchCity("London");
//displayForcast();