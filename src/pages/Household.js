import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { MDBRow } from "mdb-react-ui-kit";
import { MDBCol } from "mdb-react-ui-kit";
import { MapContainer } from "react-leaflet/MapContainer";
import { useEffect, useState } from "react";
import { useMap } from "react-leaflet";
import { TileLayer } from "react-leaflet/TileLayer";
import { getHouseholdByID } from "../../src/api/FetchDBData";
import React from "react";
import { useParams, useLocation } from "react-router-dom";
import { HouseholdMarkers } from "../components/Map/HouseholdMarker";
import { Carousel, ListGroup } from "react-bootstrap";
import { Modal } from "react-bootstrap";

//Esto es pa crear una linea divisora
//<div style={{ borderTop: "2px solid #fff ", marginLeft: 20, marginRight: 20 }}></div>

const MyMap = ({ position }) => {
  const map = useMap();
  useEffect(() => {
    //Center map on position
    map.flyTo([position.lat, position.lng]);
  }, [position, map]);

  return null;
};

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

export default function Household() {
  const params = useParams().id;

  const getHousehold = async (params) => {
    const household = await getHouseholdByID(params);
    return household;
  };
  const [household, setHousehold] = useState({
    id: "",
    host: {
      host_username: "",
      host_email: "",
    },
    title: "",
    description: "",
    address: {
      id: "",
      street: "",
      number: "",
      geojson: {
        type: "",
        coordinates: [0, 0],
      },
    },
    photo: [""],
    num_bathroom: 0,
    num_bed: 0,
    max_capacity: 0,
    price_euro_per_night: 0,
    rating: 0,
    availability: [
      [{ date: "" }, { date: "" }],
      [{ date: "" }, { date: "" }],
    ],
  });

  const latlngObject = {
    lat: household.address.geojson.coordinates[1],
    lng: household.address.geojson.coordinates[0],
  };

  const [showContact, setShowContact] = useState({
    show: false,
  });

  const contactButtonHandler = () => {
    setShowContact((prev) => !prev);
  };

  useEffect(() => {
    const temp = async () => {
      setHousehold(await getHousehold(params));
    };
    temp();
  }, [params]);

  let query = useQuery();
  let min_capacity = 1;
  let startingDate = query.get("startingDate");
  let endingDate = query.get("endingDate");
  let personas = query.get("personas");

  if (personas == null) {
    personas = 0;
  }
  if (personas > household.max_capacity) {
    personas = household.max_capacity;
  }

  const getCurrentDate = () => {
    return new Date().toISOString().slice(0, 10);
  };
  const currentDate = getCurrentDate();

  
  let difference = Date.parse(endingDate)- Date.parse(startingDate);
  let totalDays = Math.ceil(difference / (1000 * 3600 * 24));
  
  let price_total = household.price_euro_per_night * totalDays;

  let title = "Confirmar reserva";
  let body =
    "¿Desea confirmar la reserva para " +
    personas +
    " personas por " +
    price_total +
    " € ?";

  let enlaceCancel = `/household/${params}?startingDate=${startingDate}&endingDate=${endingDate}&personas=${personas}`;
  let enlaceOK = `/paypalGateway/${price_total}`;

  const [show, setShow] = useState(false);

  //const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function Reservar() {
    if (personas >= min_capacity) {
      return (
        <>
          <Button variant="success" onClick={handleShow}>
            Reservar
          </Button>
          <Modal
            show={show}
            animation={false}
            style={{ opacity: 1 }}
            centered
            //   custom class name defined in src/index.css
            dialogClassName="border-radius-2"
          >
            <Modal.Header>
              <Modal.Title>
                <h3>{title}</h3>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="d-flex justify-content-center align-items-center">
              {body}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="success" size="xxl" href={enlaceOK}>
                OK
              </Button>
              <Button variant="danger" size="xxl" href={enlaceCancel}>
                Cancel
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      );
    } else {
      return null;
    }
  }
  const [formData, setFormData] = useState({
    personas: personas,
    startingDate: startingDate,
    endingDate: endingDate,
  });

  const updateFormData = (event) => {
    const { name, value } = event.target;
    const res = { [name]: value };

    setFormData((prev) => {
      if (
        name === "startingDate" &&
        Date.parse(value) > Date.parse(prev.endingDate)
      ) {
        res["endingDate"] = value;
      }
      if (
        name === "endingDate" &&
        Date.parse(prev.startingDate) > Date.parse(value)
      ) {
        res["startingDate"] = value;
      }
      if(name==="personas"){
        res["personas"] = value;
      }
      return {
        ...prev,
        ...res,
      };
    });
  };

  return (
    <>
      <Container>
        <MDBRow className="mt-5">
          <h1>{household.title}</h1>
        </MDBRow>
        <MDBRow>
          <MDBCol md="8">
            <MDBRow>
              <MDBCol md="11">
                <MDBRow>
                  <ListGroup>
                    <ListGroup.Item>
                      <Carousel>
                        {household.photo.map((photo) => (
                          <Carousel.Item key={photo}>
                            <Image
                              src={photo}
                              style={{
                                height: "400px",
                                width: "100%",
                              }}
                            ></Image>
                          </Carousel.Item>
                        ))}
                      </Carousel>
                    </ListGroup.Item>
                  </ListGroup>
                </MDBRow>
              </MDBCol>
            </MDBRow>

            <MDBRow className="mt-3">
              <h4>{household.description}</h4>
            </MDBRow>

            <MDBRow>
              <h4>Comentarios</h4>

              <MDBCol md="6">
                <h5>Comentario 1</h5>
              </MDBCol>

              <MDBCol md="6">
                <h5>Comentario 2</h5>
              </MDBCol>
            </MDBRow>

            <MDBRow className="mb-5">
              <MDBCol
                className="min-vh-50 d-flex flex-column flex-lg-row"
                md="11"
              >
                <MapContainer
                  className="rounded-5 order-lg-last"
                  style={{
                    height: "400px",
                    width: "100%",
                  }}
                  center={latlngObject}
                  zoom={16.5}
                  scrollWheelZoom={false}
                >
                  <MyMap position={latlngObject} />
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <HouseholdMarkers requestData={[household]} />
                </MapContainer>
              </MDBCol>
            </MDBRow>
          </MDBCol>

          <MDBCol md="4" className="mt-5 align-items-center">
            <Form className="list-group mb-3 d-flex">
              <MDBCol>
                <MDBRow className="list-group-item d-flex justify-content-between lh-sm">
                  <Form.Label className="small my-0">
                    Precio por Noche {household.price_euro_per_night + " €"}
                  </Form.Label>
                </MDBRow>
                <MDBRow className="list-group-item d-flex justify-content-between lh-sm">
                  <MDBCol md="6">
                    <Form.Group className="col-6 mx-auto" controlId="formStartDate">
                      <Form.Label>Inicio</Form.Label>
                      <Form.Control
                        type="date"
                        placeholder="Inicio"
                        name="startingDate"
                        min={currentDate}
                        value={formData.startingDate}
                        onChange={updateFormData}
                        required
                      />
                    </Form.Group>
                  </MDBCol>
                  <MDBCol md="6">
                    <Form.Group className="col-6 mx-auto" controlId="formEndDate">
                      <Form.Label>Fin</Form.Label>
                      <Form.Control
                        type="date"
                        placeholder="Fin"
                        name="endingDate"
                        min={currentDate}
                        value={formData.endingDate}
                        onChange={updateFormData}
                        required
                      />
                    </Form.Group>
                  </MDBCol>
                </MDBRow>
                <MDBRow className="list-group-item d-flex lh-sm">
                  <MDBCol className="d-flex justify-content-start space-around my-auto">
                    <Form.Label>
                      Personas :
                      <Form.Control
                        type="number"
                        placeholder="personas"
                        min={min_capacity}
                        max={household.max_capacity}
                        className="mx-2"
                        id="personasInput"
                        name="personas"
                        value={formData.personas}
                        onChange={updateFormData}
                      />
                    </Form.Label>
                    <Button
                      variant="primary"
                      type="submit"
                      size="md"
                      className="d flex mx-2 my-auto justify-content-end"
                    >
                      Calcular
                    </Button>
                  </MDBCol>
                </MDBRow>

                <MDBRow className="list-group-item d-flex lh-sm">
                  <MDBCol md="d-flex justify-content-start space-around">
                    <Form.Label className="my-auto">Precio Total:</Form.Label>
                    <Form.Label className="big justify-content-start mx-4">
                      {price_total + " €"}
                    </Form.Label>
                  </MDBCol>
                </MDBRow>

                <MDBRow className="list-group-item d-flex justify-content-between lh-sm">
                  {Reservar()}
                </MDBRow>
              </MDBCol>
            </Form>
            <div className="list-group mb-3 mt-5 d-flex">
              <MDBRow className="list-group-item d-flex justify-content-between lh-sm">
                <MDBCol md="3">
                  <Image
                    roundedCircle={true}
                    src="https://imgur.com/JGmoHaP.jpg"
                    style={{
                      height: "50px",
                      width: "50px",
                    }}
                  ></Image>
                </MDBCol>
                <MDBCol md="9">
                  <h4>{household.host.host_username}</h4>
                </MDBCol>
              </MDBRow>

              <MDBRow className="list-group-item d-flex justify-content-between lh-sm">
                <MDBCol>
                  {showContact === true ? (
                    <p>{household.host.host_email}</p>
                  ) : (
                    <></>
                  )}
                  <Button
                    variant="primary"
                    className=""
                    onClick={contactButtonHandler}
                  >
                    Contactar
                  </Button>
                </MDBCol>
              </MDBRow>
            </div>
          </MDBCol>
        </MDBRow>
      </Container>
    </>
  );
}
