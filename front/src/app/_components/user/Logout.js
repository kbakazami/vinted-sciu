"use client"

import {signOut} from "next-auth/react";

const Logout = () => {
    return (
        <button onClick={() => signOut({callbackUrl: "/"})} className={"ml-auto"}>
            Déconnexion
        </button>
    )
}

export default Logout;