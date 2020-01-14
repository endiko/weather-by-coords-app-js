// Selected elements
const titleElement = document.querySelector('.weather-app__title');
const notificationElement = document.querySelector('.weather-app__notification');
const iconElement = document.querySelector('.weather-app__icon-wrapper');
const temperatureElement = document.querySelector('.weather-app__temperature-value');
const descElement = document.querySelector('.weather-app__temperature-desc');
const locationElement = document.querySelector('.weather-app__location');


// App data
const weather = {};

weather.temperature = {
    unit: 'celsius'
};

// App const and vars

const KELVIN = 273;
const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
}

// API key
const key = '744a894c52e8e651e58f052a61080637';
//  set user's position

function setPosition(position) {
    let lat = position.coords.latitude;
    let long = position.coords.longitude;
    let accur = position.coords.accuracy;

    console.log(lat, long, accur)

    getWeather(lat, long)
}

function showError(error) {
    notificationElement.getElementsByClassName.display = 'flex';
    notificationElement.innerHTML = `<p>${error.message}</p>`
}

function getWeather(lat, long) {
    let api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${key}&lang=en`;

    fetch(api).then(function (response) {
        let data = response.json();
        return data;
    }).then(function (data) {
        console.log(data)
        weather.temperature.value = Math.floor(data.main.temp - KELVIN);
        weather.description = data.weather[0].description;
        weather.iconId = data.weather[0].icon;
        weather.city = data.name;
        weather.country = data.sys.country;
    }).then(function () {
        displayWeather();
    })
}

// Display weather function

function displayWeather() {
    const imgBasePath = `http://openweathermap.org/img/wn/`;

    iconElement.innerHTML = `<img src="${imgBasePath}${weather.iconId}@2x.png" />`;
    temperatureElement.innerHTML = `${weather.temperature.value}&#176;<span>C</span>`;
    descElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city}, ${weather.country}`;
}

// Convert from Celsius to Fahrenheit

function celsiusToFahrenheit(temperature) {
    return (temperature * 9 / 5) + 32;
}


temperatureElement.addEventListener('click', function (e) {
    if (weather.temperature.value === undefined) return;

    if (weather.temperature.unit === 'celsius') {
        let fahrTemperature = Math.floor(celsiusToFahrenheit(weather.temperature.value));
        temperatureElement.innerHTML = `${fahrTemperature}&#176;<span>F</span>`;
        weather.temperature.unit = 'fahrenheit';
    } else {
        temperatureElement.innerHTML = `${weather.temperature.value}&#176;<span>C</span>`;
        weather.temperature.unit = 'celsius';
    }
})

function getTodayDate() {
    const date = new Date();
    const options = {
        year: 'numeric', month: 'long', day: 'numeric'
    };
    const today = date.toLocaleDateString('en-En', options);
    titleElement.innerHTML = `Today is <span>${today}</span>`
}

document.addEventListener('DOMContentLoaded', () => {
    getTodayDate();

    // check if browser support geolocation

    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(setPosition, showError, options);
    } else {
        notificationElement.getElementsByClassName.display = 'flex';
        notificationElement.innerHTML = `<p>Browser doesn't support geolocation</p>`;
    }
})