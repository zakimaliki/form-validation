import React, { Component } from "react";
import "./App.css";
import { FormErrors } from "./FormErrors";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      formErrors: { email: "", password: "" },
      emailValid: false,
      passwordValid: false,
      formValid: false,
    };
  }

  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value }, () => {
      this.validateField(name, value);
    });
  };

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;

    switch (fieldName) {
      case "email":
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? "" : " is invalid";
        break;
      case "password":
        passwordValid = value.length >= 6;
        fieldValidationErrors.password = passwordValid ? "" : " is too short";
        break;
      default:
        break;
    }
    this.setState(
      {
        formErrors: fieldValidationErrors,
        emailValid: emailValid,
        passwordValid: passwordValid,
      },
      this.validateForm
    );
  }

  validateForm() {
    this.setState({
      formValid: this.state.emailValid && this.state.passwordValid,
    });
  }

  errorClass(error) {
    return error.length === 0 ? "" : "has-error";
  }

  render() {
    const customStyles = {
      marginTop: "200px",
      marginLeft: "auto",
      marginRight: "auto",
      width: "40em",
    };

    return (
      <div
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col"
        style={customStyles}
      >
        <div className="panel panel-default"></div>
        <div
          className={`form-group mb-6 ${this.errorClass(
            this.state.formErrors.email
          )}`}
        >
          <label
            className="block text-grey-darker text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email address
          </label>
          <input
            type="email"
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
            name="email"
            placeholder="Email"
            value={this.state.email}
            onChange={this.handleUserInput}
          />
        </div>

        <div
          className={`form-group ${this.errorClass(
            this.state.formErrors.password
          )}`}
        >
          <label
            className="block text-grey-darker text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            type="password"
            className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
            name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleUserInput}
          />
        </div>
        <FormErrors className="mb-6" formErrors={this.state.formErrors} />
        <br />
        <div className="flex items-center justify-between">
          <button
            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
            disabled={!this.state.formValid}
          >
            Sign Up
          </button>
        </div>
      </div>
    );
  }
}

export default App;
