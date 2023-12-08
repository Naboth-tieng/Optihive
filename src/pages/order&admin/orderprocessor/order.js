import React, { useState, useEffect } from "react";
import axios from "axios";
import Popup from "reactjs-popup";
import CreateUserForm from "../../login/signup";
import Icon from "../svgs/logo.svg";
import logout from "../svgs/logout.svg";
import calender from "../../Dashboards/calender.svg";


const API_URL = "http://localhost/optihiveapi/orderprocess/";

const formatDate = (date) => {
  const options = { day: "numeric", month: "long", year: "numeric" };
  return new Date(date).toLocaleDateString(undefined, options);
};

const calculateDaysLeft = () => {
  const currentDate = new Date();
  const endOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  );
  const daysLeft = Math.ceil(
    (endOfMonth - currentDate) / (1000 * 60 * 60 * 24)
  );
  return { currentDate, daysLeft };
};

export default function Order({ back, signInData }) {
  const [orders, setOrders] = useState([]);
  const [Alltotals, setAlltotals] = useState("");
  const [Pendingorders, Setpendingorders] = useState("");
  const [Processedorders, SetProcessedOrders] = useState("");

  const [searchOrderDate, setSearchOrderDate] = useState("");
  const [filteredStatus, setFilteredStatus] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [clientDetails, setClientDetails] = useState(null);

  const [currentDate, setCurrentDate] = useState("");
  const [daysLeft, setDaysLeft] = useState("");

  const [color, setColor] = useState("");

  useEffect(() => {
    // Fetch orders on component mount
    getOrders();
    getOrderTotals();
    GetpendingOrders();
    Getprocessedorders();

    const { currentDate, daysLeft } = calculateDaysLeft();
    setCurrentDate(formatDate(currentDate));
    setDaysLeft(daysLeft);
    setColor(calculateColor(daysLeft));
  }, []); // Empty dependency array means it only runs once on mount

  const calculateColor = (daysLeft) => {
    const percentage = (daysLeft / 30) * 100;
    // Adjust the thresholds and colors as needed
    if (percentage > 75) {
      return "green";
    } else if (percentage > 50) {
      return "yellow";
    } else {
      return "red";
    }
  };
  const GetpendingOrders = () => {
    axios
      .get(`${API_URL}getpending.php`)
      .then((response) => {
        Setpendingorders(response.data.total);
      })
      .catch((error) => {
        console.error("Error fetching order totals:", error);
      });
  };
  const Getprocessedorders = () => {
    axios
      .get(`${API_URL}getprocessed.php`)
      .then((response) => {
        SetProcessedOrders(response.data.total);
      })
      .catch((error) => {
        console.error("Error fetching order totals:", error);
      });
  };
  const getOrderTotals = () => {
    axios
      .get(`${API_URL}gettotal.php`)
      .then((response) => {
        setAlltotals(response.data.total);
      })
      .catch((error) => {
        console.error("Error fetching order totals:", error);
      });
  };

  const getOrders = () => {
    axios
      .get(`${API_URL}getorders.php`)
      .then((response) => {
        setOrders(response.data || []);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });
  };

  const handleSearch = () => {
    if (searchOrderDate.trim() !== "") {
      axios
        .post(`${API_URL}searchorders.php`, { orderDate: searchOrderDate })
        .then((response) => {
          setOrders(response.data);
        })
        .catch((error) => {
          console.error("Error searching orders:", error);
        });
    } else {
      getOrders();
    }
  };

  const handleFilterStatus = (selectedStatus) => {
    setFilteredStatus(selectedStatus);
  };

  const filteredOrders = filteredStatus
    ? (orders || []).filter((order) => order.Status === filteredStatus)
    : orders || [];

  const openPopup = (order) => {
    setSelectedOrder(order);
    // Fetch client details and employee information when opening the popup
    fetchClientDetails(order.CustomerID);
  };

  const closePopup = () => {
    setSelectedOrder(null);
    setClientDetails(null);
  };

  const fetchClientDetails = (clientID) => {
    // Fetch client details from the backend using PHP
    axios
      .post(`${API_URL}getclientdetails.php`, { clientID })
      .then((response) => {
        setClientDetails(response.data);
      })
      .catch((error) => {
        console.error("Error fetching client details:", error);
      });
  };

  const updateOrderStatus = (newStatus) => {
    // Update the order status and EmployeeID in the database
    const employeeID = signInData.empid; // Get EmployeeID from signInData
    axios
      .post(`${API_URL}updateorderstatus.php`, {
        orderID: selectedOrder.OrderID,
        newStatus,
        employeeID,
      })
      .then(() => {
        // Update the local orders state
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.OrderID === selectedOrder.OrderID
              ? { ...order, Status: newStatus, EmployeeID: employeeID }
              : order
          )
        );
        closePopup(); // Close the popup after updating
      })
      .catch((error) => {
        console.error("Error updating order status:", error);
      });
  };
  function parse(details) {
    return JSON.parse(details);
  }

  return (
    <div style={{ display: "flex" }}>
      <div
        className="admin-left"
        style={{
          width: "20%",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img src={Icon} style={{ marginBottom:"5rem",marginTop:"2rem", width: "70%" }} />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p
            className="profile"
            style={{
              backgroundColor: "rgba(253, 242, 138, 0.93)",
              border: "2px solid white",
              color: "white",
            }}
          >
            {signInData.username.charAt(0)}
          </p>
          <p style={{ fontSize: "1.125rem", fontWeight: "bolder" }}>
            {signInData.username}
          </p>
          <p style={{ fontSize: "0.875rem" }}>{signInData.userType}</p>
        </div>
        <button className="signout" onClick={back}>
          <img src={logout} />
        </button>
      </div>
      <div style={{width:"80%"}}>
      <div className="dash-border" style={{backgroundColor:'#F4D57D', padding:"1rem", border:"none"}}>
            <div>
              <p className="center">Hello, {signInData.username}</p>
              <p>Ready to tackle todays work?</p>
            </div>
            <div style={{display:"flex", alignItems:"center"}}>
              <p style={{ textAlign: "center" }}>
                {currentDate}
                <img src={calender} />
              </p>
            </div>
      </div>
      <div style={{margin:"2rem"}}>
        {/*Start of the boxes */}
        <div style={{display:"flex", justifyContent:"space-between"}}>
          {/*Pending orders */}
          <div
            style={{
              height: "fit-content",
              borderRadius: "1.25rem",
              background: "#F6E89A",
              padding: "0.8rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <p style={{ fontSize: "1rem", fontWeight: "275" }}>
              Pending orders
            </p>
            <p
              style={{
                fontSize: "2rem",
                fontWeight: "700",
              }}
            >
              {Pendingorders}
            </p>
          </div>
          {/*Processed orders */}
          <div
            style={{
              height: "fit-content",

              borderRadius: "1.25rem",
              background: "#CB9D1B",
              padding: "0.8rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <p style={{ fontSize: "1rem", fontWeight: "275" }}>
              Processed orders
            </p>
            <p
              style={{
                fontSize: "2rem",
                fontWeight: "700",
              }}
            >
              {Processedorders}
            </p>
          </div>

          {/*Days to endmonth orders */}
          <div
            style={{
              height: "fit-content",

              borderRadius: "1.25rem",
              background: "#F4D57D",
              padding: "0.8rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <p style={{ fontSize: "1rem", fontWeight: "275" }}>
              Pending orders
            </p>
            <p
              style={{
                fontSize: "2rem",
                fontWeight: "700",
                color
              }}
            >
              {daysLeft}
            </p>
          </div>

          {/*Total revenues */}
          <div
            style={{
              height: "fit-content",

              color:"white",
              borderRadius: "1.25rem",
              background: "#8D4520",
              padding: "0.8rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <p style={{fontSize: "1rem", fontWeight: "400" }}>
              Total revenues
            </p>
            <p
              style={{
                fontSize: "2rem",
                fontWeight: "700",
              }}
            >
              {Alltotals}
            </p>
          </div>
        </div>

        <div className="ordertable">
          <div style={{display:"flex", justifyContent:"space-between", marginLeft:'1rem', marginRight:'1rem', marginTop:"1rem", marginBottom:"1rem"}}>
          <div style={{borderRadius:"0.625rem", padding:"0.3rem", border:"2px solid rgba(0, 0, 0, 0.50)", background:"#EEF1F2"}}>
            <input
            style={{backgroundColor:"inherit", border:"none"}}
              type="date"
              value={searchOrderDate}
              onChange={(e) => setSearchOrderDate(e.target.value)}
            />
            

            <button style={{backgroundColor:"inherit", border:"none", borderLeft:"2px solid black"}} onClick={handleSearch}>Search</button>
          </div>
          <div>
            <label>Filter By Status:</label>
            <select style={{marginLeft:"2rem",borderRadius:"0.625rem", padding:"0.3rem", border:"2px solid rgba(0, 0, 0, 0.50)", background:"#EEF1F2"}} onChange={(e) => handleFilterStatus(e.target.value)}>
              <option value="">All</option>
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          </div>
          <table style={{width:"100%"}}>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Order Date</th>
                <th>Customer Name</th>
                <th>Total</th>
                <th>Order Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.OrderID}>
                  <td>{order.OrderID}</td>
                  <td>{order.Date}</td>
                  <td>{order.ClientName}</td>
                  <td>{order.GrandTotal}</td>
                  <td>
                    <span style={{ color: getStatusColor(order.Status) }}>
                      {order.Status}
                    </span>
                  </td>
                  <td>
                    <button onClick={() => openPopup(order)}>
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Popup for order details */}
          <Popup open={!!selectedOrder} onClose={closePopup}>
            <div>
              {selectedOrder && clientDetails && (
                <div
                  style={{
                    backgroundColor: "#F4D57D",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <p><b>Order Details</b></p>
                  <div
                    style={{ display: "flex", justifyContent: "space-around" }}
                  >
                    <div>
                      <p>Order ID: {selectedOrder.OrderID}</p>
                      <p>Order Date: {selectedOrder.Date}</p>
                    </div>
                    <div>
                      <p>Total: {selectedOrder.GrandTotal}</p>
                      <p>Order Status: {selectedOrder.Status}</p>
                    </div>
                  </div>
                  <div className="ordertable-pop" style={{ maxHeight: "10.5rem", overflowY: "auto" }}>
                    <table style={{ width: "100%" }}>
                      <thead >
                        <tr>
                          <th>Product ID</th>
                          <th>Product Name</th>
                          <th>Quantity</th>
                        </tr>
                      </thead>
                      <tbody>
                        {parse(selectedOrder.OrderDetails).map((product) => (
                          <tr key={product.productID}>
                            <td>{product.productID}</td>
                            <td>{product.productName}</td>
                            <td>{product.basketquantity}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p>Payment Reference: {selectedOrder.PaymentReference}</p>
                  <p><b>Client Details</b></p>
                  <div style={{ display: "flex" }}>
                    <div>
                      <p>
                        <b>Client ID:</b> {clientDetails.ClientID}
                      </p>
                      <p>Client Name: {clientDetails.ClientName}</p>
                      <p>Client Address: {clientDetails.ClientAddress}</p>
                    </div>
                    <div>
                      <p>Contact Info: {clientDetails.ContactInfo}</p>
                      <p>Client Email: {clientDetails.ClientEmail}</p>
                    </div>
                  </div>
                  {/* Additional client details can be added here */}
                  <h3>Change Order Status</h3>
                  <label>New Order Status:</label>
                  <select onChange={(e) => updateOrderStatus(e.target.value)}>
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              )}
            </div>
          </Popup>

        </div>
      </div>
      </div>
    </div>
  );
}

function getStatusColor(status) {
  switch (status) {
    case "Pending":
      return "red";
    case "Processing":
      return "orange";
    case "Completed":
      return "green";
    default:
      return "black";
  }
}
