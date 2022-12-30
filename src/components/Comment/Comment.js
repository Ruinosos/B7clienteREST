import React from "react";
import Form from "react-bootstrap/Form";
import { useInterval } from "../../hooks/useInterval";
import { getCommentsFromHousehold } from "../../api/FetchCommentsHousehold";
import {
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBInput,
  MDBRow,
} from "mdb-react-ui-kit";
import { useEffect, useState } from "react";


export const Comment = ({ idHousehold }) => { 

    const getComments = async (idHousehold) => {
        const comments = await(getCommentsFromHousehold(idHousehold));
        console.log(comments + " sdkjfhksdj");
        return comments;
    }

    const [comments, setComments] = useState([
        {
            id: "",
            user: {
                renter_username: "",
                renter_email: "",
            },
            household: {
                id: "",
            },
            text: "",
            rating: "",
        }
    ]);

    useEffect(() => {
        const temp = async () => {
          setComments(await getCommentsFromHousehold(idHousehold))
        }
        temp()
      }, [idHousehold]);

    const [formData, setFormData] = useState({
        id: "",
        user: {
            renter_username: "",
            renter_email: ""
        },
        photo: "",
        household: {
            id: ""
        },
        text: "",
        valoration: ""  
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
  
        const { text, valoration } = formData;
        var jsonData = {
            user: {
                renter_username: JSON.parse(localStorage("profile").username),
                renter_email: JSON.parse(localStorage("profile").email)
            },
            photo: JSON.parse(localStorage("profile").picture),
            household: {
                id: idHousehold
            },
            text: text,
            valoration: valoration
          }
        //console.log(jsonData);
        //createHousehold(jsonData);
  
    };

    const REFRESH_RATE_MS = 10000;

    useInterval(async () => {}, REFRESH_RATE_MS);

    const updateFormData = (event) => {
        const { name, value } = event.target;
        const res = { [name]: value };
        
        setFormData((prev) => {
            console.log(prev);
            if (
            name === "text"
            ) {
            res["text"] = value;
            }
            if (
            name === "valoration"
            ) {
            res["valoration"] = value;
            }
            return {
            ...prev,
            ...res,
            };
        });
    };
      

    return (
        <MDBContainer className="mt-3 mb-3" style={{ maxWidth: "1000px" }}>
        <MDBRow className="justify-content-left">
            <MDBCol md="8" lg="8">
            <MDBCard
                className="shadow-0 border"
                style={{ backgroundColor: "#f0f2f5" }}
            >
                <MDBCardBody>
                    <MDBRow>
                        <Form>
                            <MDBCol xs={10}>
                                <Form.Group>
                                    <Form.Control type="text" name="comment" placeholder="Escribe tu comentario..." value={formData.text} onChange={updateFormData} required />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Control className="mt-4 mb-4" type="number" name="rating" placeholder="Valoracion: 0..5" value={formData.valoration} onChange={updateFormData} required />
                                </Form.Group>
                            </MDBCol>
                            <MDBCol xs={2}>
                                <button className='btn btn-md btn-primary' type="submit">Enviar</button>
                            </MDBCol>
                        </Form>
                    </MDBRow>
                    {Array.from(comments).map(comment => (
                        <MDBCard className="mb-4">
                            <MDBCardBody>
                            <p>{comment.text}</p>

                            <div className="d-flex justify-content-between">
                                <div className="d-flex flex-row align-items-center">
                                <MDBCardImage
                                    src={comment.photo}
                                    alt="avatar"
                                    width="25"
                                    height="25"
                                />
                                <p className="small mb-0 ms-2">{comment.user.renter_username}</p>
                                </div>
                            </div>
                            </MDBCardBody>
                        </MDBCard>
                    ))}
                </MDBCardBody>
            </MDBCard>
            </MDBCol>
        </MDBRow>
        </MDBContainer>
    );
};