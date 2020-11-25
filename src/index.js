//Time and Date
let weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function formatDate(date) {
  let currentWeekDay = weekDays[date.getDay()];
  let currentMonth = months[date.getMonth()];
  let currentDay = date.getDate();
  let currentYear = date.getFullYear();
  let currentHour = date.getHours();
  let currentMinutes =
    date.getMinutes() < 10 ? "0" + date.getMinutes() : "" + date.getMinutes();
  return `${currentWeekDay}, ${currentMonth} ${currentDay}, ${currentYear} <br /> ${currentHour}:${currentMinutes}`;
}
let currentTimeDate = document.querySelector(".time-date");
currentTimeDate.innerHTML = formatDate(new Date());

//Time and Date

//Search Form
let apiKey = "5c6b7792cc22bbb049a8d965ebc483a8";

function searchLocation(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-bar-input");

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&units=metric&appid=${apiKey}`;

  axios.get(apiUrl).then(showTemperature).catch(showError);
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchLocation);

function showTemperature(response) {
  let currentTemperature = Math.round(response.data.main.temp);
  let displayTemperature = document.querySelector(".current-temperature");
  let weather = document.querySelector("#weather");
  let displayedLocation = document.querySelector("#location");

  displayedLocation.innerHTML = response.data.name;
  weather.innerHTML = response.data.weather[0].description;
  displayTemperature.innerHTML = `${currentTemperature}°C `;
}
//Search Form

//Convert Temperature

//function convertToCelsius() {currentTemp.innerHTML = "18°";}

//function convertToFahrenheit() {currentTemp.innerHTML = "64°";}
//let currentTemp = document.querySelector(".current-temperature"); let clickCelsius = document.querySelector(".button-celsius");let clickFahrenheit = document.querySelector(".button-fahrenheit");clickCelsius.addEventListener("click", convertToCelsius);clickFahrenheit.addEventListener("click", convertToFahrenheit);

//Convert Temperature

function showError(error) {
  console.log(error.message);
}

/**
 *
 * @param {*} position
 */
function getPosition(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${apiKey}&units=metric`; //constructApiUrl(lat, long);
  axios.get(apiUrl).then(showTemperature).catch(showError);
}

/**
 * This function construct an Api URL using latitude and longitude.
 * @param {number} lat
 * @param {number} lng
 * @returns {string} url
 */
//function constructApiUrl(lat, lng) {
//  return `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${apiKey}&units=metric`;
//}

/**
 *
 */
function startGeolocation() {
  navigator.geolocation.getCurrentPosition(getPosition);
}

let position = document.querySelector(".button-location");
position.addEventListener("click", startGeolocation);