
import React, { useState, useEffect, useMemo, useRef} from "react";
import BikeCard from './BikeCard';
import axios from "axios";
import Pagination from './Pagination';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

let PageSize = 10;

const IndexPage = () => {

    const [currStolenBikes, setCurrStolenBikes] = useState([]);
    const [allStolenBikes, setAllStolenBikes] = useState([]);
    const [currentPage, setCurrentPage] = useState(1)
    const [searchItem, setSearchItem] = useState("");
    const [filteredBikes, setFilteredBikes] = useState("");
    const searchTrigger = useRef(-1);

    const [fromDate, setFromDate] = useState(new Date());
    const [toDate, setToDate] = useState(new Date());

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
    

    useEffect(() => {

        setFilteredBikes(
            allStolenBikes.filter((bike) =>
                bike.title.toLowerCase().includes(searchItem.toLowerCase())
            ));

        if (searchTrigger.current !== -1 || searchTrigger.current !== searchItem.length) {
            setCurrentPage(1);
            searchTrigger.current = searchItem.length;
        }

        searchItem?.length > 0 ?
            setCurrStolenBikes(filteredBikes) : setCurrStolenBikes(allStolenBikes);

    }, [searchItem]);


    return (

        <div>

            <input
                type="text"
                placeholder="Search"
                value={searchItem}
                onChange={(e) => {
                    setSearchItem(e.target.value);
                }
                }
            />

            <DatePicker
                selected={fromDate}
                onChange={date => setFromDate(date)} />

            <DatePicker
                selected={toDate}
                onChange={date => setToDate(date)} />
            

          
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