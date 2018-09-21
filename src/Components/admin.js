import React, { Component } from 'react';
import { Row, Input, Icon, Button, Col, Collection, Badge } from 'react-materialize';
import CollectionItem from 'react-materialize/lib/CollectionItem';
export default class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = { ingredients: [] };


    this.term='';
    this.ingredientSearch(this.term);



 
  }
  
   resolveAfter2Seconds(evt) {
    return new Promise(resolve => {
      setTimeout(() => {
        this.ingredientSearch(evt)
      }, 2000);
    });
  }


   ingredientSearch(term) {

     fetch(`http://localhost:3000/allaingreds/${term}`)
      .then(response => response.json())
      .then(ingredients => {
        this.setState({ ingredients });
      });

  }


  render() {
    let i=1;
    const ingredientItem = this.state.ingredients.map(ingredient => {
      return (
        <CollectionItem key={ingredient._id} ingredient={ingredient.Namn}>
          {ingredient.Namn}
          <Badge>{i++}</Badge>
        </CollectionItem>
      );
    });

    console.log(this.state.ingredients);
    return (
      <div>
        <Row>
          <h4>Du som admin kan lägga till recept</h4>
          <Col s={6} m={6} l={6}>
            <Input s={12} m={12} l={12} label="Namn för receptet" />
            <Input s={12} m={12} l={12} type="textarea" label="Beskrivning" />
            <Input
              s={12}
              m={12}
              l={12}
              onChange={evt => {  
                // this.term=evt.target.value;
                // this.ingredientSearch(evt.target.value);
                this.resolveAfter2Seconds(evt.target.value); 
              }}
              label="Sök recept att lägga till"
            />
            <Input type="text" label="Bild-länk" s={12} m={12} l={12}>
              <Icon>insert_link</Icon>
            </Input>
            <Input type="text" label="Instruktioner" s={12} m={12} l={12} />
            <Button waves="red" className="blue" node="a" href="/någonapohär">
              Admins only
              <Icon right>fastfood</Icon>
            </Button>
          </Col>
          <Col s={6} m={6} l={6}>
            <Collection>{ingredientItem}</Collection>
          </Col>
        </Row>
      </div>
      
    );

 
  }
  
}
