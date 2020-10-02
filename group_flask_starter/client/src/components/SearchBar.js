import React from 'react'
import { connect } from "react-redux";
import { getSearch } from "../store/stockReducer";
import { Link } from 'react-router-dom';
import { stockArray } from '../stockarray'

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
    console.log(stockArray)
    if (e.target.value) {
      searchList.removeAttribute("hidden");
      searchList.style.display = "flex";
      name = []

      stockArray.forEach(ticker => {
        for (const key in ticker) {
          const checkStr = e.target.value;
          if ((key === "Name" || key === "Symbol") && (ticker[key].toLowerCase().startsWith(checkStr.toLowerCase())) && !(name.includes(ticker)) ) {
            name.push(ticker);
          }
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
    const pagePath = () => {
      let pageData = [];
      let i = 0;
        name.map(array => {
      if (!(window.location.href.includes("stocks")) && i < 6) {
        pageData.push(
        <>
        <span className="search-ul-1"><Link to={`stocks/${array.Symbol}`}>{array.Symbol}</Link></span>
        <span className="search-ul-2"><Link to={`stocks/${array.Symbol}`}>{array.Name}</Link></span>
        </>
        );
        i++;
      } else if (window.location.href.includes("stocks") && i < 6) {
        pageData.push(
        <>
        <span className="search-ul-1"><Link to={`${array.Symbol}`}>{array.Symbol}</Link></span>
        <span className="search-ul-2"><Link to={`${array.Symbol}`}>{array.Name}</Link></span>
        </>
        );
        i++;
      }
      return null;
      });
      return pageData;
    };

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
          {/* <section id="section-1">{name.map(array => (<ul className="search-ul" key="stock"><Link to={`${pagePath()}/${array.ticker}`}>{array.ticker}</Link></ul>))}</section> */}
          <section id="section-1">{pagePath()}</section>
          {/* <section id="section-2">{pagePath()}</section> */}

        </div>
      </div>
    );
  }
}


let name = []

const mapStateToProps = (state) => ({
  search: state.search,
});

const mapDispatchToProps = (dispatch) => {
  return {
    search: (search) => dispatch(getSearch(search)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar)
