import React, { useEffect, useState } from "react";
import Base from "./Base";
import Card from "./Common components/Card";
import { loadCart, removeFromCart } from "./Common components/CartHelper";
import './Cart.css'
import { Link } from "react-router-dom";
import BestSellerCarousel from "./Common components/BestSellerCarousel";

const Cart = () => {

  const [products, setProducts] = useState([]) 
  const [emptyCart, setEmptyCart] = useState(false)
  const [reload, setReload] = useState(false)
  const [myCart, setMyCart] = useState([])

  useEffect(() => {
    setProducts(loadCart())
  },[reload])

  useEffect(() => {
    setProducts(loadCart())
  },[myCart])

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
        setMyCart(cart);
    }
  }


  const loadCartProducts = () => {
    return (
        <>
            { products !== undefined ? products.map((product, index) => {
                return (
                  <div className="cart" key={index}>
                    <div className="cart-item">
                      <div><Card cart={"true"} setReload={setReload} reload={reload} key={index} product={product} addToCart={false}/></div>
                      <div className="item-info">
                        <ul>
                          <li>Name: {product.name}</li>
                          <li className="desc inCart">Description: {product.description}</li>
                          <input className="see-more" type="checkbox" />
                          <li>Price: &#x20B9; {product.price}</li>
                        </ul>
                        <div className='card-button mobile'>
                          <Link to={"/make/payment/" + product._id} >
                            <button key={index} className="btn btn-success m-2" >&#128498; Buy Now</button>
                          </Link>
                          <Link to="/cart" >
                            <button key={index} className="btn btn-danger m-2" onClick={() => removeItemFromCart(product._id)}>Remove From Cart</button>
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="separator-cart"></div>
                  </div>
                ) 
            }) : setEmptyCart(true)}
        </>
    )
  }

  // const loadCartCheckoutSection = () => {
  //   return (
  //       <>
  //           { products !== undefined ? products.map((product, index) => {
  //               return (
  //                 <div className="cart">
  //                   <div className="cart-item">
                      
  //                   </div>
  //                 </div>
  //               ) 
  //           }) : setEmptyCart(true)}
  //       </>
  //   )
  // }

  return (
    <>
      <Base theme={localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light'}>
        <div className="cart-header text-center">Your Cart</div>
        <div className="cart-section">
            {!emptyCart ? 
                <>
                    <div className="cart-display">{loadCartProducts()}</div>
                    {/* <div className="cart-checkout">{loadCartCheckoutSection()}</div> */}
                </>
            : 
            <>
                <h1>Empty Cart</h1>
            </>
            }
            
        </div>
            <div className="cart-header text-left">People Also Viewed...</div>
        <BestSellerCarousel />
      </Base>
    </>
  );
}

export default Cart;
