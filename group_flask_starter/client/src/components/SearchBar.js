import React from 'react'
import { connect } from "react-redux";
import { getSearch } from "../store/stockReducer";
import { Link } from 'react-router-dom';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      label: [{ticker: "AMZN", name: "Amazon"}, {ticker: "AAPL", name: "Apple"}, {ticker: "FB", name: "Facebook"}]
    }
  };


  updateSearch = (e) => {
    this.setState({ search: e.target.value });
    const searchList = document.getElementById("search-list");
    if (e.target.value) {
    searchList.removeAttribute("hidden");
    searchList.style.display = "flex";
      name = []
      labels = []
      // tickers.forEach(ticker => {
      //   for (const key in ticker) {
      //     const checkStr = e.target.value;
      //     if (key === "name" && ticker[key].startsWith(checkStr)) {
      //     name.push(ticker[key])
      //     }
      //     if (key === "ticker" && ticker[key].startsWith(checkStr)) {
      //       labels.push(ticker[key])
      //     }
      this.state.label.forEach(ticker => {
        for (const key in ticker) {
          const checkStr = e.target.value;
          if ((key === "name" || key === "ticker") && (ticker[key].startsWith(checkStr)) && !(name.includes(ticker)) ) {
            name.push(ticker);
          }
          // if (key === "ticker" && ticker[key].startsWith(checkStr)) {
          //   labels.push(ticker[key])
          // }
      }
      });
    } else {
      searchList.setAttribute("hidden", "true")
      searchList.style.display = "none";
    }
  };

  onSearch = (e) => {
    if (e.key === 'Enter') {
    console.log(this.state.search)
    }
  }

  render() {
    const { search } = this.state;
    const pagePath = {
      pathname: "/test",
      key: Math.random(),
    }

    return (
      <div className="search-bar-container">
        <div className="search-bar">
          <input
            type="text"
            className="search-input"
            placeholder="Search"
            onChange={this.updateSearch}
            onKeyPress={this.onSearch}
            value={search}
            />
        </div>
        <div id="search-list" className="search-bar-list" hidden>
          <section id="section-1">{name.map(array => (<ul className="search-ul" key="stock"><Link to={pagePath}>{array.ticker}</Link></ul>))}</section>
          {/* <section id="section-1">{name.map(stock => (<ul key={stock}><a href={`stocks/${stock}`}>{stock}</a></ul>))}</section> */}
          <section id="section-1">{name.map(array => (<ul className="search-ul" key="stock"><Link to={`stocks/${array.ticker}`}>{array.name}</Link></ul>))}</section>
          {/* <section id="section-2">{labels.map(stock => (<ul key={stock}><a href={`stocks/${stock}`}>{stock}</a></ul>))}</section> */}
        </div>
      </div>
    );
  }
}


let name = []
let labels = []

const tickers = [{ticker: "AMZN", name: "Amazon"}, {ticker: "AAPL", name: "Apple"}, {ticker: "FB", name: "Facebook"}, {ticker: "F", name: "Ford"}, {ticker: "GOOG", name: "Google"}]

const mapStateToProps = (state) => ({
  search: state.search,
});

const mapDispatchToProps = (dispatch) => {
  return {
    search: (search) => dispatch(getSearch(search)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar)
