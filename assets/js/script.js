//setting variable for the weather dashboard
var currentCityEl = document.querySelector("#current-city");
var resultTextEl = document.querySelector("#result-text");
var resultContentEl = document.querySelector("#result-content");
var searchFormEl = document.querySelector("#search-form");
var searchEl = document.querySelector("#button-search");
var cityName = document.querySelector("#ciy-name");
var forcastEl = document.querySelector("#cards");
var dailyImg = document.querySelector("#daily-img");
var cityListEl = document.querySelector("#stored-city");
var clearSearchEl = document.querySelector("#clear-search");
var tempEl = document.querySelector("#temp");
var humidityEl = document.querySelector("#humidity");
var windSpeedEl = document.querySelector("#wind-speed");
var uvIndexEl = document.querySelector("#UV-Index");


//create a click event for the search field

searchEl.addEventListener("click", function(event) {
  var city = currentCityEl.value;
  fetch("http://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=1b4be84cad592d3dbca275b7ff4ef764", {
    cache: "reload"
  })
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    //current weather condition for the city
    

    //setup a function to append the city list names to the DOM
    var cityArray = [];

    function renderCity() {
      cityListEl.innerHTML = "";
      cityCountSpan.textContent = cityArray.length;

      // Render a new li for each city
      for (var i = 0; i < cityArray.length; i++) {
        var cities = cityArray[i];

        var li = document.createElement("li");
        li.textContent = cities;
        li.setAttribute("data-index", i);

        cityListEl.appendChild(li);
      }
    }

    // This function is being called below and will run when the page loads.
    function init() {
      // Get stored todos from localStorage
      var storedCity = JSON.parse(localStorage.getItem("cityArray"));

      // If todos were retrieved from localStorage, update the todos array to it
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
    //Update the localstorage witht the city name input
    if (storeCity !== null) {
      cityArray = storedCity;
    }
  })
  .catch(function (error) {
    console.log("Something went wrong!", error);
  });
  fetch("http://api.openweathermap.org/data/2.5/forecast?q="+city+"&appid=1b4be84cad592d3dbca275b7ff4ef764", {
    cache: "reload"
  })
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
  })
})











// Weather api key (1b4be84cad592d3dbca275b7ff4ef764);




// //local storage for the city name from input search
