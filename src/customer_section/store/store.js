import { useState } from "react";
import Ending from "./ending";
import logo from "./svgs/icon.svg";
import Cart from "./cart";

export default function Store({ back, user }) {
    const [cartItems, setCartItems] = useState([]);
  
    const addToCart = (product) => {
      const existingItem = cartItems.find(item => item.product_id === product.product_id);
  
      if (existingItem) {
        const updatedCart = cartItems.map(item =>
          item.product_id === product.product_id
            ? { ...item, basketquantity: item.basketquantity + 1 }
            : item
        );
        setCartItems(updatedCart);
      } else {
        setCartItems([...cartItems, { ...product, basketquantity: 1 }]);
      }
    };
  
    const removeFromCart = (product) => {
      const updatedCart = cartItems.filter(item => item.product_id !== product.product_id);
      setCartItems(updatedCart);
    };
  
    console.log(cartItems);

    const increaseQuantity = (product) => {
      const updatedCart = cartItems.map((item) =>
        item.product_id === product.product_id
          ? { ...item, basketquantity: item.basketquantity + 1 }
          : item
      );
      setCartItems(updatedCart);
    };
    
    const decreaseQuantity = (product) => {
      const updatedCart = cartItems.map((item) =>
        item.product_id === product.product_id && item.basketquantity > 1
          ? { ...item, basketquantity: item.basketquantity - 1 }
          : item
      );
      setCartItems(updatedCart);
    };
    
  
    return (
      <>
      <div className="store">
        <div className="store-right">
          <div className="store-top">
            <img src={logo}/>
          </div>
          {/* Assuming Ending component needs removeFromCart function */}
          <Ending addToCart={addToCart} removeFromCart={removeFromCart} />
        </div>
  
        <div className="Store-left">
          <div>
            <p className="store-profile">{user.clientname.charAt(0)}</p>
          </div>
          <div className="store-cart">
          <Cart
  cartItems={cartItems}
  removeFromCart={removeFromCart}
  increaseQuantity={increaseQuantity}
  decreaseQuantity={decreaseQuantity}
/>

          </div>
          <button className="signout" onClick={back}>
          you want to go back?
        </button>
        </div></div>

      </>
    );
  }
  