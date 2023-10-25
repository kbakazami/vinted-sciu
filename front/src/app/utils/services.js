import axios from "axios";

const API_URL = "http://localhost:8000/api";

export async function getServices() {
    try {
        const response = await axios.get(`${API_URL}/services`);
        return response.data;
    } catch (e)
    {
        console.log(e);
    }
}

export async function getServiceById(serviceId) {
    try {
        const response = await axios.get(`${API_URL}/services/${serviceId}`);
        return response.data;
    } catch (e)
    {
        console.log(e);
    }
}

export async function getServicesByCategory(serviceCategoryName){
    try {
        const response = await axios.get(`${API_URL}/servicesCategories/${serviceCategoryName}/services`);
        return response.data.services;
    } catch (e) {
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

export async function updateService(serviceName, description, serviceCategoryId, userId, serviceId) {
    try {
        return await axios.put(`${API_URL}/services/${serviceId}`, JSON.stringify({
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

export async function deleteServiceById(serviceId) {
    try {
        return await axios.delete(`${API_URL}/services/${serviceId}`);
    } catch (e) {
        console.log(e);
    }
}