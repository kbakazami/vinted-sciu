import {getServiceCategoryById} from "@/app/utils/service-categories";
import ServiceCategoryForm from "@/app/_components/form/service-category-form";

const ServiceCategoryAddAdminPage = async () => {
    return (
        <div className={"mb-10"}>
            <ServiceCategoryForm titleForm={"Ajouter une catégorie pour les services"} submitText={"Ajouter"} isAdmin={true}/>
        </div>
    )
}

export default ServiceCategoryAddAdminPage;