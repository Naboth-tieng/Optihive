import { Router, Routes,Route } from "react-router-dom";
import Signinemployee from "./pages/signinpage"
import Signincustomer from "./customer_section/Blank"

export default function app(){
  return(
    <>
    <Routes>
    <Route path="/employee/*" element={<Signinemployee />} />
    <Route exact path="/*" element={<Signincustomer />} />
    </Routes>
    </>
  )
}