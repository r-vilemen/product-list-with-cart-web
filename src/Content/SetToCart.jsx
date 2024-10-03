import React, { useState } from "react";

const SetToCart = ({ name, price, image, cart, addToCart, removeFromCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  const handleClick = () => {
    setAddedToCart(true);
    addToCart({ name, price, quantity, image });
  };

  const handleIncrease = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    addToCart({ name, price, quantity: newQuantity, image });
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      addToCart({ name, price, quantity: newQuantity, image });
    } else {
      setAddedToCart(false);
      setQuantity(1);
      removeFromCart(name);
    }
  };

  return (
    <div className="dessert--CardButton">
      {addedToCart ? (
        <button className="cart--Button--quantity">
          <div onClick={handleDecrease} className="cart--Button--quantityMinus">
            <i className="fas fa-minus"></i>
          </div>
          <div>{quantity}</div>
          <div onClick={handleIncrease} className="cart--Button--quantityPlus">
            <i className="fas fa-plus"></i>
          </div>
        </button>
      ) : (
        <button onClick={handleClick} className="cart--Button--add">
          <i className="fas fa-shopping-cart"></i> Add to Cart
        </button>
      )}
    </div>
  );
};

export default SetToCart;
