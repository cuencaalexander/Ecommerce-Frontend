import React, { useState } from "react";
import Layout from "../core/Layout";
import { Link } from "react-router-dom";
import { signup } from "../auth";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });

  const { name, email, password, success, error } = values; //desconstructed values.

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false }); //why do we need this?
    signup({ name, email, password }).then((data) => {
      // console.log(data);
      if (data.error) {
        setValues({ ...values, error: data.error, success: false });
      } else {
        setValues({
          ...values,
          name: "",
          email: "",
          password: "",
          error: "",
          success: true, //we can use this to make the success message to the user
        });
      }
    });
  };

  const signUpForm = () => (
    <form>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input
          type="text"
          className="form-control"
          onChange={handleChange("name")} //after handleChange() changes the state, whatever are thevalues in the state will be used below in 'value={name}'
          value={name} //now React controls the value
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Email</label>
        <input
          type="email"
          className="form-control"
          onChange={handleChange("email")} //this method updates the state,
          value={email} //value of email comes from the destructured 'email' value in the state, after it was update it by the above handleChange method
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Password</label>
        <input
          type="password"
          className="form-control"
          onChange={handleChange("password")}
          value={password}
        />
      </div>
      <button onClick={clickSubmit} className="btn btn-primary">
        Submit
      </button>
    </form>
  );

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }} //error pulled from the destructured state
    >
      {error}
    </div>
  );

  const showSuccess = () => (
    <div
      className="alert alert-info"
      style={{ display: success ? "" : "none" }}
    >
      New account is created. Please <Link to="/signin">Signin</Link>.
    </div>
  );

  return (
    <Layout
      title="Signup"
      description="Signup to Node React E-commerce App"
      className="container col-md-8 offset-md-2"
    >
      {showSuccess()}
      {showError()}
      {signUpForm()}
      {JSON.stringify(values)}
    </Layout>
  );
};

export default Signup;
