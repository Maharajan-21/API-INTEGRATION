async function getWeather() {
  const city = document.getElementById("city").value;
  const weatherDiv = document.getElementById("weather");

  if (!city) {
    weatherDiv.innerHTML = "Please enter a city name.";
    return;
  }

  // Get latitude & longitude using Open-Meteo geocoding
  const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${city}`;
  const geoRes = await fetch(geoUrl);
  const geoData = await geoRes.json();

  if (!geoData.results) {
    weatherDiv.innerHTML = "City not found.";
    return;
  }

  const { latitude, longitude } = geoData.results[0];

  const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
  const weatherRes = await fetch(weatherUrl);
  const weatherData = await weatherRes.json();

  const weather = weatherData.current_weather;

  weatherDiv.innerHTML = `
    <h3>${city}</h3>
    <p>🌡 Temperature: ${weather.temperature}°C</p>
    <p>💨 Wind Speed: ${weather.windspeed} km/h</p>
  `;
}
