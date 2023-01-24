import React from 'react'
import { API } from "../../Backend";
import { LazyLoadImage } from 'react-lazy-load-image-component';

const CardImageHelper = ( { product } ) => {
    const imageURL = product ?  `${API}/product/photo/${product._id}` : "https://images.pexels.com/photos/4659797/pexels-photo-4659797.jpeg?auto=compress&cs=tinysrgb&w=1600";
  
    return (
    <div className='card-image'>
            <LazyLoadImage loading='lazy' src={imageURL} alt={'book_img'} />
    </div>
  )
}

export default CardImageHelper