import React, { Component } from 'react';
import { Input, Icon } from 'react-materialize';

const $ = window.$;
class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = { term: '' };
  }

  componentDidMount() {
    
  }

  render() {
    return (
      <div>
        <Input
          autoComplete="off"
          type="text"
          label={this.props.placeholder}
          value={this.state.term}
          onChange={event => this.onInputChange(event.target.value)}
          s={12}
          m={12}
          l={12}>
          <Icon>fastfood</Icon>
        </Input>
      </div>
    );
  }

  onInputChange(term) {
    this.setState({ term });
    this.props.onSearchTermChange(term);
  }
}

export default SearchBar;
