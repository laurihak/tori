import { useEffect, useState } from "react";

import "./Pagination.css";

import productService from "../../../services/productService";

const Pagination = ({ page, setPage, filters }) => {
  const [totalItems, setTotalItems] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [inputPage, setInputPage] = useState("1");

  useEffect(() => {
    const getPages = async () => {
      const response = await productService.getPages(filters);
      if (!response.count) return;
      setTotalItems(response.count);
      setTotalPages(Math.ceil(response.count / 20));
      setPage(1);
      setInputPage(1);
      return;
    };
    getPages();
  }, [filters, setPage]);
  const handleMoveNext = () => {
    if (page === totalPages) return;
    setInputPage(page + 1);
    setPage(page + 1);
  };
  const handleMovePrev = () => {
    if (page < 2) return;
    setPage(page - 1);
    setInputPage(page - 1);
    return;
  };
  const handleMoveFirst = () => {
    setPage(1);
    setInputPage(1);
  };
  const handleMoveLast = () => {
    setPage(totalPages);
    setInputPage(totalPages);
  };

  return (
    <div className="Pagination-container">
      <div className="Pagination-number-container">
        <p className="Pagination-total-count">Tuotteiden määrä: {totalItems}</p>
        <p className="Pagination-total-count">Sivumäärä: {totalPages}</p>
      </div>
      <ul className="Pagination">
        <li
          aria-label="First"
          className={"Pagination-item"}
          onClick={handleMoveFirst}
        >
          First
        </li>
        <li
          aria-label="Previous"
          className={"Pagination-item"}
          onClick={handleMovePrev}
        >
          &laquo;
        </li>
        <div>
          <input
            type="text"
            value={inputPage}
            onInput={(e) => {
              setInputPage(e.target.value);
            }}
            className="Pagination-current-page"
          ></input>
        </div>
        <li
          aria-label="Next"
          className={"Pagination-item"}
          onClick={handleMoveNext}
        >
          &raquo;
        </li>
        <li
          aria-label="Last"
          className={"Pagination-item"}
          onClick={handleMoveLast}
        >
          Last
        </li>
      </ul>
      <div className={"Pagination-search-container"}>
        <button
          className={"Pagination-search-button"}
          onClick={() => {
            if (inputPage > 0 && inputPage <= totalPages) setPage(inputPage);
            else {
              window.alert("Sivua ei löydy");
            }
          }}
        >
          Hae sivu
        </button>
      </div>
    </div>
  );
};

export default Pagination;
