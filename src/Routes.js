import React from 'react'

import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from './core/Home'
import Signin from './user/Signin'
import Signup from './user/Signup'
import AdminRoutes from './auth/helper/AdminRoutes'
import PrivateRoutes from './auth/helper/PrivateRoutes'
import UserDashboard from './user/UserDashBoard'
import adminDashboard from './user/AdminDashBoard'
import AddCategory from './admin/AddCategory'
import AddProduct from './admin/AddProduct'
import ManageProduct from './admin/ManageProducts'
import ManageOrders from './admin/Orders'
import UpdateProduct from './admin/UpdateProduct'
import ManageCategory from './admin/ManageCategory'
import UpdateCategory from './admin/UpdateCategory'
import Cart from './core/Cart'
import About from './core/About'
import Contact from './core/Contact'
import Payment from './makePayment/Payment'

export default function myRoutes() {
  return (
    <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/signup" exact component={Signup} />
            <Route path="/signin" exact component={Signin} />
            <Route path="/cart" exact component={Cart} />
            <Route path="/aboutUs" exact component={About} />
            <Route path="/contactUs" exact component={Contact} />
            <PrivateRoutes path="/user/dashboard" exact component={UserDashboard} />
            <PrivateRoutes path="/make/payment/:productId" exact component={Payment} />
            <AdminRoutes path="/admin/dashboard" exact component={adminDashboard} />
            <AdminRoutes path="/admin/create/category" exact component={AddCategory} />
            <AdminRoutes path="/admin/manage/category" exact component={ManageCategory} />
            <AdminRoutes path="/admin/category/update/:categoryId" exact component={UpdateCategory} />
            <AdminRoutes path="/admin/create/product" exact component={AddProduct} />
            <AdminRoutes path="/admin/manage/products" exact component={ManageProduct} />
            <AdminRoutes path="/admin/manage/orders" exact component={ManageOrders} />
            <AdminRoutes path="/admin/product/update/:productId" exact component={UpdateProduct} />
        </Switch>
    </BrowserRouter>
  )
}
