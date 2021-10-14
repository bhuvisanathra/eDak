import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { isAuth } from "../helpers/auth";
import axios from "axios";
import { Redirect } from "react-router-dom";
import "../styles/Components.css";
import "../styles/queries.css";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    passwordInput: "",
    confirmPassword: "",
  });

  const { email, passwordInput, confirmPassword } = formData;

  const handleChange = (text) => (e) => {
    setFormData({ ...formData, [text]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let id;
    if (email && passwordInput) {
      if (passwordInput === confirmPassword) {
        id = toast.info("Please Wait...", { autoClose: false });
        axios
          .post(`${process.env.REACT_APP_API_URL}/register`, {
            email,
            password: passwordInput,
          })
          .then((res) => {
            setFormData({
              ...formData,
              email: "",
              passwordInput: "",
              confirmPassword: "",
            });
            toast.update(id, {
              render: res.data.message,
              type: "success",
              isLoading: false,
            });
          })
          .catch((err) => {
            toast.update(id, {
              render: err.response.data.errors,
              type: "error",
              isLoading: false,
            });
          });
      } else {
        toast.error("Passwords don't match");
      }
    } else {
      toast.error("Please fill all the fields");
    }
  };

  return (
    <div className="form-wrapper">
      {isAuth() ? <Redirect to="/" /> : null}
      <ToastContainer />
      <div className="illustration sign-up"></div>
      <div className="login-wrapper">
        <form onSubmit={handleSubmit}>
          <div className="inner-form-wrapper">
            <h1>Sign Up</h1>
            <a href="/login">
              Already have an account? <span className="accent">Login</span>
            </a>
            <div className="field-wrapper">
              <label>Email *</label>
              <input
                type="email"
                placeholder="Email"
                onChange={handleChange("email")}
                value={email}
              />
            </div>
            <div className="field-wrapper">
              <label>Password *</label>
              <input
                type="password"
                placeholder="Password"
                onChange={handleChange("passwordInput")}
                value={passwordInput}
              />
            </div>
            <div className="field-wrapper">
              <label>Confirm Password *</label>
              <input
                type="password"
                placeholder="Confirm Password"
                onChange={handleChange("confirmPassword")}
                value={confirmPassword}
              />
            </div>
            <div className="btn-wrapper">
              <button className="btn" type="submit">
                Sign Up
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
