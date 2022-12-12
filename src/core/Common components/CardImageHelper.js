import React from 'react'
import { API } from "../../Backend";

const CardImageHelper = ( { product } ) => {
    const imageURL = product ?  `${API}/product/photo/${product._id}` : "https://images.pexels.com/photos/4659797/pexels-photo-4659797.jpeg?auto=compress&cs=tinysrgb&w=1600";
  
    return (
    <div className='card-image'>
            <img src={imageURL} alt={'book_img'} />
    </div>
  )
}

export default CardImageHelper