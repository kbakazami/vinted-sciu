"use client";

import Button from "@/app/_components/button";
import {useSession} from "next-auth/react";
import Logout from "@/app/_components/user/Logout";

export default function UserAuthenticated(props) {

    const { status } = useSession();

    return (
        <div className="bg-secondary menu-wrapper hidden absolute right-0 -bottom-12">
            {status === "authenticated" &&
                <>
                    <Button href={"/account"} content="Profil" className="menu"/>
                    <Logout/>
                </>
            }
            {status === "unauthenticated" &&
                <>
                    <Button href={"/login/"} content="Connexion" className="menu"/>
                    <Button href={"/register"} content="Inscription" className="menu"/>
                </>
            }
        </div>
    )
}