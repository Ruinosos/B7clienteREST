import { Nav, Navbar, NavDropdown, Container } from 'react-bootstrap';

export const NavbarComponent = () => {
    return (
        <Navbar bg="light">
            <Container className="d-flex justify-content-start align-items-center mx-auto">
                <Navbar.Brand href="#home">RoomTrackr</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
            </Container>
            <Container className="d-flex justify-content-end align-items-center mx-auto">
                <Nav>
                    <Nav.Link href="/map">Ubicación</Nav.Link>
                    <NavDropdown title="Perfil" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Ver Perfil</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Cerrar Sesión</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Container>
        </Navbar>
    );
}

export default NavbarComponent;