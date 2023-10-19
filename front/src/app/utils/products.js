import axios from "axios";
import "server-only";

const API_URL = "http://localhost:8000/api/"
export async function getProductById(id) {

    try {
        const response = await axios.get(`https://dummyjson.com/products/${id}`);
        return response.data;
    } catch (e)
    {
        throw new Error(e);
    }
}

export async function GET(param) {
    return await axios.get(`${API_URL}${param}`);
}