"use client";
import UserForm from "@/app/_components/form/user-form";
import {useSession} from "next-auth/react";
import {useEffect, useState} from "react";

const EditUserInformations = () => {

    const {data: session, status} = useSession();
    const [user, setUser] = useState(null);

    useEffect(() => {

        if(status === "authenticated")
        {
            setUser(session.user);
        }

    },[session, status]);

    return (
        <div className={"custom-container"}>
            <UserForm titleForm={"Modifier mes informations"} submitText={"Enregistrer"} user={user} userId={1}/>
        </div>
    )
}

export default EditUserInformations;