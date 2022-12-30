import Container from "react-bootstrap/Container";
import { MDBRow } from "mdb-react-ui-kit";
import { MDBCol } from "mdb-react-ui-kit";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import React from 'react';
import { useState, useEffect, useRef } from "react";
import { useInterval } from "../hooks/useInterval";
import { useParams } from "react-router-dom";
import { editHousehold, getHouseholdByID } from "../api/FetchDBData";
import CloudinaryUploadWidget from "../components/Cloudinary/UploadCloudinary";
import {getCoords} from "../api/FetchOpenData";

export default function EditHousehold(){

  const [urlImg, setUrlImg] = useState({
    urlImg: "https://via.placeholder.com/150",
  });

  const id = useParams().id;

  const getHousehold = async (id) => {
    const household = await getHouseholdByID(id);
    return household;
  };
  const [household, setHousehold] = useState({
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
  });

  useEffect(() => {
    const temp = async () => {
        setHousehold(await getHousehold(id));
    };
    temp();
    }, [id]);
     
    const [formData, setFormData] = useState({
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
    rating: 0
    });

    const [isLoading, setIsLoading] = useState(false);
    const [modalData, setModalData] = useState({
        show: false,
        body: "",
        heading: "",
    });  

    console.log(formData);

    var mount = true

    useEffect(() => {
        if(mount) {
            setFormData(household);
        }
        mount = false;
    }, [household, mount])

    const submitHandler = async (event) => {
      event.preventDefault();
      setIsLoading(true);

      const { title, description, street, number, price_euro_per_night, max_capacity } = formData;
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
          "max_capacity": max_capacity,
          "price_euro_per_night": price_euro_per_night,
          "rating": 4,
          }
      console.log(jsonData);
      editHousehold(id, jsonData);

  };

  const REFRESH_RATE_MS = 10000;

  useInterval(async () => {}, REFRESH_RATE_MS);

  const updateFormData = (event) => {
    const { name, value } = event.target;
    const res = { [name]: value };
    console.log(name);

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
        res["price_euro_per_night"] = value;
      }

      if (
        name === "occupants"
      ) {
        res["max_capacity"] = value;
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
                    <Form onSubmit={submitHandler} className="list-group mb-3 d-flex">
                        <MDBCol>

                            <MDBRow className="list-group-item d-flex justify-content-between lh-sm">
                                <Form.Group controlId="title">
                                    <Form.Label for="titulo" className="my-0">Titulo:</Form.Label>
                                    <Form.Control className="mt-3" type="text" name="title" placeholder="Título de la vivienda" value={formData.title} onChange={updateFormData}  />
                                </Form.Group>
                            </MDBRow>

                            <MDBRow className="list-group-item d-flex justify-content-between lh-sm">
                                <Form.Group className="mw-25" controlId="description">
                                    <Form.Label for="description" >Descripción:</Form.Label>
                                    <Form.Control className="mt-3" as="textarea" name="description" rows={4} placeholder="Una breve descripción..." value={formData.description} onChange={updateFormData}  />
                                </Form.Group>                            
                            </MDBRow>
                            
                            <MDBRow className="list-group-item d-flex justify-content-between lh-sm">
                                <MDBCol>
                                <Form.Group className="mw-25" controlId="street">
                                        <Form.Label for="street">Dirección:</Form.Label>
                                        <Form.Control className="mt-3" type="text" placeholder="Dirección de la vivienda" name="street" value={formData.address.street} onChange={updateFormData}  />
                                </Form.Group> 
                                </MDBCol>
                                <MDBCol>
                                <Form.Group className="mw-25" controlId="number">
                                        <Form.Label for="number">Numero vivienda:</Form.Label>
                                        <Form.Control className="mt-3" type="text" placeholder="Numero de la vivienda" name="number" value={formData.address.number} onChange={updateFormData}  />
                                </Form.Group> 
                                </MDBCol>
                            </MDBRow>

                            <MDBRow className="list-group-item d-flex justify-content-between lh-sm">
                                <MDBCol>
                                    <Form.Group className="mw-25" controlId="pricePerNight">
                                        <Form.Label for="price_euro_per_night">Precio por noche:</Form.Label>
                                        <Form.Control className="mt-3" type="number" name="price" placeholder="Ej: 50" value={formData.price_euro_per_night} onChange={updateFormData} />
                                    </Form.Group>
                                </MDBCol>
                                <MDBCol>
                                    <Form.Group className="mw-25" controlId="maxNumOccupants">
                                        <Form.Label for="maxNumOccupants">Número máximo de huéspedes:</Form.Label>
                                        <Form.Control className="mt-3" type="number" name="occupants" placeholder="Ej: 5" value={formData.max_capacity} onChange={updateFormData} />
                                    </Form.Group>
                                </MDBCol>
                            </MDBRow>
                            <MDBRow className="list-group-item justify-content-between lh-sm">
                            <Button variant="primary" type="submit">
                                Editar Vivienda
                            </Button>
                            </MDBRow>
                        </MDBCol>
                    </Form>
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
                </MDBRow>
            </Container>
        </>
    )
}
