import React, { useState, useRef } from 'react';
import { useFilteration } from './useFilteration';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


const SearchComponent = (props) => {
    const [searchItem, setSearchItem] = useState("");
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);
    const allBikes = props.allBikes;
    const onFilterBykes = props.onFilterBykes;
    const onResetBikes = props.onResetBikes;
    const onUpdateCurrentPage = props.onUpdateCurrentPage;

    const searchTrigger = useRef(-1);

    const filteredBikes = useFilteration({ allBikes, searchTrigger, onUpdateCurrentPage, onFilterBykes, searchItem });


    const findBykes = () => {

        onFilterBykes((filteredBikes.length > 0 ? filteredBikes : allBikes).filter((bike) =>
            bike.date_stolen <= Math.floor(toDate.getTime() / 1000) && bike.date_stolen >= Math.floor(fromDate.getTime() / 1000)
        ));
    };

    return (
    <>

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
            placeholder="Stolen from date"
            selected={fromDate}
            onChange={date => setFromDate(date)} />

        <DatePicker
            placeholder="Stolen until date"
            selected={toDate}
            onChange={date => setToDate(date)} />

        <button onClick={findBykes} disabled={!fromDate || !toDate}>Find Bykes</button>

        <button onClick={() => {
            setSearchItem("");
            onResetBikes(allBikes);
            setFromDate(null);
            setToDate(null);

        }}>Reset Search</button>



    </>
        
        
     );

};

export default SearchComponent;
