import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import ButtonGroup from "react-bootstrap/ButtonGroup";

import { getCoords, getNearbyBuses } from "../../api/FetchOpenData";
import { getHouseholdNearbyByCoords } from "../../api/FetchHouseholdData";
import { useState } from "react";
import { useInterval } from "../../hooks/useInterval";
import { Link } from "react-router-dom";
import { Popup, Marker } from "react-leaflet";

const showRouteTo = () => {
  // TODO: Shows in map the route from current to
  console.log("cómo llegar clicked");
};

const createHouseholdPopup = (data) => {
  const { title, price, rating, image, address } = data;
  return (
    <Popup>
      <img src={image} alt="household" width={500} height={500} />
      <p>{title}</p>
      <p>{price} €/noche </p>
      <p>Valoración: {rating}</p>
      <button onClick={() => showRouteTo(address)}>Cómo llegar?</button>
      <Link to="/household">Ver detalles</Link>
    </Popup>
  );
};


export const renderHouseholdMarkers = (households) => {
  return households.map((household) => {
    const { lat, lon } = household;
    return (
      <Marker position={[lat, lon]} key={household.id}>
        {createHouseholdPopup(household)}
      </Marker>
    );
  });
};



export const MapForm = ({ setPosition }) => {
  const getCurrentDate = () => {
    return new Date().toISOString().slice(0, 10);
  };

  const [formData, setFormData] = useState({
    addressInput: "",
    radius: 500,
    startingDate: getCurrentDate(),
    endingDate: getCurrentDate(),
  });

  const [isLoading, setIsLoading] = useState(false);

  const spinner = () => {
    return (
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    );
  };


  const getHourFromDatetime = (datetime) => datetime.substring(11, 19);

  const createBusPopup = (data) => {
    const {
      codLinea: lineCode,
      sentido: direction,
      last_update: lastUpdate,
    } = data;
    return (
      <Popup>
        <p>Línea: {lineCode}</p>
        <p>Sentido: {direction === 1 ? "Ida" : "Vuelta"}</p>
        <p>Ultima actualización: {getHourFromDatetime(lastUpdate)}</p>
      </Popup>
    );
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    // TODO: Fetch household given the form data (address, startDate, endDate, radius (default to 500m))
    const {lat,  lon} = await getCoords(formData.addressInput)
    setPosition({ lat: lat, lng: lon });;
    setIsLoading(false);
    //console.log(await getNearbyBuses());
    setIsLoading(false);
    const datetimeStart = formData.startingDate + "T00:00:00";
    const datetimeEnd = formData.endingDate + "T23:59:59";
    const householdData = await getHouseholdNearbyByCoords(lat, lon, formData.radius, datetimeStart, datetimeEnd);
    console.log(householdData)
    renderHouseholdMarkers(householdData);
  };

  // Fetch bus live data every 10s
  const REFRESH_RATE_MS = 10000;

  useInterval(async () => {
    // TODO: Print in map
    // console.log(await getNearbyBuses());
  }, REFRESH_RATE_MS);

  const updateFormData = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  return (
    <Form onSubmit={submitHandler}>
      <Row>
        <Form.Group className="mb-4" controlId="formAddress">
          <Form.Label>Dirección</Form.Label>
          <Form.Control
            type="text"
            placeholder="Introduzca una dirección"
            name="addressInput"
            onChange={updateFormData}
          />
        </Form.Group>
      </Row>
      <Row>
        <Form.Label>Radio de búsqueda</Form.Label>
        <ButtonGroup className="mb-2" name="radius" onClick={updateFormData}>
          <Button variant="primary" name="radius" value={500}>
            500m
          </Button>
          <Button variant="primary" name="radius" value={1000}>
            1000m
          </Button>
        </ButtonGroup>
      </Row>
      <Row className="mt-4">
        <Form.Group className="col-6" controlId="formStartDate">
          <Form.Label>Inicio</Form.Label>
          <Form.Control
            type="date"
            placeholder="Inicio"
            name="startingDate"
            value={formData.startingDate}
            onChange={updateFormData}
          />
        </Form.Group>

        <Form.Group className="col-6" controlId="formEndDate">
          <Form.Label>Fin</Form.Label>
          <Form.Control
            type="date"
            placeholder="Fin"
            name="endingDate"
            value={formData.endingDate}
            onChange={updateFormData}
          />
        </Form.Group>
        <Button className="mt-5 ms-3 w-25 h-25" variant="primary" type="submit">
          {isLoading ? spinner() : "Submit"}
        </Button>
      </Row>
    </Form>
  );
};
