
// Fonction appelée lors du click du bouton
function start(city) {
  // Création de l'objet apiWeather
  const apiWeather = new API_WEATHER();
  // Appel de la fonction fetchTodayForecast
  if(city != null && city != ""){
    apiWeather.setCity(city);
  }

  apiWeather
    .fetchTodayForecast()
    .then(function(response) {
      // Récupère la donnée d'une API
      const data = response.data;
      // On récupère l'information principal
      const main = data.weather[0].main;
      const description = data.weather[0].description;
      const temp = data.main.temp;
      const icon = apiWeather.getHTMLElementFromIcon(data.weather[0].icon);


      // Modifier le DOM
      document.getElementById('today-forecast-main').innerHTML = main;
      document.getElementById('today-forecast-more-info').innerHTML = description;
      document.getElementById('icon-weather-container').innerHTML = icon;
      document.getElementById('today-forecast-temp').innerHTML = `${temp}°C`;      
    })
    .catch(function(error) {
      // Affiche une erreur
      console.error(error);
    });

  apiWeather
    .getThreeDayForcast()
    .then(function(response){
      let dataList = response.data.list;
      for(var i = 0; i<dataList.length-1; i++){
        const main = dataList[i].weather[0].main;
        const description = dataList[i].weather[0].description;
        const temp = dataList[i].temp.day;
        const icon = apiWeather.getHTMLElementFromIcon(dataList[i].weather[0].icon);

        // Modifier le DOM
        document.getElementById('today'+ i +'-forecast-main').innerHTML = main;
        document.getElementById('today'+ i +'-forecast-more-info').innerHTML = description;
        document.getElementById('icon'+ i +'-weather-container').innerHTML = icon;
        document.getElementById('today'+ i +'-forecast-temp').innerHTML = `${temp}°C`;
      }
    })
    .catch(function(error) {
      // Affiche une erreur
      console.error(error);
    });
}

function changeCity(){
  city = document.getElementById("city-input").value;
  start(city);
}