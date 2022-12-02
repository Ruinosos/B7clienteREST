import { CardGroup, Container, Row } from "react-bootstrap";
import { getHouseholds } from "../../../src/api/FetchDBData";
import CardComponent from "../Card/Card";
import { useEffect, useState } from "react";

export const AlbumComponent = () => {
  const getHouseholdsMethod = async () => {
    const households = await getHouseholds();
    return households
  };
    const [households, setHouseholds] = useState([
      {
      id: '',
      title: "",
      description: "",
      price_euro_per_night: "",
      photo: [""],
      availability: [
        [{ date: "" },
        { date: "" }]
      ] 
      
    }]);

  useEffect(() => {
    const temp = async () => {
      setHouseholds(await getHouseholdsMethod())
    }
    temp()
  }, []);

  return (
    <CardGroup className="py-5 bg-white">
      <Container>
        <Row className="row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
          {households.map((household) => (
            <CardComponent key={household.id}
              household={household}
            ></CardComponent>
          ))}
        </Row>
      </Container>
    </CardGroup>
  );
};

export default AlbumComponent;
