const API_KEY = "6f4e22ab9d3f2971f7bf3690dcbc9e9f";
const searchBox = document.querySelector(".search-box");
const city = document.querySelector(".city");
const date = document.querySelector(".date");
const weather = document.querySelector(".weather");
const temperature = document.querySelector(".temperature");
const highLow = document.querySelector(".high-low");

const options = {
  weekday: "long", // short
  year: "numeric",
  month: "long",
  day: "numeric",
};

// event
searchBox.addEventListener("keydown", searchCity);

function searchCity(event) {
  if (event.key === "Enter") {
    console.log(event.target.value);
    getResponse(event.target.value);
  }
}

function getResponse(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
  fetch(url)
    .then((response) => response.json())
    .then(function (data) {
      console.log(data);
      showResult(data);
    });
}

// show result
function showResult(data) {
  const today = new Date();

  city.innerHTML = `${data.name}, ${data.sys.country}`;
  date.innerHTML = today.toLocaleDateString("ko-KR", options);
  weather.innerHTML = data.weather[0].main;
  temperature.innerHTML = `${Math.round(data.main.temp)}°C`;
  highLow.innerHTML = `${Math.round(data.main.temp_min)}°C / ${Math.round(
    data.main.temp_max
  )}°C`;
}
