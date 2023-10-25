import ServiceForm from "@/app/_components/form/service-form";

const ServiceAddAdminPage = async () => {
    return (
        <div className={"mb-10"}>
            <ServiceForm titleForm={"Ajouter un service"} submitText={"Ajouter"} isAdmin={true}/>
        </div>
    )
}

export default ServiceAddAdminPage;