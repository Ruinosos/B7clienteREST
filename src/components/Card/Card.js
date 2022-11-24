import { Button, ButtonGroup, Card, Col, Container} from 'react-bootstrap';

function CardComponent() {
    return (
        <Col>
            <Card>
                <svg class="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="https://e00-expansion.uecdn.es/assets/multimedia/imagenes/2021/04/16/16185679347539.jpg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"></rect><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg>

                <Card.Body>
                    <Card.Text>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</Card.Text>
                    <div className="d-flex justify-content-between align-items-center">
                        <ButtonGroup>
                            <button type="button" className="btn btn-sm btn-primary">View</button>
                            <button type="button" className="btn btn-sm btn-success">Edit</button>
                            <button type="button" className="btn btn-sm btn-danger">Delete</button>
                        </ButtonGroup>
                        <div class="text-muted">9 mins</div>
                    </div>
                </Card.Body>
            </Card>
        </Col>
    );
}

export default CardComponent;