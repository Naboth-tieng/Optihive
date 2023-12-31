import React, { useState } from "react";
import axios from "axios";
import Profile from "./svgs/profile.svg";
import lock from "./svgs/lock.svg";

export default function LoginForm({ cont, onSignin }) {
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
      .post("http://localhost/optihiveapi/login.php", userData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(function (response) {
        console.log(response);
        alert(response.data.message);
        onSignin(response.data);
        if (response.data.message === "Login successful") {
          cont();
        }
      })
      .catch(function (error) {
        alert("Server Down");
        console.log(error);
      });
  };

  return (
    <div className="signin" >
      <div className="inputbox"style={{  border: '3px solid #8D4520' }}>
        <div className="input-left" >
          <img
            src={Profile}
            style={{ width: "3.125rem", height: "3.125rem"  }}
          />
        </div>
        <div className="input-right" style={{borderLeft:"3px solid #8d4520"}}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>

      <div className="inputbox" style={{  border: '3px solid #8D4520' }}>
        <div className="input-left">
          <img
            src={lock}
            style={{ width: "2.08331rem", height: "2.34375rem" }}
          />
        </div>
        <div className="input-right" style={{borderLeft:"3px solid #8d4520"}}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
      <button
        className="continue"
        style={{ background: "#F6E89A", padding: "1.3rem" }}
        onClick={handleLogin}
      >
        Continue
      </button>
    </div>
  );
}
