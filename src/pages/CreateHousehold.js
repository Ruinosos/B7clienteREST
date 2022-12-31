import Container from "react-bootstrap/Container";
import { MDBRow } from "mdb-react-ui-kit";
import { MDBCol } from "mdb-react-ui-kit";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import React from 'react';
import { useState } from "react";
import { useInterval } from "../hooks/useInterval";
import { createHousehold } from "../api/FetchDBData";
import CloudinaryUploadWidget from "../components/Cloudinary/UploadCloudinary";
import {getCoords} from "../api/FetchOpenData";
import MyHouseholds from "./MyHouseholds";

export default function CreateHousehold(){

  const getCurrentDate = () => {
    return new Date().toISOString();
  };
  const currentDate = getCurrentDate();
  
  const getLastDate = () => {
    return new Date(2025,12,12).toISOString();
  };
  
  const lastDate = getLastDate();

  const username = undefined;
  const email = undefined;

  if(localStorage.getItem('profile')) {

    username = JSON.parse(localStorage.getItem('profile')).name;

    email = JSON.parse(localStorage.getItem('profile')).email;

  }

  const [urlImg, setUrlImg] = useState({
    urlImg: "https://via.placeholder.com/150",
  });

    /*
    this.state = {
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
      }
      */
     
      const [formData, setFormData] = useState({
        host: {
          host_username: "",
          host_email: "",
        },
        title: "",
        description: "",
        address: {
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
              [{ date: currentDate}, { date: lastDate }],
              ],
              });

      const [isLoading, setIsLoading] = useState(false);
      const [modalData, setModalData] = useState({
        show: false,
        body: "",
        heading: "",
  });   

    const submitHandler = async (event) => {
      event.preventDefault();
      setIsLoading(true);

      const { title, description, street, number, photo, price, occupants} = formData;
      const { lat, lon } = await getCoords(street + ', ' + number);
      var jsonData = {
  
          "title": title,
          "description": description,
          "address": {
            "street": street,
            "number": number,
            "geojson": {
              "type": "Point",  
              "coordinates": [
                  lon, lat
              ]
            }
          },
          "photo": [
            urlImg
          ],
          "num_bathroom": 2,
          "num_bed": 3,
          "max_capacity": occupants,
          "price_euro_per_night": price,
          "rating": 4,
          "host": {
            "host_username": username,
            "host_email": email
          },
          "availability": [
            [
              {
                "$date": currentDate
              },
              {
                "$date": lastDate
              }
            ],
          ]
        }
      console.log(jsonData);
      createHousehold(jsonData);

  };

  const REFRESH_RATE_MS = 10000;

  useInterval(async () => {}, REFRESH_RATE_MS);

  const updateFormData = (event) => {
    const { name, value } = event.target;
    const res = { [name]: value };

    setFormData((prev) => {
      if (
        name === "title"
      ) {
        res["title"] = value;
      }
      if (
        name === "description"
      ) {
        res["description"] = value;
      }

      if (
        name === "street"
      ) {
        res["street"] = value;
      }

      if (
        name === "number"
      ) {
        res["number"] = value;
      }

      if (
        name === "price"
      ) {
        res["price"] = value;
      }

      if (
        name === "occupants"
      ) {
        res["occupants"] = value;
      }

      if (
        name === "photo"
      ) {
        res["photo"] = value;
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
                <MDBRow>
                    <MDBRow className="list-group-item d-flex justify-content-between lh-sm">
                        <Form.Group className="mw-25" controlId="images">
                            <Form.Label for="photo">Imágenes:</Form.Label>
                        </Form.Group> 
                    </MDBRow>
                    <MDBRow className="list-group-item d-flex justify-content-between lh-sm">
                        <MDBCol xs={4}>
                            <CloudinaryUploadWidget setUrlImg={setUrlImg}/>
                            <img src={urlImg ? urlImg : "https://via.placeholder.com/150%22%7D"} alt="img" width="300" height="300"/>
                        </MDBCol>
                        <MDBCol xs={8}>
                        </MDBCol>
                    </MDBRow>
                    <Form onSubmit={submitHandler} className="list-group mb-3 d-flex">
                        <MDBCol>

                            <MDBRow className="list-group-item d-flex justify-content-between lh-sm">
                                <Form.Group controlId="title">
                                    <Form.Label for="titulo" className="my-0">Titulo:</Form.Label>
                                    <Form.Control className="mt-3" type="text" name="title" placeholder="Título de la vivienda" value={formData.title} onChange={updateFormData} required />
                                </Form.Group>
                            </MDBRow>

                            <MDBRow className="list-group-item d-flex justify-content-between lh-sm">
                                <Form.Group className="mw-25" controlId="description">
                                    <Form.Label for="description" >Descripción:</Form.Label>
                                    <Form.Control className="mt-3" as="textarea" name="description" rows={4} placeholder="Una breve descripción..." value={formData.description} onChange={updateFormData} required />
                                </Form.Group>                            
                            </MDBRow>
                            
                            <MDBRow className="list-group-item d-flex justify-content-between lh-sm">
                                <MDBCol>
                                <Form.Group className="mw-25" controlId="street">
                                        <Form.Label for="street">Dirección:</Form.Label>
                                        <Form.Control className="mt-3" type="text" placeholder="Dirección de la vivienda" name="street" value={formData.street} onChange={updateFormData} required />
                                </Form.Group> 
                                </MDBCol>
                                <MDBCol>
                                <Form.Group className="mw-25" controlId="number">
                                        <Form.Label for="number">Numero vivienda:</Form.Label>
                                        <Form.Control className="mt-3" type="text" placeholder="Numero de la vivienda" name="number" value={formData.number} onChange={updateFormData} required />
                                </Form.Group> 
                                </MDBCol>
                            </MDBRow>

                            <MDBRow className="list-group-item d-flex justify-content-between lh-sm">
                                <MDBCol>
                                    <Form.Group className="mw-25" controlId="pricePerNight">
                                        <Form.Label for="price_euro_per_night">Precio por noche:</Form.Label>
                                        <Form.Control className="mt-3" type="number" name="price" placeholder="Ej: 50" value={formData.price} onChange={updateFormData} required/>
                                    </Form.Group>
                                </MDBCol>
                                <MDBCol>
                                    <Form.Group className="mw-25" controlId="maxNumOccupants">
                                        <Form.Label for="maxNumOccupants">Número máximo de huéspedes:</Form.Label>
                                        <Form.Control className="mt-3" type="number" name="occupants" placeholder="Ej: 5" value={formData.occupants} onChange={updateFormData} required/>
                                    </Form.Group>
                                </MDBCol>
                            </MDBRow>

                            

                            <MDBRow className="list-group-item d-flex justify-content-between lh-sm">
                            <Button variant="primary" type="submit">
                                Crear Vivienda
                            </Button>
                            </MDBRow>
                        </MDBCol>
                    </Form>
                </MDBRow>
            </Container>
        </>
    )
}
