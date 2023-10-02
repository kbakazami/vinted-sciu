import * as bcrypt from "bcrypt";
import axios from "axios";

const API_URL = 'http://localhost:8000';

export async function POST(request) {
    const body = await request.json();

    try {
        const user = await axios.post(`${API_URL}/login`, JSON.stringify({
            email: body.email,
            password: body.password
        }), {
            headers: { "Content-Type": "application/json" },
        });

        console.log(user);
    } catch (e) {
        console.log(e);
    }
}