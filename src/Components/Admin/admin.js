import React, { Component } from 'react';
import { Row, Input, Icon, Button, Col, Collection } from 'react-materialize';
import IngredientList from './ingredientList';
import _ from 'lodash';
import SearchBar from '../searchbar';
import { ingredList } from './ingredientListItem';


export default class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredients: []
    };

    this.newRecipe = {
      Name: '',
      Description: '',
      Ingredients: ingredList,
      Instruktioner: '',
      IMGUrl: '',
      category: []
    };

    this.checkBoxes = {
      vegansk: false,
      vegetarisk: false,
      glutenfri: false,
      laktosfri: false
    };

    this.term = '';
    this.ingredientSearch(this.term);
    
  }

  ingredientSearch(term) {
    fetch(`http://localhost:3000/allaingreds/${term}`)
      .then(response => response.json())
      .then(ingredients => {
        this.setState({ ingredients: ingredients });
      });
  }

  postRecipe() {
    let recipe = JSON.stringify(this.newRecipe);
    fetch('http://localhost:3000/saverecipe/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: recipe
    })
      .then(response => {
        console.log(response, 'resp');
        console.log(recipe);
        return response.json();
      })
      .then(body => {
        console.log(body, 'body');
        window.location.replace('http://localhost:3001');
      })
      .catch(e => console.log(e, 'error'));
  }

  handleCheck (e){
   
      if (e.target.checked) {
        this.newRecipe.category.push(e.target.value);
      } else {
        var index = this.newRecipe.category.indexOf(e.target.name);
        if (index > -1) {
          this.newRecipe.category.splice(index, 1);
        }
      }
     console.log(this.newRecipe.category)
    
  }

  render() {
    const ingredientSearch = _.debounce(term => {
      if (term.length > 1) {
        this.ingredientSearch(term);
      }
    }, 300);

    return (
      <Row>
        <h4 className="header">Du som admin kan lägga till recept</h4>
        <p className="warning">
          Du lägger alltid till mängden ingredienser för 1 person
        </p>
        <Col s={6} m={6} l={6}>
          <form
            autocomplete="off"
            ref="form"
            onSubmit={e => {
              e.preventDefault();
              this.postRecipe(this.newRecipe);
              console.log(this.newRecipe, 'KLICK');
            }}>
            <Input
              required
              id="name"
              name="Name"
              cat="newRecipe"
              onChange={e => (this.newRecipe.Name = e.target.value)}
              s={12}
              m={12}
              l={12}
              label="Namn för receptet">
              <Icon>import_contacts</Icon>
            </Input>
            <Input
              required
              name="Description"
              onChange={e => (this.newRecipe.Description = e.target.value)}
              s={12}
              m={12}
              l={12}
              type="textarea"
              label="Beskrivning">
              <Icon>description</Icon>
            </Input>
            <SearchBar
              recipes={this.state.ingredients}
              placeholder="Sök ingrediens"
              onSearchTermChange={ingredientSearch}
            />
            <Col id="added" s={12} m={12} l={12} />
            <Input
              required
              name="Instruktioner"
              onChange={e => (this.newRecipe.Instruktioner = e.target.value)}
              type="textarea"
              label="Instruktioner"
              s={12}
              m={12}
              l={12}>
              <Icon>more_vert</Icon>
            </Input>
            <Input
              required
              onChange={e => (this.newRecipe.IMGUrl = e.target.value)}
              type="text"
              label="Bild-länk"
              icon="search"
              s={12}
              m={12}
              l={12}>
              <Icon>insert_link</Icon>
            </Input>
            <Row>
              <Input
                name="vegansk"
                type="checkbox"
                value="vegansk"
                label="Vegansk"
                onChange={e=>this.handleCheck(e)}
              />
              <Input
                name="vegetarisk"
                type="checkbox"
                value="vegetarisk"
                label="Vegetarisk"
                checked={this.checkBoxes.vegitarisk}
                onChange={e=>this.handleCheck(e)}
              />
              <Input
                name="glutenfri"
                type="checkbox"
                value="glutenfri"
                label="Glutenfri"
                checked={this.checkBoxes.glutenfri}
                onChange={e=>this.handleCheck(e)}
              />
              <Input
                name="laktosfri"
                type="checkbox"
                value="laktosfri"
                label="Laktosfri"
                checked={this.checkBoxes.laktosfri}
                onChange={e=>this.handleCheck(e)}
              />
            </Row>
            <Button waves="red" className="blue" type="submit">
              Skicka
              <Icon right>send</Icon>
            </Button>
          </form>
        </Col>
        <Col s={6} m={6} l={6}>
          <Collection className="ingredientsAdd">
            <IngredientList ingredients={this.state.ingredients} />
          </Collection>
        </Col>
      </Row>
    );
  }
}
