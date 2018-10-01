import React, { Component } from 'react';
import { Input, Row, Modal, Button } from 'react-materialize';
import _ from 'lodash';
export default class MyModal2 extends Component {
  constructor(props) {
    super(props);
    this.state = { servings: 1 };
    this.recipe = this.props.recipe;
    this.instructions = this.recipe.Instruktioner;

    console.log(this.recipe)
  }

  getCal = e => {
    let kalorier = [];
    for (let i = 0; i < this.recipe.Ingredients.length; i++) {
      let forCalc = this.recipe.Ingredients[i].amount / 100;
      kalorier.push(
        this.recipe.Ingredients[i].ingredient.Naringsvarden.Naringsvarde.find(
          namn => namn.Namn === 'Energi (kcal)'
        ).Varde * forCalc
      );
    }
    return (
      <li>
        Kalorier: {_.sum(kalorier) * this.state.servings}
        kcal
      </li>
    );
  };

  getProtein = e => {
    let protein = [];
    for (let i = 0; i < this.recipe.Ingredients.length; i++) {
      let forCalc = this.recipe.Ingredients[i].amount / 100;
      protein.push(
        this.recipe.Ingredients[i].ingredient.Naringsvarden.Naringsvarde.find(
          namn => namn.Namn === 'Protein'
        ).Varde
      );
      protein[i] = protein[i].replace(',', '.') * forCalc;
    }

    let protAmount = (_.sum(protein) * this.state.servings).toFixed(2);
    return <li>Protein: {protAmount}g</li>;
  };

  getCarbs = e => {
    let carbs = [];
    for (let i = 0; i < this.recipe.Ingredients.length; i++) {
      let forCalc = this.recipe.Ingredients[i].amount / 100;
      carbs.push(
        this.recipe.Ingredients[i].ingredient.Naringsvarden.Naringsvarde.find(
          namn => namn.Namn === 'Kolhydrater'
        ).Varde
      );
      carbs[i] = carbs[i].replace(',', '.') * forCalc;
    }

    let carbAmount = (_.sum(carbs) * this.state.servings).toFixed(2);
    return <li>Kolhydrater: {carbAmount}g</li>;
  };

  render() {
    let servings = this.state.servings;
    this.recipeDetails = this.recipe.Ingredients.map(recipe => {
      let name = recipe.ingredient.Namn;
      let amount = recipe.amount * servings;
      let measure = recipe.measure;
      let quantity = recipe.quantity * servings;
      return (
        <li key={name}>
          {quantity}
          {measure} {name} (ca {amount}
          g)
        </li>
      );
    });

    return (
      <div>
        <Modal fixedFooter trigger={<Button>Till receptet</Button>}>
          <div
            className="row"
            style={{
              backgroundImage: `url(${this.recipe.IMGUrl})`,
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '25%',
              zIndex: -1,
              backgroundRepeat: 'none',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
          <div className="container-fluid" style={{ marginTop: '20%' }}>
            <h2>{this.recipe.Name}</h2>
          </div>
          <h5>Beskrivning</h5>
          {this.recipe.Description}
          <h5>Ingredienser</h5>
          <ol>{this.recipeDetails}</ol>
          <h5>Instruktioner</h5>
          <p>{this.instructions}</p>
          <h5>Näringsvärden</h5>
          <ul>
            {this.getCal()}
            {this.getProtein()}
            {this.getCarbs()}
          </ul>
          <Row>
            <Input
              s={12}
              type="select"
              label="Antal personer"
              defaultValue="1"
              onChange={e => {
                this.setState({ servings: e.target.value });
              }}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </Input>
          </Row>
        </Modal>
      </div>
    );
  }
}
