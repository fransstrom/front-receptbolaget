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
      ingredients: [],
      newRecipe: {
        Name: '',
        Description: '',
        Ingredients: ingredList,
        Instruktioner: '',
        IMGUrl: ''
      }
    };


    this.term = '';
    this.ingredientSearch(this.term);

    this.onNameChange = this.onNameChange.bind(this);
    this.onDescriptionChange = this.onDescriptionChange.bind(this);
    this.onInstructionChange = this.onInstructionChange.bind(this);
    this.onIMGUrlChange = this.onIMGUrlChange.bind(this);
  }



  ingredientSearch(term) {
    fetch(`http://localhost:3000/allaingreds/${term}`)
      .then(response => response.json())
      .then(ingredients => {
        this.setState({ ingredients: ingredients });
        console.log(ingredients);
      });
  }

  postRecipe() {
    let recipe = JSON.stringify(this.state.newRecipe);
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
    this.setState({
      newRecipe: {
        Name: '',
        Description: '',
        Ingredients: [],
        Instruktioner: '',
        IMGUrl: ''
      }
    });
    
  }

  onNameChange(event) {
    let newRecipe = { ...this.state.newRecipe };
    newRecipe.Name = event.target.value;
    this.setState({ newRecipe });
    console.log(this.state.newRecipe, 'staten');
  }

  onDescriptionChange(event) {
    let newRecipe = { ...this.state.newRecipe };
    newRecipe.Description = event.target.value;
    this.setState({ newRecipe });
    console.log(this.state.newRecipe, 'staten');
  }

  onInstructionChange(event) {
    let newRecipe = { ...this.state.newRecipe };
    newRecipe.Instruktioner = event.target.value;
    this.setState({ newRecipe });
    console.log(this.state.newRecipe, 'staten');
  }
  onIMGUrlChange(event) {
    let newRecipe = { ...this.state.newRecipe };
    newRecipe.IMGUrl = event.target.value;
    this.setState({ newRecipe });
    console.log(this.state.newRecipe, 'staten');
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
                value={this.state.newRecipe.Name}
                id="name"
                name="Name"
                cat="newRecipe"
                onChange={this.onNameChange}
                s={12}
                m={12}
                l={12}
                label="Namn för receptet">
                <Icon>import_contacts</Icon>
              </Input>
              <Input
                value={this.state.newRecipe.Description}
                name="description"
                onChange={this.onDescriptionChange}
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
                value={this.state.newRecipe.Instruktioner}
                name="Instruktioner"
                onChange={this.onInstructionChange}
                type="textarea"
                label="Instruktioner"
                s={12}
                m={12}
                l={12}>
                <Icon>more_vert</Icon>
              </Input>
              <Input
                value={this.state.newRecipe.IMGUrl}
                onChange={this.onIMGUrlChange}
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
