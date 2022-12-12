import { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { isAuthenticated, signout } from "../auth/helper";
import "./NavBar.css";
import logo from './logoLg.png'
import logo2 from './logoWht.png'

const currentTab = (history, path) => {
  return history.location.pathname === path ? "active" : "";
};

const NavBar = ({ history , theme }) => {

  const [menuOpen, setMenuOpen] = useState(false);

  const handleClick = () => {
    menuOpen ? setMenuOpen(false) : setMenuOpen(true);
  }

  return (
    <>
    <div className={theme == "light" ? "navbar lighty" : "navbar darky"}>
      <div className="branding">
        <h1><a href="/"><span>{theme == "light" ? <img style={{height: "40px", marginLeft: "8px"}} src={logo} alt="logo" /> : <img style={{height: "40px", marginLeft: "8px"}} src={logo2} alt="logo" /> }</span>BookiFy</a></h1>
      </div>
      <div className="nav-links">
        <div>
          <ul className={"nav-items " + currentTab(history, "/")}>
            <li className="nav-link">
              <Link className="link" to="/">
                Home
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <ul className={"nav-items " + currentTab(history, "/cart")}>
            <li className="nav-link">
              <Link className="link" to="/cart">
                Cart
              </Link>
            </li>
          </ul>
        </div>
        <div>
          {isAuthenticated() && isAuthenticated().user.role === 0 && (
            <ul
              className={"nav-items " + currentTab(history, "/user/dashboard")}
            >
              <li className="nav-link">
                <Link className="link" to="/user/dashboard">
                  Dashboard
                </Link>
              </li>
            </ul>
          )}
        </div>
        <div>
          {isAuthenticated() && isAuthenticated().user.role === 1 && (
            <ul
              className={"nav-items " + currentTab(history, "/admin/dashboard")}
            >
              <li className="nav-link">
                <Link className="link" to="/admin/dashboard">
                  Admin Dashboard
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>
      <div className="nav-links">
        <div>
          {!isAuthenticated() && (
            <ul className={"nav-items " + currentTab(history, "/signin")}>
              <li className="nav-link">
                <Link className="link" to="/signin">
                  Signin
                </Link>
              </li>
            </ul>
          )}
        </div>
        <div>
          {isAuthenticated() && isAuthenticated().user.role === 1 && (
            <ul
              className={"nav-items "}
            >
              <li className="nav-link">
                <Link className="link" to="/admin/dashboard">
                  Welcome, {isAuthenticated().user.name}
                </Link>
              </li>
            </ul>
          )}
        </div>
        <div>
          {isAuthenticated() && isAuthenticated().user.role === 0 && (
            <ul
              className={"nav-items "}
            >
              <li className="nav-link">
                <Link className="link" to="/user/dashboard">
                  Welcome, {isAuthenticated().user.name}
                </Link>
              </li>
            </ul>
          )}
        </div>
        <div>
          {!isAuthenticated() && (
            <ul className={"nav-items " + currentTab(history, "/signup")}>
              <li className="nav-link">
                <Link className="link" to="/signup">
                  Signup
                </Link>
              </li>
            </ul>
          )}
        </div>
        <div>
          {isAuthenticated() && (
            <ul className={"nav-items"}>
              <li
                className="nav-link"
                onClick={() =>
                  signout(() => {
                    history.push("/");
                  })
                }
              >
                <span className="link" style={{ cursor: "pointer" }} to="/">
                  Signout
                </span>
              </li>
            </ul>
          )}
        </div>
      </div>
      <div className={menuOpen ? "sandwitch-btn open" : "sandwitch-btn close"} onClick={handleClick}>
        <div className="left-line"></div>
        <div className="right-line"></div>
      </div>
    </div>
    <div className={theme + "y"}>
     <div className="sand-nav-links" style={!menuOpen ? {display: 'none'}: {}}>
        <div>
          <ul className={"sand-nav-items " + currentTab(history, "/")}>
            <li className="sand-nav-link">
              <Link className="link" to="/">
                Home
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <ul className={"nav-items " + currentTab(history, "/cart")}>
            <li className="nav-link">
              <Link className="link" to="/cart">
                Cart
              </Link>
            </li>
          </ul>
        </div>
        <div>
          {isAuthenticated() && isAuthenticated().user.role === 0 && (
            <ul
              className={"nav-items " + currentTab(history, "/user/dashboard")}
            >
              <li className="nav-link">
                <Link className="link" to="/user/dashboard">
                  Dashboard
                </Link>
              </li>
            </ul>
          )}
        </div>
        <div>
          {isAuthenticated() && isAuthenticated().user.role === 1 && (
            <ul
              className={"nav-items " + currentTab(history, "/admin/dashboard")}
            >
              <li className="nav-link">
                <Link className="link" to="/admin/dashboard">
                  Admin Dashboard
                </Link>
              </li>
            </ul>
          )}
        </div> 
        <div>
          {!isAuthenticated() && (
            <ul className={"nav-items " + currentTab(history, "/signin")}>
              <li className="nav-link">
                <Link className="link" to="/signin">
                  Signin
                </Link>
              </li>
            </ul>
          )}
        </div>
        <div>
          {isAuthenticated() && isAuthenticated().user.role === 1 && (
            <ul
              className={"nav-items "}
            >
              <li className="nav-link">
                <Link className="link" to="/admin/dashboard">
                  Welcome, {isAuthenticated().user.name}
                </Link>
              </li>
            </ul>
          )}
        </div>
        <div>
          {isAuthenticated() && isAuthenticated().user.role === 0 && (
            <ul
              className={"nav-items "}
            >
              <li className="nav-link">
                <Link className="link" to="/user/dashboard">
                  Welcome, {isAuthenticated().user.name}
                </Link>
              </li>
            </ul>
          )}
        </div>
        <div>
          {!isAuthenticated() && (
            <ul className={"nav-items " + currentTab(history, "/signup")}>
              <li className="nav-link">
                <Link className="link" to="/signup">
                  Signup
                </Link>
              </li>
            </ul>
          )}
        </div>
        <div>
          {isAuthenticated() && (
            <ul className={"nav-items"}>
              <li
                className="nav-link"
                onClick={() =>
                  signout(() => {
                    history.push("/");
                  })
                }
              >
                <span className="link" style={{ cursor: "pointer" }} to="/">
                  Signout
                </span>
              </li>
            </ul>
          )}
        </div>
      </div> 
    </div>
    </>
  );
};

export default withRouter(NavBar);
