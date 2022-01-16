function getCurrentTemp(response) {
  let h1 = document.querySelector("h1");
  let degrees = document.querySelector("#temperature");
  let temp = Math.round(response.data.main.temp);
  let city = response.data.name;
  let forecast = document.querySelector("#description");
  let description = response.data.weather[0].description;

  h1.innerHTML = `${city}`;
  degrees.innerHTML = `${temp}°C`;
  forecast.innerHTML = `${description}`;
}

function getCurrentCityTemp(event) {
  event.preventDefault();

  function handlePosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    let apiKey = "b17588c7696fb561b494319a7441ef17";
    let currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;

    axios.get(currentUrl).then(getCurrentTemp);
  }
  navigator.geolocation.getCurrentPosition(handlePosition);
}
let currentCityButton = document.querySelector("#current-button");
currentCityButton.addEventListener("click", getCurrentCityTemp);

function searchCityTemp(event) {
  event.preventDefault();
  let cityName = document.querySelector("#city-input").value;

  let apiKey = "b17588c7696fb561b494319a7441ef17";
  let searchUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
  axios.get(searchUrl).then(getCurrentTemp);
}

let searchCity = document.querySelector("form");
searchCity.addEventListener("submit", searchCityTemp);

let dateElement = document.querySelector("#date");
let currentTime = new Date();
let dayIndex = currentTime.getDay();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let date = currentTime.getDate();
let monthIndex = currentTime.getMonth();
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let hours = currentTime.getHours();
if (hours < 10) {
  hours = `0${hours} `;
}
let minutes = currentTime.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes} `;
}
dateElement.innerHTML = `${days[dayIndex]}, ${months[monthIndex]} ${date}, ${hours}:${minutes}`;
