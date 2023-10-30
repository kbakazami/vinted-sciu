import axios from "axios";
import {uploadImage} from "@/app/utils/upload-file";

const API_URL = 'http://localhost:8000/api';

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

export async function updateUser(firstName, lastName, email, promo, school, userId, profilePictureName, form) {
    try {
        let fileName = profilePictureName;

        if(form) {
            fileName = await uploadImage(form, 'media/users');
        }

        const response = await axios.put(`${API_URL}/users/${userId}`, JSON.stringify({
            firstName: firstName,
            lastName: lastName,
            email: email,
            idPromo: promo,
            idEcole: school,
            picture: fileName
        }));

        return {
            responseAxios : response,
            userPicture: fileName
        }
    } catch (e) {
        console.log(e);
    }
}