
import  { useMemo } from "react";



const range = (start, end) => {
    let length = end - start + 1;
  
    return Array.from({ length }, (_, idx) => idx + start);
};

export const usePagination = (totalCount, pageSize, currentPage) => {

    const paginationRange = useMemo(() => {

        const totalPageCount = Math.ceil(totalCount / pageSize);

        if (totalCount <= pageSize) return undefined;

        else if (currentPage === 1) return [range(1, Math.min(3, totalPageCount))];

        else if (currentPage === totalPageCount) return [(range(Math.max(totalPageCount - 2, 1), totalPageCount))];

        else return [currentPage - 1, currentPage, currentPage + 1];

    }, [totalCount, pageSize, currentPage]);

    return paginationRange;

};

