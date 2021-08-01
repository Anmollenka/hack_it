import React, { useState } from "react";
import "./LoginPage.css";

import Navbar from "../Navbar/Navbar";
import { useHistory } from "react-router-dom";
const history=useHistory();
export default function Login() {
 const switchTosignin=()=>{
     history.push('/');
 }
  return (
    <>
    <Navbar />
    <div className="container">
      <img src="" alt="" />
      <div className="right column">
        <div className="header">
          <h1>SIGN IN</h1>
          <h3>Already have an account <a onClick={switchTosignin}>Login</a></h3>
        </div>
        <div className="form">
          <div className="form-group">
            <label htmlFor="name">
              <h3>Name</h3>
            </label>
            <input
              type="text"
              name="name"
              placeholder="Ram"
            ></input>
          </div>
          <div className="form-group">
          <label htmlFor="email">
            <h3>Email Address</h3>
          </label>
          <input
            type="email"
            name="email"
            placeholder="you@example.com"
          ></input>
        </div>
        <div className="form-group">
        <label htmlFor="contact">
          <h3>Email Address</h3>
        </label>
        <input
          type="number"
          name="contact"
          placeholder="12345678"
        ></input>
      </div>
          <div className="form-group">
            <label htmlFor="password">
              <h3>Password</h3>
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter 6 characters or more"
            ></input>
          </div>
          <div className="footer">
            <button>SIGNUP</button>
            <div class="border">
              <hr></hr>OR<hr></hr>
            </div>
           
          </div>
        </div>
      </div>
    </div>
    </>
  );
}