import React from 'react'
import { connect } from "react-redux";
import { getSearch } from "../store/stockReducer";
import { Link, NavLink, Redirect } from 'react-router-dom';
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
        <div className="search-ul">
         <div className="search-ul-1"><NavLink to={`stocks/${array.Symbol}`}>{array.Symbol}</NavLink></div>
         <div className="search-ul-2"><NavLink to={`stocks/${array.Symbol}`}>{array.Name}</NavLink></div>
        </div>
        );
        i++;
      } else if (window.location.href.includes("user") && i < 6) {
        pageData.push(
        <div className="search-ul">
         <div className="search-ul-1"><NavLink to={`${array.Symbol}`}>{array.Symbol}</NavLink></div>
         <div className="search-ul-2"><NavLink to={`${array.Symbol}`}>{array.Name}</NavLink></div>
        </div>
        );
        i++;
      } else if (window.location.href.includes("stocks") && i < 6) {
        pageData.push(
        <div className="search-ul">
         <div className="search-ul-1"><NavLink to={`${array.Symbol}`}>{array.Symbol}</NavLink></div>
         <div className="search-ul-2"><NavLink to={`${array.Symbol}`}>{array.Name}</NavLink></div>
        </div>
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
          <div id="section-1">
            <div className="search-list-type">Stocks</div>
            {pagePath()}
          </div>
          <div className="search-list-buttons-header">Lists</div>
          <div className="search-list-buttons">
            <button className="search-list-button">Gotham City</button>
            <button className="search-list-button">The Batcave</button>
            <button className="search-list-button">Arkham Asylum</button>
            <button className="search-list-button">Wayne Manor</button>
            <button className="search-list-button">Crime Alley</button>
            <button className="search-list-button">Ace Chemicals</button>
            <button className="search-list-button">Wayne Tower</button>
            <button className="search-list-button">Iceberg Lounge</button>
            <button className="search-list-button">Hall of Justice</button>
          </div>
        </div>
      </div>
    );
  }
}

// Custom array to hold links.
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
