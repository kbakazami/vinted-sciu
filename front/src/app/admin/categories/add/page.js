import CategoryForm from "@/app/_components/form/category-form";

const CategoryAddAdminPage = async () => {
    return (
        <div className={"mb-10"}>
            <CategoryForm titleForm={"Ajouter une catégorie"} submitText={"Ajouter"} isAdmin={true}/>
        </div>
    )
}

export default CategoryAddAdminPage;