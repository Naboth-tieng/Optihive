import { useState } from "react";
import Ending from "./ending";

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
  
    return (
      <>
        <div className="store-right">
          {/* Assuming Ending component needs removeFromCart function */}
          <Ending addToCart={addToCart} removeFromCart={removeFromCart} />
        </div>
  
        <div className="Store-left">
          <div>
            <p className="store-profile">{user.clientname.charAt(0)}</p>
          </div>
        </div>
  
        <p>random things happen</p>
        <button className="signout" onClick={back}>
          you want to go back?
        </button>
      </>
    );
  }
  