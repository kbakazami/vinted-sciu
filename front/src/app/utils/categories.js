import axios from "axios";

const API_URL = 'http://localhost:8000/api'

export async function getCategories() {
    try {
        const response = await axios.get(`${API_URL}/categories`);
        return response.data;
    }
    catch (e) {
        console.log(e);
    }
}