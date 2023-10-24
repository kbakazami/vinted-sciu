import {getServiceById} from "@/app/utils/services";
import ServiceForm from "@/app/_components/form/service-form";

const ServiceAdminPage = async ({params}) => {
    const service = await getServiceById(params.id);

    return (
        <div className={"mb-10 custom-container"}>
            <ServiceForm titleForm={"Modifier le service"} submitText={"Enregistrer"} service={service} serviceId={params.id} isAdmin={true}/>
        </div>
    )
}

export default ServiceAdminPage;