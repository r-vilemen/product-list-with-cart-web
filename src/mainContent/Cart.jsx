// src/mainContent/Cart.jsx
import React, { useState } from "react";
import "./Cart.css";
import removeItem from "../assets/images/icon-remove-item.svg";
import carbonNeutral from "../assets/images/icon-carbon-neutral.svg";
import emptyCart from "../assets/images/illustration-empty-cart.svg";
import OrderConfirmed from "./OrderConfirmed";

function Cart({ cartItems, removeFromCart }) {
    const [orderConfirmed, setOrderConfirmed] = useState(false);

    // Função para calcular o total do pedido
    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    };

    const handleConfirmOrder = () => {
        setOrderConfirmed(true);
    };

    if (orderConfirmed) {
        return <OrderConfirmed cartItems={cartItems} />;
    }

    return (
        <div className="cart">
            {cartItems.length === 0 ? (
                <div>
                    <div className="cart--Title">
                    {/* Exibe a quantidade total de itens no carrinho */}
                    <h1>Your Cart ({cartItems.reduce((acc, item) => acc + item.quantity, 0)})</h1>
                     </div>
                    <div className="cart--Empty">
                        <img src={emptyCart} alt="Empty Cart" />
                        <p>Your added item will appear here</p>
                    </div>
                </div>
            ) : (
                <>
                    <div className="cart--Title">
                        {/* Exibe a quantidade total de itens no carrinho */}
                        <h1>Your Cart ({cartItems.reduce((acc, item) => acc + item.quantity, 0)})</h1>
                    </div>
                    {/* Mapeia sobre os itens do carrinho e renderiza cada item */}
                    {cartItems.map((item, index) => (
                        <div key={index} className="cart--Order">
                            <div className="cart--Order--info">
                                <div>
                                    <div className="cart--Order--h1">
                                        <h2>{item.name}</h2>
                                    </div>
                                    <div className="cart--Order--quantity">
                                        <div className="cart--Order--quantityh3">
                                            <h3>{item.quantity}x</h3>
                                        </div>
                                        <div className="cart--Order--quantityp">
                                            <p>@ ${item.price.toFixed(2)}</p>
                                        </div>
                                        <div className="cart--Order--quantitym">
                                            <p>${(item.price * item.quantity).toFixed(2)}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="cart--Order--delete">
                                    <p>
                                        <img src={removeItem} alt="Remove Item" onClick={() => removeFromCart(item.name)} />
                                    </p>
                                </div>
                            </div>
                            <div className="cart--Line">
                                <span></span>
                            </div>
                        </div>
                    ))}

                    <div className="cart--Total">
                        <p>Order Total</p>
                        <h2>${calculateTotal()}</h2>
                    </div>

                    <div className="cart--Text">
                        <img src={carbonNeutral} alt="Carbon Neutral" />
                        <p>This is <span>carbon-neutral</span> delivery</p>
                    </div>

                    <div className="cart--Button">
                        <button onClick={handleConfirmOrder}>
                            Confirm Order
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

export default Cart;
