import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { authenticate, isAuthenticated, signin } from "../auth/helper";
import Base from "../core/Base";
import "./commonStyles.css";

const Signin = () => {
  const [formdata, setFormData] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    didRedirect: false,
  });

  const { email, password, error, loading, didRedirect } = formdata;
  const { user } = isAuthenticated();

  const handleChange = (name) => (event) => {
    setFormData({ ...formdata, error: false, [name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormData({ ...formdata, error: false, loading: true });
    signin({ email, password })
      .then((response) => {
        if (response.error) {
          setFormData({ ...formdata, error: response.error, loading: false });
        } else {
          authenticate(response, () => {
            setFormData({
              ...formdata,
              didRedirect: true,
            });
          });
        }
      })
      .catch((err) => console.log("signin request failed"));
  };

  const performRedirect = () => {
    if (didRedirect) {
      if (user && user.role === 1) {
        return <Redirect to="/admin/dashboard" />;
      } else {
        return <Redirect to="/" />;
      }
    }

    if (isAuthenticated()) {
      return <Redirect to="/" />;
    }
  };

  const loadingMsg = () => (
    <div
      className="alert alert-info"
      style={{ display: loading ? "" : "none", margin: "10px 0px" }}
    >
      <div className="text-center">
        <div className="spinner-border" role="status">
          <span className="sr-only"></span>
        </div>
      </div>
    </div>
  );

  const errorMsg = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none", margin: "10px 0px" }}
    >
      {error}
    </div>
  );

  const signinForm = () => {
    return (
      <div className="myForm">
        <h1
          className="text-center"
          style={{
            borderBottom: "3px solid black",
            padding: "10px 80px",
            textTransform: "uppercase",
          }}
        >
          Sign In
        </h1>
        <div className="main-form">
          <div className="input-field">
            <label className="text-d">Email</label>
            <input
              className="input"
              onChange={handleChange("email")}
              value={email}
              type="text"
            ></input>
          </div>
          <div className="input-field">
            <label className="text-d">Password</label>
            <input
              className="input"
              onChange={handleChange("password")}
              value={password}
              type="password"
            ></input>
          </div>
        </div>
        <div>
          <button className="submit_btn" onClick={handleSubmit}>
            Login
          </button>
        </div>
        <div className="alert alert-success"
          style={{margin: "10px 0px"}}
          >
          New to Bookify? Please Click here to <Link to="/signup">Sign up</Link>
          </div>
        <div>{loadingMsg()}</div>
        <div>{errorMsg()}</div>
      </div>
    );
  };

  return (
    <>
      <Base
        theme={
          localStorage.getItem("theme")
            ? localStorage.getItem("theme")
            : "light"
        }
      >
        <div className="signin">
          {signinForm()}
          {performRedirect()}
        </div>
      </Base>
    </>
  );
};

export default Signin;
