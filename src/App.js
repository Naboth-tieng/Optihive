import './App.css';
import Landpage from "./pages/landpage"
import Dashboard from './pages/Dashboards/dashboard';
import { useState, useEffect } from 'react';
import Chatbot from './pages/chatbot';

export default function App() {
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
        <Chatbot />
      ) : (
        <Dashboard back={back} user={signInData} />
      )}
    </>
  );
}
