import axios from "axios";

const API_URL = 'http://localhost:8000/api';

export async function getPromos() {
    try {
        const response = await axios.get(`${API_URL}/promos`);
        return response.data;
    } catch (e) {
        console.log(e);
    }
}

export async function getPromoById(promoId) {
    try {
        const response = await axios.get(`${API_URL}/promos/${promoId}`);
        return response.data;
    } catch (e) {
        console.log(e);
    }
}