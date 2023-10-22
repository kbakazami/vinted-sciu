import TableAdminServicesCategories from "@/app/_components/table/tableAdminServicesCategories";
import Button from "@/app/_components/button";
import TableAdminCategories from "@/app/_components/table/tableAdminCategories";

const CategoriesAdminPage = () => {

    return (
        <div>
            <h1 className="text-center my-10">Gestion des catégories !</h1>
            <Button className={"ml-auto w-fit"} href={"/admin/products/services-categories/add"} >Ajouter une catégorie</Button>
            <TableAdminCategories/>
        </div>
    )
}

export default CategoriesAdminPage;