import React, { useState } from "react";
import User from "../assets/user.png";

const Profile = () => {
  const [count, setCount] = useState(1);
  return (
    <div className="wrapper user-wrapper">
      <div className="login-wrapper">
        <form>
          {count === 1 ? (
            <div className="inner-form-wrapper">
              <div className="field-wrapper img">
                <img src={User} alt="user-profile" className="user-img" />
              </div>
              <div className="field-wrapper">
                <label>Username</label>
                <input type="email" placeholder="Username" required />
              </div>
              <div className="field-wrapper">
                <label>Bio</label>
                <textarea name="bio" placeholder="Bio"></textarea>
              </div>
              <div className="field-wrapper row">
                <div className="col">
                  <label>Date of Birth</label>
                  <input type="date" name="dob" required />
                </div>
                <div className="col">
                  <label>Gender</label>
                  <select name="gender" required>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Non-Binary">Non-Binary</option>
                  </select>
                </div>
              </div>

              <div className="btn-wrapper continue">
                <button
                  className="btn"
                  onClick={() => setCount(count - 1)}
                  disabled={count < 2}>
                  Back
                </button>
                <button className="btn" onClick={() => setCount(count + 1)}>
                  Continue
                </button>
              </div>
            </div>
          ) : null}

          {count === 2 ? (
            <div className="inner-form-wrapper">
              <h1>Topics Of Interests</h1>
              <div className="field-wrapper topics">
                <input type="text" required />
                <button className="btn">Add</button>
              </div>
              <div className="btn-wrapper continue">
                <button className="btn" onClick={() => setCount(count - 1)}>
                  Back
                </button>
                <button className="btn" onClick={() => setCount(count + 1)}>
                  Continue
                </button>
              </div>
            </div>
          ) : null}

          {count === 3 ? (
            <div className="inner-form-wrapper">
              <h1>Your Languages</h1>
              <p>Add the languages that you speak or use</p>
              <div className="field-wrapper topics">
                <input type="text" required />
                <button className="btn">Add</button>
              </div>
              <div className="btn-wrapper continue">
                <button className="btn" onClick={() => setCount(count - 1)}>
                  Back
                </button>
                <button className="btn" type="submit">
                  Submit
                </button>
              </div>
            </div>
          ) : null}
        </form>
      </div>
    </div>
  );
};

export default Profile;
