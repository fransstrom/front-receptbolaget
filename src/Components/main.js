import React, { Component } from 'react';
import '../App.css';
import SearchBar from './searchbar';
import RecipeList from './recipeList';
import _ from 'lodash';
import { Row, Button, Icon, Input } from 'react-materialize';
const $ = window.$;
class Main extends Component {
  constructor(props) {
    super(props);
    this.state = { recipes: [] };
    this.recipeSearch('');

    this.checkBoxes = {
      vegansk: false,
      vegitarisk: false,
      glutenfri: false,
      laktosfri: false
    };
    this.term = '';
    this.filterCat = [];
  }
  //  componentDidMount(){
  //    $(document).ready(function(){
  //      $("body").on("click",'.autocomplete-content.dropdown-content li',function(event){
  //        this.term=event.target.value;
  //        console.log("helloo");
  //      });

  //    });
  //  }
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
    const recipeSearch = _.debounce(term => {
      this.recipeSearch(term);
      this.term = term;
    }, 300);

    return (
      <div className="App">
        <h1>ReceptBolaget</h1>
        <Button waves="purple" className="red" node="a" href="/admin">
          Admins only
          <Icon right>do_not_disturb_alt</Icon>
        </Button>
        <SearchBar placeholder="Sök recept" onSearchTermChange={recipeSearch} />
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
            name="vegitarisk"
            type="checkbox"
            value="vegitarisk"
            label="Vegitarisk"
            checked={this.checkBoxes.vegitarisk}
            onChange={e => {
              if (e.target.checked) {
                this.filterCat.push(e.target.value);
              } else {
                var index = this.filterCat.indexOf('vegitarisk');
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
