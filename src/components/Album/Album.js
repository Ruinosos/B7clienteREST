import { CardGroup, Container, Row } from "react-bootstrap";
import CardComponent from "../Card/Card";

export const AlbumComponent = () => {
  return (
    <CardGroup className="py-5 bg-white">
      <Container>
        <Row className="row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
          <CardComponent url={url} text={textBooking} time={time}></CardComponent>
          <CardComponent url={url} text={textBooking} time={time}></CardComponent>
          <CardComponent url={url} text={textBooking} time={time}></CardComponent>
          <CardComponent url={url} text={textBooking} time={time}></CardComponent>
          <CardComponent url={url} text={textBooking} time={time}></CardComponent>
          <CardComponent url={url} text={textBooking} time={time}></CardComponent>
        </Row>
      </Container>
    </CardGroup>
  );
};


var url = 'https://i.imgur.com/69Th4Pb.jpg'
var textBooking = 'This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.'
var time = new Date(Date.now()).toLocaleDateString()

export default AlbumComponent;
