import React from "react";
import "./Dessert.css";
import SetToCart from "./SetToCart";

const Dessert = ({
  name,
  category,
  price,
  image,
  addToCart,
  cartItems,
  removeFromCart,
}) => {
  return (
    <div className="dessert--Card">
      <img src={image.desktop} alt={name} />
      <SetToCart
        name={name}
        price={price}
        addToCart={addToCart}
        cartItems={cartItems}
        removeFromCart={removeFromCart}
        image={image} // Passe a imagem para SetToCart
      />
      <p>{category}</p>
      <h2>{name}</h2>
      <h4>${price.toFixed(2)}</h4>
    </div>
  );
};

export default Dessert;
