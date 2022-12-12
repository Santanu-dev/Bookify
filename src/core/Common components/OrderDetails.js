import React, { useEffect, useRef, useState } from "react";
import { isAuthenticated } from "../../auth/helper";
import { getOrderStatus } from "../../user/helper/userapicalls";
import "./OrderDetails.css";
import Dropdown from 'react-bootstrap/Dropdown';
import { updateOrderStatus } from "../helper/OrderHelper";


const OrderDetails = ({ purchases, order }) => {
  const transId = purchases.transaction_id;
  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;
  const orderId = order._id;

  const [orderStatus, setOrderStatus] = useState(order.orderStatus);
  const isInitialMount = useRef(true);

  const handleCheckStatus = () => {
    getOrderStatus(userId, token, transId).then((res) => {
      console.log(res)
      setOrderStatus(res[0].orderStatus);
    });
  };

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
   } else {
      updateOrderStatus(userId, orderId, token, orderStatus)
      .then(res => {
        console.log(res);
      })
   }
  }, [orderStatus])

  // const statusUpdate = (order_id, changedStatus) => {
  //   updateOrderStatus(userId, order_id, token, changedStatus).then(res => {
  //     console.log(res)
  //   })
  // }

  // const updateOrderStatus = () => {
  //   statusUpdate();
  // }

  return (
    <>
      {order === "" ? (
        <div className="orderCard">
          <div className="orderName">
            <div>{purchases.name.slice(0, 15)}...</div>
            <div>Quantity: {purchases.quantity}</div>
          </div>
          <div className="orderAmount m-2">&#x20B9; {purchases.amount}</div>
          <div className="buttons">
            <button className="buy-btn m-2" onClick={handleCheckStatus}>
              Check Status
            </button>
            <button className="btn btn-danger m-2" onClick={() => {}}>
              Order Cancel Request
            </button>
          </div>
          <span className="m-2">{orderStatus == "Recieved" ? "Order Placed" : orderStatus}</span>
        </div>
      ) : (
        <div className="orderCard2">
          <div className="orderName">
            <div>{order.products[0].name.slice(0, 15)}...</div>
            <div>Quantity: {order.count}</div>
          </div>
          <div className="orderName">
            <div className="orderAmount m-2">&#x20B9; {order.amount}</div>
            <div className="orderAmount m-2" style={{fontSize: '18px'}}>trans_Id-{order.trasaction_id}</div>
          </div>
          <div className="orderName">
            <div className="orderAmount m-2">Status: {orderStatus}</div>
            <div className="orderAmount m-2">{order.user[0]["email"] ? order.user[0]["email"]  : "request Email"}</div>
          </div>
          
          <div className="m-4">
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Update Status
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={() => setOrderStatus("Processing")} >Processing</Dropdown.Item>
                <Dropdown.Item onClick={() => setOrderStatus("Shipped")}>Shipped</Dropdown.Item>
                <Dropdown.Item onClick={() => setOrderStatus("Delivered")} >Delivered</Dropdown.Item>
                <Dropdown.Item onClick={() => setOrderStatus("Cancelled")} >Cancelled</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderDetails;
