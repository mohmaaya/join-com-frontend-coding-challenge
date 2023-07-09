import { usePagination } from './usePagination'
import './Pagination.css';

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
        <div className="pagination">
            {currentPage !== 1 && (
                <button onClick={() => onPageChange(1)}>First</button>
            )}
            {currentPage !== 1 && (
                <button onClick={() => onPageChange(currentPage - 1)}>Previous</button>
            )}
            {paginationRange?.map((pageNumber) => (
                <button
                    key={pageNumber}
                    onClick={() => onPageChange(pageNumber)}
                    className={currentPage === pageNumber ? "active" : ""}
                >
                    {pageNumber}
                </button>
            ))}
            {currentPage !== Math.ceil(totalCount / pageSize) && (
                <button onClick={() => onPageChange(currentPage + 1)}>Next</button>
            )}
            {currentPage !== Math.ceil(totalCount / pageSize) && (
                <button onClick={() => onPageChange(Math.ceil(totalCount / pageSize))}>
                    Last
                </button>
            )}
        </div>

    );
};

export default Pagination;
