import TableAdminProducts from "@/app/_components/table/tableAdminProducts";
import Button from "@/app/_components/button";


const ProductsAdminPage = () => {

    return (
        <div>
            <h1 className="text-center my-10">Gestion des articles</h1>
            <Button className={"ml-auto w-fit admin"} href={"/admin/products/add"} >Ajouter un produit</Button>
            <TableAdminProducts />
        </div>
    )
}

export default ProductsAdminPage;