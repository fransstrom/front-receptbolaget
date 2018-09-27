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
        console.log(ingredients);
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
    this.refs.form.reset();
  }

  render() {
    const ingredientSearch = _.debounce(term => {
      this.ingredientSearch(term);
    }, 300);

    return (
      <div>
        <Row>
          <h4 className="header">Du som admin kan lägga till recept</h4>
          <Col s={6} m={6} l={6}>
            <form
              ref="form"
              onSubmit={e => {
                e.preventDefault();
                this.postRecipe(this.newRecipe);
                window.Materialize.toast(
                  'Tack för du delar med dig av din recept!',
                  1000
                );
                console.log(this.newRecipe, 'KLICK');
              }}>
              <Input
                id="name"
                onChange={e => {
                  this.newRecipe.Name = e.target.value;
                }}
                s={12}
                m={12}
                l={12}
                label="Namn för receptet">
                <Icon>import_contacts</Icon>
              </Input>
              <Input
                onChange={e => {
                  this.newRecipe.Description = e.target.value;
                }}
                s={12}
                m={12}
                l={12}
                type="textarea"
                label="Beskrivning">
                <Icon>description</Icon>
              </Input>
              <SearchBar
                placeholder="Sök ingrediens"
                onSearchTermChange={ingredientSearch}
              />
              <Input
                onChange={e => {
                  this.newRecipe.Instruktioner = e.target.value;
                }}
                type="textarea"
                label="Instruktioner"
                s={12}
                m={12}
                l={12}>
                <Icon>more_vert</Icon>
              </Input>
              <Input
                onChange={e => {
                  this.newRecipe.IMGUrl = e.target.value;
                }}
                type="text"
                label="Bild-länk"
                icon="search"
                s={12}
                m={12}
                l={12}>
                <Icon>insert_link</Icon>
              </Input>
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
          <Col id="added" s={6} m={6} l={6} />
        </Row>
      </div>
    );
  }
}
