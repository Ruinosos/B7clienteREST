import { Popup } from "react-leaflet";
const getHourFromDatetime = (datetime) => datetime.substring(11, 19);

const createBusPopup = (data) => {
  const { codLinea: lineCode, sentido: direction, properties } = data;
  return (
    <Popup>
      <p>Línea: {lineCode}</p>
      <p>Sentido: {direction === 1 ? "Ida" : "Vuelta"}</p>
      <p>Ultima actualización: {getHourFromDatetime(properties.lastUpdate)}</p>
    </Popup>
  );
};
