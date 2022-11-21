//import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
//import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";


export default function Household() {
  return (
  <Container>
    <Row>
      <Col xs={8}>
        <div>Aqui van imagenes</div>
      </Col>
      <Col xs={4} className="mt-5">
        <Form className="list-group mb-3 d-flex">
          <Row className="list-group-item d-flex justify-content-between lh-sm">
            <div>
            <Form.Label className="small my-0">Precio por Noche</Form.Label>
            </div>
            <span class=" mt-2">$12</span>
          </Row>
          <Row className="list-group-item d-flex justify-content-between lh-sm">
          <Col>
              <Form.Group className="mw-25" controlId="startDate">
                <Form.Label className="small">Fecha Inicio</Form.Label>
                <Form.Control type="date" placeholder="inicio"/>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mw-25" controlId="endDate">
                <Form.Label className="small">Fecha Fin</Form.Label>
                <Form.Control type="date" placeholder="final"/>
              </Form.Group>
            </Col>
          </Row>
          <Row className="list-group-item d-flex lh-sm">
            <Form.Select className="w-25">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </Form.Select>
          </Row>
          <Row className="list-group-item d-flex justify-content-between lh-sm">
            <div>
              <h6 class="my-0">Second product</h6>
              <small class="text-muted">Brief description</small>
            </div>
            <span class="text-muted">$8</span>
          </Row>
          <Row className="list-group-item d-flex justify-content-between lh-sm">
            <div>
              <h6 class="my-0">Second product</h6>
              <small class="text-muted">Brief description</small>
            </div>
            <span class="text-muted">$8</span>
          </Row>
          <Row className="list-group-item d-flex justify-content-between">
            <span>Total (USD)</span>
            <strong>$20</strong>
          </Row>
        </Form>
        <Form className="mw-50">
          <Row>
            <Form.Group className="mb-4" controlId="pricePerNight">
              <Form.Label className="">Precio por Noche</Form.Label>
              <div>precio</div>
            </Form.Group>
          </Row>
          <Row className="mt-4 mw-50">
            <Col>
              <Form.Group className="mt-4 mw-25" controlId="startDate">
                <Form.Label>Fecha Inicio</Form.Label>
                <Form.Control type="date" placeholder="inicio"/>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mt-4 mw-25" controlId="endDate">
                <Form.Label>Fecha Fin</Form.Label>
                <Form.Control type="date" placeholder="final"/>
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  </Container>
  );
}
