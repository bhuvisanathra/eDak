import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import jwt from "jsonwebtoken";
import { isAuth } from "../helpers/auth";
import { Redirect } from "react-router-dom";

const Activate = ({ match }) => {
  const [formData, setFormData] = useState({
    email: "",
    token: "",
    show: true,
  });

  useEffect(() => {
    let token = match.params.token;
    let { email } = jwt.decode(token);

    if (token) {
      setFormData({ ...formData, email, token });
    }
  }, [match.params]);

  const { email, token, show } = formData;

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_API_URL}/activate`, {
        token,
      })
      .then((res) => {
        setFormData({ ...formData, show: false });
        toast.success(res.data.message);
      })
      .catch((err) => {
        toast.error(err.response.data.error);
      });
  };

  return (
    <div className="form-wrapper">
      {isAuth() ? <Redirect to="/" /> : null}
      <ToastContainer />
      <div className="illustration activate"></div>
      <div className="activate-wrapper">
        <h1>
          Welcome, <br />
          Activate Your Account
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="btn-wrapper">
            <button type="submit" className="btn">
              Activate
            </button>
          </div>
          <div className="activate-text">
            <div>Or sign up again</div>
          </div>
          <div className="btn-wrapper">
            <button className="btn secondary-btn">
              <a href="/register" target="_self">
                Sign Up
              </a>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Activate;
