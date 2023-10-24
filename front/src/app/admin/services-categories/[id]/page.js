import {getServiceCategoryById} from "@/app/utils/service-categories";
import ServiceCategoryForm from "@/app/_components/form/service-category-form";

const ServiceCategoryAdminPage = async ({params}) => {
    const serviceCategory = await getServiceCategoryById(params.id);

    return (
        <div className={"mb-10 custom-container"}>
            <ServiceCategoryForm titleForm={"Modifier la catégorie des services"} submitText={"Enregistrer"} serviceCategory={serviceCategory} serviceCategoryId={params.id} isAdmin={true}/>
        </div>
    )
}

export default ServiceCategoryAdminPage;