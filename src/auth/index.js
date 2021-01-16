import { API } from "../config";

export const signup = (user) => {
  console.log(user.name, user.email, user.password); //pulls values from desconstructed values.
  return fetch(`${API}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json", //we are saying we accept JSON data (our API's JSON) response, we are saying we accept JSON data.
      "Content-Type": "application/json", //we are telling the backend what content type we are sending w the POST req.
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      // console.log(response.json());
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const signin = (user) => {
  return fetch(`${API}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json", //we are saying we accept JSON data (our API's JSON) response, we are saying we accept JSON data.
      "Content-Type": "application/json", //we are telling the backend what content type we are sending w the POST req.
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      // console.log(response.json());
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const authenticate = (data, next) => {
  console.log(window);
  if (window) {
    //(typeof window !== "undefined") { LEC before 78?
    localStorage.setItem("jwt", JSON.stringify(data));
    next();
  }
};

export const signout = next => {
  if (window) {
    localStorage.removeItem("jwt");
    next();
    return fetch(`${API}/signout`, {
      method: "GET",
    })
      .then((response) => {
        console.log("signout", response);
      })
      .catch((err) => console.log(err));
  }
};

export const isAuthenticated = () => {
  if (typeof window == "undefined") {
    return false;
  }
  if (localStorage.getItem("jwt")) {
    return JSON.parse(localStorage.getItem("jwt"));
  } else {
    return false;
  }
};