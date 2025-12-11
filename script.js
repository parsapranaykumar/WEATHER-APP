//API = "http://api.weatherapi.com/v1/forecast.json?key=f3c2180d7bd94648bb2101835252911&Q=Hyderabad&days=3&aqi=yes"

async function getData(e){
    e.preventDefault();
    let BtnElem=document.getElementById("Btn");
    BtnElem.value="Loading...";
    console.log(BtnElem);
   let SearchDataElem= document.forms.SearchData;
   let textBoxElem=SearchData.textBox;
   let city = textBoxElem.value;
   console.log(city);

   try{
    let API = `https://api.weatherapi.com/v1/forecast.json?key=f3c2180d7bd94648bb2101835252911&Q=${city}&days=3&aqi=yes`

     let res = await axios.get(API);
     console.log(res);
        currentDetails(res.data);
        hoursDetails(res.data);
        daysDetails(res.data);
        BtnElem.value="Search";
        textBoxElem.value=""

   
   }
   catch(err){
    alert(err.response.data.error.message);
    console.log(err);
   }

}
function currentDetails(data){
    console.log(data);
    let html=`
   
     <div class="col-8">
            <h6>${data.location.localtime}</h6>
            <h1 class="text-primary">${data.location.name}</h1>
            <h6>${data.location.region},${data.location.country}</h6>
            
            <h1 class="text-primary">${data.current.temp_c}<sup>o</sup>C</h1>

          </div>
          <div class="col-4">

            <img src="${data.current.condition.icon}" >
            <h3>${data.current.condition.text}</h3>
            <h6 class="text-primary">Humidity : ${data.current.humidity}%</h6>
            <h6 class="text-primary">Wind : ${data.current.wind_kph}km/h</h6>
            

          </div>
          

    `
    document.getElementById("currrentRef").innerHTML=html;
}

function hoursDetails(data){
  console.log(data);
  let html=`
   <div class="col-1 hour">
                <h6>12AM</h6>
                <img src="${data.forecast.forecastday[0].hour[0].condition.icon}">
                <h6 class="text-primary">${data.forecast.forecastday[0].hour[0].temp_c}<sup>o</sup>C</h6>

            </div>
            <div class="col-1 hour">
                <h6>2AM</h6>
                <img src="${data.forecast.forecastday[0].hour[1].condition.icon}">
                <h6 class="text-primary">${data.forecast.forecastday[0].hour[1].temp_c}<sup>o</sup>C</h6>
            </div>
            <div class="col-1 hour">
                <h6>4AM</h6>
                <img src="${data.forecast.forecastday[0].hour[2].condition.icon}">
                <h6 class="text-primary">${data.forecast.forecastday[0].hour[2].temp_c}<sup>o</sup>C</h6>
            </div>
            <div class="col-1 hour">
                <h6>6AM</h6>
                <img src="${data.forecast.forecastday[0].hour[3].condition.icon}">
                <h6 class="text-primary">${data.forecast.forecastday[0].hour[3].temp_c}<sup>o</sup>C</h6>
            </div>
            <div class="col-1 hour">
                <h6>8AM</h6>
                <img src="${data.forecast.forecastday[0].hour[4].condition.icon}">
                <h6 class="text-primary">${data.forecast.forecastday[0].hour[4].temp_c}<sup>o</sup>C</h6>
            </div>
            <div class="col-1 hour">
                <h6>10AM</h6>
                <img src="${data.forecast.forecastday[0].hour[5].condition.icon}">
                <h6 class="text-primary">${data.forecast.forecastday[0].hour[5].temp_c}<sup>o</sup>C</h6>
            </div>
            <div class="col-1 hour">
                <h6>12PM</h6>
                <img src="${data.forecast.forecastday[0].hour[6].condition.icon}">
                <h6 class="text-primary">${data.forecast.forecastday[0].hour[6].temp_c}<sup>o</sup>C</h6>
            </div>
            <div class="col-1 hour">
                <h6>2PM</h6>
                <img src="${data.forecast.forecastday[0].hour[7].condition.icon}">
                <h6 class="text-primary">${data.forecast.forecastday[0].hour[7].temp_c}<sup>o</sup>C</h6>
            </div>
            <div class="col-1 hour">
                <h6>4PM</h6>
                <img src="${data.forecast.forecastday[0].hour[8].condition.icon}">
                <h6 class="text-primary">${data.forecast.forecastday[0].hour[8].temp_c}<sup>o</sup>C</h6>
            </div>
            <div class="col-1 hour">
                <h6>6PM</h6>
                <img src="${data.forecast.forecastday[0].hour[9].condition.icon}">
                <h6 class="text-primary">${data.forecast.forecastday[0].hour[9].temp_c}<sup>o</sup>C</h6>
            </div>
            <div class="col-1 hour">
                <h6>8PM</h6>
                <img src="${data.forecast.forecastday[0].hour[10].condition.icon}">
                <h6 class="text-primary">${data.forecast.forecastday[0].hour[10].temp_c}<sup>o</sup>C</h6>
            </div>
            <div class="col-1 hour">
                <h6>10PM</h6>
                <img src="${data.forecast.forecastday[0].hour[11].condition.icon}">
                <h6 class="text-primary">${data.forecast.forecastday[0].hour[11].temp_c}<sup>o</sup>C</h6>
            </div>

  
  
  `
   document.getElementById("hoursRef").innerHTML=html;
}
function daysDetails(data) {
    console.log(data);

    // TODAY
    const today = data.current;
    const todayAQI = today.air_quality?.o3 ?? "—";

    // TOMORROW (summary values under .day)
    const tomorrow = data.forecast.forecastday[1];
    const tomorrowDay = tomorrow.day;
    const tomorrowAQI = tomorrow.hour[12]?.air_quality?.o3 ?? "—"; // midday AQI

    // DAY AFTER TOMORROW
    const dayAfter = data.forecast.forecastday[2];
    const dayAfterDay = dayAfter.day;
    const dayAfterAQI = dayAfter.hour[12]?.air_quality?.o3 ?? "—";

    let html = `
    <!-- TODAY -->
    <div class="forecast-card">
        <span class="day-label">Today</span>
        <div class="info">
            <p class="temp">${today.temp_c}<sup>°</sup>C</p>
            <p class="details">Humidity: ${today.humidity}%</p>
            <p class="details">Wind: ${today.wind_kph} km/h</p>
            <p class="details">Air quality: ${todayAQI}</p>
        </div>
        <img src="${today.condition.icon}" class="weather-icon">
    </div>

    <!-- TOMORROW -->
    <div class="forecast-card">
        <span class="day-label">Tomorrow</span>
        <div class="info">
            <p class="temp">${tomorrowDay.maxtemp_c}<sup>°</sup>C</p>
            <p class="details">Humidity: ${tomorrowDay.avghumidity}%</p>
            <p class="details">Wind: ${tomorrowDay.maxwind_kph} km/h</p>
            <p class="details">Air quality: ${tomorrowAQI}</p>
        </div>
        <img src="${tomorrowDay.condition.icon}" class="weather-icon">
    </div>

    <!-- DAY AFTER TOMORROW -->
    <div class="forecast-card">
        <span class="day-label">Day After Tomorrow</span>
        <div class="info">
            <p class="temp">${dayAfterDay.maxtemp_c}<sup>°</sup>C</p>
            <p class="details">Humidity: ${dayAfterDay.avghumidity}%</p>
            <p class="details">Wind: ${dayAfterDay.maxwind_kph} km/h</p>
            <p class="details">Air quality: ${dayAfterAQI}</p>
        </div>
        <img src="${dayAfterDay.condition.icon}" class="weather-icon">
    </div>
    `;

    document.getElementById("daysRef").innerHTML = html;
}
