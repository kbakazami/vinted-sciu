"use client";

import {useEffect, useState} from "react";
import {getProductById} from "@/app/utils/products";
import ProductForm from "@/app/_components/form/product-form";

export default function EditProduct({params}) {

    const [product, setProduct] = useState(null);

    useEffect(() => {
        const getProduct = async () => {
            const response = await getProductById(params.id);
            setProduct(response);
        };

        getProduct();
    }, []);

    return (
        <div className={"text-center px-4"}>
            <ProductForm titleForm={"Modifier un article"} product={product}/>
        </div>
    )
}