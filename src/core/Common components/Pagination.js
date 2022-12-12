import React, { useEffect, useState } from "react";
import { getTotalBooksInDB } from "./PageinationHelper";

const Pagination = ({setCurrentPage, currentPage}) => {

  const [noOfBooksInDB, setNoOfBookInDB] = useState(0);
  const booksPerPage = 12;

  let reqPages = parseInt(noOfBooksInDB / booksPerPage);
  let pageArr = []

  for (let i = 0; i <= reqPages; i++) {
    pageArr.push(i+1);
  }

  const getNoOfooks = () => {
    getTotalBooksInDB().then(res => {
      setNoOfBookInDB(res);
    });
  }

  useEffect(() => {
    getNoOfooks();
  }, [])

  return (
    <>
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
          <li className={currentPage === 0 ? "page-item disabled" : "page-item"}>
            <a className="page-link" tabIndex="-1" href="#" onClick={() => {setCurrentPage(currentPage <= 0 ? currentPage : currentPage-1)}}>
              Previous
            </a>
          </li>
          {pageArr.map((p, index) => {
            return (
              <li key={index} className="page-item" onClick={() => {setCurrentPage(p === 0 ? 0 : p-1)}}>
                <a className="page-link" href="#">
                  {p}
                </a>
              </li>
            )
          })}
          <li className={currentPage === reqPages ? "page-item disabled" : "page-item"} onClick={() => {setCurrentPage(currentPage >= reqPages ? currentPage : currentPage+1)}}>
            <a className="page-link " href="#">
              Next
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Pagination;
