import React, { Component } from "react";
import "./App.css";
// import { FormErrors } from "./FormErrors";
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
        fieldValidationErrors.email = emailValid
          ? ""
          : "Invalid Email Address format with Example: · example.com (no @ character)";
        break;
      case "password":
        passwordValid = value.length >= 6;
        fieldValidationErrors.password = passwordValid
          ? ""
          : " at least a value of 6";
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
    return error.length === 0 ? "" : "has-error mt-2  text-pink-600 text-sm";
  }

  contactSubmit(e) {
    // e.preventDefault();
    alert("Form submitted");
  }

  render() {
    const customStyles = {
      marginTop: "200px",
      marginLeft: "auto",
      marginRight: "auto",
      width: "40em",
    };

    return (
      <form className="demoForm">
        <div
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col"
          style={customStyles}
        >
          <div
            className={`form-group mb-6 ${this.errorClass(
              this.state.formErrors.email
            )}`}
          >
            <label class="block">
              <span class="block text-sm font-medium text-slate-700">
                Email
              </span>
              <input
                type="email"
                className="peer px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1 invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 disabled:shadow-none"
                name="email"
                placeholder="Email"
                value={this.state.email}
                onChange={this.handleUserInput}
              />
            </label>
            <span className="error">{this.state.formErrors["email"]}</span>
          </div>
          <div
            className={`form-group ${this.errorClass(
              this.state.formErrors.password
            )}`}
          >
            <label class="block">
              <span class="block text-sm font-medium text-slate-700">
                Password
              </span>
              <input
                type="password"
                className="peer px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1 invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 disabled:shadow-none"
                name="password"
                placeholder="Password"
                value={this.state.password}
                onChange={this.handleUserInput}
              />
            </label>
            <span className="error">{this.state.formErrors["password"]}</span>
          </div>
          <br />
          <div className="flex items-center justify-between">
            <button
              type="button"
              class="px-8 py-3 text-white bg-blue-600 rounded focus:outline-none disabled:opacity-25"
              disabled={!this.state.formValid}
              onClick={this.contactSubmit}
            >
              Sign Up
            </button>
          </div>
        </div>
      </form>
    );
  }
}

export default App;
