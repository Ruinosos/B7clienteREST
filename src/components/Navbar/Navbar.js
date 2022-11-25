import { Nav, Navbar, NavDropdown, Container } from 'react-bootstrap';

export const NavbarComponent = () => {
    return (
        <Navbar bg="light">
            <Container className="d-flex justify-content-start align-items-center mx-1">
                <Navbar.Brand href="#home">RoomTrackr</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Nav>
                    <Nav.Link href="/createHousehold">Crear Anuncio</Nav.Link>
                    <Nav.Link href="/map">Buscar Ubicación</Nav.Link>
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