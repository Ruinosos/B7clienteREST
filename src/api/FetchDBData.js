import axios from "axios";

const urlAPI = "https://roomtrackrservidor.fly.dev";
//const urlAPI = "http://localhost:8001";
const API_BASE_URL = urlAPI;

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

export const getHouseholdsFromUserVivienda = async (username,vivienda) => {
  function buildUrl(username, vivienda) {
    let url = `${API_BASE_URL}/households/filter/username/description`;
    const params = [];
    if (username) {
      params.push(`username=${username}`);
    }
    if (vivienda) {
      params.push(`description=${vivienda}`);
    }
    if (params.length > 0) {
      url += '?' + params.join('&');
    }
    return url;
  }
  const url = buildUrl(username, vivienda);
  const res = await fetch(url);
  const data = await res.json();
  return data;
};

export const getBookingsFromUser = async (username) => {
  const res = await fetch(`${API_BASE_URL}/bookings/from_user/${username}`); 
  const data = await res.json();
  return data;
};

export const searchHousehold = async (vivienda) => {
  const res = await fetch(`${API_BASE_URL}/households/filter/description?description=${vivienda}`); 
  const data = await res.json();
  return data;
};




/*export async function createHousehold(jsonData){
  await fetch(`${API_BASE_URL}/households/`, {
    method: 'POST',
    body: JSON.stringify(jsonData)
  });
}*/

  export async function createHousehold(jsonData){
    await axios.post(`${API_BASE_URL}/households/`, jsonData);
  };

  export async function createBooking(jsonData) {
    const res = await axios.post(`${API_BASE_URL}/bookings/`,jsonData); 
    const data = await res.json();
    return data;
  };