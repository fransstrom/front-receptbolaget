import React, { Component } from 'react';
import {Input} from 'react-materialize';
class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = { term: '' };
  }

  render() {
    return (
     
        <Input  label={this.props.placeholder}
          value={this.state.term}
          onChange={event => this.onInputChange(event.target.value)}  s={12} m={12} l={12}></Input>
       
   
    );
  }

  onInputChange(term) {
    this.setState({ term });
    this.props.onSearchTermChange(term);
  }
}

export default SearchBar;
