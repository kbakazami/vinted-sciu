import axios from "axios";

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

export async function getProducts(param) {
    try {
        const response = await axios.get(`${API_URL}${param}`);
        return response.data;
    } catch (e)
    {
        throw new Error(e);
    }
}