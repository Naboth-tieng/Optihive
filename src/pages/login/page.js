import Svg from "./pageicon.svg";
import { Link } from "react-router-dom";
import { Route,Routes } from "react-router-dom";
import Signin from"./login";
import Signup from "./signup"

export default function app(){
    return(
        <>
        <div className="left">
            <Svg />
            <p> Welcome</p>
            <ul>
                <li ><Link to="/signin">Sign in</Link></li>
                <li><Link to="/signup">Sign up</Link></li>
            </ul>
            <div className="form">
                <Routes>
                    <Route path='/signin' element={<Signin/>}/>
                    <Route path= 'signup' element={<Signup/>}/>
                </Routes>  
            </div>
            <p>
            At OptiHive, we are dedicated to revolutionizing the FMCG distribution industry through our cutting-edge technology and optimized processes. Our goal is to streamline your distribution operations, maximize efficiency, and drive success for your business.
            </p>
        </div>


        <div classname = "right"></div>
        </>
    )
}