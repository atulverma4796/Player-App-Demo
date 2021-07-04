import React, { Component } from "react";
import { Link } from "react-router-dom";
import queryString from "query-string";
import LeftPanelRadio from "./leftPanelRadio";
import LeftPanelCB from "./leftPanelCB";
import axios from "axios";
class StarsT2 extends Component {
  state = {
    player: [],
    contries: [
      "India",
      "Australia",
      "Portugal",
      "Argentina",
      "Brazil",
      "France",
    ],
  };
  async fetchData() {
    let queryParam = queryString.parse(this.props.location.search);
    let searchStr = this.makeSearchString(queryParam);
    let { value } = this.props.match.params;
    let str = "";
    if (value == "All") {
      str = `http://localhost:2410/sporticons/stars?${searchStr}`;
    } else if (value == "Cricket") {
      str = `http://localhost:2410/sporticons/stars/${value}?${searchStr}`;
    } else if (value == "Football") {
      str = `http://localhost:2410/sporticons/stars/${value}?${searchStr}`;
    }
    let response = await axios.get(str);
    let { data } = response;
    this.setState({ player: data });
  }
  componentDidMount() {
    this.fetchData();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) this.fetchData();
  }

  handlePage = (incr) => {
    let queryParam = queryString.parse(this.props.location.search);
    let { page = "1" } = queryParam;
    let newPage = +page + incr;
    queryParam.page = newPage;
    let { value } = this.props.match.params;
    this.callURL(`/stars/${value}`, queryParam);
  };
  callURL = (url, option) => {
    let searchStr = this.makeSearchString(option);
    this.props.history.push({
      pathname: url,
      search: searchStr,
    });
  };
  handleChange = (option) => {
    let { value } = this.props.match.params;
    option.page = "1";
    this.callURL(`/stars/${value}`, option);
  };
  makeSearchString = (option) => {
    let { page, countries } = option;
    let searchStr = "";
    searchStr = this.addToQuery(searchStr, "page", page);
    searchStr = this.addToQuery(searchStr, "countries", countries);
    return searchStr;
  };
  addToQuery = (str, paramName, paramVal) =>
    paramVal
      ? str
        ? `${str}&${paramName}=${paramVal}`
        : `${paramName}=${paramVal}`
      : str;
  render() {
    const { pageInfo = {}, stars = [] } = this.state.player;
    const { contries } = this.state;
    const { pageNumber, totalItemCount, numOfItems, numberOfPages } = pageInfo;
    const queryParam = queryString.parse(this.props.location.search);
    let player1 = stars;
    return (
      <div className="container my-4">
        <div className="row">
          <div className="col-3 bg-light">
            Left Comp!
            <br />
            <h6>Options</h6>
            <hr />
            <LeftPanelCB
              option={queryParam}
              cont={contries}
              onOptionChange={this.handleChange}
            />
          </div>
          <div className="col-9">
            <div className="row bg-info text-dark">
              <div className="col-4">Name</div>
              <div className="col-4">Country</div>
              <div className="col-4">Sport</div>
            </div>
            {player1.map((v, index) => (
              <div className="row" key={v.id}>
                <div className="col-4 border">
                  <Link to={`/details/${v.id}`}>{v.name}</Link>
                </div>
                <div className="col-4 border">{v.country}</div>
                <div className="col-4 border">{v.sport}</div>
              </div>
            ))}
            <div className="row">
              <div className="col-2">
                {pageNumber > 1 ? (
                  <button
                    className="btn btn-primary m-2"
                    onClick={() => this.handlePage(-1)}
                  >
                    Prev
                  </button>
                ) : (
                  ""
                )}
              </div>
              <div className="col-8"></div>
              <div className="col-2">
                {numOfItems < 5 ? (
                  ""
                ) : (
                  <button
                    className="btn btn-primary"
                    onClick={() => this.handlePage(1)}
                  >
                    Next
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default StarsT2;
