import Container from "react-bootstrap/Container";
import { NavbarComponent } from "../components/Navbar/Navbar";
import { MDBRow } from "mdb-react-ui-kit";
import { MDBCol } from "mdb-react-ui-kit";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function CreateHousehold() {
    return (
        <>
            <Container>
                <MDBRow>
                    <Form className="list-group mb-3 d-flex">
                        <MDBCol>

                            <MDBRow className="list-group-item d-flex justify-content-between lh-sm">
                                <Form.Group controlId="title">
                                    <Form.Label className="my-0">Titulo:</Form.Label>
                                    <Form.Control className="mt-3" type="text" placeholder="Título de la vivienda" />
                                </Form.Group>
                            </MDBRow>

                            <MDBRow className="list-group-item d-flex justify-content-between lh-sm">
                                <Form.Group className="mw-25" controlId="description">
                                    <Form.Label >Descripción:</Form.Label>
                                    <Form.Control className="mt-3" as="textarea" rows={4} placeholder="Una breve descripción..." />
                                </Form.Group>                            
                            </MDBRow>

                            <MDBRow className="list-group-item d-flex justify-content-between lh-sm">
                            <Form.Group className="mw-25" controlId="address">
                                    <Form.Label >Dirección:</Form.Label>
                                    <Form.Control className="mt-3" type="text" placeholder="Dirección de la vivienda" />
                                </Form.Group> 
                            </MDBRow>

                            <MDBRow className="list-group-item d-flex justify-content-between lh-sm">
                                <MDBCol>
                                    <Form.Group className="mw-25" controlId="pricePerNight">
                                        <Form.Label>Precio por noche:</Form.Label>
                                        <Form.Control className="mt-3" type="number" placeholder="Ej: 50" />
                                    </Form.Group>
                                </MDBCol>
                                <MDBCol>
                                    <Form.Group className="mw-25" controlId="maxNumOccupants">
                                        <Form.Label>Número máximo de huéspedes:</Form.Label>
                                        <Form.Control className="mt-3" type="number" placeholder="Ej: 5" />
                                    </Form.Group>
                                </MDBCol>
                            </MDBRow>

                            <MDBRow className="list-group-item d-flex justify-content-between lh-sm">
                                <Form.Group className="mw-25" controlId="images">
                                    <Form.Label >Imágenes:</Form.Label>
                                    <Form.Control className="mt-3" type="file" multiple placeholder="Dirección de la vivienda" accept=".png" />
                                </Form.Group> 
                            </MDBRow>

                            <MDBRow className="list-group-item d-flex justify-content-between lh-sm">
                            <Button variant="primary" type="submit">
                                Crear Vivienda
                            </Button>
                            </MDBRow>
                        </MDBCol>
                    </Form>
                </MDBRow>
            </Container>
        </>
    );
}