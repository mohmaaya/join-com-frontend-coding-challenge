

const BikeCard = (props) => {
    const bike = props.bike;
  

    return (
        <div className="bike-card">
            <img src={bike.large_img} alt="BikeCard" width="200" height="150" />
            <div className="bike-card-body">
                <h5 className="bike-card-status">{bike.status}</h5>
                <h3 className="bike-card-title">{bike.title}</h3>
                <p className="bike-card-desc">{bike.description}</p>
                <p className="bike-card-desc">{new Date(bike.date_stolen * 1000).toLocaleDateString()}</p>
                <p className="bike-card-desc">{bike.date_stolen}</p>
            </div>
        </div>
        
        )
};

export default BikeCard;