"use client"

import {signOut} from "next-auth/react";

const Logout = (params) => {
    return (
        <button onClick={() => signOut({callbackUrl: "/"})} className={`ml-auto ${params.className}`}>
            Déconnexion
        </button>
    )
}

export default Logout;