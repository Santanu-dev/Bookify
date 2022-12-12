import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import OrderDetails from "../core/Common components/OrderDetails";
import "../user/AdminDashboard.css";
import { getAllOrders } from "./helper/adminapicall";

const currentTab = (history, path) => {
  return history.location.pathname === path ? "active" : "";
};
const { user, token } = isAuthenticated();

const leftpanel = (history) => {
  return (
    <>
      <div className="header">Admin, Bookify</div>
      <div className="d-separator"></div>
      <div className="dashboard_navs">
        <ul>
          <li className={"dashboard-links " + currentTab(history, "/admin/dashboard")}>
            <Link to="/admin/dashboard" className="link">Dashboard</Link>
          </li>
          <li className={"dashboard-links " + currentTab(history, "/admin/create/category")}>
            <Link to="/admin/create/category" className="link">Create Category</Link>
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
          <li className={"dashboard-links " + currentTab(history, "/admin/create/product")}>
            <Link to="/admin/create/product" className="link">Add Product</Link>
          </li>
          <li className={"dashboard-links " + currentTab(history, "/admin/manage/products")}>
            <Link to="/admin/manage/products" className="link">Manage Product</Link>
          </li>
          <li className={"dashboard-links " + currentTab(history, "/admin/manage/orders")}>
            <Link to="/admin/manage/orders" className="link">Manage orders</Link>
          </li>
        </ul>
      </div>
    </>
  );
};

const rightpanel = (orders) => {
  return (
    <>
      <h1 className="text-left" >Manage orders</h1>
      <div className='OrderDetails'>
        {orders.map((order, index) => {
          return orders.length !== 0 ?
          <div key={index} >
            <OrderDetails order={order} purchases={""}/>
          </div> 
          :
            <div key={index}>
              <h1 className='text-center'>No Book Orders Found !</h1>  
            </div>
        }) }
      </div>
    </>
  )
}

const ManageOrders = ({ history }) => {

  const [orders, setOrders] = useState([]);

  
  useEffect(() => {
    getAllOrders(user._id, token).then(res => {
      setOrders(res);
    })
  }, [])

  return (
    <Base theme={localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light'}>
      <div className="admin-area">
        <div className="left-panel">{leftpanel(history)}</div>
        <div className="right-panel" style={{overflowY: "scroll", width: "60vw"}}>{rightpanel(orders)}</div>
      </div>
    </Base>
  );
};

export default ManageOrders;
