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

export async function getServiceCategoryById(serviceCategoryId) {
    try {
        const response = await axios.get(`${API_URL}/servicesCategories/${serviceCategoryId}`);
        return response.data;
    } catch (e) {
        console.log(e);
    }
}

export async function updateServiceCategory(serviceCategoryName, serviceCategoryId) {
    try {
        return await axios.put(`${API_URL}/servicesCategories/${serviceCategoryId}`, JSON.stringify({
            name: serviceCategoryName
        }),{ headers: {
                "Content-Type" : "application/json",
            }});
    } catch (e) {
        console.log(e);
    }
}

export async function addServiceCategory(serviceCategoryName) {
    try {
        return await axios.post(`${API_URL}/servicesCategories`, JSON.stringify({
            name: serviceCategoryName
        }),{headers: {
                "Content-Type" : "application/json",
            }})
    } catch (e) {
        console.log(e);
    }
}

export async function deleteServiceCategoryById(serviceCategoryId){
    try {
        return await axios.delete(`${API_URL}/servicesCategories/${serviceCategoryId}`);
    } catch (e) {
        console.log(e);
    }
}