import React from "react";
import { productImageMap } from "./productImagemap";
import Deleteicon from "./svgs/delete.svg";
import add from "./svgs/addcart.svg";
import minus from "./svgs/minus.svg";
import Paystack from "./Paystack/Paystack";

export default function Cart({
  email,
  clearCart,
  cartItems,
  increaseQuantity,
  decreaseQuantity,
}) {
  const calculateSubtotal = (item) => {
    return item.price * item.basketquantity;
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + calculateSubtotal(item),
      0
    );
  };

  return (
    <div style={{width:"100%"}}>
      <div className="cart-top">
      <h3>Cart</h3>
      <button onClick={clearCart}><img src={Deleteicon}/></button>
      </div>
      <div className="cart-receipt">     
      <ul style={{padding:"0"}}>
        {cartItems.map((item) => (
          <li key={item.product_id} className="cart">
            <div className="cart-logo">
            <img 
              src={productImageMap[item.product_type]}
              alt={item.product_name}
            />
            </div>
            <p>{item.product_name}</p>
            <div className="cart-quantity">
              <button className="cart-button" onClick={() => increaseQuantity(item)}><img src={add}/></button>
              <p>{item.basketquantity}</p>
              <button className="cart-button" onClick={() => decreaseQuantity(item)}><img src={minus}/></button>
            </div>
          </li>
        ))}
      </ul></div>
      <div>
        <p
          style={{
            fontSize: "2rem",
            textAlign: "center",
            fontWeight: "bolder",
          }}
        >
          Total: ksh{calculateTotal()}
        </p>
      </div>
      <div className="flexcolumn">
        <Paystack email={email} total={calculateTotal()} />
      </div>
    </div>
  );
}
