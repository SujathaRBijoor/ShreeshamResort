document.addEventListener("DOMContentLoaded", () => {
    const latitudeElement = document.getElementById("latitude");
    const longitudeElement = document.getElementById("longitude");
    const locationNameElement = document.getElementById("locationName");
    const temperatureElement = document.getElementById("temperature");
    const weatherDescriptionElement = document.getElementById("weatherDescription");
    const humidityElement = document.getElementById("humidity");
    const windSpeedElement = document.getElementById("windSpeed");
    const weatherInfo = document.getElementById("weatherInfo");

    // Get user's geolocation
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;

            latitudeElement.textContent = latitude.toFixed(6);
            longitudeElement.textContent = longitude.toFixed(6);

            // Use the OpenWeatherMap API to get weather data
            const apiKey = "key"; // Replace with your OpenWeatherMap API key
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

            try {
                const response = await fetch(apiUrl);
                const data = await response.json();

                locationNameElement.textContent = data.name;
                temperatureElement.textContent = data.main.temp;
                weatherDescriptionElement.textContent = data.weather[0].description;
                humidityElement.textContent = data.main.humidity;
                windSpeedElement.textContent = data.wind.speed;
                weatherInfo.style.display = "block";
            } catch (error) {
                console.error("Error fetching weather data:", error);
                weatherInfo.style.display = "none";
                alert("Failed to fetch weather data. Please try again later.");
            }
        });
    } else {
        alert("Geolocation is not supported in your browser. Please enable geolocation or try another browser.");
    });
});
