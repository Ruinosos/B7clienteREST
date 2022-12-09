const host = "3.127.55.81";
const port = "8001";
const API_BASE_URL = `https://${host}:${port}`;

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