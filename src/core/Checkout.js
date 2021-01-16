import React, { useState, useEffect } from "react";
import { getBraintreeClientToken, getProducts } from "./apiCore";
import Layout from "./Layout";
import Card from "./Card";
import { isAuthenticated } from "../auth/index";
import { Link } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";

const Checkout = ({ products }) => {
  const [data, setData] = useState({
    success: false,
    clientToken: null,
    error: "",
    instance: {},
    address: "",
  });

  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;

  const getToken = (userId, token) => {
    getBraintreeClientToken(userId, token).then((data) => {
      if (data.error) {
        setData({ ...data, error: data.error });
      } else {
        setData({ ...data, clientToken: data.clientToken });
      }
    });
  };

  useEffect(() => {
    getToken(userId, token);
  }, []);

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

  const showDropIn = () => (
    <div>
      {data.clientToken !== null && product.length > 0 ? (
        <div>
          <DropIn
            options={{
              authorization: data.clientToken,
            }}
            onInstance={(instance) => (data.instance = instance)}
          ></DropIn>
        </div>
      ) : null}
    </div>
  );

  return (
    <div>
      {JSON.stringify(products)}
      <h2>Total: ${getTotal()}</h2>

      {showCheckout()}
    </div>
  );
};

export default Checkout;
