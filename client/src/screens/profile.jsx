import React, { useState, useEffect } from "react";
import User from "../assets/user.png";
import { arrTopics, arrLanguages } from "../helpers/data";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import jwt from "jsonwebtoken";
import { isAuth } from "../helpers/auth";
import { Redirect } from "react-router-dom";

const Profile = ({match}) => {
  const [count, setCount] = useState(1);

  const [formData, setFormData] = useState({
    email: "",
    token: "",
    username: "",
    bio: "",
    dateOfBirth: "",
    gender: "",
    topics: [],
    languages: [],
    show: true
  });

  useEffect(() => {
    let token = match.params.token;
    let { email } = jwt.decode(token);

    if (token) {
      setFormData({ ...formData, email, token });
    }
  }, [match.params]);

  const { email, token, show, username, bio, dateOfBirth, gender, topics, languages } = formData;

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_API_URL}/users/profile`, {
        email,
        token,
        username,
        bio,
        dateOfBirth,
        gender,
        topics,
        languages
      })
      .then((res) => {
        setFormData({
          ...formData,
           show: false,
           email: "",
           username: "",
           bio: "",
           dateOfBirth: "",
           gender: "",
           topics: [],
           languages: [] 
        });
        toast.success(res.data.message);
      })
      .catch((err) => {
        toast.error(err.response.data.error);
      });
  };

  const handleChange = (type) => (e) => {
    if (!(type === "topics" && type === "languages")) {
      setFormData({ ...formData, [type]: e.target.value });
    }
  };

  const increaseCount = (count) => {
    setCount(count + 1);
    if (count > 1) {
      errorHandling(count);
    }
  }

  const errorHandling = (count) => {
    if (count === 2) {
      if (formData.topics.length < 5) {
        toast.error(
          `Only ${formData.topics.length} Topics Added, Minimum 5 Required!`
        );
        setCount(count--);
      }
    } else if (count === 3) {
      if (formData.languages.length < 1) {
        toast.error(
          `Only ${formData.languages.length} Languages Selected, Minimum 1 Required!`
        );
        setCount(count--);
      }
    }
  };

  const handleArrays = (type) => (e) => {
    let data = document.getElementById([type]).value;
    if (type === "topic") {
      if (!formData.topics.includes(data)) {
        formData.topics.push(data);
        toast.success(`${data} added as your topic`);
      } else {
        toast.error(`${data} is already added`);
      }
    } else {
      if (!formData.languages.includes(data)) {
        formData.languages.push(data);
        toast.success(`${data} added as your language`);
      } else {
        toast.error(`${data} is already added`);
      }
    }
    console.log(formData);
  };

  return (
    <div className="wrapper user-wrapper">
      <ToastContainer autoClose={1700} />
      <div className="login-wrapper">
        {count === 1 ? (
          <form onSubmit={handleSubmit}>
            <div className="inner-form-wrapper">
              <div className="field-wrapper img">
                <img src={User} alt="user-profile" className="user-img" />
              </div>
              <div className="field-wrapper">
                <label>Username</label>
                <input
                  type="text"
                  placeholder="Username"
                  required
                  value={username}
                  onChange={handleChange("username")}
                />
              </div>
              <div className="field-wrapper">
                <label>Bio</label>
                <textarea
                  onChange={handleChange("bio")}
                  name="bio"
                  value={bio}
                  placeholder="Bio"></textarea>
              </div>
              <div className="field-wrapper row">
                <div className="col">
                  <label>Date of Birth</label>
                  <input
                    type="date"
                    name="dob"
                    onChange={handleChange("dateOfBirth")}
                    value={dateOfBirth}
                    required
                  />
                </div>
                <div className="col">
                  <label>Gender</label>
                  <select
                    name="gender"
                    onChange={handleChange("gender")}
                    value={gender}
                    required>
                    <option value="Male" selected>
                      Male
                    </option>
                    <option value="Female">Female</option>
                    <option value="Non-Binary">Non-Binary</option>
                  </select>
                </div>
              </div>

              <div className="btn-wrapper continue">
                <button className="btn" disabled={count < 2}>
                  Back
                </button>
                <button type="submit" className="btn">
                  Continue
                </button>
              </div>
            </div>
          </form>
        ) : null}

        {count === 2 ? (
          <form onSubmit={handleSubmit}>
            <div className="inner-form-wrapper">
              <h1>Topics Of Interests</h1>
              <div className="field-wrapper topics">
                <select name="topics" id="topic">
                  {arrTopics.map((topic, index) => (
                    <option key={index} value={topic}>
                      {topic}
                    </option>
                  ))}
                </select>
                <button
                  className="btn"
                  type="button"
                  onClick={handleArrays("topic")}>
                  Add
                </button>
              </div>
              <div className="btn-wrapper continue">
                <button className="btn" onClick={increaseCount(count)}>
                  Back
                </button>
                <button type="submit" className="btn">
                  Continue
                </button>
              </div>
            </div>
          </form>
        ) : null}

        {count === 3 ? (
          <form onSubmit={handleSubmit}>
            <div className="inner-form-wrapper">
              <h1>Your Languages</h1>
              <p>Add the languages that you speak or use</p>
              <div className="field-wrapper topics">
                <select name="languages" id="lang">
                  {arrLanguages.map((language) => (
                    <option value={language}>{language}</option>
                  ))}
                </select>
                <button
                  className="btn"
                  type="button"
                  onClick={handleArrays("lang")}>
                  Add
                </button>
              </div>
              <div className="btn-wrapper continue">
                <button className="btn" onClick={increaseCount(count)}>
                  Back
                </button>
                <button className="btn" type="submit">
                  Submit
                </button>
              </div>
            </div>
          </form>
        ) : null}
      </div>
    </div>
  );
};

export default Profile;
