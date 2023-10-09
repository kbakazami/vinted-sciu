'use client';
import {useEffect, useState} from "react";
import {getProducts} from "@/app/utils/products";
import ProductListing from "@/app/_components/product/product-listing";

export default function Category () {

    const [products, setProducts] = useState([]);

    const getProductsList = async () => {
        const response = await getProducts();
        setProducts(response);
    }

    useEffect(() => {
        getProductsList();
    }, [])

    return (
        <div className={"custom-container"}>
            <h1 className={"uppercase font-bold mt-5"}>Catalogue</h1>
            <ProductListing productsList={products}/>
        </div>
    )
}
