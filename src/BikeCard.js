import React, { useState } from 'react';
import './BikeCard.css';
import PopUp from './PopUp.js';

const BikeCard = (props) => {
    const bike = props.bike;

    const [showPopUp, setShowPopUp] = useState(false);

    const handleClick = () => {
        setShowPopUp(!showPopUp);
    };

    return (
        <div className="bike-card" onClick={handleClick}>
            {bike.large_img ? (
                <img src={bike.large_img} alt="BikeCard" className="bike-card-image" />
            ) : (
                <div className="bike-card-image no-image">Image not provided</div>
            )}
            <div className="bike-card-body">
                <h3 className="bike-card-title">{bike.title}</h3>
                <p className="bike-card-date">stolen since: {new Date(bike.date_stolen * 1000).toLocaleDateString()}</p>
            </div>

            {showPopUp && <PopUp close={handleClick} bike={bike} />}
        </div>
    );
};

export default BikeCard;
