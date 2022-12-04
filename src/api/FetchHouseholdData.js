const BASE_URL = "http://localhost:8001";

const getHouseholdNearbyByCoords = async (
  lat,
  lon,
  radius,
  startDate,
  endDate
) => {
  const res = await fetch(
    `${BASE_URL}/households/search/nearby?lat=${lat}&lon=${lon}&radius=${radius}&start_date=${startDate}&end_date=${endDate}`
  );
  return res.json();
};

export { getHouseholdNearbyByCoords};
