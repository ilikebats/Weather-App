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

// formats the date and shows it in html
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

let apiKey = "5c6b7792cc22bbb049a8d965ebc483a8";
let searchForm = document.querySelector("#search-form");

// handles api call for the current temperature and the forecast and sends it to the showTemperature and showForecast functions
function searchLocation(location) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature).catch(showError);

  let apiUrlForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&appid=${apiKey}`;
  axios.get(apiUrlForecast).then(showForecast).catch(showError);
}

function showForecast(response) {
  // assigns the date at this very moment
  let dateToday = new Date();

  let forecast = response.data;
  let forecastData = forecast.list;
  let forecastElement = document.querySelector("#forecastTemplate");

  // resets the forecast html to avoid building up html with every search submit
  forecastElement.innerHTML = null;

  let currentListDate = null;
  let nextListDate = null;
  let sumMin = [];
  let sumMax = [];
  let dayAtThisIndex = null;

  for (let index = 0; index < forecastData.length - 1; index = index + 1) {
    currentListDate = new Date(forecastData[index].dt_txt);
    nextListDate = new Date(forecastData[index + 1].dt_txt);
    dayAtThisIndex = forecastData[index];

    // If the day we are currently on in the index is different than the day it is today
    if (currentListDate.getDate() !== dateToday.getDate()) {
      // If the next day (day with increased index by 1, or the next one in the list) is
      // different than the day we are currently on
      if (
        nextListDate.getDate() !== currentListDate.getDate() ||
        index === forecastData.length - 2
      ) {
        // assign to var sum -> sum + stored temperature
        sumMin.push(dayAtThisIndex.main.temp_min);
        sumMax.push(dayAtThisIndex.main.temp_max);

        forecastElement.innerHTML += `
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">
                  ${weekDays[currentListDate.getDay()]}
              </h5>
                <p class="card-text">
                  <p class="date-forecast">
                    ${currentListDate.getDate()}/${
          currentListDate.getMonth() + 1
        }
                </p>
                  <p class="emoji-6d-forecast forecast-day-${index}">
                      Emoji
                  </p>
                      <p class="temperature-6d-forecast">
                      ↑ ${Math.round(Math.max(...sumMax))}°/${Math.round(
          Math.min(...sumMin)
        )}°↓
                      </p>
                    </p>
                  </div>
          </div>`;

        let weatherEmoji = document.querySelector(`.forecast-day-${index}`);
        updateWeatherEmoji(weatherEmoji, dayAtThisIndex.weather[0].main);

        // reset the counters after completing the day
        sumMin = [];
        sumMax = [];
      } else {
        sumMin.push(dayAtThisIndex.main.temp_min);
        sumMax.push(dayAtThisIndex.main.temp_max);
      }
    }
  }
}

/**
 * handles the search submit -> sends the input of user (a location) to the searchLocation function
 * @param {*} event
 */
function handleSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-bar-input");
  searchLocation(searchInput.value);
  searchInput.value = "";
}

searchForm.addEventListener("submit", handleSubmit);

/**
 * Default location displayed when loading the page.
 */
searchLocation("Frankfurt");

/**
 * Gets a response from an api call
shows data for current temperature, windspeed, 
felt temperature and the location in html
 sends data to updateWeatherEmoji function.
 * @param {object} response 
 */
function showTemperature(response) {
  let currentTemperature = Math.round(response.data.main.temp);
  let displayTemperature = document.querySelector(".current-temperature");
  let weather = document.querySelector("#weather");
  let displayedLocation = document.querySelector("#location");
  let feltTempElement = document.querySelector(".feels-like-temp");
  let windspeedElement = document.querySelector(".windspeed");
  let humidityElement = document.querySelector(".humidity");

  let weatherEmoji = document.querySelector(".emoji-current-weather");
  updateWeatherEmoji(weatherEmoji, response.data.weather[0].main);

  celsiusTemperature = response.data.main.temp;

  displayedLocation.innerHTML = response.data.name;
  weather.innerHTML = response.data.weather[0].description;
  displayTemperature.innerHTML = currentTemperature;
  feltTempElement.innerHTML = `feels like: ${Math.round(
    response.data.main.feels_like
  )}°C`;
  windspeedElement.innerHTML = `wind: ${Math.round(
    response.data.wind.speed
  )} km/h`;
  humidityElement.innerHTML = `humidity: ${Math.round(
    response.data.main.humidity
  )}%`;
}

/**
 * Gets an element and weather description from api response
 updates the emoji according to the if- statement in the forecast 
 and current weather.
 * @param {HTMLParagraphElement} element 
 * @param {string} description 
 */
function updateWeatherEmoji(element, description) {
  if (description === "Clouds") {
    element.innerHTML = "☁️";
  } else if (description === "Rain") {
    element.innerHTML = "🌧";
  } else if (description === "Snow") {
    element.innerHTML = "🌨";
  } else if (description === "Drizzle") {
    element.innerHTML = "☔️";
  } else if (description === "Clear") {
    element.innerHTML = "☀️";
  } else if (description === "Thunderstorm") {
    element.innerHTML = "🌩";
  } else {
    element.innerHTML = "🌫";
  }
}

let celsiusTemperature = null;

let fahrenheitButton = document.querySelector(".button-fahrenheit");
fahrenheitButton.addEventListener("click", showFahrenheitTemp);

let celsiusButton = document.querySelector(".button-celsius");
celsiusButton.addEventListener("click", showCelsiusTemp);

/**
 * Handles unit-conversion from celsius to fahrenheit for the current temperature.
 */
function showFahrenheitTemp() {
  let temperatureElement = document.querySelector(".current-temperature");
  celsiusButton.classList.remove("active");
  fahrenheitButton.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

/**
 * Handles unit-conversion from fahrenheit to celsius for the current temperature.
 */
function showCelsiusTemp() {
  let temperatureElement = document.querySelector(".current-temperature");
  celsiusButton.classList.add("active");
  fahrenheitButton.classList.remove("active");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

/**
 * Displays an error in the console.
 * @param {object} error
 */
function showError(error) {
  console.log(error.message);
}

/** Gets a position from the startGeolocation function and constructs an api url
 * sends the result to showTemperature and showForecast functions.
 * @param {string} position - Position that the user inputs
 */
function getPosition(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`; //constructApiUrl(lat, long);
  let apiUrlForecast = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&units=metric&appid=${apiKey}`;

  axios.get(apiUrl).then(showTemperature).catch(showError);
  axios.get(apiUrlForecast).then(showForecast).catch(showError);
}

/** gets the current position of the user
 *
 */
function startGeolocation() {
  navigator.geolocation.getCurrentPosition(getPosition);
}

let position = document.querySelector(".button-location");
position.addEventListener("click", startGeolocation);
