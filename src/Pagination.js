import { usePagination } from './usePagination'



const Pagination = (props) => {

    const {
        onPageChange,
        totalCount,
        currentPage,
        pageSize
    } = props;

    console.log(props)

    const paginationRange = usePagination(
        {
            currentPage,
            totalCount,
            pageSize
        }
    );

    if (!paginationRange) {
        return null;
    }

    return (

        <>
            {currentPage !== 1 && <button onClick={() => onPageChange(1)}> First </button>}
        
            {currentPage !== 1 && <button onClick={() => onPageChange(currentPage - 1)}> Previous </button>}

            {paginationRange?.map(pageNumber => {

                return (
                    <li onClick={() => onPageChange(pageNumber)}>
                        {pageNumber}
                    </li>
                );
            })}

            {currentPage !== Math.ceil(totalCount / pageSize) && <button onClick={() => onPageChange(currentPage + 1)}> Next </button>}

            {currentPage !== Math.ceil(totalCount / pageSize) && <button onClick={() => onPageChange(Math.ceil(totalCount / pageSize))}> Last </button>}

        </>

        );

};

export default Pagination