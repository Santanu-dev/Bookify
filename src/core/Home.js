import React, { useEffect, useState } from "react";
import "../styles.css";
import './Home.css'
import Base from "./Base";
import Card from "./Common components/Card";
import { getAllProducts } from "./helper/coreapicalls";
import Pagination from "./Common components/Pagination";
import SearchBar from "./Common components/SearchBar";
import { Link } from "react-router-dom";

export default function Home() {

  const[ currentTheme, setCurrentTheme] = useState("light");
  const[ currentPage, setCurrentPage] = useState(0);
  const[ reloadNow, setReloadNow] = useState(false);

  // useEffect(() => {
  //   let theme = document.querySelector('.theme');
  //   let current = theme ?  theme.classList[1] : "";
  //   setCurrentTheme(current)
  // })

  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);

  const reloadToggle = () => {
    reloadNow ? setReloadNow(false) : setReloadNow(true);
  }

  useEffect(() => {
    loadAllProducts();
  }, []);
  
  useEffect(() => {
    loadAllProducts();
  }, [currentPage, reloadNow]);

  const loadAllProducts = () => {
    getAllProducts(currentPage).then((res) => {
      if (res.error) {
        setError(res.error);
      } else {
        setProducts(res);
      }
    });
  };

  const [theme, setTheme] = useState(localStorage.getItem('theme') ? localStorage.getItem('theme') : 'dark')

  const handleClick = (e) => {
    if(e.target.id == 'dark'){
      localStorage.setItem('theme', 'dark')
      setTheme('dark')
    }else{
      localStorage.setItem('theme', 'light')
      setTheme('light')
    }
  }

  return (
    <>
      <Base theme={theme} handleClick={handleClick}>
      
      <div className="product-section">
        <h1 className="text-center brand-heading" style={theme == 'light' ? { color: "var(--footer-clr)"}: { color: "var(--text-white)"}}>Welcome To <span className="brand">Bookify</span></h1>
          <p className="m-2 text-center text-muted" style={theme == 'light' ? {color: "var(--footer-clr)"} : {color: "var(--text-white)"}}>A Place to Start your Own Nerdy Journey...</p>
      {products.length === 0 ? 
        <h2 className="text-center m-4 bg-danger" style={{color: theme == 'light' ? "var(--footer-clr)" : "var(--text-white)", margin: "20px 10%"}}>No Books Found... <button className="btn btn-primary m-2 p-3" onClick={reloadToggle} style={{color: "#000"}} > <i class="fa fa-arrow-left" style={{fontSize: "50px"}} aria-hidden="true"></i></button></h2> 
        : 
         <> 
         <h2 className="d-flex justify-content-between" style={{color: theme == 'light' ? "var(--footer-clr)" : "var(--text-white)", margin: "20px 10%"}}>All Available Books... <SearchBar setProducts={setProducts} /></h2>
          <div className="home-section">
            {products.map((product, index) => {
              return <Card theme={theme} key={index} reload={false} product={product} addToCart={true} />;
            })}
          </div>
          </> }
          </div>
      <Pagination setCurrentPage={setCurrentPage} currentPage={currentPage} />
      </Base>
    </>
  );
}
