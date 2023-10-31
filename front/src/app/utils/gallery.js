import axios from "axios";
import {uploadImage} from "@/app/utils/upload-file";

const API_URL = 'http://localhost:8000/api';

export async function addImage(idArticle = null, idService = null, name, path = "", form) {
    try {
        let fileName = name;
        let filePath = path;

        if(form) {
            fileName = await uploadImage(form, 'media/articles');
        }

        const response = await axios.post(`${API_URL}/gallery`, JSON.stringify({
            idArticle: idArticle,
            idService: idService,
            name: fileName,
            path: path,
        }));

        return response;
    } catch (e) {
        console.log(e);
    }
}