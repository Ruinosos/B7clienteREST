import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import { useParams } from "react-router-dom";
import CardComponent from "../components/Card/Card";
import { CardGroup, Col } from "react-bootstrap";

const Profile = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState({});
  const [bookings, setBookings] = useState([]);
  const [households, setHouseholds] = useState([]);
  useEffect(() => {
    setProfile(JSON.parse(localStorage.getItem("profile")));
    const fetchUser = async id => {
      const bookingResponse = await fetch(
        "https://roomtrackrservidor.fly.dev/bookings/from_user/" + id
      );
      const bookings = await bookingResponse.json();

      const householdResponse = await fetch(
        "https://roomtrackrservidor.fly.dev/households/from_user/" + id
      );
      const households = await householdResponse.json();
      setBookings(bookings);
      setHouseholds(households);
    };
    fetchUser(id);
  }, [id]);

  return (
    <Container className='d-flex flex-column gap-5'>
      <Container className='d-flex p-5 bg-black rounded-5 gap-4'>
        <Image src={profile.picture} width={200} height={200} alt={profile} />
        <Container className='d-flex flex-column text-white justify-content-center'>
          <h4>{profile.username}</h4>
          <h4>{profile.email}</h4>
        </Container>
      </Container>
      <Container>
        <h2>Mis viviendas</h2>
        {households.length > 0 ? (
          <CardGroup className='d-flex justify-content-center align-items-center'>
            {households.map(h => {
              return (
                <Col className='m-3 col-3'>
                  <CardComponent household={h} username={profile.username} />
                </Col>
              );
            })}
          </CardGroup>
        ) : (
          <h4>NO tienes viviendas registradas</h4>
        )}
      </Container>
      <Container>
        <h2>Mis reservas</h2>
        {bookings.length > 0 ? (
          <CardGroup className='d-flex justify-content-center align-items-center'>
            {bookings.map(b => {
              return (
                <Col className='m-3 col-3'>
                  <CardComponent
                    household={b.household}
                    username={profile.username}
                  >
                    <p>
                      Fechas reservadas:{new Date(b.start).toLocaleDateString()}
                      -{new Date(b.ending).toLocaleDateString()}
                    </p>
                  </CardComponent>
                </Col>
              );
            })}
          </CardGroup>
        ) : (
          <h4>NO tienes reservas registradas</h4>
        )}
      </Container>
    </Container>
  );
};

export default Profile;
