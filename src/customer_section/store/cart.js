import React from "react";
import { productImageMap } from "./productImagemap";

export default function Cart({ cartItems, removeFromCart, increaseQuantity, decreaseQuantity }) {
  const calculateSubtotal = (item) => {
    return item.price * item.basketquantity;
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + calculateSubtotal(item), 0);
  };

  return (
    <div>
      <h3>Cart</h3>
      <ul>
        {cartItems.map((item) => (
          <li key={item.product_id} className="cart">
            <img src={productImageMap[item.product_type]} alt={item.product_name} />
            <p>{item.product_name}</p>
            <div>
              <button onClick={() => increaseQuantity(item)}>+</button>
              <p>Quantity: {item.basketquantity}</p>
              <button onClick={() => decreaseQuantity(item)}>-</button>
            </div>
            <p>Subtotal: ${calculateSubtotal(item)}</p>
            <button onClick={() => removeFromCart(item)}>Remove</button>
          </li>
        ))}
      </ul>
      <div>
        <p style={{ fontSize: "2rem", textAlign: "center", fontWeight: "bolder" }}>
          Total: ${calculateTotal()}
        </p>
      </div>
    </div>
  );
}
