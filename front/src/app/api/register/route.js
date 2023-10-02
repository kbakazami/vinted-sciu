import axios from "axios";
import * as bcrypt from "bcrypt";
import {NextResponse} from "next/server";

const API_URL = 'http://localhost:8000';

export async function POST(request) {
    const body = await request.json();

    const user = await axios.post(`${API_URL}/register`, JSON.stringify({
        email: body.email,
        password: await bcrypt.hash(body.password, 10),
        is_active: 1,
        beecoin: 3,
    }), {
        headers: { "Content-Type": "application/json" },
    });

    const { password, ...rest} = user;
    return NextResponse.json(rest);
}