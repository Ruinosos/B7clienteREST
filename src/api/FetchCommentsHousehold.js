const BASE_URL = "http://localhost:8001";

const getCommentsFromHousehold = async (id) => {
    if(id) {
        const res = await fetch(`${BASE_URL}/comments/household/${id}`);
        return res.json();
    }
    return 0;
};

export { getCommentsFromHousehold };