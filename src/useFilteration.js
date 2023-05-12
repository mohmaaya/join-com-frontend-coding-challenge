import { useRef, useEffect } from 'react';  

export const useFilteration = (props) => {

    const {
        allBikes,
        searchTrigger,
        onUpdateCurrentPage,
        onFilterBykes,
        searchItem
    } = props;

    const filteredBikes = useRef([]);

    useEffect(() => {

        filteredBikes.current =
            allBikes.filter((bike) =>
                bike.title.toLowerCase().includes(searchItem.toLowerCase())
            );

        if (searchTrigger.current !== -1 || searchTrigger.current !== searchItem.length) {
            onUpdateCurrentPage(1);
            searchTrigger.current = searchItem.length;
        }

        searchItem?.length > 0 ?
            onFilterBykes(filteredBikes.current) : onFilterBykes(allBikes);

    }, [searchItem]);

    return filteredBikes.current;

};

