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
    <h1>Welcome to the Daily Zen Journal, a place for you to relax and reflect. 
    </h1>
    <br />
    <h2 style={{ textAlign: 'center'}}>Sign up or log in to get started!</h2>
    <br />
    <div className="container">
      <div className='cover'>
      </div>
      <div>
      “Wellness starts with a positive mindset and a commitment to change.” - Unknown
      </div>
    {/* <div className = "form-container">
    <div className = "form-wrapper" />
    <h3 style ={{ backgroundColor: 'pink'}}>Log In Here</h3>
    <LoginForm />
    <div />
    <div className = "form-wrapper" />
    <h3 style ={{ backgroundColor: 'pink'}}>Sign Up Here</h3>
    <SignupForm />
  </div> */}
  </div>
  </div>
  );
}

export default Homepage;