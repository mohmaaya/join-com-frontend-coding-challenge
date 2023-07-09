import React from 'react';
import ReactDOM from 'react-dom';
import './PopUp.css';

const PopUp = (props) => {
    const bike = props.bike;
    const close = props.close;

    return ReactDOM.createPortal(
        <>
            <div className="overlay" />
            <div className="popup">
                {bike.large_img ? (
                    <img
                        src={bike.large_img}
                        alt="BikeCard"
                        className="popup-image"
                    />
                ) : (
                    <div className="popup-no-image">Image not provided</div>
                )}
                <div className="popup-content">
                    <h3>{bike.title}</h3>
                    <p>Manufacturer: {bike.manufacturer_name}</p>
                    <p>Stolen since: {new Date(bike.date_stolen * 1000).toLocaleDateString()}</p>
                    <p>Stolen Location: {bike.stolen_location}</p>
                    <p>Description: {bike.description ? bike.description : "None"}</p>

                </div>
                <div className="button-container">
                    <button className="button" onClick={close}>Close</button>
                </div>
            </div>
        </>,
        document.getElementById('popup')
    );
};

export default PopUp;
