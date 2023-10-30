"use client";

import {useSession} from "next-auth/react";
import {useEffect, useState} from "react";
import Image from "next/image";
import Button from "@/app/_components/button";
import {readUploadedFile} from "@/app/utils/read-file";
import placeholderUserPicture from "../../(website)/account/placeholder_user.png";

const Informations = () => {

    const {data: session, status} = useSession();
    const [user, setUser] = useState(null);
    const [userPicture, setUserPicture] = useState();

    const loadPicture = async (userPicture) => {
        let image = null;
        if(userPicture) {
            image = 'data:image/png;base64,' + await readUploadedFile(userPicture, '/media/users');
        } else {
            image = placeholderUserPicture;
        }
        setUserPicture(image);
    }

    useEffect(() => {

        if(status === "authenticated")
        {
            setUser(session.user);
            loadPicture(session.user.picture);
        }

    },[session, status]);

    return (
        <div className={"bg-secondary py-6 px-5 lg:px-7 my-5 mx-auto w-fit rounded-md"}>
            {user &&
                <div className={"flex flex-col md:flex-row gap-5 lg:gap-10 w-full h-fit items-center"}>
                    {userPicture &&
                        <div className={"md:w-1/3"}>
                            <div className={"w-32 h-32 rounded-full relative"}>
                                <Image src={userPicture} alt={user.lastName + '-' + user.firstName} className={"object-cover w-auto h-auto rounded-full"} quality={100} fill/>
                            </div>
                        </div>
                    }
                    <div className={"flex flex-row gap-2 lg:gap-8 md:w-1/3"}>
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
                            {user.promo && user.ecole &&
                                <span>{user.promo.name} - {user.ecole.name}</span>
                            }
                        </p>
                    </div>
                    <Button href="/account/informations/edit" content="Modifier" className="small w-full mt-auto"/>
                </div>
            }
        </div>
    )
}

export default Informations;