import axios from "axios";

const API_URL = "http://localhost:8000/api";

export async function getServicesCategories() {
    try {
        const response = await axios.get(`${API_URL}/servicesCategories`);
        return response.data;
    } catch (e)
    {
        console.log(e);
    }
}