import React, { Component } from 'react';
import './App.css';
import SearchBar from './Components/searchbar';

import RecipeList from './Components/recipeList';
import { Row } from 'react-materialize';
class App extends Component {
  constructor(props) {
    super(props);

    this.state = { recipes: [] };
    this.text = { pölse: 'korven', ärtor: 'ättor' };
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

export default App;
