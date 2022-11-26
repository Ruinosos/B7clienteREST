const API_BASE_URL = "http://localhost:8001";

export const getHouseholdByID = async (id) => {
    const res = await fetch(`${API_BASE_URL}/households/${id}`);
    const data = await res.json();
    console.log(data);
    return data;
};