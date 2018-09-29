import React, { Component } from 'react';
import { Row, Input, Icon, Button, Col, Collection } from 'react-materialize';
import IngredientList from './ingredientList';
import _ from 'lodash';
import SearchBar from '../searchbar';
import { ingredList } from './ingredientListItem';
//const $ = window.$;

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
        IMGUrl: '',
        category: []
      }
    };

    this.checkBoxes = {
      vegan: false,
      vegitarisk: false,
      glutenfri: false,
      laktosfri: false
    };

    this.term = '';
    this.ingredientSearch(this.term);

    this.onNameChange = this.onNameChange.bind(this);
    this.onDescriptionChange = this.onDescriptionChange.bind(this);
    this.onInstructionChange = this.onInstructionChange.bind(this);
    this.onIMGUrlChange = this.onIMGUrlChange.bind(this);
  }

  //Använda för att skapa ingredlist i newrecipe istället för ingredlistitem functionen?
  // componentDidMount(){
  //   $(document).ready(function(){
  //     $("body").on("click",'.add_btn',function(event){
  //       console.log("helloo");
  //     }.bind(this));

  //   });
  // }

  ingredientSearch(term) {
    fetch(`http://localhost:3000/allaingreds/${term}`)
      .then(response => response.json())
      .then(ingredients => {
        this.setState({ ingredients: ingredients });
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
  }

  onDescriptionChange(event) {
    let newRecipe = { ...this.state.newRecipe };
    newRecipe.Description = event.target.value;
    this.setState({ newRecipe });
  }

  onInstructionChange(event) {
    let newRecipe = { ...this.state.newRecipe };
    newRecipe.Instruktioner = event.target.value;
    this.setState({ newRecipe });
  }
  onIMGUrlChange(event) {
    let newRecipe = { ...this.state.newRecipe };
    newRecipe.IMGUrl = event.target.value;
    this.setState({ newRecipe });
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
              <Row>
                <Input
                  name="vegan"
                  type="checkbox"
                  value="vegansk"
                  label="Vegansk"
                  checked={this.checkBoxes.vegan}
                  onChange={e => {
                    if (e.target.checked) {
                      this.state.newRecipe.category.push(e.target.name);
                    } else {
                      this.state.newRecipe.category.pop(e.target.name);
                    }
                    console.log(this.state.newRecipe);
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
                      this.state.newRecipe.category.push(e.target.name);
                    } else {
                      this.state.newRecipe.category.pop(e.target.name);
                    }
                    console.log(this.state.newRecipe);
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
                      this.state.newRecipe.category.push(e.target.name);
                    } else {
                      this.state.newRecipe.category.pop(e.target.name);
                    }
                    console.log(this.state.newRecipe);
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
                      this.state.newRecipe.category.push(e.target.name);
                    } else {
                      this.state.newRecipe.category.pop(e.target.name);
                    }
                    console.log(this.state.newRecipe);
                  }}
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
          <Col id="added" s={6} m={6} l={6} />
        </Row>
      </div>
    );
  }
}
