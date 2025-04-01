import React, { useState } from "react";
import "./SideBar.css";
import axios from "axios";
import InputIcon from "../../assets/input.svg";
import TypeIcon from "../../assets/type.svg";

const SideBar = () => {
  const [ticket, setTicket] = useState({
    numOfVendor: "",
    numOfCustomer: "",
    maxTicketCapacity: "",
    totalTickets: "",
    ticketReleaseRate: "",
    customerRetrieverRate: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTicket({ ...ticket, [name]: value });
  };

  const submitHandler = (event) => {
    event.preventDefault();

    axios
      .post("http://localhost:8080/api/config", ticket, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("Ticket added successfully:", response.data);
      })
      .catch((error) => {
        console.error(
          "Error adding ticket:",
          error.response?.data || error.message
        );
        alert("Error adding ticket");
      });
  };

  return (
    <div className="registration-form">
      <form onSubmit={submitHandler}>
        <div className="form-title">
          <div>
            <img src={InputIcon} alt="" />
          </div>
          <div>Enter your Inputs</div>
        </div>
        <div className="form-group">
          <label className="form-label">
            <div>
              <img src={TypeIcon} alt="" className="type-image" />
            </div>
            <div>Number of Vendor</div>
          </label>
          <input
            type="number"
            className={`form-control item ${
              ticket.numOfVendorError ? "is-invalid" : ""
            }`}
            id="numOfVendor"
            name="numOfVendor"
            placeholder={ticket.numOfVendorError || "Enter a number"}
            onChange={(e) => {
              const value = e.target.value;
              // Check if the value is non-negative digits only
              if (/^\d+$/.test(value) && parseInt(value, 10) >= 0) {
                handleInputChange(e); // Update state if valid
              } else {
                setTicket((prev) => ({
                  ...prev,
                  numOfVendorError: "Please enter a valid positive number",
                }));
              }
            }}
            onBlur={() =>
              setTicket((prev) => ({ ...prev, numOfVendorError: null }))
            }
            value={ticket.numOfVendor}
          />
        </div>
        <div className="form-group">
          <label className="form-label">
            <div>
              <img src={TypeIcon} alt="" className="type-image" />
            </div>
            <div>Number of Customers</div>
          </label>
          <input
            type="number"
            className="form-control item"
            placeholder="0"
            onChange={(e) => {
              const value = e.target.value;
              if (value === "" || parseInt(value, 10) >= 1) {
                handleInputChange(e); // Update the state only if the value is valid
              }
            }}
            name="numOfCustomer"
            id="numOfCustomer"
          />
        </div>
        <div className="form-group">
          <label className="form-label">
            <div>
              <img src={TypeIcon} alt="" className="type-image" />
            </div>
            <div>Maximum Ticket Capacity</div>
          </label>
          <input
            type="number"
            className="form-control item"
            placeholder="0"
            onChange={(e) => {
              const value = e.target.value;
              if (value === "" || parseInt(value, 10) >= 1) {
                handleInputChange(e); // Update the state only if the value is valid
              }
            }}
            value={ticket.maxTicketCapacity}
            name="maxTicketCapacity"
            id="maxTicketCapacity"
          />
        </div>
        <div className="form-group">
          <label className="form-label">
            <div>
              <img src={TypeIcon} alt="" className="type-image" />
            </div>
            <div>Total ticket (Tocket pool capacity)</div>
          </label>
          <input
            type="number"
            className="form-control item"
            placeholder="0"
            onChange={(e) => {
              const value = e.target.value;
              if (value === "" || parseInt(value, 10) >= 1) {
                handleInputChange(e); // Update the state only if the value is valid
              }
            }}
            value={ticket.totalTickets}
            name="totalTickets"
            id="totalTickets"
          />
        </div>
        <div className="form-group">
          <label className="form-label">
            <div>
              <img src={TypeIcon} alt="" className="type-image" />
            </div>
            <div>Ticket Release Rate</div>
          </label>
          <input
            type="number"
            className="form-control item"
            placeholder="0"
            onChange={(e) => {
              const value = e.target.value;
              if (value === "" || parseInt(value, 10) >= 1) {
                handleInputChange(e); // Update the state only if the value is valid
              }
            }}
            value={ticket.ticketReleaseRate}
            name="ticketReleaseRate"
            id="ticketReleaseRate"
          />
        </div>
        <div className="form-group">
          <label className="form-label">
            <div>
              <img src={TypeIcon} alt="" className="type-image" />
            </div>
            <div>Customer Retriver Rate</div>
          </label>
          <input
            type="number"
            className="form-control item"
            placeholder="0"
            onChange={(e) => {
              const value = e.target.value;
              if (value === "" || parseInt(value, 10) >= 1) {
                handleInputChange(e); // Update the state only if the value is valid
              }
            }}
            value={ticket.customerRetrieverRate}
            name="customerRetrieverRate"
            id="customerRetrieverRate"
          />
        </div>
        <div className="form-group">
          <button
            type="button"
            className="btn btn-block create-account"
            onClick={submitHandler}
          >
            Start
          </button>
        </div>
      </form>
    </div>
  );
};

export default SideBar;
