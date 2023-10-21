import TableAdminServicesCategories from "@/app/_components/table/tableAdminServicesCategories";
import Button from "@/app/_components/button";

const ServicesCategoriesAdminPage = () => {

    return (
        <div>
            <h1 className="text-center my-10">Gestion des catégories des services !</h1>
            <Button className={"ml-auto w-fit"} href={"/admin/services/categories/add"} >Ajouter une catégorie pour les services</Button>
            <TableAdminServicesCategories/>
        </div>
    )
}

export default ServicesCategoriesAdminPage;