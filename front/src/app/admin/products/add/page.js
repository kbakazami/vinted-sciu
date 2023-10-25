import ProductForm from "@/app/_components/form/product-form";

const ProductsAddAdminPage = async () => {
    return (
        <div className={"mb-10"}>
            <ProductForm titleForm={"Ajouter un produit"} submitText={"Ajouter"} isAdmin={true}/>
        </div>
    )
}

export default ProductsAddAdminPage;