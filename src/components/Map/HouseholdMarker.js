import { Marker, Popup } from "react-leaflet";
import { Link } from "react-router-dom";
import { iconDefault } from "./markerLeafLet";
import Image from "react-bootstrap/Image";

const showRouteTo = () => {
  // TODO: Shows in map the route from current to
  console.log("cómo llegar clicked");
};

const createHouseholdPopup = (data) => {
  const { title, price_euro_per_night, rating, photo, address } = data;
  return (
    <Popup>
      <Image src={photo} alt="household"
        style={{
          height: "50px",
          width: "100px"
        }}
      />
      <p>{title}</p>
      <p>{price_euro_per_night} €/noche </p>
      <p>Valoración: {rating}</p>
      <button onClick={() => showRouteTo(address)}>Cómo llegar?</button><br/>
      <Link className="mt-2 d-inline-block" to="/household">Ver detalles</Link>
    </Popup>
  );
};

export const HouseholdMarkers = ({ requestData }) => {
  return (
    <>
      {requestData.map((household,idx) => {
        return (
          <Marker
            position={[
              household.address.geojson.coordinates[1],
              household.address.geojson.coordinates[0],
            ]}
            key={idx}
            icon={iconDefault}
          >
            {createHouseholdPopup(household)}
          </Marker>
        );
      })}
    </>
  );
};
