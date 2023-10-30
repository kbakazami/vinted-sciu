import axios from "axios";

const API_URL = "http://localhost:8000";

export async function register(first_name, last_name, email, password) {
    try {
        const response = await axios.post(`${API_URL}/register`,JSON.stringify({
            first_name: first_name,
            last_name: last_name,
            email: email,
            password: password,
            is_active:0,
            beecoin:0,
            is_school_administrator: 0,
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
