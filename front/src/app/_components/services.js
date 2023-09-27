import Image from "next/image";
import Button from "@/app/_components/button";
import {ChevronRight, Heart} from "@/app/_components/svg";
import pfp from "../annonces.jpg";

export default function Services(props) {

    return (
        <div className="bg-secondary p-4">
            <div className={"flex flex-row items-center gap-x-4"}>
                <div className={"flex flex-col items-center w-1/5"}>
                    <Image src={props.src} alt={"pfp"} className={"w-20 h-20 rounded-full"}/>
                    <p className={"line-clamp-1"}>{props.title}</p>
                </div>
                <div className={"flex flex-col w-4/5"}>
                    <p className={"font-bold line-clamp-1"}>{props.title}</p>
                    <p className={"line-clamp-4"}>{props.children}</p>
                </div>
            </div>
        </div>
    )
}