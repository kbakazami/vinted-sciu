import axios from "axios";

const API_URL = "http://localhost:8000/api";

export async function getProductById(id) {
    try {
        const response = await axios.get(`${API_URL}/articles/${id}`);
        return response.data;
    } catch (e) {
        console.log(e);
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

export async function updateProduct(productName, description, categoryId, userId, productId){
    try {
        return await axios.put(`${API_URL}/articles/${productId}`, JSON.stringify({
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