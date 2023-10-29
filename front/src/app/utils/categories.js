import axios from "axios";
import {uploadImage} from "@/app/utils/upload-file";

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

export async function addCategory(categoryName, categoryPictureName, form) {
    try {
        let fileName = categoryPictureName;

        if(form) {
            fileName = await uploadImage(form, 'media/categories');
        }

        return await axios.post(`${API_URL}/categories`, JSON.stringify({
            name: categoryName,
            image: fileName
        }),{ headers: {
                "Content-Type" : "application/json",
            }});
    } catch (e) {
        console.log(e);
    }
}

export async function updateCategory(categoryName, categoryId, categoryPictureName, form) {
    try {
        let fileName = categoryPictureName;

        if(form) {
            fileName = await uploadImage(form, 'media/categories');
        }

        return await axios.put(`${API_URL}/categories/${categoryId}`, JSON.stringify({
            name: categoryName,
            image: fileName
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