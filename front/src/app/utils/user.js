import 'server-only';
import axios from "axios";

const API_URL = 'http://localhost:8000/api';

export async function getUserById(id) {
    try {
        const response = await axios.get(`https://dummyjson.com/users/${id}`);
        return response.data;
    } catch (e)
    {
        throw new Error(e);
    }
}

export async function getUserWishlist() {
    try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/todos`);
        return response.data;
    } catch (e)
    {
        throw new Error(e);
    }
}

export async function getUserProducts() {
    try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/todos`);
        return response.data;
    } catch (e)
    {
        throw new Error(e);
    }
}

export async function getUserReservations() {
    try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/todos`);
        return response.data;
    } catch (e)
    {
        throw new Error(e);
    }
}

export async function getUserServices() {
    try {
        const response = await axios.get(`https://dummyjson.com/posts/`);
        return response.data;
    } catch (e)
    {
        throw new Error(e);
    }
}

export async function getCurrentUser(token) {
    try {
        const response = await axios.get(`${API_URL}/currentUser`, {
            headers: { Authorization: 'Bearer ' + token }
        });
        return response.data;
    } catch (e) {
        console.log(e);
    }
}