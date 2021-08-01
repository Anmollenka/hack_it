import React, { useState } from "react";
import "./LoginPage.css";

import Navbar from "../Navbar/Navbar";
import { useHistory } from "react-router-dom";
const history=useHistory();
export default function Login() {
 const switchTosignin=()=>{
     history.push('/');
 }
 const history=useHistory();
 const [user,setUser]=useState(
     {
         name:"",email:"",contact:"",password:""
     }
 );

let name,value;
const handleInputs =(e)=>{
console.log(e);
name=e.target.name;
value=e.target.value;
setUser({...user,[name]:value});
}

const PostData=async (e)=>{
 e.preventDefault();
 const{name,email,contact,password}=user;
 const res=await fetch("/signup",{
     method:"POST",
     headers:{
         "Content-type":"application/json"
     },
     body:JSON.stringify({
         name,email,contact,password
     })
 });
 const data=await res.json();
 if(data.status===422 || !data ){
     window.alert("Invalid Registration");
 }
 else{
     console.log("Succesful registration");
     history.push("/");
 }

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
            <input type="text" name="name" id="name" autoComplete="off"
                                value={user.name}
                                onChange={handleInputs}
                                    placeholder="Your Name"/>
          </div>
          <div className="form-group">
          <label htmlFor="email">
            <h3>Email Address</h3>
          </label>
          <input type="text" name="email" id="email" autoComplete="off"
                                value={user.email}
                                onChange={handleInputs}
                                    placeholder="Your Email"/>
        </div>
        <div className="form-group">
        <label htmlFor="contact">
          <h3>Contact</h3>
        </label>
        <input type="number" name="contact" id="contact" autoComplete="off"
                                value={user.contact}
                                onChange={handleInputs}
                                    placeholder="Your Phone"/>
      </div>
          <div className="form-group">
            <label htmlFor="password">
              <h3>Password</h3>
            </label>
            <input type="password" name="password" id="password" autoComplete="off"
            value={user.password}
            onChange={handleInputs}
                placeholder="Your Password"/>
          </div>
          <div className="footer">
          <div className="form-group form-button">
          <input type="submit" name="signup" id="signup" className="form-submit"
          onClick={PostData}
              value="register"/>
      </div>
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