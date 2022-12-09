import { CardGroup, Container, Row } from "react-bootstrap";
import { getHouseholds, getHouseholdsFromUser } from "../../../src/api/FetchDBData";
import CardComponent from "../Card/Card";
import { useEffect, useState } from "react";

export const AlbumComponent = ({username}) => {

    const getHouseholdsMethod = async (username) => {
      var households = '';
      if (username === ''){
        households = await getHouseholds();
      }else{
        households = await getHouseholdsFromUser(username);
      }
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
        setHouseholds(await getHouseholdsMethod(username))
      }
      temp()
    }, [username]);

  return (
    <CardGroup className="py-5 bg-white">
      <Container>
        <Row className="row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
          {households.map((household) => (
            <CardComponent key={household.id}
              household={household} 
              username={username}
            ></CardComponent>
          ))}
        </Row>
      </Container>
    </CardGroup>
  );
};

export default AlbumComponent;
