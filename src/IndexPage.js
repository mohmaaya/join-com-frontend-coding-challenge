
import React, { useState, useEffect, useMemo} from "react";
import BikeCard from './BikeCard';
import axios from "axios";
import Pagination from './Pagination';
import SearchComponent from './SearchComponent';

let PageSize = 10;

const IndexPage = () => {

    const [currStolenBikes, setCurrStolenBikes] = useState([]);
    const [allStolenBikes, setAllStolenBikes] = useState([]);
    const [currentPage, setCurrentPage] = useState(1)

    useEffect(() => {
        axios.get("https://bikeindex.org:443/api/v3/search?location=berlin&stolenness=proximity").then((response) => {
            setCurrStolenBikes(response.data["bikes"]);
            setAllStolenBikes(response.data["bikes"]);
          
        }); 
    },[]);

   
    const currentBikesData = useMemo(() => {
        const firstPageIndex = ((currentPage) - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return currStolenBikes?.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, currStolenBikes]);


    return (

        <div>

            <SearchComponent
                allBikes={allStolenBikes}
                onFilterBykes={bikes => setCurrStolenBikes(bikes)}
                onResetBikes={bikes => setCurrStolenBikes(bikes)}
                onUpdateCurrentPage={page => setCurrentPage(page)}
            />
          
            {currentBikesData && currentBikesData.map((bike) =>
                <BikeCard key={bike.id} bike={bike} />
            )}
            
           
            {currentBikesData && <Pagination
                currentPage={currentPage}
                totalCount={currStolenBikes.length}
                pageSize={PageSize}
                onPageChange={page => setCurrentPage(page)}
            />}
         

        </div>
    )
};

export default IndexPage;