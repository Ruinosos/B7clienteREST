import { ButtonGroup, Card, Col } from 'react-bootstrap';

export const CardComponent = ({url,text,time}) => {
    return (
        <Col>
            <Card>
                <img src={url} alt="Imagen de vivienda" fill="currentColor" viewBox="0 0 16 16"/>
                <Card.Body>
                    <Card.Text>{text}</Card.Text>
                    <div className="d-flex justify-content-between align-items-center">
                        <ButtonGroup>
                            <button type="button" className="btn btn-sm btn-primary">View</button>
                            <button type="button" className="btn btn-sm btn-success">Edit</button>
                            <button type="button" className="btn btn-sm btn-danger">Delete</button>
                        </ButtonGroup>
                        <div class="text-muted">{time}</div>
                    </div>
                </Card.Body>
            </Card>
        </Col>
    );
}

export default CardComponent;