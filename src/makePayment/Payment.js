import React, { useEffect, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { empyCart, loadCart } from '../core/Common components/CartHelper'
import { createOrder, order } from '../core/helper/OrderHelper'
import { getProductForPayment, getToken, processPayment } from './paymentHelper'
import DropIn from 'braintree-web-drop-in-react'
import { isAuthenticated } from '../auth/helper'
import "./Payment.css"
import Base from '../core/Base'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import LoadingSpinner from '../core/Common components/LoadingSpinner'

const Payment = ({ match }) => {

  const productId = match.params.productId;
  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;

  const [info, setInfo] = useState({
    loading: false,
    success: false,
    clientToken: null,
    error: "",
    instance: {}
  })

  const [ product, setProduct] = useState([]);
  const [ redirect, setRedirect] = useState(false);
  const [ quantity, setQuantity] = useState(1);
  const [ amount, setAmount] = useState(0);
  const [ cardDetailsSection, setCardDetailsSection] = useState(false);
  const [ loading, setLoading] = useState(true);

  const getAToken = (userId, token) => {
    getToken(userId, token).then(res => {
      // console.log("Braintree: ", res);
      if(!res){
        setInfo({...info, error: "Payment Failed"})
      }else{
        const clientToken = res.clientToken;
        setInfo({clientToken});
      }
    }).catch(err => console.log(err))
  }

  const getSelectedProduct = (productId) => {
    getProductForPayment(productId).then(res => {
      setProduct(res);
      setAmount(res.price);
    })
  }

  useEffect(() => {
    calFinalAmount();
  }, [quantity])

  const calFinalAmount = () => {
    let finalAmt = product ? product.price * quantity : 0;
    setAmount(finalAmt);
  }

  useEffect(()=>{

    getAToken(userId, token);

    getSelectedProduct(productId);
  }, [])

  const removeItemFromCart = (productId) => {
    let cart = []
    if(typeof window !== undefined){
        if(localStorage.getItem("cart")){
            cart = JSON.parse(localStorage.getItem("cart"));
        }

        cart.map((product, index) => {
            if(product._id === productId){
                cart.splice(index, 1);
            }
        })
        localStorage.setItem("cart", JSON.stringify(cart));
    }
  }

  const onPay = () => {
    setInfo({loading: true})
    let nonce; 
    let getNonce = info.instance
        .requestPaymentMethod()
        .then(data => {
          nonce = data.nonce
          const paymentData = {
            paymentMethodNonce: nonce,
            amount: amount
          }
          processPayment(userId, token, paymentData)
          .then(response => {
            setInfo({...info, loading: false, success: response.success})
            console.log("Pay Success", response)

            const orderData = {
              products: [product],
              trasaction_id: response.transaction.id,
              amount: response.transaction.amount,
              count: quantity
            }

            // let orderDetails = [];
            // orderDetails.push(orderData.amount) 
            // orderDetails.push(orderData.trasaction_id) 
            // orderDetails.push(orderData.products) 

            // console.log(orderData)

            createOrder(userId, token, orderData);

            removeItemFromCart(product._id);
            setRedirect(true);
            setLoading(true)
          })
          .catch(err => {
            setInfo({loading: false, success: false})
            console.log("Pay Failed ", err)
          })
        })
  }

  const showDropInUI = (loading) => {
    return (
      <>
      {info.clientToken !== null ? 
        <div className='dropIn'>
          <DropIn
            options={{ authorization: info.clientToken }}
            onInstance={(instance) => setInfo({...info, instance: instance})}
          />
          {!loading &&<button className='buy-btn payNow m-2' onClick={onPay}>Buy</button>}
          {!loading &&<button className='buy-btn payNow m-2' onClick={() => setCardDetailsSection(false)}>Close</button>}
        </div>
           : <h1 className='text-center'>Please Login...Payment Gateway Error! Try Again Later</h1>}
      </>
    )
  }

  const handlePlusClick = () => { 
    if(quantity < 5) setQuantity(quantity + 1)
  }
  const handleMinusClick = () => { 
    if(quantity > 1) setQuantity(quantity - 1)
  }

  return (
    <Base theme={localStorage.getItem('theme')}>
      {!redirect ? 
      <>
        <h1 className='text-center m-4 bg-success'>Make Payment</h1>
        <h4 className='text-center m-4'>ORDER SUMMURY</h4>
        <div className='makePayDetails'>
          <div className='prodName'>Book Name: {product.name}</div>
          <div className='prodName'>Price: &#x20B9; {product.price}</div>
          {!cardDetailsSection && <div className='quants'>
            <label>Quantity(Max 5): </label>
            <div className='btns neg' onClick={handleMinusClick}><FontAwesomeIcon icon="fa-solid fa-minus" /></div>
            <div>{quantity}</div>
            <div className='btns' onClick={handlePlusClick} ><FontAwesomeIcon icon="fa-solid fa-plus" /></div>
          </div>}
          <div className='mt-4 bg-success p-2'>Total Bill: {amount}</div>
        </div>
        {!cardDetailsSection && !info.loading &&<button className='buy-btn text-center proceed' onClick={() => {setCardDetailsSection(true)}}>Proceed With Payment</button>}
        {cardDetailsSection && setTimeout(() => {
            setLoading(false);
        }, 2000)}
        {cardDetailsSection && loading ? <LoadingSpinner /> : "" }

        {cardDetailsSection && <div className='payment-info'>{showDropInUI(loading)}</div>}
        {/* {redirect ? <Redirect to="/" /> : ""} */}
        </>   
        : 
        <>
          {info.success && setTimeout(() => {
            setLoading(false)
          }, 2000)} 
          {info.success && !loading  ?
          <div className='pay-con-sec'>
            <p className='pay-confirm text-center bg-success text-dark border border-success' 
            style={{height: "50vh"}}>
              Thank You! Payment Successfully Compoleted.
              <p>Click here to see your order status <Link style={{color: "#000"}} to="/user/dashboard">Dashboard</Link></p>
            </p>
          </div>
          : <LoadingSpinner />}
        </>}
      
    </Base>
  )
}

export default Payment