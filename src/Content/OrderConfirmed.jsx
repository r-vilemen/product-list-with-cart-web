import React from "react";
import "./Cart.css";
import confirmed from "../assets/images/icon-order-confirmed.svg";

function OrderConfirmed({ cartItems }) {
    const handleNewOrder = () => {
        window.location.reload();
    };

    // Função para calcular o total do pedido
    const calculateTotal = () => {
        return cartItems.reduce((total, item) => {
            return total + item.price * item.quantity;
        }, 0).toFixed(2); // Formata o total para duas casas decimais
    };

    return (
        <div className="order-confirmed--container">
            <div className="order-confirmed">
                <img src={confirmed} alt="confirmed" />
                <div>
                    <h1>Order Confirmed</h1>
                    <p>We hope you enjoy your food!</p>
                </div>
                <div>
                    {cartItems.map((item, index) => (
                        <div key={index} className="cart--OrderConfirmed">
                            <div className="cart--Order--infoConfirmed">
                                <div className="cart--Order--infoConfirmedIMGLIST">
                                    <div>
                                        <img src={item.image.thumbnail} alt={item.name} />
                                    </div>
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
                                        </div>
                                    </div>
                                </div>
                                <div className="cart--Order--quantitym">
                                    <p>${(item.price * item.quantity).toFixed(2)}</p>
                                </div>
                            </div>
                            <div className="cart--Line">
                                <span></span>
                            </div>
                        </div>
                    ))}
                    <div className="cart--Total--confirmed">
                        <p>Order Total</p>
                        <h2>${calculateTotal()}</h2>
                    </div>
                </div>
                <button onClick={handleNewOrder}>Start New Order</button>
            </div>
        </div>
    );
}

export default OrderConfirmed;
