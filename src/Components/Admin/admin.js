import React, { Component } from 'react';
import { Row, Input, Icon, Button, Col, Collection } from 'react-materialize';
import IngredientList from './ingredientList';
import _ from 'lodash';
import SearchBar from '../searchbar';
import { ingredList } from './ingredientListItem';

export default class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = { ingredients: [] };
    this.addedIngred = ingredList;
    this.term = '';
    this.ingredientSearch(this.term);

    this.newRecipe = {
      Name: '',
      Description: '',
      Ingredients: this.addedIngred,
      Instruktioner: '',
      IMGUrl: ''
    };
  }

  ingredientSearch(term) {
    fetch(`http://localhost:3000/allaingreds/${term}`)
      .then(response => response.json())
      .then(ingredients => {
        this.setState({ ingredients: ingredients });
      });
  }

  postRecipe(newRecipe) {
    let recipe = JSON.stringify(newRecipe);
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
      })
      .catch(e => console.log(e, 'error'));
    this.newRecipe = {
      Name: '',
      Description: '',
      Ingredients: this.addedIngred,
      Instruktioner: '',
      IMGUrl: ''
    };
  }

  render() {
    const ingredientSearch = _.debounce(term => {
      this.ingredientSearch(term);
    }, 300);

    return (
      <div>
        <Row>
          <h4>Du som admin kan lägga till recept</h4>
          <Col s={6} m={6} l={6}>
            <Input
              onChange={e => {
                this.newRecipe.Name = e.target.value;
              }}
              name="name"
              s={12}
              m={12}
              l={12}
              label="Namn för receptet"
            />
            <Input
              onChange={e => {
                this.newRecipe.Description = e.target.value;
              }}
              name="description"
              s={12}
              m={12}
              l={12}
              type="textarea"
              label="Beskrivning"
            />
            <SearchBar
              placeholder="Sök ingrediens"
              onSearchTermChange={ingredientSearch}
            />
            <Input
              onChange={e => {
                this.newRecipe.Instruktioner = e.target.value;
              }}
              name="instruction"
              type="text"
              label="Instruktioner"
              s={12}
              m={12}
              l={12}
            />
            <Input
              onChange={e => {
                this.newRecipe.IMGUrl = e.target.value;
              }}
              name="imgurl"
              type="text"
              label="Bild-länk"
              s={12}
              m={12}
              l={12}>
              <Icon>insert_link</Icon>
            </Input>
            <Button
              waves="red"
              className="blue"
              onClick={() => {
                this.postRecipe(this.newRecipe);
                console.log(this.newRecipe, 'KLICK');
              }}>
              Admins only
              <Icon right>fastfood</Icon>
            </Button>
          </Col>
          <Col s={6} m={6} l={6}>
            <Collection>
              <IngredientList ingredients={this.state.ingredients} />
            </Collection>
          </Col>
          <Col id="added" s={6} m={6} l={6} />
        </Row>
      </div>
    );
  }
}
