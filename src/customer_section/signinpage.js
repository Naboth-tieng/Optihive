import "../App.css";
import "./customer.css";
import Lg from "./login/svgs/logo.svg";
import LoginForm from "./login/signin";
import Signup from "./login/signup";
import im from "./login/svgs/bro.png";
import { useState, useEffect } from "react";
import {
  Link,
  Routes,
  Route,
  useResolvedPath,
  useMatch,
} from "react-router-dom";

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
      <div className="cust">
      <div className="cust-right">
          <img src={im} />
          <div style={{ fontWeight: "700", paddingTop:"10rem" }}>
            Click here if you are an{" "}
            <Link
              to={"/employee"}
              style={{ textDecoration: "none", color: "#75BBA7" }}
            >
              employee
            </Link>{" "}
          </div>
        </div>
        <div className="cust-left">
          <img
            className="logo"
            src={Lg}
            style={{ margin: "3rem", width: "30.47981rem", height: "6.25rem" }}
          />
          <div className="cust-form">
            <p
              style={{
                fontWeight: "bolder",
                fontSize: "1.5rem",
                textAlign: "center",
              }}
            >
              Welcome
            </p>
            <div className="nav">
              <Customlink to="/">Signin</Customlink>
              <Customlink to="/customersignup">signup</Customlink>
            </div>
            <div className="currform">
              <Routes>
                <Route
                  path="/"
                  element={<LoginForm cont={cont} />}
                />
                <Route path="/customersignup" element={<Signup />} />
              </Routes>
            </div>
          </div>
          <p className="about">
            At OptiHive, we're here to simplify your FMCG ordering process. Our
            cutting-edge technology and efficient systems are designed to make
            placing orders a breeze. Your success is our priority, and we're
            committed to delivering top-quality products to your doorstep. Ready
            to experience the future of FMCG distribution? Join us and start
            ordering with OptiHive today! 🛒
          </p>
        </div>
        
      </div>
    </>
  );
}

function Customlink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <li className={isActive ? "activecust" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}
