
import React, { useState, useEffect, useMemo} from "react";
import BikeCard from './BikeCard'
import axios from "axios";
import Pagination from './Pagination'

let PageSize = 4;

const IndexPage = () => {

    const [stolenBikes, setStolenBikes] = useState([]);
    const [currentPage, setCurrentPage] = useState(1)

    useEffect(() => {
        axios.get("https://bikeindex.org:443/api/v3/search?location=newyork&stolenness=proximity").then((response) => {
            setStolenBikes(response.data);
          
        }); 
    },[]);

    const currentBikesData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return stolenBikes["bikes"]?.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, stolenBikes]);

    return (

        <div>
           
            {currentBikesData && Object.values(currentBikesData).map((bike) => 
                    <BikeCard bike={bike} />          
            )}

            {currentBikesData && <Pagination
                //className="pagination-bar"
               currentPage={currentPage}
                totalCount={stolenBikes["bikes"].length}
                pageSize={PageSize}
                onPageChange={page => setCurrentPage(page)}
            />}

        </div>
    )
};

export default IndexPage;