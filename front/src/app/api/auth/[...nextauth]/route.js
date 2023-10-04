import NextAuth from "next-auth/next";
import axios from "axios";
import CredentialsProvider from "next-auth/providers/credentials";

const API_URL = 'http://localhost:8000'

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
                    const response = await axios.post(`${API_URL}/login`, JSON.stringify({
                        username: credentials?.email,
                        password: credentials?.password,
                    }), {
                        headers: {
                            "Content-Type" : "application/json",
                        }});

                    const data = response.data;
                    let user = null;
                    if(data.token) {

                        const base64Url = data.token.split('.')[1];
                        const base64 = base64Url.replace('-','+').replace('-','/');
                        user = JSON.parse(atob(base64));

                        return user;
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