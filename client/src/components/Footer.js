import React from "react";

// Footer component

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="footer"
      style={{ border: "1px solid #1a1a1a textAlign: center" }}
    >
      <div className="footer-container">
        <p className="footer-text">
          &copy; {currentYear} DU Full-Stack Coders. All rights reserved. | Made
          with ❤️ by Morgan Rott, Jen Roberson, Jacob Zea, and Natasha Lewis
        </p>
      </div>
    </footer>
  );
}

export default Footer;
