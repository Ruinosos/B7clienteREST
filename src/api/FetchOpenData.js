const API_BASE_URL = "http://localhost:8000";

const getBusByID = async (id) => {
  const res = await fetch(`http://localhost:8000/buses/${id}`);
  const data = await res.json();
  return data;
};

const getCoords = async (address) => {
  const res = await fetch(
    `https://nominatim.openstreetmap.org/search.php?q=${address}&format=jsonv2&countrycodes=es&polygon_geojson=1`
  );
  const data = await res.json();
  const { lat, lon, geojson } = data[0];
  return { lat: lat, lon: lon, geojson: geojson };
};
 

const getCurrentCoords = async () => {
  return new Promise((resolve, _) =>
    navigator.geolocation.getCurrentPosition(async ({ coords }) => {
      resolve(coords);
    })
  );
};

const getNearbyBuses = async () => {
  const current = await getCurrentCoords();
  const res = await fetch(
    `${API_BASE_URL}/buses/search/nearby?lat=${current.latitude}&lon=${current.longitude}`
  );
  return res.json();
};

const getTodayForecast = async () => {
  const res = await fetch(`${API_BASE_URL}/forecasts/today`);
  return res.json();
};

export { getBusByID, getCoords, getNearbyBuses, getTodayForecast };
