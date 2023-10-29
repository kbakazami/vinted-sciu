import axios from "axios";

const API_URL = 'http://localhost:8000/api';

export async function getSchools() {
    try {
        const response = await axios.get(`${API_URL}/currentUser`);
        return response.data;
    } catch (e) {
        console.log(e);
    }
}