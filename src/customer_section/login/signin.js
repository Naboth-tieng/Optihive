import React, { useState } from "react";
import axios from "axios";
import Profile from "./svgs/profile.svg";
import lock from "./svgs/lock.svg";

export default function LoginForm({onSignin,cont}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (email.trim() === "") {
      alert("Email is required.");
      return;
    }

    if (password.trim() === "") {
      alert("Password is required.");
      return;
    }

    const userData = {
      email: email,
      password: password,
    };

    axios
      .post("http://localhost/optihiveapi/customer/signin.php/", userData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(function (response) {
        console.log(response);
        alert(response.data.message)
        onSignin(response.data);
        if(response.data.message==="Login successful"){
          cont();
        }
      })
      .catch(function (error) {
        alert("Server Down");
        console.log(error);
      });
  };

  return (
    <div className="signin">
      <div className="inputbox">
        <div className="input-left">
          <img
            src={Profile}
            style={{ width: "3.125rem", height: "3.125rem" }}
          />
        </div>
        <div className="input-right">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>

      <div className="inputbox">
        <div className="input-left">
          <img
            src={lock}
            style={{ width: "2.08331rem", height: "2.34375rem" }}
          />
        </div>
        <div className="input-right">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
      <button className="continue" style={{ background: "#7AE7C7", padding: "0.6rem" }}onClick={handleLogin}>
        Continue
      </button>
    </div>
  );
}
