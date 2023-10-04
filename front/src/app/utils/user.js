import 'server-only';
import axios from "axios";

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
        const response = await axios.get(`https://jsonplaceholder.typicode.com/todos`);
        return response.data;
    } catch (e)
    {
        throw new Error(e);
    }
}