"use client";

import {useEffect, useState} from "react";
import {getServiceById} from "@/app/utils/services";
import ServiceForm from "@/app/_components/form/service-form";

export default function EditService({params}) {

    const [service, setService] = useState(null);

    useEffect(() => {
        const getService = async () => {
            const response = await getServiceById(params.id);
            setService(response);
        };

        getService();
    }, []);

    return (
        <div className={"text-center px-4"}>
            <ServiceForm titleForm={"Modifier un service"} submitText={"Enregistrer"} service={service} serviceId={params.id}/>
        </div>
    )
}