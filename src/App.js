import React, { Component } from 'react';
import './App.css';
import SearchBar from './Components/searchbar';

import RecipeList from './Components/recipeList';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { recipes: [] };

    this.recipeSearch('');

  }

  recipeSearch(term){
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
        <SearchBar />
        <RecipeList recipes={this.state.recipes} />
        
      </div>
    );
  }
}

export default App;
