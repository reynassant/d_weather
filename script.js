const mTiempo = document.getElementById("time");


var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
fetch("https://api.openweathermap.org/data/2.5/weather?q=madrid&APPID=ccab882185f6b3e0e5bf39ec3eb0d330&units=metric", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error)); 

