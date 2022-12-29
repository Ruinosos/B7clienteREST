import { Form, Button, FormGroup } from "react-bootstrap";
import { useState } from "react";
import AlbumComponent2 from "../components/Album/AlbumFilter";
import { useParams, useLocation } from "react-router-dom";
import React from "react";
import { getHouseholdsFromUserVivienda } from "../api/FetchDBData";

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

export default function HomeFilter() {

  const username = useParams().username;
  const query = useQuery();
  const vivienda = query.get("vivienda");
  const [formData, setFormData] = useState({
    vivienda: vivienda,
  });
  const [isLoading, setIsLoading] = useState(false);

  const submitHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const { vivienda } = formData;
    await getHouseholdsFromUserVivienda(username,vivienda);
    window.location.href = `/filter?vivienda=${vivienda}`;   
  };

  const updateFormData = (event) => {
    const { name, value } = event.target;
    const res = { [name]: value };

    setFormData((prev) => {
      if (
        name === "vivienda"
      ) {
        res["vivienda"] = value;
      }return {
      ...prev,
      ...res,
      };
    });
  };

  return (
    <>
      <h1 className="d-flex justify-content-center"> Anuncios </h1>
      <Form onSubmit={submitHandler} className="mb-3 d-flex justify-content-center">
          <FormGroup className="d-flex justify-content-center align-items-center space-between">
            <Form.Label className="my-5 mx-3">Vivienda:</Form.Label>
            <Form.Control type="text" name="vivienda" placeholder="Busqueda por descripción" onChange={updateFormData} value={formData.vivienda} required />
            <Button variant="primary" type="submit" className="mx-3">
              Buscar
            </Button>
          </FormGroup>
      </Form>
      <AlbumComponent2 vivienda = {vivienda}/>
    </>
  );
}
