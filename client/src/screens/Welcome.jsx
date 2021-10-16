import React from "react";
import ShowcaseImg from "../assets/illustration.svg";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import "../styles/Components.css";
import "../styles/queries.css";

function Welcome() {
  return (
    <div className="container">
      <div className="wrapper">
        <nav>
          <div className="nav-wrapper">
            <div className="logo-wrapper">
              <img src={logo} alt="" id="logo"></img>
            </div>
            <div className="button-wrapper">
              <Link to="/register">
                <button className="btn secondary-btn">Register</button>
              </Link>
              <Link to="/login">
                <button className="btn">Login</button>
              </Link>
            </div>
          </div>
        </nav>
        <div className="showcase">
          <div className="showcase-text">
            <h1>
              What is
              <br />
              eDak?
            </h1>
            <p>
              e-Dak goes with old school idea of writing letters and sending it
              to people who live far from you, in this modern era of instant
              messaging people have lost their patience and value of long texts
              and meaningful words and emotions. eDak brings back old school
              letter writing principles and sends your message to particular X
              location in Y amount time which is calculated based on how far the
              receiving location is from the sending location.
            </p>
          </div>
          <div className="showcase-image">
            <img src={ShowcaseImg} alt=""></img>
          </div>
          <div className="button-wrapper mobile">
            <Link to="/register">
              <button className="btn secondary-btn">Register</button>
            </Link>
            <Link to="/login">
              <button className="btn">Login</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
