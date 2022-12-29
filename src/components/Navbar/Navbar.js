import { Nav, Navbar, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export const NavbarComponent = ({ auth: Auth }) => {
  let username = undefined;

  try {
    username = JSON.parse(localStorage.getItem("profile")).name;
  } catch (e) {
    console.log(e);
  }
  return (
    <Navbar bg='light'>
      <Container className='d-flex justify-content-start align-items-center mx-1'>
        <Link
          to='/'
          className='navbar-brand mx-0 d-flex justify-content-center align-items-center'
        >
          <img
            src='https://i.imgur.com/P7KGTpL.png'
            alt='Brand'
            style={{ height: "40px", width: "50px" }}
          />
        </Link>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Nav>
          <Link className='nav-link' to='/createHousehold'>
            Crear Anuncio
          </Link>
          <Link className='nav-link' to={`/myhouseholds/${username}`}>
            Mis anuncios
          </Link>
          <Link className='nav-link' to={`/mybookings/${username}`}>
            Mis reservas
          </Link>
          <Link className='nav-link' to='/map'>
            Buscar Ubicación
          </Link>
        </Nav>
      </Container>
      <div className='ms-auto me-5'>
        <Auth />
      </div>
    </Navbar>
  );
};
export default NavbarComponent;
