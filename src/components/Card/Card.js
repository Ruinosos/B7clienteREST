import { ButtonGroup, Card, Carousel, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

export const CardComponent = ({ household, username, children }) => {
  const startDate = !children
    ? new Date(household["availability"][0][0]["$date"]).toLocaleDateString()
    : null;
  const endDate = !children
    ? new Date(household["availability"][0][1]["$date"]).toLocaleDateString()
    : null;

  function Editar() {
    if (username !== undefined) {
      return (
        <Link to={`/editHousehold/${household.id}`}>
          <button type='button' className='btn btn-md btn-success'>
            Editar
          </button>
        </Link>
      );
    }
    return null;
  }

  return (
    <Card>
      <Carousel>
        {Array.isArray(household.photo) &&
          household.photo.map(photo => (
            <Carousel.Item key={photo}>
              <Image
                src={photo}
                style={{
                  height: "300px",
                }}
              ></Image>
            </Carousel.Item>
          ))}
      </Carousel>
      <Card.Body>
        <Card.Title>{household.title}</Card.Title>
        <Card.Text className='p-2 mb-4'>{household.description}</Card.Text>
        {children ? (
          <Card.Text className='p-2 mb-4'>{children}</Card.Text>
        ) : (
          <></>
        )}

        <div className='d-flex justify-content-between align-items-center my-2'>
          {household.price_euro_per_night ? (
            <>
              <Card.Text className='my-auto'>
                {household.price_euro_per_night + " € / noche"}
              </Card.Text>
              <Card.Text className='my-auto'>
                {household.rating + "★"}
              </Card.Text>
            </>
          ) : (
            <></>
          )}

          {startDate && endDate ? (
            <Card.Text className='my-auto'>
              {startDate + " - " + endDate}
            </Card.Text>
          ) : (
            <></>
          )}
        </div>
        <ButtonGroup>
          <Link to={`/household/${household.id}`}>
            <button type='button' className='btn btn-md btn-primary'>
              Mostrar
            </button>
          </Link>
          {<Editar />}
        </ButtonGroup>
      </Card.Body>
    </Card>
  );
};

export default CardComponent;
