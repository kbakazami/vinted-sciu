import NextAuth from "next-auth/next";
import axios from "axios";
import CredentialsProvider from "next-auth/providers/credentials";
import {getCurrentUser} from "@/app/utils/user";

const API_URL = 'http://localhost:8000/api'

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "La ruche citoyenne",
            credentials: {
                email: {label: "E-mail", type:"text", placeholder: "Votre e-mail"},
                password: {
                    label: "password",
                    type: "password",
                    placeholder: "password"
                },
            },
            async authorize(credentials, request) {
                try {
                    const response = await axios.post(`${API_URL}/login_check`, JSON.stringify({
                        username: credentials?.email,
                        password: credentials?.password,
                    }), {
                        headers: {
                            "Content-Type" : "application/json",
                        }});

                    const data = response.data;

                    if(data.token) {

                        return await getCurrentUser(data.token);
                    }

                    return null;
                } catch (e) {
                    console.log(e);
                }

            },
        }),
    ],
    jwt: {
        signinKey: process.env.JWT_SIGNING_PRIVATE_KEY,
    },
    callbacks: {
        async session({session, token}) {
            session.user = token.user;
            return session;
        },
        async jwt({token, user})
        {
            if(user) {
                token.user = user;
            }
            return token;
        }
    },
    pages: {
        signIn: '/login/'
    }
});

export { handler as GET, handler as POST };