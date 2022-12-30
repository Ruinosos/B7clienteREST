import { Marker, Popup } from "react-leaflet";
import { Link } from "react-router-dom";
import { iconDefault } from "./markerLeafLet";
import Image from "react-bootstrap/Image";


const showRouteTo = () => {
  // TODO: Shows in map the route from current to
};

const createHouseholdPopup = (data) => {
  const { id, title, price_euro_per_night, rating, photo, address } = data;
  const urlHousehold = `/household/${id}`;
  return (
    <Popup>
      <Image
        src={photo}
        alt="household"
        style={{
          height: "50px",
          width: "100px",
        }}
      />
      <h5>{title}</h5>
      <h5>{price_euro_per_night} €/noche </h5>
      <h5>Valoración: {rating}</h5>
      <button onClick={() => showRouteTo(address)}>
        <h6>Cómo llegar?</h6>
      </button>
      <br />
      <Link className="mt-2 d-inline-block" to={urlHousehold}>
        <h6>Ver detalles</h6>
      </Link>
    </Popup>
  );
};

export const HouseholdMarkers = ({ requestData }) => {
  return (
    <>
      {requestData.map((household, idx) => {
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
