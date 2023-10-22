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

export async function getCategoryById(categoryId) {
    try {
        const response = await axios.get(`${API_URL}/categories/${categoryId}`);
        return response.data;
    } catch (e) {
        console.log(e);
    }
}

export async function addCategory(categoryName) {
    try {
        return await axios.post(`${API_URL}/categories`, JSON.stringify({
            name: categoryName
        }),{ headers: {
                "Content-Type" : "application/json",
            }});
    } catch (e) {
        console.log(e);
    }
}

export async function updateCategory(categoryName, categoryId) {
    try {
        return await axios.put(`${API_URL}/categories/${categoryId}`, JSON.stringify({
            name: categoryName
        }),{ headers: {
                "Content-Type" : "application/json",
            }});
    } catch (e) {
        console.log(e);
    }
}

export async function deleteCategoryById(categoryId) {
    try {
        return await axios.delete(`${API_URL}/categories/${categoryId}`);
    } catch (e) {
        console.log(e);
    }
}