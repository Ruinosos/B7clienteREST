import { Popup, Marker } from "react-leaflet";
import { iconBus } from "./markerLeafLet";


const getHourFromDatetime = (datetime) => datetime.substring(11, 19);

const createBusPopup = (data) => {
  const { codLinea: lineCode, sentido: direction, properties } = data;
  return (
    <Popup>
      <p>Línea: {lineCode}</p>
      <p>Sentido: {direction === 1 ? "Ida" : "Vuelta"}</p>
      <p>Ultima actualización: {getHourFromDatetime(properties.last_update)}</p>
    </Popup>
  );
};

export const BusMarkers = ({ requestData }) => {
  
  return(
    <>
      {requestData.map((bus,idx) => {
        const coordinates = bus.geometry.coordinates;
        const lat = coordinates[1];
        const lon = coordinates[0];
        return (
          <Marker
            position={[lat,lon]} 
            key={idx}
            icon={iconBus}>
            {createBusPopup(bus)}
          </Marker>
        );
        
        })}
    </>
  );
};
