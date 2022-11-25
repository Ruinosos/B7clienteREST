const BASE_URL = "http://openweathermap.org/img/wn/";
const END_IMG = "@2x.png";

const currentValue = (arrayOfValues, hour) => {
    let minDif = 100;
    let value;
    // Search for the temperature of the current hour
    for(let i = 0; i < arrayOfValues.length; i++) {
        const dif = Math.abs(arrayOfValues[i].hora - hour);
        if(dif < minDif) {
            minDif = dif;
            value = arrayOfValues[i].value;
        }

    }
    return value;
};

const getPeriod = (period) => {
    
    return period.split("-").map((value) => parseInt(value));
};

const currentSkyDescriptionInPeriod = (arrayOfValues, hour) => {
    let value;
    let period;
    for(let i = 3; i < arrayOfValues.length; i++) {
        period = getPeriod(arrayOfValues[i].periodo);
        if(hour >= period[0] && hour <= period[1]) {
            value = arrayOfValues[i].descripcion;
            break;
        }
    }

    return value;
};

const getUrlImage = (description) => {
    let url;
    switch(description) {
        case "Despejado":
            url = `${BASE_URL}/01d${END_IMG}`;
            break;
        case "Poco nuboso":
            url = `${BASE_URL}/02d${END_IMG}`;
            break;
        case "Nuboso":
            url = `${BASE_URL}/03d${END_IMG}`;
            break;
        case "Intervalos nubosos":
            url = `${BASE_URL}/04d${END_IMG}`;
            break;
        case "Cubierto":
            url = `${BASE_URL}/04d${END_IMG}`;
            break;
        case "Nubes altas":
            url = `${BASE_URL}/04d${END_IMG}`;
            break;
        case "Muy nuboso":
            url = `${BASE_URL}/04d${END_IMG}`;
            break;
        case "Nubes medias y altas":
            url = `${BASE_URL}/04d${END_IMG}`;
            break;
        case "Nubes bajas y medias":
            url = `${BASE_URL}/04d${END_IMG}`;
            break;
        case "Nubes altas y muy nuboso":
            url = `${BASE_URL}/04d${END_IMG}`;
            break;
        case "Nubes bajas y altas":
            url = `${BASE_URL}/04d${END_IMG}`;
            break;
        case "Nubes bajas, medias y altas":
            url = `${BASE_URL}/04d${END_IMG}`;
            break;
        case "Nubes bajas y muy nuboso":
            url = `${BASE_URL}/04d${END_IMG}`;
            break;
        case "Nubes medias, altas y muy nuboso":
            url = `${BASE_URL}/04d${END_IMG}`;
            break;
        case "Nubes bajas, medias, altas y muy nuboso":
            url = `${BASE_URL}/04d${END_IMG}`;
            break;
        case "Intervalos nubosos con lluvia escasa":
            url = `${BASE_URL}/09d${END_IMG}`;
            break; 
        case "Intervalos nubosos con lluvia":
            url = `${BASE_URL}/09d${END_IMG}`;
            break;
        case "Intervalos nubosos con lluvia y tormenta":
            url = `${BASE_URL}/11d${END_IMG}`;
            break;
        case "Intervalos nubosos con nieve escasa":
            url = `${BASE_URL}/13d${END_IMG}`;
            break;
        case "Intervalos nubosos con nieve":
            url = `${BASE_URL}/13d${END_IMG}`;
            break;
        case "Intervalos nubosos con tormenta":
            url = `${BASE_URL}/11d${END_IMG}`;
            break;
        case "Intervalos nubosos con lluvia y nieve escasa":
            url = `${BASE_URL}/13d${END_IMG}`;
            break;
        case "Intervalos nubosos con lluvia y nieve":
            url = `${BASE_URL}/13d${END_IMG}`;
            break;
        case "Nuboso con lluvia escasa":
            url = `${BASE_URL}/09d${END_IMG}`;
            break;
        case "Nuboso con lluvia":
            url = `${BASE_URL}/09d${END_IMG}`;
            break;
        case "Nuboso con tormenta":
            url = `${BASE_URL}/11d${END_IMG}`;
            break;
        default:
            url = `${BASE_URL}/50d${END_IMG}`;
    };
    return url;
};

export{currentValue, currentSkyDescriptionInPeriod, getUrlImage};