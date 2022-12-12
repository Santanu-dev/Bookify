import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import "../user/AdminDashboard.css";
import "./addProduct.css";
import { getProduct, updateProduct, getAllCategories } from "./helper/adminapicall";

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

const rightpanel = (
  handleChange,
  handleSubmit,
  name,
  categories,
  description,
  price,
  stock,
  photo,
  category,
  successMsg,
  errorMsg,
  formValid
) => {
  return (
    <>
      <div className="addProductForm">
        <div className="form-head">Update Product Details</div>
        <div className="form-input">
          <div>
            <label className="input-label">
              <input
                onChange={handleChange("photo")}
                type="file"
                name="photo"
                accept="image"
                placeholder="choose a file"
              />
            </label>
          </div>
          <div>
            <label className="input-label">
              <input
                onChange={handleChange("name")}
                name="name"
                className="form-control"
                placeholder="Name"
                value={name}
              />
            </label>
          </div>
          <div>
            <label className="input-label">
              <textarea
                onChange={handleChange("description")}
                name="description"
                className="form-control"
                placeholder="Description"
                value={description}
              />
            </label>
          </div>
          <div>
            <label className="input-label">
              <input
                onChange={handleChange("price")}
                name="price"
                type="number"
                className="form-control"
                placeholder="Price"
                value={price}
              />
            </label>
          </div>
          <div>
            <label className="input-label">
              <select
                onChange={handleChange("category")}
                name="category"
                className="form-control"
                placeholder="Category"
                value={category}
              >
                <option>Select A Genre</option>
                {categories.map((cate) => {
                  return (
                    <option key={cate._id} value={cate._id}>
                      {cate.name}
                    </option>
                  );
                })}
              </select>
            </label>
          </div>
          <div>
            <label className="input-label">
              <input
                onChange={handleChange("stock")}
                name="stock"
                type="number"
                className="form-control"
                placeholder="Quantity"
                value={stock}
              />
            </label>
          </div>
        </div>
        <div>
          <button type="submit" onClick={handleSubmit} className="submit_btn">
            Update Product
          </button>
          {successMsg()}
          {errorMsg()}
        </div>
      </div>
    </>
  );
};

const UpdateProduct = ({ history, match }) => {

  const productId = match.params.productId;

  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    photo: "",
    categories: [],
    category: "",
    loading: false,
    errors: "",
    updatedProduct: false,
    formData: ""
  });

  const preloadCategoryAndProduct = (productId) => {

    getProduct(productId).then((res) => {
      if (res.error) {
        setValues({ ...values, errors: res.error });
      } else {
        setValues({ 
            ...values,
            name: res.name,
            description: res.description,
            price: res.price,
            stock: res.stock,
            category: res.category,
            formData: new FormData()
         });

         formData.set(name, res.name)
         formData.set(description, res.description)
         formData.set(price, res.price)
         formData.set(stock, res.stock)
         formData.set(category, res.category)

         getAllCategories().then((res) => {
            if (res.error) {
              setValues({ ...values, errors: res.error });
            } else {
              setValues({ categories: res, formData: new FormData() });
            }
          });
      }
    });
  };

  useEffect(() => {
    preloadCategoryAndProduct(productId);
  }, []);

  const { user, token } = isAuthenticated();
  const {
    name,
    description,
    price,
    stock,
    photo,
    category,
    categories,
    loading,
    errors,
    updatedProduct,
    formData
  } = values;

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, errors: "", loading: true });
    updateProduct(productId, user._id, token, formData)
      .then((res) => {
        if (res.error) {
          setValues({ ...values, updatedProduct: false, errors: res.error });
        } else {
          setValues({
            ...values,
            name: "",
            description: "",
            price: "",
            stock: "",
            photo: "",
            category: "",
            loading: false,
            errors: "",
            updatedProduct: true,
            formData: new FormData(),
          });
        }
      })
      .catch((err) => console.log(err));
  };

  const successMsg = () => (
    <div
      className="alert alert-success"
      style={{ display: updatedProduct ? "" : "none", margin: "10px 0px" }}
    >
      <p>Product updated Successfully.</p>
    </div>
  );

  const errorMsg = () => (
    <div
      className="alert alert-danger"
      style={{ display: errors ? "" : "none", margin: "10px 0px" }}
    >
      <p>All fields are mandatory</p>
    </div>
  );

  return (
    <Base theme={localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light'}>
      <div className="admin-area">
        <div className="left-panel">{leftpanel(history)}</div>
        <div className="right-panel">
          {rightpanel(
            handleChange,
            handleSubmit,
            name,
            categories,
            description,
            price,
            stock,
            photo,
            category,
            successMsg,
            errorMsg,
          )}
          <div></div>
        </div>
      </div>
    </Base>
  );
};

export default UpdateProduct;
