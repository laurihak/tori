import { useEffect, useState } from "react";

import "./ProductList.css";

import Product from "./Product/Product";
import Pagination from "./Pagination/Pagination";

import productService from "../../services/productService";

const ProductList = ({ filters }) => {
  const [list, setList] = useState(null);
  const [page, setPage] = useState(1);

  console.log("page in productlist", page);

  useEffect(() => {
    const getList = async () => {
      let products;
      console.log("searchquery in ", filters);

      products = await productService.getAll(filters, page);

      if (!products) {
        console.log("products not found");
      }
      console.log(products);
      setList(products);
    };
    console.log("searching now");
    getList();
  }, [filters, page]);

  return (
    <>
      <Pagination page={page} setPage={setPage} filters={filters} />
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
