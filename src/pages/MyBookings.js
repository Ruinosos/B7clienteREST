import { NavbarComponent } from "../components/Navbar/Navbar";
import { MDBRow, MDBCol } from "mdb-react-ui-kit";
import { Container, ListGroup } from "react-bootstrap";


export function MyBookings() {
    return(
        <>
            <Container>
                <MDBRow>
                    <h1> Tus reservas </h1>
                </MDBRow>

                <MDBRow>
                    <MDBCol xs={6}>
                        <ListGroup>
                            <ListGroup.Item>

                                <MDBRow>
                                    <MDBCol className='mt-5'>
                                        <div>Imagen vivienda</div>
                                    </MDBCol>

                                    <MDBCol>
                                        <MDBRow className='mt-2'>
                                            <h4>Titulo vivienda</h4>
                                        </MDBRow>

                                        <MDBRow className='mt-2'>
                                            <h5>Anfitrion</h5>
                                        </MDBRow>
                                        
                                        <MDBRow className='mt-2'>
                                            <h6>Fecha entrada - Fecha salida</h6>
                                        </MDBRow>

                                        

                                    </MDBCol>
                                </MDBRow>

                            </ListGroup.Item>
                        </ListGroup>
                    </MDBCol>
                </MDBRow>
            </Container>
            
        </>
        );
}; 
