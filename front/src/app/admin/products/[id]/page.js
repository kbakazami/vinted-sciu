import {getProductById} from "@/app/utils/products";
import ProductForm from "@/app/_components/form/product-form";

const ProductAdminPage = async ({params}) => {
    const product = await getProductById(params.id);

    return (
        <div className={"mb-10 custom-container"}>
            <ProductForm titleForm={"Modifier le produit"} submitText={"Enregistrer"} product={product} productId={params.id} isAdmin={true}/>
        </div>
    )
}

export default ProductAdminPage;