import React, { useEffect, useState } from 'react'
import Card from './Card'
import './BestSellerCarousel.css'
import { getAllProductsNow } from '../../admin/helper/adminapicall'

const BestSellerCarousel = () => {

  const theme = localStorage.getItem('theme');
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    loadAllProducts();
  }, []);

  const loadAllProducts = () => {
    getAllProductsNow().then((res) => {
      if (res.error) {
        setError(res.error);
      } else {
        setProducts(res);
        console.log(products)
      }
    });
  };

  return (
    <>
      <div className='slider'>
        {products.map((product, index) => {
          return (
            product.stock < 200 &&
            <div className='slide'>
              <Card key={index} theme={theme} reload={false} product={product} addToCart={true} disabled={true}/>
            </div>
            )
        })}
      </div>
    </>
  )
}

export default BestSellerCarousel