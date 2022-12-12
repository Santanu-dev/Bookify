import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import "../user/AdminDashboard.css";
import { deleteProduct, getAllProducts, getAllProductsNow } from "./helper/adminapicall";
import "./ManageProduct.css";

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

const rightpanel = (products, deleteAProduct) => {
  return (
    <>
      <div className="manage-product">
        <h2 className="text-center py-4">All products:</h2>
        <h2 className="sub-heading">
          Total {products.length} products Available
        </h2>
        {products.map((product, index) => {
          return (
            <div key={index} className="row bg-light m-2">
              <div className="col-12">
                <div className="row text-center ">
                  <div className="col-8">
                    <h3 className="text-dark text-left m-1">{product.name}</h3>
                  </div>
                  <div className="col-4">
                    <Link
                      className="btn btn-success m-1"
                      to={`/admin/product/update/${product._id}`}
                    >
                      <span className="">Update</span>
                    </Link>
                    <button
                      onClick={() => deleteAProduct(product._id)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

const ManageProduct = ({ history }) => {
  const [products, setProducts] = useState([]);

  const { user, token } = isAuthenticated();

  const preloadProducts = () => {
    getAllProductsNow().then((res) => {
      if (res.error) {
        console.log(res.error);
      } else {
        setProducts(res);
      }
    });
  }

  useEffect(() => {
    preloadProducts();
  }, []);

  const deleteAProduct = productId => {
    deleteProduct(productId, user._id, token).then(res => {
      if(res.error){
        console.log(res.error);
      }else{
        preloadProducts();
      }
    })
    .catch()
  }

  return (
    <Base theme={localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light'}>
      <div className="admin-area">
        <div className="left-panel">{leftpanel(history)}</div>
        <div className="right-panel">{rightpanel(products, deleteAProduct)}</div>
      </div>
    </Base>
  );
};

export default ManageProduct;
