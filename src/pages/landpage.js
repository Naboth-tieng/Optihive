import Lg from "./svg/trucktop.svg";
import im from "./svg/Account-amico.png";
import LoginForm from "./login/signin";
import Signup from "./login/signup";
import { Route, Link, Routes,useMatch,useResolvedPath } from "react-router-dom";

export default function landapage({cont,onSignin}) {
  return (
    <>
      <div className="land">
        <div className="land-left">
          <img className="logo" src={Lg} style={{margin:"3rem",width:"70%",height:"auto"}} />
          <div className="land-form">
          <p style={{ fontWeight: "bolder", fontSize: "1.5rem", textAlign:"center"}}>Welcome</p>
          <div className="nav">
            <Customlink to="/signin">Signin</Customlink>
            <Customlink to="/signup">signup</Customlink>
          </div>
          <div className="currform">
            <Routes>
              <Route path="/signin" element={<LoginForm cont={cont} onSignin={onSignin}/>} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
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
        <div className="land-right">
          <img src={im} />
        </div>
      </div>
    </>
  );
}

function Customlink({to,children,...props}){
const resolvedPath = useResolvedPath(to)
const isActive = useMatch({path:resolvedPath.pathname,end:true})

  return(
    <li className={isActive? "active" : ""}>
      <Link to={to} {...props}>{children}</Link>
    </li>
  )
}
