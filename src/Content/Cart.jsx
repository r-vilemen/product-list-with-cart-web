import React, { useState, useMemo } from "react";
import "./Cart.css";
import removeItem from "../assets/images/icon-remove-item.svg";
import carbonNeutral from "../assets/images/icon-carbon-neutral.svg";
import emptyCart from "../assets/images/illustration-empty-cart.svg";
import OrderConfirmed from "./OrderConfirmed";

function Cart({ cartItems, removeFromCart }) {
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  const totals = useMemo(() => {
    return cartItems.reduce(
      (acc, item) => {
        acc.totalPrice += item.price * item.quantity;
        acc.totalQuantity += item.quantity;
        return acc;
      },
      { totalPrice: 0, totalQuantity: 0 }
    );
  }, [cartItems]);

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
            <h1>Your Cart (0)</h1>
          </div>
          <div className="cart--Empty">
            <img src={emptyCart} alt="Cart is empty illustration" />
            <p>Your added item will appear here</p>
          </div>
        </div>
      ) : (
        <>
          <div className="cart--Title">
            <h1>Your Cart ({totals.totalQuantity})</h1>
          </div>

          {cartItems.map((item) => (
            <CartItem
              key={item.name}
              item={item}
              removeFromCart={removeFromCart}
            />
          ))}

          <div className="cart--Total">
            <p>Order Total</p>
            <h2>${totals.totalPrice.toFixed(2)}</h2>
          </div>

          <div className="cart--Text">
            <img src={carbonNeutral} alt="Carbon Neutral icon" />
            <p>
              This is <span>carbon-neutral</span> delivery
            </p>
          </div>

          <div className="cart--Button">
            <button onClick={handleConfirmOrder}>Confirm Order</button>
          </div>
        </>
      )}
    </div>
  );
}

function CartItem({ item, removeFromCart }) {
  return (
    <div className="cart--Order">
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
          <img
            src={removeItem}
            alt={`Remove ${item.name} from cart`}
            onClick={() => removeFromCart(item.name)}
          />
        </div>
      </div>
      <div className="cart--Line">
        <span></span>
      </div>
    </div>
  );
}

export default Cart;
