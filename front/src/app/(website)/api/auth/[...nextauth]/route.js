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
                        const user = await getCurrentUser(data.token);
                        return user;
                    } else {
                        return null;
                    }
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
        async jwt({token, user, session, trigger})
        {
            if(trigger === "update")
            {
                token.roles = session.roles;
                token.lastName = session.lastName;
                token.firstName = session.firstName;
                token.picture = session.picture;
                token.isActive = session.isActive;
                token.ecole = session.ecole;
                token.promo = session.promo;
            }

            if(user) {
                return {
                    ...token,
                    id: user.id,
                    roles: user.roles,
                    lastName: user.lastName,
                    firstName: user.firstName,
                    picture: user.picture,
                    isActive: user.isActive,
                    ecole: user.ecole,
                    promo: user.promo
                }
            }

            return token;
        },
        async session({session, token, user}) {

            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id,
                    roles: token.roles,
                    lastName: token.lastName,
                    firstName: token.firstName,
                    picture: token.picture,
                    isActive: token.isActive,
                    ecole: token.ecole,
                    promo: token.promo
                }
            };

            return session;
        }
    },
    pages: {
        signIn: '/login/'
    }
});

export { handler as GET, handler as POST };