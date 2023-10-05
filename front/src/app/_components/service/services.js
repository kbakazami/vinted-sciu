import Image from "next/image";
import Button from "@/app/_components/button";
import {ChevronRight, Heart} from "@/app/_components/svg";
import pfp from "../../annonces.jpg";

export default function Services(props) {

    return (
        <div className="bg-secondary p-4 text-sm cursor-pointer" onClick={props.onClick}>
            <div className={"flex flex-row items-start gap-x-4 mb-2.5"}>
                <div className={"flex flex-col items-center w-3/10"}>
                    <Image src={props.src} alt={"pfp"} className={"w-24 h-24 rounded-full object-cover"} width={360} height={360} loading={"lazy"}/>
                    <p className={"line-clamp-1"}>{props.title}</p>
                </div>
                <div className={"flex flex-col w-7/10"}>
                    <p className={"font-bold line-clamp-1"}>{props.title}</p>
                    <p className={"line-clamp-4"}>{props.description}</p>
                </div>
            </div>
            <div className={"flex justify-end"}>
                <div className="btn btn-round btn-secondary-darker card">
                    <ChevronRight className="text-primary w-3 h-3"/>
                </div>
            </div>
        </div>
    )
}