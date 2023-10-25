import ServiceForm from "@/app/_components/form/service-form";

export default function AddService() {
    return (
        <div className={"custom-container"}>
            <ServiceForm titleForm={"Ajouter un service"} submitText={"Créer le service"}/>
        </div>
    )
}