import { useEffect, useState } from "react";
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
import { Spinner } from "../../components/Spinner/Spinner";
import {
  currentValue,
  currentSkyDescriptionInPeriod,
  getUrlImage,
} from "../../utils/forecastData";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "mdbreact/dist/css/mdb.css";
import { useInterval } from "../../hooks/useInterval";

export const ClimateInfo = ({ position }) => {
  const [loading, setLoading] = useState(true);

  const [climate, setClimate] = useState({
    currentTemp: 0,
    tempMax: 0,
    tempMin: 0,
    humidity: 0,
    windSpeed: 0,
    description: "",
  });

  const [currentTime, setCurrentTime] = useState(
    new Date().toISOString().slice(11, 16)
  );
  useInterval(
    () => setCurrentTime(new Date().toISOString().slice(11, 16)),
    60000
  );

  const createForecast = async () => {
    const forecast = await getTodayForecast();
    const currentHour = new Date().getHours();

    setClimate({
      currentTemp: currentValue(forecast.temperatura.dato, currentHour),
      tempMax: forecast.temperatura.maxima,
      tempMin: forecast.temperatura.minima,
      humidity: currentValue(forecast.humedadRelativa.dato, currentHour),
      windSpeed: forecast.viento[2].velocidad,
      description: currentSkyDescriptionInPeriod(
        forecast.estadoCielo,
        currentHour
      ),
    });
    setLoading(false);
  };

  useEffect(() => {
    createForecast();
  }, []);

  return (
    <MDBContainer className={`mb-3 ${position}`}>
      <MDBRow>
        <MDBCol lg="2">
          <MDBCard
            className="d-flex justify-content-center align-items-center"
            style={{ color: "#4B515D", borderRadius: "35px" }}
          >
            {loading ? (
              <Spinner />
            ) : (
              <MDBCardBody className="p-4">
                <div className="d-flex">
                  <MDBTypography tag="h6" className="flex-grow-1">
                    Malaga
                  </MDBTypography>
                  <MDBTypography tag="h6">{currentTime}</MDBTypography>
                </div>

                <div className="d-flex flex-column text-center mt-2 mb-2 ">
                  <MDBTypography
                    tag="h6"
                    className="display-4 mb-0 font-weight-bold"
                    style={{ color: "#1C2331" }}
                  >
                    {climate.currentTemp}º
                  </MDBTypography>
                  <span className="small" style={{ color: "#868B94" }}>
                    {climate.description}
                  </span>
                </div>

                <div className="d-flex align-items-center">
                  <div className="flex-grow-1" style={{ fontSize: "1rem" }}>
                    <div>
                      <MDBIcon
                        fas
                        icon="wind fa-fw"
                        style={{ color: "#868B94" }}
                      />
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
                      src={getUrlImage(climate.description)}
                      alt="weather"
                      width="50px"
                    />
                  </div>
                </div>
              </MDBCardBody>
            )}
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};
