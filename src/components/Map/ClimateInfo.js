import { useState } from "react";
import { getTodayForecast } from "../../api/FetchOpenData";
import {
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";
import { useInterval } from "../../hooks/useInterval";
import {currentValue, currentSkyDescriptionInPeriod} from "../../utils/forecastData";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'mdbreact/dist/css/mdb.css';

export const ClimateInfo = () => {

  const [climate, setClimate] = useState({
    currentTemp: 0,
    tempMax : 0,
    tempMin : 0,
    humidity : 0,
    windSpeed : 0,
    description : "",
  });
  
const createForecast = async () => {
  const forecast = await getTodayForecast();
  const currentHour = new Date().getHours();
  console.log(forecast);
  
  setClimate({currentTemp: currentValue(forecast.temperatura.dato, currentHour) ,
              tempMax: forecast.temperatura.maxima,
              tempMin: forecast.temperatura.minima,
              humidity: currentValue(forecast.humedadRelativa.dato, currentHour),
              windSpeed: forecast.viento[2].velocidad,
              description: currentSkyDescriptionInPeriod(forecast.estadoCielo, currentHour),});

};

// Fetch bus data every 10s
const REFRESH_RATE_MS = 10000;

useInterval(async () => {
  createForecast();
}, REFRESH_RATE_MS);

    return (
      <MDBContainer className="h-100 mt-5 align-self-end">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol md="8" lg="6" xl="6">
            <MDBCard style={{ color: "#4B515D", borderRadius: "35px" }}>
              <MDBCardBody className="p-4">
                <div className="d-flex">
                  <MDBTypography tag="h6" className="flex-grow-1">
                    Malaga
                  </MDBTypography>
                  <MDBTypography tag="h6">{new Date().getHours()}:{new Date().getMinutes()}</MDBTypography>
                </div>
                
                <div className="d-flex flex-column text-center mt-2 mb-2">
                  <MDBTypography
                    tag="h6"
                    className="display-4 mb-0 font-weight-bold"
                    style={{ color: "#1C2331" }}
                  >
                    {" "}
                    {climate.currentTemp}{" "}
                  </MDBTypography>
                  <span className="small" style={{ color: "#868B94" }}>
                    {climate.description}
                  </span>
                </div>
                
                <div className="d-flex align-items-center">
                  <div className="flex-grow-1" style={{fontSize: '1rem'}}>
                    <div>
                      <MDBIcon
                        fas
                        icon="wind fa-fw"
                        style={{ color: "#868B94" }}
                      />{" "}
                      <span className="ms-1"> {climate.windSpeed} km/h</span>
                    </div>
                    <div>
                      <MDBIcon
                        fas
                        icon="tint fa-fw"
                        style={{ color: "#868B94" }}
                      />{" "}
                      <span className="ms-1"> {climate.humidity}% </span>
                    </div>
                    
                  </div>
                  <div>
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-weather/ilu1.webp"
                      alt="weather"
                      width="100px"
                    />
                  </div>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      );
};