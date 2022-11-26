//import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { MapContainer } from "react-leaflet/MapContainer";
import { useEffect, useState } from "react";
import { iconDefault } from "../components/Map/markerLeafLet";
import { Marker, Popup, useMap } from "react-leaflet";
import { TileLayer } from "react-leaflet/TileLayer";
import { getHouseholdByID } from "../../src/api/FetchDBData";
import React from 'react';
import {useParams} from 'react-router-dom';

//Esto es pa crear una linea divisora
//<div style={{ borderTop: "2px solid #fff ", marginLeft: 20, marginRight: 20 }}></div>

const MyMap = ({ position }) => {
  const map = useMap();
  console.log(map);
  useEffect(() => {
    //Center map on position
    console.log("map center:", map.getCenter());
    map.flyTo([position.lat, position.lng]);
  }, [position, map]);

  return null;
};

/*
function imgur() {
  const [file, setFile] = useState();
  const onFileChange = (event) => {
    // Updating the state
    setFile({ file: event.target.files[0] });
  };
  const onFileUpload = async () => {
    // Client ID
    const clientId = "fd2e1e3d3d12ce1",
      auth = "Client-ID " + clientId;
  
    // Creating an object of formData
    const formData = new FormData();
  
    // Adding our image to formData
    formData.append("file", file);
  
    // Making the post request
    await fetch("https://api.imgur.com/3/image/", {
      // API Endpoint
      method: "POST", // HTTP Method
      body: formData, // Data to be sent
      headers: {
        // Setting header
        Authorization: auth,
        Accept: "application/json",
      },
    })
      // Handling success
      .then((res) => alert("image uploaded") && console.log(res)) 
      .catch((err) => alert("Failed") && console.log(err)); 
  };
  


  return (
    <>
      <input name="file" type="file" onChange={onFileChange} />
      <button onClick={onFileUpload}>Upload</button>
    </>
  );
}
*/
 



export default function Household() {
  const useGetHousehold = async () => {
    const params = useParams();
    console.log(params.id);
    const household = await getHouseholdByID(params.id);
    console.log(household);
  };
  useGetHousehold()

  const [position] = useState({
    lat: 41.3851,
    lng: 2.1734,
  });

  return (
    <Container>
      <Row>
        <Col xs={8}>
          <h1>Titulo casa</h1>

          <Row>
            <h3>Imagen grande</h3>
          </Row>

          <Row>
            <h4>Descripcion</h4>
          </Row>

          <Row>
            <h4>Comentarios</h4>

            <Col xs={6}>
              <h5>Comentario 1</h5>
            </Col>

            <Col xs={6}>
              <h5>Comentario 2</h5>
            </Col>
          </Row>

          <Row>
            <h4>Mapa</h4>

            <Col xs={6}>
              <MapContainer
                className="rounded-5 order-lg-last ms-5"
                style={{
                  height: "500px",
                  width: "700px",
                }}
                center={position}
                zoom={15}
                scrollWheelZoom={false}
              >
                <MyMap position={position} />
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker icon={iconDefault} position={position}>
                  <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                  </Popup>
                </Marker>
              </MapContainer>
            </Col>
          </Row>
        </Col>

        <Col xs={4} className="mt-5">
          <Form className="list-group mb-3 d-flex">
            <Row className="list-group-item d-flex justify-content-between lh-sm">
              <Form.Label className="small my-0">Precio por Noche</Form.Label>

              <Form.Label className=" mt-2">$12</Form.Label>
            </Row>
            <Row className="list-group-item d-flex justify-content-between lh-sm">
              <Col>
                <Form.Group className="mw-25" controlId="startDate">
                  <Form.Label className="small">Fecha Inicio</Form.Label>
                  <Form.Control type="date" placeholder="inicio" />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mw-25" controlId="endDate">
                  <Form.Label className="small">Fecha Fin</Form.Label>
                  <Form.Control type="date" placeholder="final" />
                </Form.Group>
              </Col>
            </Row>
            <Row className="list-group-item d-flex justify-content-between lh-sm">
              <Form.Label className="small">Nº huéspedes</Form.Label>
              <Form.Select className="w-25">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </Form.Select>
            </Row>

            <Row className="list-group-item d-flex justify-content-between lh-sm">
              <Col xs={10}>
                <Form.Label className="big justify-content-start">
                  Total:
                </Form.Label>
              </Col>

              <Col xs={2}>
                <Form.Label className="big justify-content-end">25$</Form.Label>
              </Col>
            </Row>

            <Row className="list-group-item d-flex justify-content-between lh-sm">
              <Button variant="primary" type="submit">
                {" "}
                Reservar{" "}
              </Button>
            </Row>

            <div className="list-group mb-3 mt-5 d-flex">
              <Row className="list-group-item d-flex justify-content-between lh-sm">
                <Col xs={3}>
                  <h4>Foto anfitrion</h4>
                </Col>

                <Col xs={9}>
                  <h4>Nombre anfitrion</h4>
                </Col>
              </Row>

              <Row className="list-group-item d-flex justify-content-between lh-sm">
                <Col xs={12}>
                  <Button variant="primary" type="submit" className="">
                    Contactar
                  </Button>
                </Col>
              </Row>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
