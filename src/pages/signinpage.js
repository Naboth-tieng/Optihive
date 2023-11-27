import '../App.css';
import Landpage from "./landpage"
import Dashboard from './Dashboards/dashboard';
import { useState, useEffect } from 'react';

export default function Signinpage() {
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
      {showSignin ? (
        <Landpage cont={cont} onSignin={setSignInData} />
      ) : signInData.userType === "Order Processor" ? (
        <div>
          
        </div>
      ) : (
        <Dashboard back={back} user={signInData} />
      )}
    </>
  );
}
