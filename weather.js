const apiKey = '20eeea2333msh9e19ee9ffbca7c9p1b45a1jsna5a14cc33d87';
const weatherInfoElement = document.getElementById('weatherInfo');
const weatherForm = document.getElementById('weatherForm');
const toggleButton = document.getElementById('toggleUnits');
// Function to change between celcius ans fahrenheit 
let isCelsius = true;
const celsiusToFahrenheit = (celsius) => (celsius * 9/5) + 32;

const fahrenheitToCelsius = (fahrenheit) => (fahrenheit - 32) * 5/9;

// Function to fetch weather data
const fetchWeatherData = async (location) => {
    const url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${location}`;

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '20eeea2333msh9e19ee9ffbca7c9p1b45a1jsna5a14cc33d87',
            'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error('Unable to fetch weather data');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
};

// Function to display weather data
const displayWeatherData = (weatherData) => {
    const { location, current } = weatherData;
    const temperatureCelsius = current.temp_c;
    const temperatureFahrenheit = celsiusToFahrenheit(temperatureCelsius);
    const condition = current.condition.text;

    const temperature = isCelsius ? temperatureCelsius : temperatureFahrenheit;
    const temperatureUnit = isCelsius ? '°C' : '°F';

    const weatherHtml = `
        <h2>Weather in ${location.name}, ${location.country}</h2>
        <p>Temperature: ${temperature}${temperatureUnit}</p>
        <p>Condition: ${condition}</p>
    `;

    weatherInfoElement.innerHTML = weatherHtml;
};

// Event listener for the form submission
weatherForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const locationInput = document.getElementById('location');
    const location = locationInput.value;

    // Display a loading indicator while fetching data
    weatherInfoElement.innerHTML = 'Fetching weather data...';

    try {
        const weatherData = await fetchWeatherData(location);
        displayWeatherData(weatherData);
    } catch (error) {
        weatherInfoElement.innerHTML = 'Error: Unable to fetch weather data';
    }
});

// Event listener for toggling temperature units
toggleButton.addEventListener('click', () => {
    isCelsius = !isCelsius; // Toggle units
    const temperatureElement = document.querySelector('#weatherInfo p:first-child');
    const temperatureCelsius = parseFloat(temperatureElement.textContent);

    if (isCelsius) {
        temperatureElement.textContent = `${temperatureCelsius}°C`;
    } else {
        const temperatureFahrenheit = celsiusToFahrenheit(temperatureCelsius);
        temperatureElement.textContent = `${temperatureFahrenheit}°F`;
    }
});
