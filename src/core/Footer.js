import React, { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import "./Footer.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


export default function Footer({ theme }) {
  
  return (
    <>
      <div className= {theme == "light" ? "footer lighty" : "footer darky"}>
        <div>
          <ul className="nav-items">
            <li className="nav-link">
              <Link className="link" to="/aboutUs">
                About Us
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <ul className="nav-items">
            <li className="nav-link">
              <Link className="link" to="/" style={{marginRight: "10px"}}>
                <FontAwesomeIcon icon="fa-brands fa-facebook-f" />
              </Link>
              <Link className="link" to="/" style={{marginRight: "10px"}}>
                <FontAwesomeIcon icon="fa-brands fa-twitter" />
              </Link>
              <Link className="link" to="/" style={{marginRight: "10px"}}>
                <FontAwesomeIcon icon="fa-brands fa-instagram" />
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <ul className="nav-items">
            <li className="nav-link">
              <Link className="link" to="/ContactUs">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="sub-footer">
        <div className="separator"></div>

        <div className="tag-line">
          We <span> sell,</span> <span>rent</span> and <span>Launch Books</span>{" "}
          at our Websites...
          <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/payment-method_69e7ec.svg"></img>
        </div>
        <div className="thanks">
          Thanks... &copy; bookify.com, 2022 devloped by Santanu Barman
        </div>
      </div>
    </>
  );
}
