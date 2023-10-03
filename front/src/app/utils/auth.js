import axios from "axios";

const API_URL = "http://localhost:8000";

export async function register(email, password) {
    try {
        const response = await axios.post(`${API_URL}/register`,JSON.stringify({
            email: email,
            password: password,
            is_active:0,
            beecoin:0
        }),{
            headers: {
                "Content-Type" : "application/json",
            }
        });

        return response.data;
    } catch (e) {
        console.log(e);
    }
}
