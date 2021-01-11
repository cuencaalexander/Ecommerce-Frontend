import React, { useState, useEffect } from "react";
import { getProducts } from "./apiCore";
import Layout from "./Layout";
import Card from "./Card";
import { isAuthenticated } from "../auth/index";
import { Link } from "react-router-dom";

const Checkout = ({ products }) => {
  const getTotal = () => {
    let total = 0;
    products.map((product) => {
      total = total + product.count * product.price;
    });
    return total;
    // return products.reduce((currentValue, nextValue) => {
    //   return currentValue + nextValue.count * nextValue.price;
    // });
  };

  const showCheckout = () => {
    return isAuthenticated() ? (
      <button className="btn btn-success">Checkout</button>
    ) : (
      <Link to="/signin">
        <button className="btn btn-primary">Sign in to checkout</button>
      </Link>
    );
  };

  return (
    <div>
      {JSON.stringify(products)}
      <h2>Total: ${getTotal()}</h2>

      {showCheckout()}
    </div>
  );
};

export default Checkout;
