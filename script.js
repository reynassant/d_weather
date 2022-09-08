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

        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.log('error', error)); 
        })

    };