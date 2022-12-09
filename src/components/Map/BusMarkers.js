import { Popup, Marker } from "react-leaflet";

const getHourFromDatetime = (datetime) => datetime.substring(11, 19);

const createBusPopup = (data) => {
  const { codLinea: lineCode, sentido: direction, properties } = data;
  return (
    <Popup>
      <h6>Línea: {lineCode}</h6>
      <h6>Sentido: {direction === 1 ? "Ida" : "Vuelta"}</h6>
      <h6>
        Ultima actualización: {getHourFromDatetime(properties.last_update)}
      </h6>
    </Popup>
  );
};

export const BusMarkers = ({ requestData }) => {
  requestData.map((bus, idx) => {
    const { lat, lon } = bus.geometry.coordinates;
    return (
      <Marker position={[lat, lon]} key={idx}>
        {createBusPopup(bus)}
      </Marker>
    );
  });
};
