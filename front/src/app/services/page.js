'use client';
import {useEffect, useState} from "react";
import PaginationCustom from "@/app/_components/pagination";
import {paginate} from "@/app/_helpers/paginate";
import Services from "@/app/_components/service/services";
import Button from "@/app/_components/button";
import {Bubble} from "@/app/_components/svg";
import {getServices} from "@/app/utils/services";
import ServicePopup from "@/app/_components/service/service-popup";
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
            <ServiceListing servicesListing={services}/>
        </div>
    )
}
