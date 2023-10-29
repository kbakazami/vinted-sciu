"use client";

import {useSession} from "next-auth/react";
import {useEffect, useState} from "react";
import Image from "next/image";
import Button from "@/app/_components/button";
const Informations = () => {

    const {data: session, status} = useSession();
    const [user, setUser] = useState(null);

    useEffect(() => {

        if(status === "authenticated")
        {
            setUser(session.user);
        }

    },[session, status]);

    return (
        <div className={"flex flex-col lg:flex-row items-center gap-x-12 bg-secondary py-6 px-7 my-5 mx-auto w-fit rounded-md"}>
            {user &&
                <div className={"flex flex-col md:flex-row gap-x-10 w-full h-fit items-center"}>
                    <Image className={"w-32 h-32 rounded-full bg-white"} src={""} alt={user.lastName + '-' + user.firstName}/>
                    <div className={"flex flex-row gap-8"}>
                        <div>
                            <p className={"flex flex-col"}>
                                <span className={"font-bold"}>Nom/Prénom</span>
                                {user.lastName} {user.firstName}
                            </p>
                            <p className={"flex flex-col mt-4"}>
                                <span className={"font-bold"}>Email</span>
                                {user.email}
                            </p>
                        </div>
                        <p className={"flex flex-col"}>
                            <span className={"font-bold"}>Promo/Ecole</span>
                            {user.promo}-{user.ecole}
                        </p>
                        <Button href="/account/informations/edit" content="Modifier" className="small w-full mt-auto"/>
                    </div>
                </div>
            }
        </div>
    )
}

export default Informations;