async function searchWeather() {
    const city = document.getElementById('cityInput').value;
    const apiKey = '2c7f88f770a484f4768ffac7b54b258c';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        const cityName = document.getElementById('cityName');
        cityName.textContent = data.name;

        const weatherDescription = data.weather[0].description; // Get weather description
        const weatherDescElement = document.getElementById('weatherDescription');
        weatherDescElement.textContent = weatherDescription.charAt(0).toUpperCase() + weatherDescription.slice(1);

        const details = document.getElementById('details');
        details.innerHTML = `
            <p>Temperature: ${(data.main.temp - 273.15).toFixed(1)}°C</p>
            <p>Humidity: ${data.main.humidity}%</p>
        `;

        const weatherIcon = document.getElementById('weatherIcon');
        weatherIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
        weatherIcon.alt = data.weather[0].main;

        // Show weather box
        const weatherBox = document.getElementById('weatherInfo');
        weatherBox.style.display = 'block';
    } catch (error) {
        console.error('Error fetching weather data:', error);
        alert('Please enter a valid city name.');
    }
}
