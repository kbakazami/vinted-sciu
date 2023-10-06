import axios from "axios";

const API_URL = "http://localhost:8000/api";

export async function getProductById(id) {
    try {
        const response = await axios.get(`https://dummyjson.com/products/${id}`);
        return response.data;
    } catch (e)
    {
        throw new Error(e);
    }
}

export async function addProduct(productName, description, categoryId, userId) {
    try {
        return await axios.post(`${API_URL}/articles`, JSON.stringify({
            idCategory: categoryId,
            userId : 1,
            title: productName,
            description: description
        }), {headers: {
                "Content-Type" : "application/json",
            }});
    } catch (e) {
        console.log(e);
    }
}