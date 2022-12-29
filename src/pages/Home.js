import { Form, Button, FormGroup } from "react-bootstrap";
import { MDBRow } from "mdb-react-ui-kit";
import { MDBCol } from "mdb-react-ui-kit";
import { useState } from "react";
import AlbumComponent from "../components/Album/Album";

export default function Home() {

  const [formData, setFormData] = useState({
    vivienda: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const submitHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    //createHousehold(formData.vivienda);

  };

  const updateFormData = (event) => {
    const { name, value } = event.target;
    const res = { [name]: value };

    setFormData((prev) => {
      if (
        name === "vivienda"
      ) {
        res["vivienda"] = value;
      }
    });
  };


  return (
    <>
      <h1 className="d-flex justify-content-center"> Anuncios </h1>
      <Form onSubmit={submitHandler} className="mb-3 d-flex justify-content-center">
          <FormGroup className="d-flex justify-content-center align-items-center space-between">
            <Form.Label className="my-5 mx-3">Vivienda:</Form.Label>
            <Form.Control type="text" name="vivienda" placeholder="Introduce una vivienda" onChange={updateFormData} value={formData.vivienda} required />
            <Button variant="primary" type="submit" className="mx-3">
              Buscar
            </Button>
          </FormGroup>
      </Form>
      <AlbumComponent />
    </>
  );
}
