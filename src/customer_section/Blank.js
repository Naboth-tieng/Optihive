import { useEffect } from "react";
import { useState } from "react";
import Signinpage from "./signinpage";
import Store from "./store/store";

export default function Blank(){
    const [signInData, setSignInData] = useState([]);
    const [showSignin, setShowSignin] = useState(true);
  
    useEffect(() => {
      console.log("signInData:", signInData);
      if (signInData.data && signInData.data.message === "Login successful") {
        setShowSignin(false);
        console.log("Working");
        cont();
      }
    }, [signInData]);
  
    function cont() {
      setShowSignin(false);
    }
  
    function back() {
      setShowSignin(true);
    }
  
    return (
      <>
        {showSignin ? (<Signinpage onSignin={setSignInData} cont={cont}/>) : (<Store back={back} user={signInData} />)}
      </>
    );
}