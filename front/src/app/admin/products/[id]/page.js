import axios from "axios";

const ProductAdminPage = async ({params}) => {

const product = await axios.get("http://localhost:8000/api/articles/" + params.id);

    return (
        <div>
           <h1 className="text-center my-10">Gestion des produits !</h1>
            <div className="max-w-7xl mx-auto my-10">
                <div className="flex flex-col gap-y-2.5">
                    <div className="flex flex-row gap-x-5">
                        <p className="font-bold w-1/4">Nom</p>
                        <p>{product.data.title}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductAdminPage;