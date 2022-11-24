import { CardGroup, Container, Row} from "react-bootstrap";
import CardComponent from "../Card/Card";

export const AlbumComponent = () => {
  return (
    <CardGroup className="py-5 bg-white">
      <Container>
        <Row className="row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
          <CardComponent></CardComponent>
          <CardComponent></CardComponent>
          <CardComponent></CardComponent>
          <CardComponent></CardComponent>
          <CardComponent></CardComponent>
          <CardComponent></CardComponent>
        </Row>
      </Container>
    </CardGroup>
  );
};

export default AlbumComponent;
