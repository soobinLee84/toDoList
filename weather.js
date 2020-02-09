const weather = document.querySelector(".js-weather");

const API_KEY = "ae6cd257601f366bcf4f63e200d59a6f";
const COORDS = 'coords';

/*fetch()안에는 가져올 데이터가 들어가면된다.
https://넣어주고 **주의 : 따옴표가아닌 backtick(`)을 사용할것!!*/
function getWeather(lat, lng) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
    ).then(function (response) {
        return response.json()
    }).then(function (json) {
        const temperature = json.main.temp;
        const place = json.name;
        weather.innerText = `${temperature}@ ${place}`;
    });
}

function saveCoords(coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj))
}

function handleGeoSucces(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleGeoError() {

}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}

function laodCords() {
    const loadedCoords = localStorage.getItem(COORDS);
    if (loadedCoords === null) {
        askForCoords();
    } else {
        const parseCoords = JSON.parse(loadedCoords);
        getWeather(parseCoords.latitude, parseCoords.longitude);
    }
}


function init() {
    laodCords();
}

init();