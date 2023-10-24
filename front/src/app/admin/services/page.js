import TableAdminServices from "@/app/_components/table/tableAdminServices";
import Button from "@/app/_components/button";

const ServicesAdminPage = () => {

    return (
        <div>
            <h1 className="text-center my-10">Gestion des services !</h1>
            <Button className={"ml-auto w-fit admin"} href={"/admin/services/add"} >Ajouter un service</Button>
            <TableAdminServices />
        </div>
    )
}

export default ServicesAdminPage;