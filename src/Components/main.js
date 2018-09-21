import React, { Component } from 'react';
import '../App.css';
import SearchBar from './searchbar';

import RecipeList from './recipeList';
import { Row, Button, Icon } from 'react-materialize';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = { recipes: [] };
    this.recipeSearch('');
  }

  recipeSearch(term) {
    fetch(`http://localhost:3000/allarecept/${term}`)
      .then(response => response.json())
      .then(recipes => {
        this.setState({ recipes });
        console.log(recipes);
      });
  }

  render() {
    return (
      <div className="App">
        <h1>ReceptBolaget</h1>
        <Button waves='purple' className="red" node='a' href="/admin">Admins only<Icon right>do_not_disturb_alt</Icon></Button>
        <SearchBar
          onSearchTermChange={term => {
            this.recipeSearch(term);
          }}
        />
        <Row>
          <RecipeList recipes={this.state.recipes} text={this.text} />
        </Row>
      </div>
    );
  }
}

export default Main;
