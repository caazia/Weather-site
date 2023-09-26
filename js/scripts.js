const apiKey = "82005d27a116c2880c8f0fcb866998a0"; /* CHAVE ALEATORIA DA NET */
const apiUnsplash = "https://source.unsplash.com/1600x900/?";

const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search");

const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temperature span");
const descElement = document.querySelector("#description");
const weatherIconElement = document.querySelector("#weather-icon");
const countryElement = document.querySelector("#country");
const humidityElement = document.querySelector("#humidity span");
const windElement = document.querySelector("#wind span");

const weatherContainer = document.querySelector("#weather-data");

const errorMensageContainer = document.querySelector("#error-mensage");
const loader = document.querySelector("#loader");

//carregamento
const toggleLoader = () => {
    loader.classList.toggle("hide");
}

const getWeatherData = async(city) => {
    toggleLoader();
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br}`

    const res = await fetch(apiWeatherURL)
    const data = await res.json()

    toggleLoader();

    return data;
}

//tratamento de erro

const showErrorMensage = () => {
    errorMensageContainer.classList.remove("hide");
};

const hideInformation = () => {
    errorMensageContainer.classList.add("hide");
    weatherContainer.classList.add("hide");
}

const showWeatherData = async(city) => {
    hideInformation();

    const data = await getWeatherData(city);

    if (data.cod === "404") {
        showErrorMensage();
        return;
    }

    cityElement.innerText = data.name;
    tempElement.innerText = parseInt(data.main.temp);
    descElement.innerText = data.weather[0].description;
    weatherIconElement.setAttribute("src", `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
    countryElement.setAttribute("src", `https://flagsapi.com/${data.sys.country}/shiny/64.png`);
    humidityElement.innerText = `${data.main.humidity}%`;
    windElement.innerText = `${data.wind.speed}km/h`;

    //mudar imagem de fundo
    
    document.body.style.backgroundImage = `url("${apiUnsplash + city}")`;
    weatherContainer.classList.remove("hide");
}

searchBtn.addEventListener("click", async (e) => {
    e.preventDefault();

    const city = cityInput.value;

    showWeatherData(city)
});

cityInput.addEventListener("keyup", (e) => {
    if (e.code === "Enter") {
        const city = e.target.value;

        showWeatherData(city);
    }
})