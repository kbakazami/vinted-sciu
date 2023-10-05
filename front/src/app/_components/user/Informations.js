import Image from "next/image";
import pfpUser from "../../annonces.jpg";
import {getUserById} from "@/app/utils/user";
const Informations = async () => {

    const user = await getUserById(1);

    return (
        <div className={"flex flex-col lg:flex-row items-center gap-x-12 bg-secondary py-10 px-7 mt-5"}>
            <Image src={pfpUser} alt={user.name} className={"mb-5 lg:mb-0 w-20 md:w-36 h-20 md:h-36 rounded-full object-cover"}/>
            <div className={"flex flex-col md:flex-row gap-2.5 w-full h-fit"}>
                <p className={"bg-white md:w-1/3 px-5 py-2"}>{user.name}</p>
                <p className={"bg-white md:w-1/3 px-5 py-2"}>{user.username}</p>
                <p className={"bg-white md:w-1/3 px-5 py-2"}>{user.email}</p>
            </div>
        </div>
    )
}

export default Informations;