import React, { useState } from "react";
import axios from "axios";
import call from "./svgs/call.svg";
import lock from "./svgs/lock.svg";
import phone from "./svgs/phone.svg";
import location from "./svgs/location.svg";
import profile from "./svgs/profile.svg";

export default function CreateUserForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [Address, SetAddress] = useState("");
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleCreateUser = (event) => {
    //ensuring the form is not empty
    event.preventDefault();
    if (
      username.trim() === "" ||
      repassword.trim() === "" ||
      password.trim() === "" ||
      email.trim() === "" ||
      number.trim() === "" ||
      Address === ""
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
        number: number,
        Address: Address,
      };
      console.log(userdata);
      axios
        .post("", userdata, {
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
    <div className="customer">
      <div className="signup">
        <div className="inputbox">
          <div
            style={{ borderright: "3px solid #032FA8" }}
            className="input-left"
          >
            <img src={profile} />
          </div>
          <div className="input-right">
            <input
              type="text"
              placeholder="Full Names"
              value={username}
              name="fullnames"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        </div>{" "}
        {/* This is the fullnames */}
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
        {/* This is the Email */}
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
        {/* This is the Password */}
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
        {/* This is the Repassword */}
        <div className="inputbox">
          <div className="input-left">
            <img src={call} />
          </div>
          <div className="input-right">
            <input
              type="number"
              placeholder="Phone Number"
              value={number}
              name="number"
              onChange={(e) => setNumber(e.target.value)}
            />
          </div>
        </div>
        {/* This is the number */}
        <div className="inputbox">
          <div className="input-left">
            <img src={location} />
          </div>
          <div className="input-right">
            <input
              type="text"
              placeholder="Address"
              value={Address}
              name="Address"
              onChange={(e) => SetAddress(e.target.value)}
            />
          </div>
        </div>
        {/* This is the Address */}
        <br></br>
        <button
          className="continue"
          style={{ background: "#7AE7C7", padding: "0.6rem" }}
          onClick={handleCreateUser}
        >
          Continue
        </button>
      </div>{" "}
    </div>
  );
}
