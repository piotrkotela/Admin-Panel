import "./ProductCard.css";
import { useState } from "react";
const ProductCard = (props) => {
  const [showDescription, setShowDescription] = useState(false);

  const setShowDescriptionHandler = () => {
    setShowDescription(!showDescription);
  };

  return (
    <div className="card">
      <img src={`${props.product.image}`} alt={props.product.title} />
      <p style={{ fontSize: "1.3rem", textAlign: "center", padding: "15px" }}>
        {props.product.title}
      </p>
      <div className="ratingBox">
        <p style={{ fontSize: "2rem" }}>$ {props.product.price}</p>
        <p>
          {props.product.rating.rate}/5 ({props.product.rating.count})
        </p>
      </div>
      {showDescription && (
        <>
          <p className="description">{props.product.description}</p>{" "}
          <button onClick={setShowDescriptionHandler}>Hide</button>
        </>
      )}
      {!showDescription && (
        <button onClick={setShowDescriptionHandler}>See details</button>
      )}
    </div>
  );
};

export default ProductCard;
