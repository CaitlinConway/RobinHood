import React from 'react'
import { connect } from "react-redux";
import { getSearch } from "../store/stockReducer";

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
    }
  };


  updateSearch = (e) => {
    this.setState({ search: e.target.value });
    const searchList = document.getElementById("search-list");
    if (e.target.value) {
    searchList.removeAttribute("hidden");
      for (let i = 0; i < tickers.length; i++) {
      if (tickers[i]) {
        console.log(tickers[i].charAt(0));
      }
    }
    } else {
      searchList.setAttribute("hidden", "true")
    }
  };

  onSearch = (e) => {
    if (e.key === 'Enter') {
    console.log(this.state.search)
    }
  }

  render() {
    const { search } = this.state;

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
          <section id="section-1">Test #1</section>
          <section id="section-2">Test #2</section>
        </div>
      </div>
    );
  }
}

// const tickers = [{ticker: "AAPL", name: "Apple"}, {ticker: "AMZN", name: "AMAZON"}]
const tickers = ["Apple", "Cat"]

const mapStateToProps = (state) => ({
  search: state.search,
});

const mapDispatchToProps = (dispatch) => {
  return {
    search: (search) => dispatch(getSearch(search)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar)
