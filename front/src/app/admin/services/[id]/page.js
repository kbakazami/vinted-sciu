import {getServiceById} from "@/app/utils/services";
import ServiceForm from "@/app/_components/form/service-form";

const ServiceAdminPage = async ({params}) => {
    const service = await getServiceById(params.id);
    console.log(service);

    return (
        <div className={"mb-10"}>
            <ServiceForm titleForm={"Modifier le service"} submitText={"Enregistrer"} service={service} serviceId={params.id}/>
        </div>
    )
}

export default ServiceAdminPage;