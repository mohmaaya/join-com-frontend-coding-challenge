import React, { useState, useRef } from 'react';
import { useFilteration } from './useFilteration';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './SearchComponent.css'; // Import the CSS file for SearchComponent

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
        <div className="search-component-container">
            <div>
                <h3 className="filter-heading">Filter Bikes:</h3>
            </div>
            <div className="search-input-container">
                <input
                    type="text"
                    className="search-input"
                    placeholder="Filter by Title keywords"
                    value={searchItem}
                    onChange={(e) => setSearchItem(e.target.value)}
                />
   
            </div>

            <div className="date-picker-container">
                <DatePicker
                    className="date-picker"
                    placeholderText="Filter by stolen from date"
                    selected={fromDate}
                    onChange={(date) => setFromDate(date)}
                />

                <DatePicker
                    className="date-picker"
                    placeholderText="Filter by stolen until date"
                    selected={toDate}
                    onChange={(date) => setToDate(date)}
                />
            </div>

            <div className="button-container">
                <button className="search-button" onClick={findBykes} disabled={!fromDate || !toDate}>
                    Find Bikes
                </button>

                <button className="reset-button" onClick={() => {
                    setSearchItem("");
                    onResetBikes(allBikes);
                    setFromDate(null);
                    setToDate(null);
                }}>
                    Reset Filter
                </button>
            </div>
        </div>
    );
};

export default SearchComponent;
