import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { getCoords, getNearbyBuses } from "../../api/FetchOpenData";
import { useState } from "react";
import { useInterval } from "../../hooks/useInterval";

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

  const submitHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    // TODO: Fetch household given the form data (address, startDate, endDate, radius (default to 500m))
    const coords = await getCoords(formData.addressInput)
    setPosition({ lat: coords.lat, lng: coords.lon });
    setIsLoading(false);
    console.log(await getNearbyBuses());
    setIsLoading(false);
  };

  // Fetch bus data every 10s
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
