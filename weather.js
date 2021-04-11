const searchButtonClicked = document.querySelector(".zip-search");
const zipInputField = document.querySelector(".zip-input");

const getAllData = async () => {
  const userZipToUse = zipInputField.value;
  const allData = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?zip=${userZipToUse},us&appid=3f13f8ca2ba61051250b3c015ae9067a&units=imperial`
  );
  const formattedData = await allData.json();
  const zipCheck = formattedData.cod;
  if (zipCheck === 200) {
    const locationForPage = formattedData.name;
    const locationHeader = document.querySelector(".location");
    locationHeader.innerHTML = locationForPage;
    const rawTemperature = formattedData.main.temp;
    const tempForPage = rawTemperature.toFixed(0);
    const temperatureHeader = document.querySelector(".temperature");
    temperatureHeader.innerHTML = `${tempForPage}&deg`;
    const lowForDay = formattedData.main.temp_min;
    const lowForPage = lowForDay.toFixed(0);
    const lowTemperatureHeader = document.querySelector(".low-temp");
    lowTemperatureHeader.innerHTML = `Low: ${lowForPage}&deg`;
    const highForDay = formattedData.main.temp_max;
    const highForPage = highForDay.toFixed(0);
    const highTemperatureHeader = document.querySelector(".high-temp");
    highTemperatureHeader.innerHTML = `High: ${highForPage}&deg`;
    const conditionsForPage = formattedData.weather[0].description;
    const conditionsHeader = document.querySelector(".conditions");
    conditionsHeader.innerHTML = conditionsForPage;
    const imageDiv = document.querySelector(".weather-type");
    const weatherTypeImage = formattedData.weather[0].icon;
    imageDiv.innerHTML = `<img src="http://openweathermap.org/img/wn/${weatherTypeImage}@2x.png">`;
    zipInputField.value = "";
  } else {
    alert("Please enter a valid zip code");
  }
};

searchButtonClicked.addEventListener("click", (e) => {
  e.preventDefault();
  getAllData();
});
