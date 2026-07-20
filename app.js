const output = document.querySelector("#showweatherdata");

let getWeather = () => {
    const city = document.querySelector("#inp").value.trim();
    if (!city) {
        output.innerHTML = `
            <div class="placeholder">
                <p>Please enter a city name to search.</p>
            </div>
        `;
        return;
    }

    output.innerHTML = `
        <div class="placeholder">
            <p>Searching for weather in <strong>${city}</strong>...</p>
        </div>
    `;

    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=ecf07bafe5f67fa8a66abd728beb563b`)
        .then((response) => {
            const data = response.data;
            const temperature = Math.round(data.main.temp);
            const feelsLike = Math.round(data.main.feels_like);
            const humidity = data.main.humidity;
            const description = data.weather[0].description;
            const wind = Math.round(data.wind.speed);

            output.innerHTML = `
                <div class="data-block">
                    <h2>${temperature}°C</h2>
                    <p>${description.charAt(0).toUpperCase() + description.slice(1)}</p>
                    <span>Feels like ${feelsLike}°C · Humidity ${humidity}% · Wind ${wind} km/h</span>
                </div>
            `;
        })
        .catch((error) => {
            console.error(error);
            output.innerHTML = `
                <div class="placeholder">
                    <p>Unable to fetch weather for "${city}". Please try again.</p>
                </div>
            `;
        });
};