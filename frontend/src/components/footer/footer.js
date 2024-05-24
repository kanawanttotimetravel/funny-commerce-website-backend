'use client'
import React from "react";
import "./footer-style.css";

import {logOut} from "@/apis/logOut";

const Footer = () => {
  return (
    <footer id="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <a href="/">Drakon</a>
        </div>
        <div className="footer-links">
          <h4>Links</h4>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/shop">Shop</a>
            </li>
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
          </ul>
        </div>
        <div className="footer-help">
          <h4>Help</h4>
          <ul>
            <li>
              <a href="#">Payment Options</a>
            </li>
            <li>
              <a href="#">Returns</a>
            </li>
            <li>
              <a href="#">Privacy Policies</a>
            </li>
          </ul>
        </div>
        <button style={ButtonStyle} onClick={() => {
          logOut();
        }}>LOG OUT</button>
      </div>

    </footer>
  );
};
const ButtonStyle = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  width: '18rem',
  height: '3rem',
  borderRadius: '0.25rem',
}
export default Footer;
