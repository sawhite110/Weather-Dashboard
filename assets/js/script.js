//setting variable for the weather dashboard
var currentCityEl = document.querySelector("#current-city");
var resultContentEl = document.querySelector("#result-content");
var searchFormEl = document.querySelector("#search-form");
var searchEl = document.querySelector("#button-search");
var forcastEl = document.querySelector("#cards");
var dailyImg = document.querySelector("#daily-img");
var cityListEl = document.querySelector("#stored-city");
var clearSearchEl = document.querySelector("#clear-search");
var tempEl = document.querySelector("#temp");
var humidityEl = document.querySelector("#humidity");
var windSpeedEl = document.querySelector("#wind-speed");
var uvIndexEl = document.querySelector(".UV-Index");
var storedCity;
var cityArray = [];
var historyEl = document.getElementById("history");
var searchHistory = JSON.parse(localStorage.getItem("search")) || [];
var weather = { apiKey: "1b4be84cad592d3dbca275b7ff4ef764" };
// Weather api key (1b4be84cad592d3dbca275b7ff4ef764);

function renderCity() {
  cityListEl.innerHTML = " ";
  // cityCountSpan.textContent = cityArray.length; (this is undefined)

  // Render a new li for each city
  for (var i = 0; i < cityArray.length; i++) {
    var cities = cityArray[i];
    console.log(cityArray[i]);

    var li = document.createElement("li");
    li.textContent = cities;
    li.setAttribute("data-index", i);
    li.addEventListener("click", function (event) {
      var citySearch = searchFormEl.value;
    });

    cityListEl.appendChild(li);
    console.log(citySearch);
  }
}
console.log(currentCityEl);

// This function is being called below and will run when the page loads.
function init() {
  // Get stored todos from localStorage
  storedCity = JSON.parse(localStorage.getItem("cityArray"));

  // If citys were retrieved from localStorage, update the citys array to it
  if (storedCity !== null) {
    cityArray = storedCity;
  }

  // This is a helper function that will render todos to the DOM
  renderCity();
}

init();

//Setting the key in local storage for the city name from input search
function storeCity() {
  localStorage.setItem("cityArray", JSON.stringify(cityArray));
}
// Clear search history
clearSearchEl.addEventListener("click", function () {
  searchHistory = [];
  renderSearchHistory();
});

//create a click event for the search field
searchEl.addEventListener("click", function (event) {
  var city = currentCityEl.value;
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&units=imperial&appid=" +
      weather.apiKey,
    {
      cache: "reload",
    }
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      //current weather condition for the city
      var { name } = data;
      var { icon, description } = data.weather[0];
      var { temp, humidity } = data.main;
      var { speed } = data.wind;
      console.log(name, icon, description, temp, humidity, speed);
      var today = new Date().toLocaleDateString();
      console.log(today);
      // Display city conditions to the browser
      document.querySelector(".city").innerText = name;
      document.querySelector(".date").innerText = today;
      document.querySelector(".icon").src =
        "https://openweathermap.org/img/wn/" + icon + "@2x.png";
      document.querySelector(".description").innerText = description;
      document.querySelector(".temp").innerText = temp + " °F";
      document.querySelector(".humidity").innerText =
        "Humidity: " + humidity + "%";
      document.querySelector(".wind").innerText =
        "Wind Speed: " + speed + "MPH";

      //setup a function to append the city list names to the DOM

      //Update the localstorage with the city name input
      if (storedCity !== null) {
        cityArray = storedCity;
      }
    })
    .catch(function (error) {
      console.log("Something went wrong!", error);
    });
  fetch(
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
      city +
      "&units=imperial&appid=" +
      weather.apiKey,
    {
      cache: "reload",
    }
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      //future weather conditions for the city
      //local storage for the 5-Day Focast
    })
    .catch(function (error) {
      console.log("Something else went wrong!", error);
    });
});

// 5 Day forecast
var cityID = response.data.id;
var forecastQueryURL =
"https://api.openweathermap.org/data/2.5/forecast?q=" +
city +
"&units=imperial&appid=" +
weather.apiKey;
axios.get(forecastQueryURL).then(function (response) {
  console.log(response);
  var forecastEls = document.querySelectorAll(".forecast");
  for (i = 0; i < forecastEls.length; i++) {
    forecastEls[i].innerHTML = "";
    var forecastIndex = i * 8 + 4;
    var forecastDate = new Date(response.data.list[forecastIndex].dt * 1000);
    var forecastDay = forecastDate.getDate();
    var forecastMonth = forecastDate.getMonth() + 1;
    var forecastYear = forecastDate.getFullYear();
    var forecastDateEl = document.createElement("p");
    forecastDateEl.setAttribute("class", "mt-3 mb-0 forecast-date");
    forecastDateEl.innerHTML =
      forecastMonth + "/" + forecastDay + "/" + forecastYear;
    forecastEls[i].append(forecastDateEl);
    var forecastWeatherEl = document.createElement("img");
    forecastWeatherEl.setAttribute(
      "src",
      "https://openweathermap.org/img/wn/" +
        response.data.list[forecastIndex].weather[0].icon +
        "@2x.png"
    );
    forecastWeatherEl.setAttribute(
      "alt",
      response.data.list[forecastIndex].weather[0].description
    );
    forecastEls[i].append(forecastWeatherEl);
    var forecastTempEl = document.createElement("p");
    forecastTempEl.innerHTML =
      "Temp: " +
      temptAdjust(response.data.list[forecastIndex].main.temp) +
      " &rgb(22, 154, 194)";
    forecastEls[i].append(forecastTempEl);
    var forecastHumidityEl = document.createElement("p");
    forecastHumidityEl.innerHTML =
      "Humidity: " + response.data.list[forecastIndex].main.humidity + "%";
    forecastEls[i].append(forecastHumidityEl);
  }
});

initPage();
