import React from "react";
// import AppNavbar from "./Nav";
import LoginForm from "./Logincard";
import Header from "./Header";
import SignupForm from "./SignupForm";

function Homepage() {
  return (
    <div>
    <br />
    <h1>Welcome to the Daily Zen Journal, a place for you to relax and reflect. 
    </h1>
    <br />
    <LoginForm />
    <br />
    <SignupForm />
  </div>
  );
}

export default Homepage;