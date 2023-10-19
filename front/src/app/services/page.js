'use client';
import {useEffect, useState} from "react";
import {getServices} from "@/app/utils/services";
import ServiceListing from "@/app/_components/service/service-listing";

export default function Service () {

    const [services, setServices] = useState([]);

    const getServicesList = async () => {
        const servicesList = await getServices();
        setServices(servicesList);
    }

    useEffect(() => {
        getServicesList();
    }, []);

    return (
        <div className={"custom-container"}>
            <h1 className={"uppercase font-bold mt-5"}>Services</h1>
            <ServiceListing services={services}/>
        </div>
    )
}
