'use client';
import {getProducts} from "@/app/utils/products";
import {useEffect, useState} from "react";
import TableAdmin from "@/app/_components/table/tableAdmin";

export default function AdminProducts() {

    const [products = [], setProducts] = useState();

    const fetchData = async () => {
        const result = await getProducts('articles');
        setProducts(result);
    }
    useEffect(() => {
        fetchData()
            .catch(e => console.log(e));
    }, []);

    return (
        <div>
            <h1 className="text-center my-10">Gestion des Produits !</h1>
            <div>
                <h2 className="text-center">Des produits ??</h2>
                <TableAdmin data={products} />
            </div>
        </div>
    )
}