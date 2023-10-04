import axios from "axios";

export async function getProductById(id) {
    try {
        const response = await axios.get(`https://dummyjson.com/products/${id}`);
        return response.data;
    } catch (e)
    {
        throw new Error(e);
    }
}