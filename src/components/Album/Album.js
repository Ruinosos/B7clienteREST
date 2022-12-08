import { CardGroup, Container, Row } from "react-bootstrap";
import { getHouseholds, getHouseholdsFromUser } from "../../../src/api/FetchDBData";
import CardComponent from "../Card/Card";
import { useEffect, useState } from "react";

export const AlbumComponent = ({username}) => {
  if(username == ''){
    var getHouseholdsMethod = async () => {
      var households = await getHouseholds();
      return households
    };
  }else{
    var getHouseholdsFromUserMethod = async () => {
      var households = await getHouseholdsFromUser(username);
      console.log(households);
      return households
    };
  }
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
      const temp2 = async () => {
        setHouseholds(await getHouseholdsFromUserMethod())
      }
      temp()
      temp2()
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
