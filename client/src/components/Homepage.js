import React from "react";
// import AppNavbar from "./Nav";
import LoginForm from "./Logincard";
import Header from "./Header";
import SignupForm from "./SignupForm";
import './homepage.css'

function Homepage(props) {
  const { currentPage, handlePageChange } = props;
  return (
    <div>
    <br />
    <h1 style={{textAlign: "center"}}>Welcome to the Daily Zen Journal, a place for you to relax and reflect. 
    </h1>
    <br />
    {/* <h2 style={{ textAlign: 'center'}}>Sign up or log in to get started!</h2> */}
    <br />
    <div className="container">
      <div className='cover'>
      </div>
      <div>
      <h2 className="qoute" style={{textAlign: "center"}}>“Wellness starts with a positive mindset and a commitment to change.” - Unknown</h2>
      </div>
  </div>
  </div>
  );
}

export default Homepage;