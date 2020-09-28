import React from 'react'
export default class SearchBar extends React.Component {
  state = {
    search: '',
  };

  updateSearch = (search) => {
    this.setState({ search });
  };

  render() {
    const { search } = this.state;

    return (
      <input className="search-input"
        placeholder="Search"
        onChangeText={this.updateSearch}
        value={search}
      />
    );
  }
}
