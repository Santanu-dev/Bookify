import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import "../user/AdminDashboard.css";
import { getACategory, updateCategory } from "./helper/adminapicall";

const currentTab = (history, path) => {
  return history.location.pathname === path ? "active" : "";
};

const leftpanel = (history) => {
  return (
    <>
      <div className="header">Admin, Bookify</div>
      <div className="d-separator"></div>
      <div className="dashboard_navs">
        <ul>
          <li
            className={
              "dashboard-links " + currentTab(history, "/admin/dashboard")
            }
          >
            <Link to="/admin/dashboard" className="link">
              Dashboard
            </Link>
          </li>
          <li
            className={
              "dashboard-links " + currentTab(history, "/admin/create/category")
            }
          >
            <Link to="/admin/create/category" className="link">
              Create Category
            </Link>
          </li>
          <li
            className={
              "dashboard-links " + currentTab(history, "/admin/manage/category")
            }
          >
            <Link to="/admin/manage/category" className="link">
              Manage Category
            </Link>
          </li>
          <li
            className={
              "dashboard-links " + currentTab(history, "/admin/create/product")
            }
          >
            <Link to="/admin/create/product" className="link">
              Add Product
            </Link>
          </li>
          <li
            className={
              "dashboard-links " + currentTab(history, "/admin/manage/products")
            }
          >
            <Link to="/admin/manage/products" className="link">
              Manage Product
            </Link>
          </li>
          <li
            className={
              "dashboard-links " + currentTab(history, "/admin/manage/orders")
            }
          >
            <Link to="/admin/manage/orders" className="link">
              Manage orders
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

const rightpanel = (name, handleChange, handleSubmit, success, error) => {
  return (
    <>
      <div className="myForm">
        <h1
          className="text-center"
          style={{
            borderBottom: "3px solid black",
            padding: "10px 80px",
            textTransform: "uppercase",
          }}
        >
          Update Genre
        </h1>
        <div className="main-form">
          <div className="input-field">
            <label className="text-d">Enter Updated Genre</label>
            <input
              placeholder="For Ex. Sci-Fi"
              className="input"
              onChange={handleChange}
              value={name}
              type="text"
              required
            ></input>
          </div>
        </div>
        <div>
          <button className="submit_btn" onClick={handleSubmit}>
            Update Genre
          </button>
        </div>
        <div>
          <div
            className="alert alert-success"
            style={{ display: success ? "" : "none", margin: "10px 0px" }}
          >
            Genre updated Successfully.
          </div>
        </div>
        <div>
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none", margin: "10px 0px" }}
          >
            Failed To update Genre !
          </div>
        </div>
      </div>
    </>
  );
};

const AddCategory = ({ history, match }) => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { user, token } = isAuthenticated();
  const categoryId = match.params.categoryId;

  useEffect(() => {
    getACategory(categoryId).then(res => {
      if(res.error){
        setError(true);
        setSuccess(false)
      }else{
        //console.log(res)
        setName(res.name);
      }
    })
    .catch(err => console.log(err))
  }, [])

  const handleChange = event => {
    setError("");
    setName(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    updateCategory(categoryId, user._id, token, { name }).then((res) => {
      if (res.error) {
        setError(true);
      } else {
        setName("");
        setError("");
        setSuccess(true);
      }
    });
  };

  return (
    <Base theme={localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light'}>
      <div className="admin-area">
        <div className="left-panel">{leftpanel(history)}</div>
        <div className="right-panel">
          {rightpanel(name, handleChange, handleSubmit, success, error)}
        </div>
      </div>
    </Base>
  );
};

export default AddCategory;
