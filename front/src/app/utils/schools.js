import axios from "axios";

const API_URL = 'http://localhost:8000/api';

export async function getSchools() {
    try {
        const response = await axios.get(`${API_URL}/ecoles`);
        return response.data;
    } catch (e) {
        console.log(e);
    }
}

export async function getSchoolById(schoolId) {
    try {
        const response = await axios.get(`${API_URL}/ecoles/${schoolId}`);
        return response.data;
    } catch (e) {
        console.log(e);
    }
}