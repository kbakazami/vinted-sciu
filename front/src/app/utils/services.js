import axios from "axios";

const API_URL = "http://localhost:8000/api";

export async function getServices() {
    try {
        const response = await axios.get(`https://dummyjson.com/products`);
        return response.data.products;
    } catch (e)
    {
        console.log(e);
    }
}

export async function getServiceById(id) {
    try {
        const response = await axios.get(`https://dummyjson.com/posts/${id}`);
        return response.data;
    } catch (e)
    {
        console.log(e);
    }
}

export async function addService(serviceName, description, serviceCategoryId, userId) {
    try {
        return await axios.post(`${API_URL}/services`, JSON.stringify({
            idServiceCategory: serviceCategoryId,
            userId : 1,
            title: serviceName,
            description: description
        }), {headers: {
                "Content-Type" : "application/json",
            }});
    } catch (e) {
        console.log(e);
    }
}