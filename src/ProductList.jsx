import React, { useState, useEffect } from "react";
import "./ProductList.css";
import CartItem from "./CartItem";
import CartSVG from "./Cart_SVG";
import { PLANT_LIST_ARRAY } from "./plantList";
import { styleObjUl, styleA, styleObj } from "./ProductList_styles";
import { addItem } from "./CartSlice";
import { useDispatch } from "react-redux";

export default function ProductList() {
  const [showCart, setShowCart] = useState(false);
  const [showPlants, setShowPlants] = useState(false); // State to control the visibility of the About Us page
  //addedToCart will be an object listing all plant names and TRUE/FALSE,
  // to indicate wether they're added to Cart or not
  const [addedToCart, setAddedToCart] = useState({});

  const dispatch = useDispatch(); //copied from conference.jsx

  //debug messages
  //console.log(addedToCart);
  //end of debug

  const handleCartClick = (e) => {
    e.preventDefault();
    setShowCart(true); // Set showCart to true when cart icon is clicked
  };
  const handlePlantsClick = (e) => {
    e.preventDefault();
    setShowPlants(true); // Set showAboutUs to true when "About Us" link is clicked
    setShowCart(false); // Hide the cart when navigating to About Us
  };

  const handleContinueShopping = (e, cart) => {
    console.log("Continue Shopping - Current Cart");
    console.log(cart);
    e.preventDefault();
    setShowCart(false);
  };

  const handleAddToCart = (product) => {
    dispatch(addItem(product));
    setAddedToCart((prevState) => ({
      ...prevState,
      [product.name]: true, // Set the product name as key and value as true to indicate it's added to cart
    }));
  };

  function enableAddToCart(ckPlantNm) {
    let result = addedToCart.hasOwnProperty(ckPlantNm); //cks object for given plant name
    return result ? "product-button added-to-cart" : "product-button";
  }

  const createPlantList = function (plantList, category) {
    return plantList.map((plantItem, plantIndex) => (
      <div className="product-card" key={plantIndex}>
        <img className="product-image" src={plantItem.image} />
        <div className="product-title">{plantItem.name}</div>
        <div className="product-description">{plantItem.description}</div>
        <div className="product-price">{plantItem.cost}</div>
        <button
          className={enableAddToCart(plantItem.name)}
          onClick={() => handleAddToCart(plantItem)}
        >
          Add to Cart
        </button>
      </div>
    ));
  };

  function getCount_AddedPlant() {
    console.log(addedToCart);
    return Object.values(addedToCart).reduce(
      (plantCount, currentPlant) => (currentPlant ? ++plantCount : plantCount),
      0
    );
  }

  return (
    <div>
      <div className="navbar" style={styleObj}>
        <div className="tag">
          <div className="luxury">
            <img
              src="https://cdn.pixabay.com/photo/2020/08/05/13/12/eco-5465432_1280.png"
              alt=""
            />
            <a href="/" style={{ textDecoration: "none" }}>
              <div>
                <h3 style={{ color: "white" }}>Rebecca's Nursery</h3>
                <i style={{ color: "white" }}>
                  Let our plants will make sweet music in your home!!
                </i>
              </div>
            </a>
          </div>
        </div>
        <div style={styleObjUl}>
          <div>
            {" "}
            <a href="#" onClick={(e) => handlePlantsClick(e)} style={styleA}>
              Plants
            </a>
          </div>
          <div>
            {" "}
            <a href="#" onClick={(e) => handleCartClick(e)} style={styleA}>
              <h1 className="cart">
                <CartSVG itemCount={getCount_AddedPlant()} />
              </h1>
            </a>
          </div>
        </div>
      </div>
      {!showCart ? (
        <div className="product-grid">
          {
            PLANT_LIST_ARRAY.map((item, index) => (
              <div key={index}>
                <h2>
                  <div>{item.category}</div>
                </h2>
                <div className="product-list">
                  {createPlantList(item.plants, item.category)}
                </div>
              </div>
            )) //end of plant category
          }
        </div> //end of products-grid
      ) : (
        <div>
          <CartItem onClick={handleContinueShopping} />
        </div>
      )}
    </div>
  );
}
