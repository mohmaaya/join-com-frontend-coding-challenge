import { usePagination } from './usePagination'



const Pagination = (props) => {

    const {
        onPageChange,
        totalCount,
        currentPage,
        pageSize
    } = props;


    const paginationRange = usePagination({
        currentPage,
        totalCount,
        pageSize
    });

    if (!paginationRange) {
        return null;
    }

    return (

        <>
            {paginationRange[0]} != 1 && <button onClick={() => onPageChange(1)}> First </button>
        
            {paginationRange[0]} != 1 && <button onClick={() => onPageChange(currentPage - 1)}> Previous </button>

            {paginationRange.map(pageNumber => {


                return (
                    <li
                        
                        onClick={() => onPageChange(pageNumber)}
                    >
                        {pageNumber}
                    </li>
                );
            })}

            {paginationRange[0]} != 1 && <button onClick={() => onPageChange(currentPage + 1)}> Next </button>

            {paginationRange[0]} != 1 && <button onClick={() => onPageChange(Math.ceil(totalCount / pageSize))}> Last </button>

        </>

        );

};

export default Pagination