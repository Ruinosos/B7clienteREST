import { MapForm } from "../components/Map/MapForm";
import { ClimateInfo } from "../components/Map/ClimateInfo";
import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import { useMap } from "react-leaflet";
import Container from "react-bootstrap/Container";
import { useEffect, useState } from "react";
import { HouseholdMarkers } from "../components/Map/HouseholdMarker";
import { BusStopMarkers } from "../components/Map/BusStopMarkers";
import "leaflet/dist/leaflet.css";

const MyMap = ({ position }) => {
  const map = useMap();
  useEffect(() => {
    //Center map on position
    map.flyTo([position.lat, position.lng], 16);
  }, [position, map]);

  return null;
};

export const Map = () => {
  const [position, setPosition] = useState({
    lat: 41.3851,
    lng: 2.1734,
  });

  const [householdMarkers, setHouseholdMarkers] = useState([]);
  const [busMarkers, setBusMarkers] = useState([]);
  const [busStopMarkers, setBusStopMarkers] = useState([]);
  const forecastPanelPosition = "leaflet-control leaflet-bottom leaflet-left";

  return (
    <Container className="min-vw-100">
      <div className="min-vh-50 d-flex p-5 flex-column flex-lg-row m-5 align-items-center justify-content-evenly gap-5 ">
        <MapContainer
          className="rounded-5 order-lg-last ms-5"
          style={{
            height: "600px",
            width: "800px",
          }}
          center={position}
          zoom={13}
          scrollWheelZoom={false}
        >
          <ClimateInfo position={forecastPanelPosition} />

          <MyMap position={position} />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {householdMarkers && (
            <HouseholdMarkers requestData={householdMarkers} />
          )}
          {/* {busMarkers && <BusMarkers requestData={busMarkers}/>} */}
          {busStopMarkers && <BusStopMarkers requestData={busStopMarkers} />}
        </MapContainer>
        <MapForm
          setPosition={setPosition}
          setHouseholdMarkers={setHouseholdMarkers}
          setBusStopMarkers={setBusStopMarkers}
        />
      </div>
    </Container>
  );
};
