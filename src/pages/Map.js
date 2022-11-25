import { MapForm } from "../components/Map/MapForm";
import { ClimateInfo } from "../components/Map/ClimateInfo";
import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import { Marker, Popup, useMap } from "react-leaflet";
import Container from "react-bootstrap/Container";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import {iconPerson} from "../components/Map/markerLeafLet";
import { renderHouseholdMarkers } from "../components/Map/MapForm";
const MyMap = ({position}) => {
  const map = useMap()
  useEffect(() => {
    //Center map on position
    map.flyTo([position.lat,position.lng]);
    
  }, [position, map]);

  return null
};

export const Map = () => {
 
  const [position, setPosition] = useState({
    lat: 41.3851,
    lng: 2.1734,
  });
  

  return (
    
    <Container className="min-vw-100">


      <ClimateInfo/>
      
      <div className="min-vh-50 d-flex p-5 flex-column flex-lg-row m-5 align-items-center justify-content-evenly gap-5">
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
          <MyMap position={position}/>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker icon={iconPerson} position={position}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
        <renderHouseholdMarkers/>
        <MapForm setPosition={setPosition} />
        
      </div>
    </Container>
  );
};
