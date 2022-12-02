import { ButtonGroup, Card, Col, Carousel,Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const CardComponent = ({household}) => {
    const startDate= new Date(household['availability'][0][0]['$date']).toLocaleDateString()
    const endDate = new Date(household['availability'][0][1]['$date']).toLocaleDateString()
    return (
        <Col>
            <Card>
            <Carousel>
                        {household.photo.map((photo) => (
                        <Carousel.Item key={photo}>
                          <Image src={photo}
                            style={{
                              height: "300px"
                            }}
                        ></Image>
                        </Carousel.Item>
                        ))}
                      
                      </Carousel>
                <Card.Body>
                    <Card.Title>{household.title}</Card.Title>
                    <Card.Text className='p-2 mb-4'>{household.description}</Card.Text>

                    <div className="d-flex justify-content-between align-items-center my-2">
                        <Card.Text className='my-auto'>{household.price_euro_per_night + ' € / noche'}</Card.Text>
                        <Card.Text className='my-auto'>{household.rating + '★'}</Card.Text>
                        <Card.Text className='my-auto'>{startDate + ' - ' + endDate}</Card.Text>
                    </div>
                    <ButtonGroup>
                            <Link to={`/household/${household.id}`}><button type="button" className="btn btn-md btn-primary">Mostrar</button></Link>
                            
                            <Link to={`household/${household.id}`}><button type="button" className="btn btn-md btn-success">Editar</button></Link>
                            
                        </ButtonGroup>
                </Card.Body>
            </Card>
        </Col>
    );
}

export default CardComponent;