"use client";

import {useEffect, useState} from "react";
import {getServiceById} from "@/app/utils/services";

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
        {/*    TODO: ADD SERVICE FORM WITH SERVICE AS A PARAM   */}
        </div>
    )
}