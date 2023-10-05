import axios from "axios";
import Card from "@/app/_components/card";
import ProductPull from "@/app/product-pull.png";
import {getUserProducts} from "@/app/utils/user";

const ProductsUser = async () => {

    const products = await getUserProducts();

    return (
        <div className={"grid-product-categories-wrapper"}>
            {products.map((product) => {
                return <Card key={product.id} src={ProductPull} isProduct={true} isUserProduct={true}/>
            })}
        </div>
    )
}
export default ProductsUser;