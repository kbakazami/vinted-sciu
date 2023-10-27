import ProductForm from "@/app/_components/form/product-form";

export default function AddProduct() {
    return (
        <div className={"custom-container"}>
            <ProductForm titleForm={"Ajouter un produit"}  submitText={"Créer le produit"}/>
        </div>
    )
}