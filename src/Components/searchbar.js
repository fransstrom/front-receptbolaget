import React, { Component } from 'react';

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = { term: '' };
  }

  render() {
    return (
      <div>
        <input
          placeholder="Sök recept"
          value={this.state.term}
          onChange={event => this.onInputChange(event.target.value)}
        />
        <br /> Value of theinput : {this.state.term}
      </div>
    );
  }

  onInputChange(term) {
    this.setState({ term });
    this.props.onSearchTermChange(term);
  }
}

export default SearchBar;
