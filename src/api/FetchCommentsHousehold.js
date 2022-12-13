const BASE_URL = "http://localhost:8001";

const getCommentsFromHousehold = async (id) => {
    const res = await fetch(`${BASE_URL}/comments/household/${id}`);
    return res.json();
};

export { getCommentsFromHousehold };