import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Login from "./components/Login/Login";
import ProductList from "./components/ProductList/ProductList";
import Searchbar from "./components/Searchbar/Searchbar";
import ProductPage from "./components/ProductPage/ProductPage";
import AddProduct from "./components/AddProduct/AddProduct";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import InputFile from "./components/InputFile/InputFile";
import AddUser from "./components/AddUser/AddUser";

import productService from "./services/productService";
const App = () => {
  const [user, setUser] = useState(null);
  const [logInfo, setLogInfo] = useState(null);
  const [searchLocation, setSearchLocation] = useState("Kaikki");
  const [searchWord, setSearchWord] = useState("");
  const [searchClick, setSearchClick] = useState(null);

  useEffect(() => {
    const getCachedUser = async () => {
      const cachedUser = await localStorage.getItem("loggedInUser");
      const userJson = JSON.parse(cachedUser);
      setUser(userJson);
      if (!userJson) return productService.setToken(null);
      productService.setToken(userJson.token);
    };
    getCachedUser();
  }, [logInfo]);

  console.log("haku lokaatio", searchLocation);
  return (
    <Router>
      <div className="App">
        <Header user={user} setLogInfo={setLogInfo}></Header>
        <Switch>
          <Route path="/products/:id">
            <ProductPage></ProductPage>
          </Route>
          <Route path="/product-list">
            <Searchbar
              searchWord={searchWord}
              setSearchWord={setSearchWord}
              setSearchLocation={setSearchLocation}
              setSearchClick={setSearchClick}
            ></Searchbar>
            <ProductList
              searchWord={searchWord}
              searchLocation={searchLocation}
              searchClick={searchClick}
            ></ProductList>
          </Route>
          <Route path="/add-product">
            <AddProduct user={user}></AddProduct>
          </Route>
          <Route path="/add-user">
            <AddUser></AddUser>
          </Route>
          <Route path="/login">
            <Login setLogInfo={setLogInfo}></Login>
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
