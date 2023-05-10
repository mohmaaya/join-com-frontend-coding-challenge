

const BikeCard = (props) => {
    const bike = props.bike;
  

    return (
        <div className="bike-card">
            <img src={bike.large_img} alt="BikeCard" width="200" height="150" />
            <div className="bike-card-body">
                <h5 className="bike-card-status">{bike.status}</h5>
                <h3 className="bike-card-title">{bike.title}</h3>
                <p className="vike-card-desc">{bike.description}</p>
            </div>
        </div>
        
        )
};

export default BikeCard;