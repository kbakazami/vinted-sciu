import Card from "@/app/_components/card";
import ProductPull from "@/app/product-pull.png";
import {getUserWishlist} from "@/app/utils/user";

const WishlistUser = async () => {

    const wishlist = await getUserWishlist();

    return (
        <div className={"grid-product-categories-wrapper"}>
            {wishlist.map((product) => {
                return <Card key={product.id} src={ProductPull} isProduct={true}/>
            })}
        </div>
    )
}
export default WishlistUser;