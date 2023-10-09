'use client';
import {useEffect, useState} from "react";
import PaginationCustom from "@/app/_components/pagination";
import {paginate} from "@/app/_helpers/paginate";
import Services from "@/app/_components/service/services";
import Button from "@/app/_components/button";
import {Bubble} from "@/app/_components/svg";
import {getServices, getServicesByCategory} from "@/app/utils/services";
import ServicePopup from "@/app/_components/service/service-popup";
import ServiceListing from "@/app/_components/service/service-listing";

export default function ServiceCategory ({params}) {

    const [services, setServices] = useState([]);

    const getServicesList = async () => {
        const servicesList = await getServicesByCategory(params.serviceCategory);
        setServices(servicesList);
    }

    useEffect(() => {
        getServicesList();
    }, []);

    return (
        <div className={"custom-container"}>
            <h1 className={"uppercase font-bold mt-5"}>{params.serviceCategory}</h1>
            <ServiceListing servicesListing={services}/>
        </div>
    )
}
