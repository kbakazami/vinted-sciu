import ProductForm from "@/app/_components/form/product-form";

export default function AddItem() {
    return (
        <div className={"text-center px-4"}>
            <h1 className={"title-bold"}>Ajouter un article</h1>
            <ProductForm/>
        </div>
    )
}