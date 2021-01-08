import React from "react";
import { Redirect } from "react-router-dom";
import Joi, { errors } from "joi-browser";
import Form from "./common/form";
import auth, { getCurrentUser } from "../services/authService";

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
  };

  // Form validation schema
  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      await auth.login(data.username, data.password);

      // Redirect the user to the page they were previously at after logging in (if location state is defined)
      const { state } = this.props.location;
      window.location = state ? state.from.pathname : "/";
      //this.props.history.push("/"); // Redirect the user to the home page, but does not cause a full refresh required after getting a jwt
      // window.location = "/"; // Full reload of app
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data; // Display the error we get from the server
        this.setState({ errors });
      }
    }
  };

  render() {
    // If user is already logged in, no need to have them to go the /login page again
    if (getCurrentUser()) return <Redirect to="/" />;
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
