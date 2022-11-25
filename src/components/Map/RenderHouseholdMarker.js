import { Marker } from "react-leaflet";

export const RenderHouseholdMarkers = (households) => {
    return households.map((household) => {
      const { lat, lon } = household;
      return (
        <Marker position={[lat, lon]} key={household.id}>
          {createHouseholdPopup(household)}
        </Marker>
      );
    });
  };