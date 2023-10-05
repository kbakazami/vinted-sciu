import {useState} from "react";

export default function PaginationCustom(props) {

    const pagesCount = Math.ceil(props.items / props.pageSize);

    if(pagesCount === 1)
    {
        return null;
    }

    const pages = Array.from({ length: pagesCount}, (_, i) => i + 1);

    let ellipsesLastPageDisplay = null;
    const ellipsesLastPage = () => {
        if((props.currentPage + 4) < pages.length || (props.currentPage + 5) <= pages.length)
        {
            ellipsesLastPageDisplay = <>
                <div className={'btn btn-secondary square'}>&hellip;</div>
                <button className={'btn btn-secondary square'} onClick={() => props.onPageChange(pages.length)}>{pages.length}</button>
            </>
        }
    }

    const paginationButton = pages.map((page, key) => {
        if(page <= props.maxPageLimit && page >= props.minPageLimit)
        {
            ellipsesLastPage();
            return (
                <button key={key} onClick={() => props.onPageChange(page)} className={`btn btn-secondary square ${page === props.currentPage ? 'active' : ''}`}>
                    {page}
                </button>
            )
        } else {
            return null;
        }
    });

    return (
        <div className={"flex flex-row justify-between items-center"}>
            <button
                className={`btn btn-secondary pagination mr-auto ${props.currentPage === 1 ? 'disabled' : ''}`}
                onClick={props.currentPage === 1 ? () => props.onPageChange(props.currentPage-1) : undefined   }>
                Précédent
            </button>
            <div className={"flex flex-row gap-x-4 items-center"}>
                {paginationButton}
                {ellipsesLastPageDisplay}
            </div>
                <button
                    className={`btn btn-secondary pagination ml-auto ${props.currentPage === pagesCount ? 'disabled' : ''}`}
                    onClick={props.currentPage === pagesCount ? () => props.onPageChange(props.currentPage+1) : undefined}>
                    Suivant
                </button>
        </div>
    )
}