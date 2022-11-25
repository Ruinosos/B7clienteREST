import React from "react";
import { Popup, Marker } from "react-leaflet";

const createBusStopPopup = (data) => {
  const {
    codLinea: lineCode,
    nombreLinea: lineName,
    sentido: direction,
    nombreParada: stopName,
  } = data;
  return (
    <Popup>
      <p>Línea: {`${lineCode} ${lineName}`}</p>
      <p>Parada: {stopName}</p>
      <p>Sentido: {direction === 1 ? "Ida" : "Vuelta"}</p>
    </Popup>
  );
};

export const BusStopMarkers = ({ requestData }) => {
  return (
    <>
      {requestData.map((stop,idx) => {
        const { lat,lon } = stop;
        return (
          <Marker position={[lat, lon]} key={idx}>
            {createBusStopPopup(stop)}
          </Marker>
        );
      })}
    </>
  );
}