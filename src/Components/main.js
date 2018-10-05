import React, { Component } from 'react';
import '../App.css';
import SearchBar from './searchbar';
import RecipeList from './recipeList';
import _ from 'lodash';
import { Row, Button, Icon, Input } from 'react-materialize';
import AutoCompleteism from './autocomplete';


class Main extends Component {
  constructor(props) {
    super(props);
    this.state = { recipes: [] };
    this.recipeSearch('');

    this.checkBoxes = {
      vegansk: false,
      vegetarisk: false,
      glutenfri: false,
      laktosfri: false
    };
    this.term = '';
    this.filterCat = [];
  }
  recipeSearch(term) {
    fetch(`http://localhost:3000/allarecept/${term}`)
      .then(response => response.json())
      .then(recipes => {
        if (this.filterCat.length > 0) {
          let filter = this.filterCat.sort();
          recipes = recipes.filter(e => {
            let categories = e.category.sort();

            console.log(categories);
            console.log(filter);

            //En variant för filter
            //  let found = categories.some(r => {
            //    return filter.indexOf(r) >= 0;
            //  });

            return _.isEqual(categories, filter);
          });
        }
        this.setState({ recipes });
      });
  }

  render() {
    //Autocompleten funkar bättre utan debounce
    // const recipeSearch = _.debounce(term => {
    //   this.term = term;
    //   this.recipeSearch(term);
    // }, 300);

    const recipeSearch = term => {
      this.term = term;
      this.recipeSearch(term);
    };

    if (this.term.length > 1) {
      this.AutoRecipe = this.state.recipes.map(e => (
        <li
          className="autoList"
          key={e._id}
          data={e.Name}
          onClick={event => recipeSearch(event.target.attributes.data.value)}>
          {e.Name}
        </li>
      ));
    } else {
      this.AutoRecipe = [];
    }

    console.log(this.term, 'borde vara detta');
    return (
      <div className="App">
        <h1>ReceptBolaget</h1>
        <Button waves="purple" className="red" node="a" href="/admin">
          Admins only
          <Icon right>do_not_disturb_alt</Icon>
        </Button>
        <SearchBar
          placeholder="Sök recept"
          onSearchTermChange={recipeSearch}
          term={this.term}
        />
        <AutoCompleteism
          data={this.AutoRecipe}
          term={this.term}
        />
        <Row>
          <Input
            name="vegansk"
            type="checkbox"
            value="vegansk"
            label="Vegansk"
            checked={this.checkBoxes.vegansk}
            onChange={e => {
              if (e.target.checked) {
                this.filterCat.push(e.target.value);
              } else {
                var index = this.filterCat.indexOf(e.target.name);
                if (index > -1) {
                  this.filterCat.splice(index, 1);
                }
              }
              this.recipeSearch(this.term);
            }}
          />
          <Input
            name="vegetarisk"
            type="checkbox"
            value="vegetarisk"
            label="Vegetarisk"
            checked={this.checkBoxes.vegetarisk}
            onChange={e => {
              if (e.target.checked) {
                this.filterCat.push(e.target.value);
              } else {
                var index = this.filterCat.indexOf('vegetarisk');
                if (index > -1) {
                  this.filterCat.splice(index, 1);
                }
              }
              this.recipeSearch(this.term);
            }}
          />
          <Input
            name="glutenfri"
            type="checkbox"
            value="glutenfri"
            label="Glutenfri"
            checked={this.checkBoxes.glutenfri}
            onChange={e => {
              if (e.target.checked) {
                this.filterCat.push(e.target.value);
              } else {
                var index = this.filterCat.indexOf('glutenfri');
                if (index > -1) {
                  this.filterCat.splice(index, 1);
                }
              }
              this.recipeSearch(this.term);
            }}
          />
          <Input
            name="laktosfri"
            type="checkbox"
            value="laktosfri"
            label="Laktosfri"
            checked={this.checkBoxes.laktosfri}
            onChange={e => {
              if (e.target.checked) {
                this.filterCat.push(e.target.value);
              } else {
                var index = this.filterCat.indexOf('laktosfri');
                if (index > -1) {
                  this.filterCat.splice(index, 1);
                }
              }
              this.recipeSearch(this.term);
            }}
          />
        </Row>
        <Row>
          <RecipeList recipes={this.state.recipes} text={this.text} />
        </Row>
      </div>
    );
  }
}

export default Main;
