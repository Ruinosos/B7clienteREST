import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";

export const MapForm = () => {
  return (
    <Form className="mw-50">
      <Row>
        <Form.Group className="mb-4" controlId="formAddress">
          <Form.Label>Dirección</Form.Label>
          <Form.Control type="text" placeholder="Introduzca una dirección" />
        </Form.Group>
      </Row>
      <Row>
        <Form.Label>Radio de búsqueda</Form.Label>
        <ButtonGroup className="mb-2">
          <ToggleButton
            type="radio"
            variant="primary"
            name="radio"
            onChange={(e) => console.log(e.currentTarget.value)}
          >
            500m
          </ToggleButton>
          <ToggleButton
            type="radio"
            variant="primary"
            name="radio"
            onChange={(e) => console.log(e.currentTarget.value)}
          >
            1000m
          </ToggleButton>
        </ButtonGroup>
      </Row>
      <Row className="mt-4">
        <Form.Group className="col-6" controlId="formStartDate">
          <Form.Label>Inicio</Form.Label>
          <Form.Control type="date" placeholder="Inicio" />
        </Form.Group>

        <Form.Group className="col-6" controlId="formEndDate">
          <Form.Label>Fin</Form.Label>
          <Form.Control type="date" placeholder="Fin" />
        </Form.Group>
        <Button className="mt-5 ms-3 col-4" variant="primary" type="submit">
          Submit
        </Button>
      </Row>
    </Form>
  );
};
