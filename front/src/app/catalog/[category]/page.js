'use client';
import {useEffect, useState} from "react";
import {getProductsByCategory} from "@/app/utils/products";
import ProductListing from "@/app/_components/product/product-listing";

export default function Category ({params}) {

    const [products, setProducts] = useState([]);

    const getProductsList = async () => {
        const response = await getProductsByCategory(params.category);
        setProducts(response);
    }

    useEffect(() => {
        getProductsList();
    }, [])

    return (
        <div className={"custom-container"}>
            <h1 className={"uppercase font-bold mt-5"}>{params.category}</h1>
            <ProductListing productsList={products}/>
        </div>
    )
}
