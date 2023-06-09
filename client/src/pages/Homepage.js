import React from "react";
// import AppNavbar from "./Nav";
import LoginForm from "../components/Logincard";
import Header from "../components/Header";
import SignupForm from "../components/SignupForm";
import Footer from "../components/Footer";
// import './homepage.css'

function Homepage(props) {
  const { currentPage, handlePageChange } = props;
  return (
    <div>
    <br />
    <h1 style={{textAlign: "center"}}>Welcome to your Daily Zen Journal, a place for you to relax and reflect. 
    </h1>
    <br />
    <br />
    <div className="container">
      <div className='cover'>
      </div>
      <div>
      <h2 className="qoute" style={{textAlign: "center"}}>“Wellness starts with a positive mindset and a commitment to change.” - Unknown</h2>
      </div>
  </div>
  <Footer className="homepage-footer"/>
  </div>
  );
}

export default Homepage;