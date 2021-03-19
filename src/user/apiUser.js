import { API } from "../config";

export const read = (userId, token) => {
  return fetch(`${API}/user/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json", //we are saying the backend API accepts JSON data (our API's JSON) response
      "Content-Type": "application/json", //we are telling the backend what content type we are sending w the POST req.
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const update = (userId, token, user) => {
  return fetch(`${API}/user/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json", //we are saying the backend API accepts JSON data (our API's JSON) response
      "Content-Type": "application/json", //we are telling the backend what content type we are sending w the POST req.
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const updateUser = (user, next) => {
  if (typeof window !== "undefined") {
    if (localStorage.getItem("jwt")) {
      let auth = JSON.parse(localStorage.getItem("jwt"));
      auth.user = user;
      localStorage.setItem("jwt", JSON.stringify(auth));
      next(); //cb
    }
  }
};

export const getPurchaseHistory = (userId, token) => {
  return fetch(`${API}/orders/by/user/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json", //we are saying the backend API accepts JSON data (our API's JSON) response
      "Content-Type": "application/json", //we are telling the backend what content type we are sending w the POST req.
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
