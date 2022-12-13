import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllOrders, getAllProductsNow, getAllUsers } from "../admin/helper/adminapicall";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import "./AdminDashboard.css";

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

const rightpanel = (totalUsers, totalOrders, products) => {
  return (
    <>
      <div className="short-details">
        <div className="t-users">Total Users : {totalUsers}</div>
        <div className="t-orders">Total Orders Placed: {totalOrders}</div>
      </div>
      {products.map((product, index) => {
        return (
          <div className="product-insights" key={index}>
            <div className="pName">{product.name}</div>
            <div className="pSold">Sold :{product.sold}</div>
            <div className="pStock">Stock :{product.stock}</div>
            {product.stock < 50 &&<span className="warning-msg">*Update Stock</span> }
          </div>
        )
      })}
    </>
  );
};

const AdminDashboard = ({ history }) => {

  const { user, token } = isAuthenticated();

  const [totalUsers, setTotalUsers] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [products, setProducts] = useState([]);
  const[ currentPage, setCurrentPage] = useState(0);

  const getTotalUserDetails = () => {
    getAllUsers(user._id, token).then( res => {
        setTotalUsers(res.length);
      }
    )
  }

  const getTotalOrderDetails = () => {
    getAllOrders(user._id, token).then( res => {
        setTotalOrders(res.length)
      }
    )
  }

  useEffect(() => {
    getTotalUserDetails();
  }, [totalUsers])

  useEffect(() => {
    getTotalOrderDetails();
  }, [totalOrders])

  useEffect(() => {
    getAllProductsNow().then( res => {
      setProducts(res);
    })
  }, [])

  return (
    <Base theme={localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light'}>
      <div className="admin-area">
        <div className="left-panel">{leftpanel(history)}</div>
        <div className="right-panel aDash m-2">{rightpanel(totalUsers, totalOrders, products)}</div>
      </div>
    </Base>
  );
};

export default AdminDashboard;
