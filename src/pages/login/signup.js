import React, { useState } from "react";
import axios from "axios";
import lock from "./svgs/lock.svg";
import phone from "./svgs/phone.svg";
import profile from "./svgs/profile.svg";

export default function CreateUserForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [email, setEmail] = useState("");
  const [userType, setUserType] = useState("");
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleCreateUser = (event) => {
    //ensuring the form is not empty
    event.preventDefault();
    if (
      username.trim() === "" ||
      repassword.trim() === "" ||
      password.trim() === "" ||
      email.trim() === "" ||
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
        })
        .catch(function (error) {
          alert("Server Down");
          console.log(error);
        });
    }
  };

  return (
    <div className="signup">
      <div className="inputbox">
        <div className="input-left">
          <img src={profile} />
        </div>
        <div className="input-right">
          <input
            type="text"
            placeholder="Username"
            value={username}
            name="username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
      </div>

      <div className="inputbox">
        <div className="input-left">
          <img src={lock} />
        </div>
        <div className="input-right">
          <input
            type="password"
            placeholder="Password"
            value={password}
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>

      <div className="inputbox">
        <div className="input-left">
          <img src={lock} />
        </div>
        <div className="input-right">
          <input
            type="password"
            placeholder="Confirm Password"
            value={repassword}
            name="repassword"
            onChange={(e) => setRepassword(e.target.value)}
          />
        </div>
      </div>

      <div className="inputbox">
        <div className="input-left">
          <img src={phone} />
        </div>
        <div className="input-right">
          <input
            type="email"
            placeholder="Email"
            value={email}
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>
      <select
        style={{ borderColor: userType.trim() === "" ? "red" : "" }}
        name="userType"
        value={userType}
        onChange={(e) => setUserType(e.target.value)}
      >
        <option value="">Select User Type</option>
        <option value="Store Manager">Store Manager</option>
        <option value="Order Processor">Order Processor</option>
      </select>
      <br></br>
      <button className="continue" onClick={handleCreateUser}>
        Continue
      </button>
    </div>
  );
}
