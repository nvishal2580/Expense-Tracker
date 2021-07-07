const Card = ({ title, amount, colour }) => {

    let cardClass = "card-title p-2 text-white bg-";
    cardClass += colour;

    return (

        <div className="card text-center mt-2" style={{ width: "150px" }} >
            <div className="card-body p-2">
                <h5 className={cardClass}>{title}</h5>
                <div>
                    <span style={{ fontWeight: "bold" }}>$ </span>
                    <span className="" style={{ fontWeight: "bold" }}>{amount}</span>
                </div>

            </div>
        </div>
    );
}

export default Card;