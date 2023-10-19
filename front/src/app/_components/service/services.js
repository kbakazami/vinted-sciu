import Image from "next/image";
import Button from "@/app/_components/button";
import {ChevronRight, Heart} from "@/app/_components/svg";
import pfp from "../../annonces.jpg";

export default function Services(props) {

    return (
        <div className="bg-secondary p-4 text-sm cursor-pointer h-40 flex flex-col justify-between" onClick={props.onClick}>
            <div className={"flex flex-row items-start gap-x-4 mb-2.5"}>
                <div className={"flex flex-col gap-y-2"}>
                    <p className={"font-bold line-clamp-1"}>{props.title}</p>
                    <p className={"line-clamp-3"}>{props.description}</p>
                </div>
            </div>
            <div className={"flex items-center justify-between"}>
                <p className={"font-bold"}>Nom Prénom</p>
                <div className="btn btn-round btn-secondary-darker card">
                    <ChevronRight className="text-primary w-3 h-3"/>
                </div>
            </div>
        </div>
    )
}