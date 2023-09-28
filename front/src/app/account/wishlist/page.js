import {useEffect, useState} from "react";
import {ReflectAdapter as axios} from "next/dist/server/web/spec-extension/adapters/reflect";

export default function Wishlist() {

    const [products = [], setProducts] = useState();
    let servicesList = [];

    useEffect(() => {
        async function fetchProducts() {
            const response = await axios.get("https://jsonplaceholder.typicode.com/todos");
            setProducts(response.data);
        }
        fetchProducts();
    }, []);

    return (
        <div>
            <h1 className={"title-bold mt-15"}>Ma wishlist</h1>
        </div>
    )
}