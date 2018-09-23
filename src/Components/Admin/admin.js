import React, { Component } from 'react';
import { Row, Input, Icon, Button, Col, Collection } from 'react-materialize';
import IngredientList from './ingredientList';
import _ from 'lodash';
import SearchBar from '../searchbar';
export default class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = { ingredients: [] };

    this.term = '';
    this.ingredientSearch(this.term);
  }

  ingredientSearch(term) {
    fetch(`http://localhost:3000/allaingreds/${term}`)
      .then(response => response.json())
      .then(ingredients => {
        this.setState({ ingredients });
      });
  }

  render() {
    const ingredientSearch=_.debounce((term)=>{this.ingredientSearch(term) },300);
    console.log(this.state.ingredients);
    return (
      <div>
        <Row>
          <h4>Du som admin kan lägga till recept</h4>
          <Col s={6} m={6} l={6}>
            <Input s={12} m={12} l={12} label="Namn för receptet" />
            <Input s={12} m={12} l={12} type="textarea" label="Beskrivning" />
            <SearchBar
              placeholder="Sök ingrediens"
              onSearchTermChange={ingredientSearch}
            />
            <Input type="text" label="Instruktioner" s={12} m={12} l={12} />
            <Input type="text" label="Bild-länk" s={12} m={12} l={12}>
              <Icon>insert_link</Icon>
            </Input>
            <Button waves="red" className="blue" node="a" href="/någonapohär">
              Admins only
              <Icon right>fastfood</Icon>
            </Button>
          </Col>
          <Col s={6} m={6} l={6}>
            <Collection>
              <IngredientList ingredients={this.state.ingredients} />
            </Collection>
          </Col>
        </Row>
      </div>
    );
  }
}
