import React from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";
// import "./Footer.css"; // Import CSS

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <h2 className="logo">KLOSET</h2>
        <p>Rent your perfect outfit for every occasion.</p>
        
        <div className="social-icons">
          <a href="#" className="social-link"><FaFacebook /></a>
          <a href="#" className="social-link"><FaInstagram /></a>
          <a href="#" className="social-link"><FaTwitter /></a>
          <a href="#" className="social-link"><FaLinkedin /></a>
        </div>

        <ul className="footer-links">
          <li><a href="#">Home</a></li>
          <li><a href="#">About Us</a></li>
          <li><a href="#">Contact</a></li>
          <li><a href="#">Rent for Event</a></li>
          <li><a href="#">Privacy Policy</a></li>
        </ul>
        
        <p className="footer-text">© 2025 KLOSET. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
