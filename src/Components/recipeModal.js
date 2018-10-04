import React, { Component } from 'react';
import { Input, Row, Modal, Button } from 'react-materialize';
import _ from 'lodash';
export default class RecipeModal extends Component {
  constructor(props) {
    super(props);
    this.state = { servings: 1 };
    this.recipe = this.props.recipe;
    this.instructions = this.recipe.Instruktioner;
  }


  getNutrient (shortName, nutrition, unit){
    let carbs = [];
    for (let i = 0; i < this.recipe.Ingredients.length; i++) {
      let forCalc = this.recipe.Ingredients[i].amount / 100;
      carbs.push(
        this.recipe.Ingredients[i].ingredient.Naringsvarden.Naringsvarde.find(
          namn => namn.Namn === nutrition
        ).Varde
      );
      carbs[i] = carbs[i].replace(',', '.') * forCalc;
    }
   
    let carbAmount = (_.sum(carbs)).toFixed(2).replace('.',',');
   
    return <li>{shortName}: {carbAmount} {unit}</li>;
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
          <Row>
            <Input
              s={3}
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
          <h5>Instruktioner</h5>
          <ul>{this.instructions}</ul>
          <h5>Näringsvärden per portion</h5>
          <ul>
            {this.getNutrient('Kalorier','Energi (kcal)', 'kcal')}
            {this.getNutrient('Protein','Protein', 'g')}
            {this.getNutrient('Kolhydrater','Kolhydrater', 'g')}
            {this.getNutrient('Salt','Salt', 'g')}
            {this.getNutrient('Mättat fett','Summa mättade fettsyror', 'g')}
            {this.getNutrient('Enkelomättat fett','Summa enkelomättade fettsyror', 'g')}
            {this.getNutrient('Fleromättat fett','Summa fleromättade fettsyror', 'g')}
            {this.getNutrient('Socker','Socker totalt', 'g')}
          </ul>

        </Modal>
     
    );
  }
}
