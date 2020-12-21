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
let searchForm = document.querySelector("#search-form");

function searchLocation(location) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature).catch(showError);
}

function handleSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-bar-input");
  searchLocation(searchInput.value);
}

searchForm.addEventListener("submit", handleSubmit);

searchLocation("Frankfurt");

function showTemperature(response) {
  let currentTemperature = Math.round(response.data.main.temp);
  let displayTemperature = document.querySelector(".current-temperature");
  let weather = document.querySelector("#weather");
  let displayedLocation = document.querySelector("#location");

  updateWeatherEmoji(response.data.weather[0].main);

  celsiusTemperature = response.data.main.temp;

  displayedLocation.innerHTML = response.data.name;
  weather.innerHTML = response.data.weather[0].description;
  displayTemperature.innerHTML = currentTemperature;
}

function updateWeatherEmoji(main) {
  let weatherEmoji = document.querySelector(".emoji-current-weather");

  if (main === "Clouds") {
    weatherEmoji.innerHTML = "☁️";
  } else if (main === "Rain") {
    weatherEmoji.innerHTML = "🌧";
  } else if (main === "Snow") {
    weatherEmoji.innerHTML = "🌨";
  } else if (main === "Drizzle") {
    weatherEmoji.innerHTML = "☔️";
  } else if (main === "Clear") {
    weatherEmoji.innerHTML = "☀️";
  } else if (main === "Thunderstorm") {
    weatherEmoji.innerHTML = "🌩";
  } else {
    weatherEmoji.innerHTML = "🌫";
  }
}
//Search Form

//Convert Temperature

let celsiusTemperature = null;

let fahrenheitButton = document.querySelector(".button-fahrenheit");
fahrenheitButton.addEventListener("click", showFahrenheitTemp);

let celsiusButton = document.querySelector(".button-celsius");
celsiusButton.addEventListener("click", showCelsiusTemp);

function showFahrenheitTemp() {
  let temperatureElement = document.querySelector(".current-temperature");
  celsiusButton.classList.remove("active");
  fahrenheitButton.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function showCelsiusTemp() {
  let temperatureElement = document.querySelector(".current-temperature");
  celsiusButton.classList.add("active");
  fahrenheitButton.classList.remove("active");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}
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
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`; //constructApiUrl(lat, long);

  axios.get(apiUrl).then(showTemperature).catch(showError);
}

/**
 * This function construct an Api URL using latitude and longitude.
 * @param {number} lng
 * @param {number} lat
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
