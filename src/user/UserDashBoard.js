import React, { useEffect, useState } from 'react'
import { isAuthenticated } from '../auth/helper';
import Base from '../core/Base'
import OrderDetails from '../core/Common components/OrderDetails';
import { findOrdersForUser } from './helper/userapicalls';
import './UserDashboard.css'

const UserDashboard = () => {

  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;
  const [userOrders, setUserOrders] = useState([]);

  useEffect(() => {
    getUserOrders(userId, token)
  }, [])

  const getUserOrders = (userId, token) => {
    findOrdersForUser(userId, token).then(res => {
      setUserOrders(res);
    })
  }

  const showAllOrders = () => {
    return (
      <div className='OrderDetails'>
        {userOrders.map((order, index) => {
          return order.purchases.length !== 0 ?
          order.purchases.map((item, index) => {
            return (
              <div className='text-center' key={index}>
                <OrderDetails purchases={item} order={""}/>
              </div>)
            })
            :
            <div key={index}>
              <h1 className='text-center'>No Book Orders Found !</h1>  
            </div>
        }) }
      </div>
    )
  }

  return (
    <Base theme={localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light'}>
      <h1 className='text-center m-4'>Your Orders</h1>
      <div>{showAllOrders()}</div>
    </Base>
  )
}

export default UserDashboard;
