import {getServiceCategoryById} from "@/app/utils/service-categories";
import ServiceCategoryForm from "@/app/_components/form/service-category-form";
import {getCategoryById} from "@/app/utils/categories";
import CategoryForm from "@/app/_components/form/category-form";

const CategoryAdminPage = async ({params}) => {
    const category = await getCategoryById(params.id);

    return (
        <div className={"mb-10"}>
            <CategoryForm titleForm={"Modifier la catégorie"} submitText={"Enregistrer"} category={category} categoryId={params.id}/>
        </div>
    )
}

export default CategoryAdminPage;