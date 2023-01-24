import React, { useEffect, useState } from 'react'
import "./Card.css"
import CardImageHelper from './CardImageHelper'
import { Link, Redirect } from 'react-router-dom'
import { addProductsToCart, removeFromCart } from './CartHelper'
import Ratings from './Ratings'

const Card = ( { product, addToCart, reload = undefined, setReload = justReload => justReload, theme, disabled} ) => {

  const [redirect, setRedirect] = useState(false);

  const addProductCart = () => {
    addProductsToCart( product, () => {
      setRedirect(true);
    })
  }

  const removeProductFromCart = () => {
    removeFromCart( product._id)
    setReload(!reload)
  }

  const getRedirect = (redirect) => {
    if(redirect){
      return <Redirect to="/cart" />
    }
  }

  return (
    <div className={ theme == 'light' ? (disabled ? 'card-element disabled' : "card-element") : (disabled ? 'card-element dark-mode disabled' : "card-element dark-mode") }>
        <div className='card-title'>{product.name}</div>
        {getRedirect(redirect)}
        <CardImageHelper product={product} />
        <div className='card-content'>
            <div className='card-desc'>{product.description}</div>
            <Ratings currRating={product.rating ? product.rating : "4"} />
            <div className='price'>&#x20B9;{product.price}</div>
            <div className='card-button'>
              <Link to={"/make/payment/" + product._id} >
                <button className='buy-btn'>&#128498; Buy</button>
              </Link>  
                {addToCart ? 
                  <button className='cart-btn' onClick={addProductCart}><span style={{color: "#fff"}}>&#128722;</span> Add To Cart</button>
                  :
                  <button className='cart-btn' onClick={removeProductFromCart}>Discard Book</button>
                }
            </div>
        </div>
    </div>
  )
}

export default Card