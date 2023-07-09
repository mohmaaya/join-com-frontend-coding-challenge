import React, { useState, useMemo } from "react";
import BikeCard from "./BikeCard";
import axios from "axios";
import Pagination from "./Pagination";
import SearchComponent from "./SearchComponent";
import { FaEnvelope, FaPhone, FaGithub } from 'react-icons/fa';
import "./IndexPage.css";

let PageSize = 9;

const IndexPage = () => {
    const [currStolenBikes, setCurrStolenBikes] = useState();
    const [allStolenBikes, setAllStolenBikes] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [searchValue, setSearchValue] = useState("");

    const handleSearch = () => {
        const searchParam = encodeURIComponent(searchValue);
        axios
            .get(
                `https://bikeindex.org:443/api/v3/search?location=${searchParam}&stolenness=proximity`
            )
            .then((response) => {
                setCurrStolenBikes(response.data["bikes"]);
                setAllStolenBikes(response.data["bikes"]);
                console.log(response.data["bikes"]);
            });
    };


    const currentBikesData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return currStolenBikes?.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, currStolenBikes]);


    return (
        <div className="container">

            <h1 className="heading">FIND STOLEN BIKES IN YOUR CITY</h1>

            <div className="search-container">
                <input
                    className="text-input"
                    type="text"
                    placeholder="Enter the city to find lost bikes e.g., Berlin, Amsterdam"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                />
                <button className="button" onClick={handleSearch}>
                    Search
                </button>
            </div>


            {allStolenBikes && (
                <>
                  
                    <SearchComponent
                        allBikes={allStolenBikes}
                        onFilterBykes={(bikes) => setCurrStolenBikes(bikes)}
                        onResetBikes={(bikes) => setCurrStolenBikes(bikes)}
                        onUpdateCurrentPage={(page) => setCurrentPage(page)}
                    />
                </>
            )}


            {currentBikesData && (
                <div className="bike-card-container">
                    {currentBikesData.map((bike) => (
                        <BikeCard key={bike.id} bike={bike} />
                    ))}
                </div>
            )}

            {currentBikesData && (
                <Pagination
                    currentPage={currentPage}
                    totalCount={currStolenBikes.length}
                    pageSize={PageSize}
                    onPageChange={(page) => setCurrentPage(page)}
                />
            )}

            <div className='footer'>
                <span className="footer-text">
                    This Find Bike web app is developed by Mohammed Ughratdar as a portfolio work.
                    Mohammed is looking for a fulltime position as a Developer.
                    He is skilled in both backend and frontend.
                    You may reach out to him using the contact details given below.
                </span>
            </div>

            <div className="contact-icons">

                <a href="mailto:mohammed.ughratdar@fau.de">
                    <FaEnvelope size={24} />
                    mohammed.ughratdar@fau.de
                </a>

                <span>
                    <FaPhone size={24} />
                    +49 151 6868 0236
                </span>

                <a href="https://github.com/mohmaaya/join-com-frontend-coding-challenge" target="_blank" rel="noopener noreferrer">
                    <FaGithub size={24} />
                    Project Git Repostory
                </a>

                <a href="https://www.linkedin.com/in/mohammed-ughratdar" target="_blank" rel="noopener noreferrer">
                    <i class="fab fa-linkedin"></i>
                    Linkedin Profile
                </a>
            </div>
        </div>
    );
};

export default IndexPage;
