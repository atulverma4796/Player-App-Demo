import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
export default class StarT2 extends React.Component {
  state = { detail: [] };
  async componentDidMount() {
    let { id } = this.props.match.params;
    let response = await axios.get(
      `http://localhost:2410/sporticons/details/${id}`
    );
    let { data } = response;
    let s1 = { ...this.state };
    s1.detail = data;
    this.setState(s1);
  }
  render() {
    const { detail } = this.state;
    const { details = {} } = detail;
    return (
      <div className="container">
        <h4>{detail.name}</h4>
        <h6>Date of Birth : {details.dob}</h6>
        <h6>Sport : {detail.sport}</h6>
        <h6>Country : {detail.country}</h6>
        <p>
          {details.info}
          <br />
          <Link to={`/stars/All`}>{detail.sport} Star</Link>
        </p>
      </div>
    );
  }
}
