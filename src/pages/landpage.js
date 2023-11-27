import Lg from "./svg/trucktop.svg";
import im from "./svg/Account-amico.png";
import LoginForm from "./login/signin";
import { Link } from "react-router-dom";

export default function landapage({cont,onSignin}) {
  return (
    <>
      <div className="land">
        <div className="land-left">
          <img className="logo" src={Lg} style={{margin:"3rem",width:"70%",height:"auto"}} />
          <div className="land-form">
          <p style={{ fontWeight: "bolder", fontSize: "1.5rem", textAlign:"center"}}>Welcome</p>
         
          <div className="currform">
           <LoginForm cont={cont} onSignin={onSignin}/>
          </div>
          </div>
          <p className="about">
            At OptiHive, we are dedicated to revolutionizing the FMCG
            distribution industry through our cutting-edge technology and
            optimized processes. Our goal is to streamline your distribution
            operations, maximize efficiency, and drive success for your
            business.
          </p>
        </div>
        <div className="land-right" >
          <img src={im} />
          <div style={{fontWeight:"700"}}>Click here if you are a <Link to={"/"} style={{textDecoration:"none",color:"#8D4520"}}>Client</Link></div>
          
        </div>
      </div>
    </>
  );
}


