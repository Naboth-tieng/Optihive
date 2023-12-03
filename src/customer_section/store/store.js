import { useEffect, useState } from "react";
import Ending from "./ending";
import logo from "./svgs/icon.svg";
import search from "./svgs/search.svg";
import Imagebottom from './bottom.svg';
import logout from './logout.svg'

import Cart from "./cart";
import Cardsection from "./card";
import axios from "axios";
import Featured from "./featured";
import ProductSearch from "./productsearch";

export default function Store({ back, user }) {
  const [Inputname, setInputname] = useState("");
  const [Card, setCard] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [returnProducts, setreturnProducts] = useState([]);

  //details for Paying
  const [Email, SetEmail] = useState("");
  const[phonenumber,Setphonenumber] = useState("");
  const[location,Setlocation] = useState("");

  useEffect(()=>{
    SetEmail(user.clientemail)
    Setphonenumber(user.clientphone)
    Setlocation(user.clientaddress)
  },[user])



  const [isSearching, setIsSearching] = useState(false);
  const[Searchresult,setSearchResults] = useState([])
  useEffect(() => {
    // Check if the productId is not empty
    if (Inputname) {
      setIsSearching(true)
      // Remove the 'const' keyword here
      console.log(Inputname);
      // Fetch product information based on the productId
      
        axios
      .post("http://localhost/optihiveapi/customer/search.php/",{ Inputname: Inputname })
      .then((response) => {
        setSearchResults(response.data)
        console.log(Searchresult);
        // Handle success or error as needed
      })
      .catch((error) => {
        console.error(error);
        // Handle error
      });
    } else{
      setIsSearching(false)
    }
  }, [Inputname]);
  

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

  const increaseQuantity = (product) => {
    const updatedCart = cartItems.map((item) =>
      item.product_id === product.product_id
        ? { ...item, basketquantity: item.basketquantity + 1 }
        : item
    );
    setCartItems(updatedCart);
  };

  const decreaseQuantity = (product) => {
    if (product.basketquantity===1){
      removeFromCart(product)
    }else{
    const updatedCart = cartItems.map((item) =>
      item.product_id === product.product_id && item.basketquantity > 1
        ? { ...item, basketquantity: item.basketquantity - 1 }
        : item
    );
    setCartItems(updatedCart);}
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <>
      <div className="store">
        <div className="store-right">
          <div className="store-top">
            <img src={logo} alt="Logo" />
            <div class="store-input">    
            <input
            type="text"
            placeholder="Product Name"
            name="inputname"
            onChange={(e) => setInputname(e.target.value)}
          /> 
          <img src={search} /> 
          </div>
          </div >
          <div className="store-display">
          {isSearching ? (
            <ProductSearch products={Searchresult} addToCart={addToCart} />
          ) : (
            <>
              <Ending addToCart={addToCart} removeFromCart={removeFromCart} />
              <Featured addToCart={addToCart} removeFromCart={removeFromCart} />

            </>
          )}
        </div>
        <img style={{marginTop:"5rem"}}src={Imagebottom}/>
        </div>

        <div className="Store-left" >
          <div style={{display: "flex", justifyContent:"space-between", marginBottom:"1.5rem"}}>
          <p className="store-profilename">{user.clientname}</p>
          <div className="store-profile">
            <p >{user.clientname.charAt(0)}</p></div>
            
          </div>
          <div className="store-card">
          <Cardsection
          email={Email}
          setEmail={SetEmail}
          phonenumber={phonenumber}
          setPhonenumber={Setphonenumber}
          location={location}
          setLocation={Setlocation}
          Card={Card}
          setCard={setCard}
        />

          </div>
          <div className="store-cart">
            <Cart
            email={Email}
              cartItems={cartItems}
              clearCart={clearCart}
              removeFromCart={removeFromCart}
              increaseQuantity={increaseQuantity}
              decreaseQuantity={decreaseQuantity}
            />
          </div>
          <div style={{display:"flex"}}>
          <button className="signout" onClick={back}>
            <img src={logout}/>
          </button>
          </div>
        </div>
      </div>
    </>
  );
}
