'use client';
import Card from "@/app/_components/card";
import ProductPull from "@/app/product-pull.png";
import {useEffect, useState} from "react";
import Pagination from "@/app/_components/pagination";
import {paginate} from "@/app/_helpers/paginate";
import axios from "axios";

export default function Category ({ params }) {

    const [products = [], setProducts] = useState();
    let productsList = [];

    useEffect( () => {
        async function fetchBlogPosts() {
            const response = await axios.get("https://jsonplaceholder.typicode.com/todos");
            setProducts(response.data);
        }
        fetchBlogPosts();
    }, []);

    products.forEach(post => {
        productsList.push(post);
    });

    const [currentPage, setCurrentPage] = useState(1);
    const [maxPageLimit, setMaxPageLimit] = useState(3);
    const [minPageLimit, setMinPageLimit] = useState(1);

    const pageSize = 12;
    const pagesCount = Math.ceil(products.length / pageSize);

    const onPageChange = (page) => {
        if (page >= maxPageLimit && (page + 4) === pagesCount)
        {
            setMaxPageLimit(maxPageLimit + 4);
            setMinPageLimit(minPageLimit + 2);
        }
        else if ((page + 5) === pagesCount && page <= minPageLimit)
        {
            setMaxPageLimit(maxPageLimit - 6);
            setMinPageLimit(minPageLimit - 2);
        }
        else if (page === pagesCount) {
            setMaxPageLimit(pagesCount + 4);
            setMinPageLimit(pagesCount - 4);
        }
        else if (page <= minPageLimit)
        {
            setMaxPageLimit(maxPageLimit - 1);
            setMinPageLimit(minPageLimit - 1);
        } else if(page >= maxPageLimit)
        {
            setMaxPageLimit(maxPageLimit + 1);
            setMinPageLimit(minPageLimit + 1);
        }
        setCurrentPage(page);
    }

    const paginatedProducts = paginate(productsList, currentPage, pageSize);

    return (
        <div className={"custom-container"}>
            <h1 className={"uppercase font-bold mt-5"}>{params.category}</h1>
            <div className={"grid-product-categories-wrapper"}>
                {paginatedProducts.map((item) => {
                    return <Card key={item.id} src={ProductPull} isProduct={true}/>
                })}
            </div>
            <Pagination
                items={productsList.length}
                currentPage={currentPage}
                pageSize={pageSize}
                onPageChange={onPageChange}
                maxPageLimit={maxPageLimit}
                minPageLimit={minPageLimit}/>
        </div>
    )
}
