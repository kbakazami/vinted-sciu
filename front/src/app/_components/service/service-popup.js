import {getServiceById} from "@/app/utils/services";
import {useEffect} from "react";
import Image from "next/image";
import pfp from '../../annonces.jpg';
import UserCard from "@/app/_components/user/user-card";
import {Bubble} from "@/app/_components/svg";
import Button from "@/app/_components/button";

function ServicePopup ({open, selectedService}) {
    return (
        <>
            {open &&
                <div className={"absolute w-1/3 left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-white z-10 p-5 flex flex-row gap-x-8 rounded-md"}>
                    <div className={"flex flex-col"}>
                        <Image src={pfp} alt={'Eleve'} className={"object-cover rounded-full w-32 h-32"} height={360} width={360}/>
                            <p className={"font-bold mt-2"}>Nom Prénom</p>
                            <p>Étudiant(e) en M1 IW - ESGI</p>
                    </div>
                    <div className={"flex flex-col justify-between w-full"}>
                        <div>
                            <h3 className={"font-bold uppercase text-xl"}>{selectedService.title}</h3>
                            <p>{selectedService.description}</p>
                        </div>
                        <div className={"flex flex-col gap-y-2 ml-auto w-1/3"}>
                            <Button href="#" content="Contacter" className="small w-full"/>
                            <Button href="#" content="Voir le profil" className="small w-full"/>
                        </div>
                    </div>

                </div>
            }
        </>
    )
}

export default ServicePopup;