import React, { useState, useEffect } from "react";
import cart from "../assets/images/icon-add-to-cart.svg";
import "./Dessert.css";

function SetToCart({ name, price, addToCart, removeFromCart, cartItems, image }) {
    const [addedToCart, setAddedToCart] = useState(false);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const itemInCart = cartItems.find(item => item.name === name);
        if (itemInCart) {
            setAddedToCart(true);
            setQuantity(itemInCart.quantity);
        } else {
            setAddedToCart(false);
            setQuantity(1);
        }
    }, [cartItems, name]);

    const handleClick = () => {
        if (!addedToCart) {
            setAddedToCart(true);
            addToCart({ name, price, quantity, image });
        }
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
        }
    };

    return (
        <div className="dessert--CardButton">
            {addedToCart ? (
                <button className="cart--Button--quantity">
                    <div onClick={handleDecrease} className="cart--Button--quantityMinus">
                        <i className="fa-solid fa-minus"></i>
                    </div>
                    <div>
                        {quantity}
                    </div>
                    <div onClick={handleIncrease} className="cart--Button--quantityPlus">
                        <i className="fa-solid fa-plus"></i>
                    </div>
                </button>
            ) : (
                <button onClick={handleClick} className="cart--Button--add">
                    <img src={cart} alt="cart" /> Add to Cart
                </button>
            )}
        </div>
    );
}

export default SetToCart;
