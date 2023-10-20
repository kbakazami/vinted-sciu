'use client';
import {useEffect, useState} from "react";
import {getServicesByCategory} from "@/app/utils/services";
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
            <ServiceListing services={services}/>
        </div>
    )
}
