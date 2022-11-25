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
}

const getPeriod = (period) => {
    
    return period.split("-").map((value) => parseInt(value));
}

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
}

export{currentValue, currentSkyDescriptionInPeriod};