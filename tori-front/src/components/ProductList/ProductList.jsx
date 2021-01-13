import "./ProductList.css";
import Product from "./Product/Product";
import { useEffect, useState } from "react";
import productService from "../../services/productService";

const Pagination = ({
  page,
  setPage,
  searchWord,
  searchLocation,
  searchClick,
}) => {
  const [totalItems, setTotalItems] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  useEffect(() => {
    const getPages = async () => {
      console.log("getting pages");
      const response = await productService.getPages(
        searchWord,
        searchLocation
      );
      console.log(response);
      if (response.count) {
        console.log("SETTING RESPONSE COUNT")
        setTotalItems(response.count);
        setTotalPages(parseInt(response.count / itemsPerPage) + 1);
      }
    };
    getPages();
  }, [searchClick]);
  const handleMoveNext = () => {
    if (page === totalPages) return;
    setPage(page + 1);
  };
  const handleMovePrev = () => {
    if (page > 1) setPage(page - 1);
    return;
  };
  const handleMoveFirst = () => {
    console.log("click on first");
    setPage(1);
  };
  const handleMoveLast = () => {
    console.log("move to last");
    setPage(totalPages);
  };

  return (
    <div className="Pagination-container">
      <div className="Pagination-number-container">
        <p className="Pagination-total-count">Tuotteiden maara: {totalItems}</p>
        <p className="Pagination-total-count">Sivumaara: {totalPages}</p>
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
            value={page}
            onChange={(e) => setPage(e.target.value)}
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
    </div>
  );
};
const ProductList = ({ searchClick, searchWord, searchLocation }) => {
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);

  console.log("page in productlist", page);
  useEffect(() => {
    console.log("searching now");
    const getList = async (e) => {
      let products;
      console.log("searchquery in ", searchWord);
      if (!searchWord && searchWord === "Kaikki") {
        products = await productService.getAll();
      } else {
        products = await productService.getAll(
          searchWord,
          searchLocation,
          page
        );
      }
      if (!products) {
        console.log("products not found");
      }
      console.log(products);
      setList(products);
    };
    getList();
  }, [searchClick, page]);

  return (
    <>
      <Pagination
        page={page}
        setPage={setPage}
        searchWord={searchWord}
        searchLocation={searchLocation}
        searchClick={searchClick}
      />
      <div className="Container">
        {!list ? null : (
          <div className="Containerlist">
            {list.map((p) => (
              <Product product={p} key={p.id} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default ProductList;
