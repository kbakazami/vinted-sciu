import ProductForm from "@/app/_components/form/product-form";
import ServiceForm from "@/app/_components/form/service-form";

export default function AddService() {
    return (
        <div className={"text-center px-4"}>
            <ServiceForm titleForm={"Ajouter un service"} submitText={"Créer le service"}/>
        </div>
    )
}