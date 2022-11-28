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
      photo: [""],
      availability: [
        [{ date: "" },
        { date: "" }],
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
              id={household.id}
              url={household['photo'][0]}
              text={household['description']}
              time={new Date(household['availability'][0][1]['$date']).toLocaleDateString()}
            ></CardComponent>
          ))}
        </Row>
      </Container>
    </CardGroup>
  );
};

export default AlbumComponent;
