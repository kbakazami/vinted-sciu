"use client";

import Button from "@/app/_components/button";
import {useSession} from "next-auth/react";
import Logout from "@/app/_components/user/Logout";

export default function UserAddItems(props) {

    const { status } = useSession();

    return (
        <div className="bg-secondary menu-wrapper-add-items hidden absolute right-0 top-9 w-52 shadow-xl">
            {status === "authenticated" &&
                <>
                    <Button href={"/items/add/product"} content="Ajouter un produit" className="menu"/>
                    <Button href={"/items/add/service"} content="Ajouter un service" className="menu"/>
                </>
            }
        </div>
    )
}