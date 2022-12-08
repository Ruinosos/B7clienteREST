import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { MDBRow } from "mdb-react-ui-kit";
import { MDBCol } from "mdb-react-ui-kit";
import { MapContainer } from "react-leaflet/MapContainer";
import { useEffect, useState } from "react";
import { iconDefault } from "../components/Map/markerLeafLet";
import { Marker, Popup, useMap } from "react-leaflet";
import { TileLayer } from "react-leaflet/TileLayer";
import { getHouseholdByID } from "../../src/api/FetchDBData";
import React from "react";
import { useParams } from "react-router-dom";
import { HouseholdMarkers } from "../components/Map/HouseholdMarker";
import { Carousel, ListGroup } from "react-bootstrap";
import { NavbarComponent } from "../components/Navbar/Navbar";

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

export default function Household() {
  const params = useParams().id;
  const getHousehold = async () => {
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
    setShowContact(prev => !prev);
  };

  useEffect(() => {
    const temp = async () => {
      setHousehold(await getHousehold());
    };
    temp();
  }, []);

  const [position] = useState({
    lat: 41.3851,
    lng: 2.1734,
  });

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
                        {household.photo.map(photo => (
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
                    Precio por Noche
                  </Form.Label>
                  <Form.Label className=" mt-2">
                    ${household.price_euro_per_night}
                  </Form.Label>
                </MDBRow>
                <MDBRow className="list-group-item d-flex justify-content-between lh-sm">
                  <MDBCol md="6">
                    <Form.Group className="mw-25" controlId="startDate">
                      <Form.Label className="small">Fecha Inicio</Form.Label>
                      <Form.Control type="date" placeholder="inicio" />
                    </Form.Group>
                  </MDBCol>
                  <MDBCol md="6">
                    <Form.Group className="mw-25" controlId="endDate">
                      <Form.Label className="small">Fecha Fin</Form.Label>
                      <Form.Control type="date" placeholder="final" />
                    </Form.Group>
                  </MDBCol>
                </MDBRow>
                <MDBRow className="list-group-item d-flex lh-sm">
                  <MDBCol className="ps-4">
                    <Form.Label className="small">Nº huéspedes</Form.Label>
                    <Form.Select className="w-50">
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                    </Form.Select>
                  </MDBCol>
                  <MDBCol></MDBCol>
                </MDBRow>

                <MDBRow className="list-group-item d-flex justify-content-between lh-sm">
                  <MDBCol md="10">
                    <Form.Label className="big justify-content-start">
                      Total:
                    </Form.Label>
                  </MDBCol>

                  <MDBCol md="2">
                    <Form.Label className="big justify-content-end">
                      25$
                    </Form.Label>
                  </MDBCol>
                </MDBRow>

                <MDBRow className="list-group-item d-flex justify-content-between lh-sm">
                  <Button variant="primary" type="submit">
                    Reservar
                  </Button>
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
