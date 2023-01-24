import React, { useState } from 'react'
import './Ratings.css'

const Ratings = ({ currRating }) => {
  return (
    <div className="m-2">
      {[...Array(5)].map((star, index) => {   
        if(index < currRating)  {
            return (         
                <span className="star" style={{color: 'yellow'}}>&#9733;</span>        
              );
        }else{
            return (         
                <span className="star" >&#9733;</span>        
              );
        }
        
      })}
    </div>
  )
}

export default Ratings