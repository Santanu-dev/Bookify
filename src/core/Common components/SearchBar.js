import React, { useState } from 'react'
import './Search.css'
import { getSearchedProducts } from './SearchHelper';

const SearchBar = ({ setProducts, setSearchClick }) => {

  const [searchText, setSearchText] = useState("");

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  }

  const handleClick = (event) => {
    event.preventDefault();
    getSearchedProducts(searchText).then(res => {
      setSearchClick(true);
      setProducts(res);
    })
  }

  return (
    <>
    <div className="searc-container">
        <form className="searchContainer">
          <input className='searchInput' type="text" placeholder="Search Book..." name="search" onChange={handleSearchChange} />
          <button className='btn btn-success btn-margin' type="submit" onClick={handleClick}><i className="fa fa-search" aria-hidden="true"></i></button>
        </form>
    </div>
    </>
  )
}

export default SearchBar