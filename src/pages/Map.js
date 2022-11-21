import { MapForm } from "../components/Map/MapForm";
import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import { Marker, Popup } from "react-leaflet";
import Container from "react-bootstrap/Container";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";

const position = [51.505, -0.09];

export const Map = () => {
  useEffect(() => {
    return;
  }, []);

  return (
    <Container>
      <div className="min-vh-100 d-lg-flex d-flex flex-column flex-lg-row m-5  align-items-center justify-content-center gap-5">
        <MapContainer
          className="flex-grow-1 rounded-3 flex-lg order-lg-last"
          style={{
            height: "600px",
            width: "600px",
          }}
          center={position}
          zoom={13}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
        <MapForm />
      </div>
    </Container>
  );
};
