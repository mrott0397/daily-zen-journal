import React from "react";
// import AppNavbar from "./Nav";
import LoginForm from "./Logincard";
import Header from "./Header";

function Homepage() {
  return (
    <div>
      <Header />
    <br />
    <h1>Welcome to the Daily Zen Journal, a place for you to relax and reflect. 
    </h1>
    <br />
    <LoginForm />
  </div>
  );
}

export default Homepage;