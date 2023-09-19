export default function Pagination(props) {

    const pagesCount = Math.ceil(props.items / 12);

    // console.log('pagesCount');
    // console.log(pagesCount);
    // console.log('---------------------');
    // console.log('props.items');
    // console.log(props.items);
    // console.log('---------------------');

    if(pagesCount === 1)
    {
        return null;
    }

    const pages = Array.from({ length: pagesCount}, (_, i) => i + 1);

    return (
        <div className={"flex flex-row gap-x-4"}>
            {
                pages.map((page, key) => (
                    <div key={key}
                    className={page === props.currentPage ? 'text-green-500' : 'text-red-500'}>
                        <a onClick={() => props.onPageChange(page)} className={'text-2xl p-4 bg-secondary cursor-pointer'}>
                            {page}
                        </a>
                    </div>
                ))
            }
        </div>
    )
}