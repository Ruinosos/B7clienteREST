const API_BASE_URL = "http://localhost:8001";

export const getHouseholdByID = async (id) => {
    const res = await fetch(`${API_BASE_URL}/households/${id}`);
    const data = await res.json();
    return data;
};

export const getHouseholds = async () => {
    const res = await fetch(`${API_BASE_URL}/households/`);
    var data = await res.json();
    return data;
};

export const getHouseholdsFromUser = async (username) => {
    const res = await fetch(`${API_BASE_URL}/households/filter/username?name=${username}`); 
    const data = await res.json();
    return data;
};

export const getBookingsFromUser = async (username) => {
  const res = await fetch(`${API_BASE_URL}/bookings/from_user/${username}`); 
  const data = await res.json();    return data;
};

export async function createHousehold(jsonData){
  await fetch(`${API_BASE_URL}/households/`, {
    method: 'POST',
    mode: 'cors',
    body: jsonData
  });
}