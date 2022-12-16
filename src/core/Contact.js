import React from 'react'
import Base from './Base'
import './Contact.css'

const Contact = () => {

    let theme = localStorage.getItem('theme');

  return (
    <Base theme={theme}>
        <div className='contact-header'>
            <h1>CONTACT US</h1>
            <h3>ANY QUERRIES 24/7 CUSTOMER SUPPORT</h3>
        </div>
        <div className='contact-details'>
            <p>The Bookify Help Centre page lists out various types of issues that you may have encountered so that there can be quick resolution and you can go back to shopping online. For example, you can get more information regarding order tracking, delivery date changes, help with returns (and refunds), and much more. The Bookify Help Centre also lists out more information that you may need regarding Bookify Plus, payment, shopping, and more. The page has various filters listed out on the left-hand side so that you can get your queries solved quickly, efficiently, and without a hassle. You can get the Bookify Help Centre number or even access Bookify Help Centre support if you need professional help regarding various topics. The support executive will ensure speedy assistance so that your shopping experience is positive and enjoyable. You can even inform your loved ones of the support page so that they can properly get their grievances addressed as well. Once you have all your queries addressed, you can pull out your shopping list and shop for all your essentials in one place. You can shop during festive sales to get your hands on some unbelievable deals online. This information is updated on 16-Dec-22</p>
        </div>
        <form className='messegeForm' action="">
            <div className="form-group mt-4">
                <label htmlFor="email">Your Email address:</label>
                <input type="email" class="form-control mt-2" id="email" />
            </div>
            <div className="form-group mt-2">
                <label htmlFor="message">Type your Message</label>
                <textarea type="text-area" rows="4" cols="50" className="form-control mt-2" id="message" />
            </div>
            
            <button type="submit" className="btn btn-success mt-4">Send Message</button>
        </form>
    </Base>
  )
}

export default Contact