import { CardGroup, Col, Container, Row } from "react-bootstrap";
import { getHouseholdsFromUser } from "../../../src/api/FetchDBData";
import CardComponent from "../Card/Card";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

export const AlbumComponent = () => {
  const username = useParams().username;

  const getHouseholdsFromUserMethod = async username => {
    if (username === undefined) {
      username = "";
    }
    var households = await getHouseholdsFromUser(username);
    return households;
  };
  const [households, setHouseholds] = useState([
    {
      id: "",
      title: "",
      description: "",
      price_euro_per_night: "",
      photo: [""],
      availability: [[{ date: "" }, { date: "" }]],
    },
  ]);

  useEffect(() => {
    const temp = async () => {
      setHouseholds(await getHouseholdsFromUserMethod(username));
    };
    temp();
  }, [username]);

  function emptyList() {
    if (households.length === 0) {
      return <h3 className='mx-auto'>No hay anuncios disponibles</h3>;
    } else {
      return null;
    }
  }

  return (
    <CardGroup className='py-5 bg-white'>
      <Container>
        <Row className='row-cols-1 row-cols-sm-2 row-cols-md-3 g-3'>
          {emptyList()}
          {households.map(household => (
            <Col>
              <CardComponent
                key={household.id}
                household={household}
                username={username}
              ></CardComponent>
            </Col>
          ))}
        </Row>
      </Container>
    </CardGroup>
  );
};

export default AlbumComponent;
