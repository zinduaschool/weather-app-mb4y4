// const url = 'https://weatherapi-com.p.rapidapi.com/current.json?q=53.1%2C-0.13';
// const options = {
// 	method: 'GET',
// 	headers: {
// 		'X-RapidAPI-Key': '20eeea2333msh9e19ee9ffbca7c9p1b45a1jsna5a14cc33d87',
// 		'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
// 	}
// };

// const fetchData = async ()=>{
//         try {
//             const response = await fetch(url, options);
//             const result = await response.json();
//             console.log(result);
//         } catch (error) {
//             console.error(error);
//         }
//     }
    
//     fetchData()

const apiKey = '20eeea2333msh9e19ee9ffbca7c9p1b45a1jsna5a14cc33d87';
const weatherInfoElement = document.getElementById('weatherInfo');
const weatherForm = document.getElementById('weatherForm');

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

const displayWeatherData = (weatherData) => {
    const { location, current } = weatherData;
    const temperatureC = current.temp_c;
    const condition = current.condition.text;

    const weatherHtml = `
        <h2>Weather in ${location.name}, ${location.country}</h2>
        <p>Temperature: ${temperatureC}°C</p>
        <p>Condition: ${condition}</p>
    `;

    weatherInfoElement.innerHTML = weatherHtml;
};

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
