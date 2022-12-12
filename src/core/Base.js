import Footer from './Footer';
import NavBar from './NavBar';


const Base = ({children, theme, handleClick}) => {

  return (
    <div className={`theme ${theme}`}>
        <form className="color-picker" style={window.location.pathname == '/' ? {display: ''}: {display: 'none'}}  action="">
          <fieldset className="themeSelector">
            <div className="theme-btns">
              <label className="visually-hidden" htmlFor="theme">Dark</label>
              <input className="dark-radio" type="radio" name="theme" id="dark" onClick={handleClick}/>
            </div>
            <div className="theme-btns">
              <label className="visually-hidden" htmlFor="theme">Light</label>
              <input className="light-radio" type="radio" name="theme" id="light" onClick={handleClick}/>
            </div>
          </fieldset>
        </form>
        <NavBar theme={theme} />
          <div>{children}</div>
        <Footer theme={theme} />
    </div>
  )
}

export default Base;
