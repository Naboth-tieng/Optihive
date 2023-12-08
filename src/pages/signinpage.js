import '../App.css';
import Landpage from "./landpage"
import OrderProcessorPage from './order&admin/orderprocessor/order';
import Dashboard from './Dashboards/dashboard';
import { useState, useEffect } from 'react';
import Admin from './order&admin/admin/admin';

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
      ) : (
        // Render different pages based on user type
        <>
          {signInData.userType === "Order Processor" && (
            <OrderProcessorPage back={back} signInData={signInData} />
          )}
          {signInData.userType === "Store Manager" && (
            <Dashboard back={back} user={signInData} />
          )}
          {signInData.userType === "admin" && (
            <Admin back={back} user={signInData} />
          )}
          { /* Add more conditions for other user types if needed */ }
        </>
      )}
    </>
  );
}
