import Card from "@/app/_components/card";
import ProductPull from "@/app/product-pull.png";
import {getUserReservations} from "@/app/utils/user";

const ReservationsUser = async () => {

    const products = await getUserReservations();

    return (
        <div className={"grid-product-categories-wrapper"}>
            {products.map((product) => {
                return <Card key={product.id} src={ProductPull} isProduct={true}/>
            })}
        </div>
    )
}
export default ReservationsUser;