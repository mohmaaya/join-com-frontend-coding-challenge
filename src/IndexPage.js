
import React, { useState, useEffect, useMemo} from "react";
import BikeCard from './BikeCard'
import axios from "axios";
import Pagination from './Pagination'

let PageSize = 10;

const IndexPage = () => {

    const [stolenBikes, setStolenBikes] = useState();
    const [currentPage, setCurrentPage] = useState(1)

    useEffect(() => {
        axios.get("https://bikeindex.org:443/api/v3/search?location=berlin&stolenness=proximity").then((response) => {
            setStolenBikes(response.data);
        });
    }, []);

    const currentBikesData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return stolenBikes.slice(firstPageIndex, lastPageIndex);
    }, [currentPage]);


    return (

        <div>
           
            {currentBikesData && Object.values(currentBikesData).map((bikes) => (

                bikes.map((bike) => (
                        
                    <BikeCard bike={bike} />
                    ))
            ))}

            <Pagination
                className="pagination-bar"
                currentPage={currentPage}
                totalCount={stolenBikes.length}
                pageSize={PageSize}
                onPageChange={page => setCurrentPage(page)}
            />

        </div>
    )
};

export default IndexPage;