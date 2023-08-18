function formatDateTime(dateTime) {
  let hours = dateTime.getHours();
  let minutes = dateTime.getMinutes();

  let dateIndex = dateTime.getDay();
  let daysVariation = ["Sun", "Mon", "Tue", "Wed", "Th", "Fr", "Sat"];
  let currentDay = daysVariation[dateIndex];

  return `${currentDay} ${hours}:${minutes}`;
}

function showCurrentWeather(response) {
  document.querySelector("#newCity").innerHTML = response.data.name;
  document.querySelector("#temp").innerHTML = Math.round(
    response.data.main.temp
  );

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#weatherDescription").innerHTML =
    response.data.weather[0].main;
}

function searchCity(city) {
  let apiKey = "cabdbda40038ba7d1165b953b1c7bd6c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCurrentWeather);
}

function buttonSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#enterCity").value;
  searchCity(city);
}

function determineLocation(position) {
  let apiKey = "cabdbda40038ba7d1165b953b1c7bd6c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showCurrentWeather);
}

function showCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(determineLocation);
}

function CelsiusFahrenheit(event) {
  event.preventDefault();
  let tempInMetric = document.querySelector("#temp");
  tempInMetric.innerHTML = 75.2;
}

function FahrenheitCelsius(event) {
  event.preventDefault();
  let tempInMetric2 = document.querySelector("#temp");
  tempInMetric2.innerHTML = 24;
}

let time = document.querySelector("#todaysDay");
let currentTimeDate = new Date();
time.innerHTML = formatDateTime(currentTimeDate);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", buttonSubmit);

let locationButton = document.querySelector("#currentCity");
locationButton.addEventListener("click", showCurrentLocation);

searchCity("Harbin");
