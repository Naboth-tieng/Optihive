import React from "react";
import Popup from "reactjs-popup";
import card from "./svgs/card.svg";
import edit from "./svgs/edit.svg";
export default function Card({
  email,
  setEmail,
  phonenumber,
  setPhonenumber,
  location,
  setLocation,
}) {
  return (
    <>
      <div
        className="card-top"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <h3>Invoicing details</h3>
        <Popup
          trigger={
            <button>
              {" "}
              <img src={edit} />{" "}
            </button>
          }
          modal
          nested
        >
          {(close) => (
            <div
              className="modal"
              style={{
                backgroundColor: "#032FA8",
                padding: "2rem",
                borderRadius: "1rem",
              }}
            >
              <div
                className="content"
                style={{ display: "flex", flexDirection: "column" }}
              >
                <input
                  type="text"
                  placeholder="Email"
                  name="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    marginBottom: "1rem",
                    padding: "1rem",
                    borderRadius: "0.5rem",
                    border: "none",
                  }}
                />
                <input
                  type="number"
                  placeholder="Phone number"
                  name="number"
                  value={phonenumber}
                  onChange={(e) => setPhonenumber(e.target.value)}
                  style={{
                    marginBottom: "1rem",
                    padding: "1rem",
                    borderRadius: "0.5rem",
                    border: "none",
                  }}
                />
                <input
                  type="text"
                  placeholder="Delivery location"
                  name="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  style={{
                    marginBottom: "1rem",
                    padding: "1rem",
                    borderRadius: "0.5rem",
                    border: "none",
                  }}
                />
              </div>
              <div style={{ textAlign: "center" }}>
                <button
                  onClick={() => {
                    close();
                    // Optionally, you can update the state in the parent component here
                  }}
                  style={{
                    backgroundColor: "black",
                    color: "white",
                    padding: "1rem",
                    borderRadius: "0.5rem",
                    border: "none",
                  }}
                >
                  Close modal
                </button>
              </div>
            </div>
          )}
        </Popup>
      </div>
      <div
        style={{
          marginTop: "0.6rem",
          position: "relative",
          width: "100%",
          height: "100%",
        }}
      >
        <img
          src={card}
          alt="Card Image"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            color: "#fff", // text color
          }}
        >
          <p className="IBM-bold">{email}</p>
          <div style={{ display: "flex" }}>
            <p className="IBM-norm" style={{ paddingRight: "1rem" }}>
              {phonenumber}
            </p>
            <p className="IBM-norm">{location}</p>
          </div>
        </div>
      </div>
    </>
  );
}
