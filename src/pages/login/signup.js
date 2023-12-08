import React, { useState } from "react";
import axios from "axios";
import lock from "./svgs/lock.svg";
import phone from "./svgs/phone.svg";
import profile from "./svgs/profile.svg";
import call from'./svgs/call.svg';

export default function CreateUserForm() {
  const initialUserData = {
    username: "",
    password: "",
    repassword: "",
    email: "",
    userType: "",
    phonenumber: "",
  };

  const [username, setUsername] = useState(initialUserData.username);
  const [password, setPassword] = useState(initialUserData.password);
  const [repassword, setRepassword] = useState(initialUserData.repassword);
  const [email, setEmail] = useState(initialUserData.email);
  const [userType, setUserType] = useState(initialUserData.userType);
  const [phonenumber, setPhonenumber] = useState(initialUserData.phonenumber);
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleCreateUser = (event) => {
    event.preventDefault();
    if (
      username.trim() === "" ||
      repassword.trim() === "" ||
      password.trim() === "" ||
      email.trim() === "" ||
      phonenumber.trim() === "" ||
      userType === ""
    ) {
      alert("Please fill in all fields.");
    } else if (password !== repassword) {
      alert("Passwords do not match");
    } else if (!emailPattern.test(email)) {
      alert("Invalid email format.");
    } else {
      const userdata = {
        username: username,
        password: password,
        email: email,
        userType: userType,
        phone: phonenumber,
      };
      axios
        .post("http://localhost/optihiveapi/creatinguser.php/", userdata, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then(function (response) {
          alert(response.data.message);
          console.log(response);

          // Clear the form data after successful user creation
          setUsername(initialUserData.username);
          setPassword(initialUserData.password);
          setRepassword(initialUserData.repassword);
          setEmail(initialUserData.email);
          setUserType(initialUserData.userType);
          setPhonenumber(initialUserData.phonenumber);
        })
        .catch(function (error) {
          alert("Server Down");
          console.log(error);
        });
    }
  };

  return (
    <div className="signup">
      <div style={{display:"flex", width:"100%"}}>
        <div style={{display:"flex", flexDirection:"column", width:"50%"}}>
      <div className="inputbox" style={{border:"0.2rem solid #8D4520"}}>
        <div className="input-left" >
          <img src={profile} />
        </div>
        <div className="input-right"style={{borderLeft:"0.2rem solid #8D4520"}}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            name="username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
      </div>

      <div className="inputbox" style={{border:"0.2rem solid #8D4520"}}>
        <div className="input-left">
          <img src={lock} />
        </div>
        <div className="input-right" style={{borderLeft:"0.2rem solid #8D4520"}}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>

      <div className="inputbox" style={{border:"0.2rem solid #8D4520"}}>
        <div className="input-left">
          <img src={lock} />
        </div>
        <div className="input-right" style={{borderLeft:"0.2rem solid #8D4520"}}>
          <input
            type="password"
            placeholder="Confirm Password"
            value={repassword}
            name="repassword"
            onChange={(e) => setRepassword(e.target.value)}
          />
        </div>
      </div>
      </div>
      <div style={{display:"flex", flexDirection:"column", width:"50%"}}>

      <div className="inputbox" style={{border:"0.2rem solid #8D4520"}}>
        <div className="input-left">
          <img src={phone} />
        </div>
        <div className="input-right" style={{borderLeft:"0.2rem solid #8D4520"}}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>
      <div className="inputbox" style={{border:"0.2rem solid #8D4520"}}>
        <div className="input-left">
          <img src={call} />
        </div>
        <div className="input-right" style={{borderLeft:"0.2rem solid #8D4520"}}>
          <input
            type="number"
            placeholder="Phone number"
            value={phonenumber}
            name="phonenumber"
            onChange={(e) => setPhonenumber(e.target.value)}
          />
        </div>
      </div>
      <select
        style={{ borderRadius:"2rem", height:"5.5rem"}}
        name="userType"
        value={userType}
        onChange={(e) => setUserType(e.target.value)}
      >
        <option value="">Select User Type</option>
        <option value="Store Manager">Store Manager</option>
        <option value="Order Processor">Order Processor</option>
      </select>
      </div>
      </div>
      <br></br>
      <button className="continue" style={{ background: "#F6E89A", padding: "1.3rem" }}onClick={handleCreateUser}>
        Continue
      </button>
    </div>
  );
}
