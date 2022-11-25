import { CardGroup, Container, Row } from "react-bootstrap";
import CardComponent from "../Card/Card";

var url = "https://i.imgur.com/69Th4Pb.jpg";
var textBooking =
  "This is a wider card with supporting text bbookow as a natural lead-in to additional content. This content is a little bit longer.";
var time = new Date(Date.now()).toLocaleDateString();

const households = [
  { url: url, textBooking: textBooking, time: time },
  { url: url, textBooking: textBooking, time: time },
  { url: url, textBooking: textBooking, time: time },
  { url: url, textBooking: textBooking, time: time },
  { url: url, textBooking: textBooking, time: time },
  { url: url, textBooking: textBooking, time: time },
];

export const AlbumComponent = () => {
  return (
    <CardGroup className="py-5 bg-white">
      <Container>
        <Row className="row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
          {" "}
          {households.map((household) => (
            <CardComponent
              url={household.url}
              text={household.textBooking}
              time={household.time}
            ></CardComponent>
          ))}
        </Row>
      </Container>
    </CardGroup>
  );
};

export default AlbumComponent;
