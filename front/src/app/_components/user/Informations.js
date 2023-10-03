"use client";

import {useSession} from "next-auth/react";
import {useEffect, useState} from "react";
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
        <div className={"flex flex-col lg:flex-row items-center gap-x-12 bg-secondary py-10 px-7 mt-5"}>
            {user &&
                <div className={"flex flex-col md:flex-row gap-2.5 w-full h-fit"}>
                    <p className={"bg-white md:w-1/3 px-5 py-2"}>{user.username}</p>
                </div>
            }
        </div>
    )
}

export default Informations;