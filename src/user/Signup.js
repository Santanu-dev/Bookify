import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signup } from "../auth/helper/index";
import Base from "../core/Base";
import "./commonStyles.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });

  const { name, email, password, error, success } = formData;

  const handleChange = (name) => (event) => {
    setFormData({ ...formData, error: false, [name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormData({ ...formData, error: "" });
    signup({ name, email, password })
      .then((response) => {
        if (response.error) {
          setFormData({
            ...formData,
            name: "",
            email: "",
            password: "",
            error: response.error,
            success: false,
          });
        }else{
          setFormData({
            ...formData,
            name: "",
            email: "",
            password: "",
            error: "",
            success: true,
          });
        }
      })
      .catch((err) => {
        console.log("Error in sign up");
      });
  };

  const successMsg = () => (
    <div className="alert alert-success"
    style={{display: success ? "" : "none", margin: "10px 0px"}}
    >
      User Registered Successfully. Please Click here to <Link to="/signin">Sign in</Link>
    </div>
  )

  const errorMsg = () => (
    <div className="alert alert-danger"
    style={{display: error ? "" : "none", margin: "10px 0px"}}
    >
      {error}
    </div>
  )

  const signupForm = () => {
    return (
      <div className="myForm">
        <h1
          className="text-center"
          style={{
            borderBottom: "3px solid black",
            padding: "10px 10px",
            textTransform: "uppercase",
          }}
        >
          Sign Up
        </h1>
        <div className="main-form">
          <div className="input-field">
            <label className="text-d">Full Name</label>
            <input
              className="input"
              type="text"
              onChange={handleChange("name")}
              value={name}
            ></input>
          </div>
          <div className="input-field">
            <label className="text-d">Email</label>
            <input
              className="input"
              type="text"
              onChange={handleChange("email")}
              value={email}
            ></input>
          </div>
          <div className="input-field">
            <label className="text-d">Password</label>
            <input
              className="input"
              type="password"
              onChange={handleChange("password")}
              value={password}
            ></input>
          </div>
        </div>
        <div>
          <button className="submit_btn" onClick={handleSubmit}>
            Register
          </button>
        </div>
        <div className="alert alert-success"
          style={{display: success || error ? "none": "", margin: "10px 0px"}}
          >
          Already a Book worm? Please Click here to <Link to="/signin">Sign in</Link>
          </div>
        <div>{successMsg()}</div>
        <div>{errorMsg()}</div>
      </div>
    );
  };

  return (
    <>
      <Base theme={localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light'}>
        <div className="signup">{signupForm()}</div>
      </Base>
    </>
  );
};

export default Signup;
