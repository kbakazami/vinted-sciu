"use client";

import Button from "@/app/_components/button";
import {useSession} from "next-auth/react";
import Logout from "@/app/_components/user/Logout";

export default function UserAuthenticated(props) {

    const { status } = useSession();

    return (
        <div className="bg-secondary menu-wrapper absolute right-0 shadow-xl">
            {status === "authenticated" &&
                <>
                    <Button href={"/account"} content="Profil" className="menu"/>
                    <Logout className={"btn btn-primary menu"}/>
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