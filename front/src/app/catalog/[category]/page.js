'use client';
import Card from "@/app/_components/card";
import ProductPull from "@/app/product-pull.png";
import {useState} from "react";
import Pagination from "@/app/_components/pagination";
import {paginate} from "@/app/_helpers/paginate";

export default function Category ({ data }) {

    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 4;

    const onPageChange = (page) => {
        setCurrentPage(page);
    }

    let list = [];

    for (let i = 0; i < 36; i++)
    {

        list.push('test');
    }

    console.log(data);


    const paginatedProducts = paginate(data, currentPage, pageSize);

    return (
        <div className={"custom-container"}>
            {/*<h1 className={"uppercase"}>{params.category}</h1>*/}
            <div className={"grid-product-categories-wrapper"}>
                {/*{paginatedProducts.map((lis, k) =><Card key={k} src={ProductPull} isProduct={true}/>)}*/}
            </div>
            <Pagination items={list.length} currentPage={currentPage} pageSize={pageSize} onPageChange={onPageChange}/>
        </div>
    )
}

export const getStaticProps = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await res.json();

    return {
        props: { data },
    };
};