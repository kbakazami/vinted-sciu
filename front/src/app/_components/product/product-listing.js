import {useEffect, useState} from "react";
import {paginate} from "@/app/_helpers/paginate";
import Link from "next/link";
import Card from "@/app/_components/card";
import ProductPull from "@/app/product-pull.png";
import Pagination from "@/app/_components/pagination";

const ProductListing = ({productsList}) => {

    const [currentPage, setCurrentPage] = useState(1);
    const [maxPageLimit, setMaxPageLimit] = useState(3);
    const [minPageLimit, setMinPageLimit] = useState(1);

    const pageSize = 12;
    const pagesCount = Math.ceil(productsList.length / pageSize);

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
        <>
            <div className={"grid-product-categories-wrapper"}>
                {paginatedProducts.map((item) => {
                    return (
                        <Link key={item.id} href={`/catalog/products/${item.id}`}>
                            <Card src={ProductPull} isProduct={true} title={item.title}/>
                        </Link>
                    )
                })}
            </div>
            <Pagination
                items={productsList.length}
                currentPage={currentPage}
                pageSize={pageSize}
                onPageChange={onPageChange}
                maxPageLimit={maxPageLimit}
                minPageLimit={minPageLimit}/>
        </>
    )

}

export default ProductListing;