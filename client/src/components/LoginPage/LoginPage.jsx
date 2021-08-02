import React, { useState } from "react";
import "./LoginPage.css";
import GoogleLogin from "react-google-login";
import Navbar from "../Navbar/Navbar";
import { useHistory } from "react-router-dom";

export default function Login() {
  const [name, setName] = useState("");
  const history=useHistory();
  const [user,setUser]=useState(
      {
          email:"",password:""
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
  const{email,password}=user;
  const res=await fetch("/login",{
      method:"POST",
      headers:{
          "Content-type":"application/json"
      },
      body:JSON.stringify({
          email,password
      })
  });
  const data=await res.json();
  if(data.status===422 || !data ){
      window.alert("Invalid Registration");
  }
  else{
      console.log("Succesful registration");
      window.open(
        `https://0wwr9.csb.app/welcome?name=${data.name}`,
        "_self"
      );
  }
  const failedresponseGoogle = (respose) => {
    console.log(respose);
  };
  const responseGoogle = (response) => {
    console.log(response);
    setName(response.profileObj.name);
    window.open(
      `https://0wwr9.csb.app/welcome?name=${response.profileObj.name}`,
      "_self"
    );
  };
  const switchTosignup=()=>{
    history.push('/Signup');
  }
  return (
    <>
    <Navbar />
    <div className="container">
      <img src="" alt="" />
      <div className="right column">
        <div className="header">
          <h1>SIGN IN</h1>
          <h3>Don't have an account?<a onClick={switchTosignup}>Sign Up</a></h3>
        </div>
        <div className="form">
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
          <input type="submit" name="signin" id="signin" className="form-submit"
          onClick={PostData}
              value="Log In"/>
      </div>
            <div class="border">
              <hr></hr>OR<hr></hr>
            </div>
            <GoogleLogin
              clientId="785266231457-7s6int6mpun4delti52kp0jcn8fq3prd.apps.googleusercontent.com"
              buttonText="SIGN  IN  WITH  GOOGLE"
              onSuccess={responseGoogle}
              onFailure={failedresponseGoogle}
              cookiePolicy={"single_host_origin"}
            />
          </div>
        </div>
      </div>
    </div>
    </>
  );
}