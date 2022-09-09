const fTime = document.getElementById("time");
const fDate = document.getElementById("date");
const fCWeathITEMS = document.getElementById("current-weather-items");
const fTimeZone = document.getElementById("time-zone");
const fCountry = document.getElementById("country");
const fWeathForec = document.getElementById("weather-forecast");
const fCurrentTemp = document.getElementById("current-temp");

const days = ['Domingo','Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado']
const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];


//Con el intervalo refrescamos cada 1000 milisegundos la hora y la fecha
setInterval(() => {
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    const format12hours = hour >= 13 ? hour %12: hour
    const minutes = time.getMinutes();
    const ampm = hour >=12?'PM':'AM'

    fTime.innerHTML = (format12hours < 10? '0'+format12hours : format12hours) + ':' + (minutes < 10? '0'+minutes: minutes)+ ' ' + `<span id="am-pm">${ampm}</span>`

    fDate.innerHTML = days[day] + ', ' + date+ ' ' + months[month]

}, 1000);


const API_KEY = '49cc8c821cd2aff9af04c9f98c36eb74'

getWeather()
function getWeather(){
        navigator.geolocation.getCurrentPosition((success) => {
            
            let {latitude, longitude } = success.coords;
    
            fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`)
            .then(res => res.json())
            .then(data => {
    
            console.log(data)
            showWeatherData(data);
            })
    
        })
}


function showWeatherData (data){
    let {humidity, pressure, sunrise, sunset, wind_speed} = data.current;

    fTimeZone.innerHTML = data.timezone;

    fCWeathITEMS.innerHTML = 
    `<div class="weather-item">
        <div>Humedad</div>
        <div>${humidity}%</div>
    </div>
    <div class="weather-item">
        <div>Presión</div>
        <div>${pressure}</div>
    </div>
    <div class="weather-item">
        <div>Velocidad del Viento</div>
        <div>${wind_speed}</div>
    </div>
    <div class="weather-item">
        <div>Salida del Sol</div>
        <div>${window.moment(sunrise * 1000).format('HH:mm a')}</div>
    </div>
    <div class="weather-item">
        <div>Puesta del Sol</div>
        <div>${window.moment(sunset*1000).format('HH:mm a')}</div>
    </div>
    
    `;
    let otherDays = ''
    data.daily.forEach((day, idx) =>{
        if (idx == 0){
            fCurrentTemp.innerHTML= `
            <img src="http://openweathermap.org/img/wn//${day.weather[0].icon}@4x.png" alt="weather icon" class="w-icon">
            <div class="otro">
                <div class="day">${window.moment(day.dt*1000).format('dddd')}</div>
                <div class="temp">Noche - ${day.temp.night}&#176;C</div>
                <div class="temp">Dia - ${day.temp.day}&#176;C</div>
            </div>
            `
        }else{
            otherDays += `
            <div class="weather-forecast-item">
                <div class="day">${window.moment(day.dt*1000).format('ddd')}</div>
                <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather icon" class="w-icon">
                <div class="temp">Noche - ${day.temp.night}&#176;C</div>
                <div class="temp">Dia - ${day.temp.day}&#176;C</div>
            </div>
            `
        }

    })
    fWeathForec.innerHTML = otherDays;
}