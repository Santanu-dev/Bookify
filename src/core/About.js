import Base from './Base'
import './About.css'

const About = () => {

    let theme = localStorage.getItem('theme');;

  return (
    <Base theme={theme}>
        <div className='head'>
            <div className='left'></div>
            <div className='mid'>THE BOOKIFY JOURNEY</div>
            <div className='right'></div>
        </div>
        <div className='mid-section'>
            <div className='launch'>LAUNCED IN DECEMBER 2022</div>
            <div className='detail'>Bookify is a home for book lovers with Books available from all accress the world</div>
        </div>
        <div className='img'>
            <img src='https://static-assets-web.flixcart.com/www/promos/new/20141125-225805-handbag.png'></img>
        </div>
        <div className='second-head'>
            <div className='launch'>STARTED BY SIGNLE PERSON</div>
            <div className='detail'>HOPE FOR A DECENT GROWTH IN UPCOMING DECADES</div>
        </div>
        <div className='img'>
            <img src='https://thumbs.dreamstime.com/b/real-travel-landmark-around-world-vector-100545542.jpg'></img>
        </div>
    </Base>
  )
}

export default About