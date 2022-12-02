import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import {
  getCoords,
  getNearbyBusStopsbyLatLon,
  getNearbyBusesbyLatLon,
} from "../../api/FetchOpenData";
import { getHouseholdNearbyByCoords } from "../../api/FetchHouseholdData";
import { useState } from "react";
import { useInterval } from "../../hooks/useInterval";
import { BootstrapModal } from "./InfoModal";

export const MapForm = ({
  setHouseholdMarkers,
  setBusStopMarkers,
  setBusMarkers,
  setPosition,
}) => {
  const getCurrentDate = () => {
    return new Date().toISOString().slice(0, 10);
  };
  const currentDate = getCurrentDate();

  const [formData, setFormData] = useState({
    addressInput: "",
    radius: 500,
    startingDate: currentDate,
    endingDate: currentDate,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [modalData, setModalData] = useState({
    show: false,
    body: "",
    heading: "",
  });

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

    const { addressInput, startingDate, endingDate, radius } = formData;
    try {
      const { lat, lon } = await getCoords(addressInput);
      setPosition({ lat: lat, lng: lon });
      const datetimeStart = `${startingDate}T00:00:00`;
      const datetimeEnd = `${endingDate}T23:59:59`;

      const householdData = await getHouseholdNearbyByCoords(
        lat,
        lon,
        radius,
        datetimeStart,
        datetimeEnd
      );

      setHouseholdMarkers(householdData);

      const busStopData = await getNearbyBusStopsbyLatLon(lat, lon);
      setBusStopMarkers(busStopData.datos);

      const busData = await getNearbyBusesbyLatLon(lat, lon);
      setBusMarkers(busData.datos);
    } catch (error) {
      setModalData((prev) => {
        return { ...prev, heading: "Error", body: error, show: true };
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch bus live data every 10s
  const REFRESH_RATE_MS = 10000;

  useInterval(async () => {}, REFRESH_RATE_MS);

  const updateFormData = (event) => {
    const { name, value } = event.target;
    const res = { [name]: value };

    setFormData((prev) => {
      if (
        name === "startingDate" &&
        Date.parse(value) > Date.parse(prev.endingDate)
      ) {
        res["endingDate"] = value;
      }
      if (
        name === "endingDate" &&
        Date.parse(prev.startingDate) > Date.parse(value)
      ) {
        res["startingDate"] = value;
      }
      return {
        ...prev,
        ...res,
      };
    });
  };

  return (
    <>
      <BootstrapModal
        {...modalData}
        closeModal={() =>
          setModalData((prev) => {
            return { ...prev, show: false };
          })
        }
      />
      <Form onSubmit={submitHandler}>
        <Row>
          <Form.Group className="mb-4" controlId="formAddress">
            <Form.Label>Dirección</Form.Label>
            <Form.Control
              type="text"
              placeholder="Introduzca una dirección"
              name="addressInput"
              onChange={updateFormData}
              required
            />
          </Form.Group>
        </Row>
        <Row>
          <Form.Label>Radio de búsqueda</Form.Label>
          <ButtonGroup className="mb-2" name="radius" onClick={updateFormData}>
            <Button variant="secondary" name="radius" value={500}>
              500m
            </Button>
            <Button variant="secondary" name="radius" value={1000}>
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
              min={currentDate}
              value={formData.startingDate}
              onChange={updateFormData}
              required
            />
          </Form.Group>

          <Form.Group className="col-6" controlId="formEndDate">
            <Form.Label>Fin</Form.Label>
            <Form.Control
              type="date"
              placeholder="Fin"
              name="endingDate"
              min={currentDate}
              value={formData.endingDate}
              onChange={updateFormData}
              required
            />
          </Form.Group>
          <Button
            className="mt-5 ms-3 w-25 h-25"
            variant="secondary"
            type="submit"
          >
            {isLoading ? spinner() : "Submit"}
          </Button>
        </Row>
      </Form>
    </>
  );
};
