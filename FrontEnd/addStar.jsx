import axios from "axios";
import React, { Component } from "react";
class AddStar extends Component {
  state = {
    star: { name: "", dob: "", info: "", country: "", sport: "" },
    contries: [
      "India",
      "Australia",
      "Portugal",
      "Argentina",
      "Brazil",
      "France",
    ],
    genre: ["Cricket", "Football"],
    error: {},
  };
  handleChange = (e) => {
    const { currentTarget: input } = e;
    let s1 = { ...this.state };
    s1.star[input.name] = input.value;
    this.handleValidate(e);
    this.setState(s1);
  };
  postForm(url, obj) {
    let response = axios.post(url, obj);
    this.props.history.push("/stars/All");
  }
  handleSubmit = (e) => {
    e.preventDefault();
    let errors = this.validateForm();
    if (this.isValid(errors)) {
      this.postForm("http://localhost:2410/sporticons/star", this.state.star);
    } else {
      let s1 = { ...this.state };
      s1.error = errors;
      this.setState(s1);
    }
  };
  handleValidate = (e) => {
    const { currentTarget: input } = e;
    let s1 = { ...this.state };
    switch (input.name) {
      case "name":
        s1.error.name = this.validateName(input.value);
        break;
      case "dob":
        s1.error.dob = this.validateDob(input.value);
        break;
      case "info":
        s1.error.info = this.validateInfo(input.value);
        break;
      case "country":
        s1.error.country = this.validateCountry(input.value);
        break;
      case "sport":
        s1.error.sport = this.validateSport(input.value);
      default:
        break;
    }
  };
  isValid = (errors) => {
    let keys = Object.keys(errors);
    let count = keys.reduce((acc, curr) => (errors[curr] ? acc + 1 : acc), 0);
    return count == 0;
  };
  validateForm = () => {
    const { name, dob, info, country, sport } = this.state.star;
    let errors = {};
    errors.name = this.validateName(name);
    errors.dob = this.validateDob(dob);
    errors.info = this.validateInfo(info);
    errors.country = this.validateCountry(country);
    errors.sport = this.validateSport(sport);
    return errors;
  };
  validateName = (name) => (!name ? "Please Enter Name Of The Player" : "");
  validateDob = (dob) => (!dob ? "Please Enter Date Of Birth" : "");
  validateInfo = (info) =>
    !info ? "Please Enter Information About Player" : "";
  validateCountry = (country) =>
    !country ? "Please Select Country of the Player" : "";
  validateSport = (sport) =>
    !sport ? "Please Select Sport of the Player" : "";

  render() {
    const { name, dob, info, country, sport } = this.state.star;
    const { contries, genre, error } = this.state;
    return (
      <div className="container">
        <h3 className="text-center my-2">New Sport Star</h3>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={this.handleChange}
            onBlur={this.handleValidate}
            className="form-control"
          />
          {error.name ? <span className="text-danger">{error.name}</span> : ""}
        </div>
        <div className="form-group">
          <label>Date of Birth</label>
          <input
            type="text"
            name="dob"
            value={dob}
            onChange={this.handleChange}
            onBlur={this.handleValidate}
            className="form-control"
          />
          {error.dob ? <span className="text-danger">{error.dob}</span> : ""}
        </div>
        <div className="form-group">
          <label>Info</label>
          <input
            type="text"
            name="info"
            value={info}
            onChange={this.handleChange}
            onBlur={this.handleValidate}
            className="form-control"
          />
          {error.info ? <span className="text-danger">{error.info}</span> : ""}
        </div>
        <select
          className="form-control"
          name="country"
          value={country}
          onBlur={this.handleValidate}
          onChange={this.handleChange}
        >
          <option value="">Select Country</option>
          {contries.map((v) => (
            <option key={v}>{v}</option>
          ))}
        </select>
        {error.country ? (
          <span className="text-danger">{error.country}</span>
        ) : (
          ""
        )}
        <select
          className="form-control"
          name="sport"
          value={sport}
          onBlur={this.handleValidate}
          onChange={this.handleChange}
        >
          <option value="">Select Genre</option>
          {genre.map((v) => (
            <option key={v}>{v}</option>
          ))}
        </select>
        {error.sport ? <span className="text-danger">{error.sport}</span> : ""}
        <br />
        <button
          className="btn btn-primary m-2"
          onClick={this.handleSubmit}
          disabled={!this.isValidForm()}
        >
          Create
        </button>
      </div>
    );
  }
  isValidForm = () => {
    let errors = this.validateForm();
    return this.isValid(errors);
  };
}
export default AddStar;
