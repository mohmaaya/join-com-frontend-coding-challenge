
import React, { useState, useEffect } from "react";
import BikeCard from './BikeCard'
import axios from "axios";


const IndexPage = () => {

    const [stolenBikes, setStolenBikes] = useState();

    useEffect(() => {
        axios.get("https://bikeindex.org:443/api/v3/search?location=berlin&stolenness=proximity").then((response) => {
            setStolenBikes(response.data);
        });
    }, []);

    return (

        <div>
           
            {stolenBikes && Object.values(stolenBikes).map((bikes) => (

                bikes.map((bike) => (
                        
                    <BikeCard bike={bike} />
                    ))
                ))}
        </div>
    )
};

export default IndexPage;