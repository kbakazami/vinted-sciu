import axios from "axios";

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