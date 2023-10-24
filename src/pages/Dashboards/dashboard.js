import { useState, useEffect } from "react";
import Storage from "./charts/storage";
import axios from "axios";
import Icon from "./icon.svg";
import "../../App.css";
import {
  Link,
  Route,
  Routes,
  useMatch,
  useResolvedPath,
} from "react-router-dom";
import Leasticon from "./least.svg";
import Mosticon from "./most.svg";
import Least from "./leastmost/least";
import Most from "./leastmost/Most";
import calender from "./calender.svg";
import Insertform from "./newproducts/Insertform";
import UpdateForm from "./newproducts/Updateform";

export default function Dashboard({ back, user }) {
  let date = new Date().toLocaleDateString();
  const [warehouseData, setWarehouseData] = useState({});

  useEffect(() => {
    // Fetch data from the API using Axios
    Getdata();
  }, []);

  const Getdata = () => {
    axios
      .get("http://localhost/optihiveapi/productswarehouse.php")
      .then((response) => {
        setWarehouseData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching warehouse data:", error);
      });
  };
  

  return (
    <>
      <div className="dash-page">
      <button className="topbutton" onClick={back}>
           <p className="signout"></p> Signout
          </button>
        <div className="dash-left">
          <img src={Icon} />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <p className="profile">{user.username.charAt(0)}</p>
            <p>{user.username}</p>
            <p>{user.userType}</p>
          </div>
          <button className="signout" onClick={back}>
            Signout
          </button>
        </div>
        <div className="dash-right">
          <div className="dash-border">
            <div>
              <p className="center">Hello, {user.username}</p>
              <p>Ready to tackle todays work?</p>
            </div>
            <div>
              <p style={{ textAlign: "center" }}>
                {date}
                <img src={calender} />
              </p>
            </div>
          </div>
          <div>
            <p>Current Stock</p>
            <Storage warehouseData={warehouseData} />
          </div>
          <div className="line"></div>
          <div className="bottomdiv">
            <div className="updateform">
              <div className="nav">
                <Customlink to="/newitem">New Item</Customlink>
                <Customlink to="/restock">Restock</Customlink>
              </div>
              <div className="currform">
                <Routes>
                  <Route path="/newitem" element={<Insertform />} />
                  <Route path="/restock" element={<UpdateForm />} />
                </Routes>
              </div>
            </div>
            <div className="vertical" style={{padding:"2rem"}}></div>

            <div className="leastmost">
              <div className="nav">
                <Customlink to="/least">
                  Least
                  <img src={Leasticon} />
                </Customlink>
                <Customlink to="/most">
                  Most
                  <img src={Mosticon} />
                </Customlink>
              </div>
              <div className="currform">
                <Routes>
                  <Route path="/least" element={<Least />} />
                  <Route path="/most" element={<Most />} />
                </Routes>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function Customlink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}
