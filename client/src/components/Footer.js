import React from 'react';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <p className="footer-text-center">
          &copy; {currentYear} DU Full-Stack Coders. All rights reserved. | Made with ❤️ by Morgan Rott, Jen Roberson, Jacob Zea, and Natasha Lewis
        </p>
      </div>
    </footer>
  );
}

export default Footer;