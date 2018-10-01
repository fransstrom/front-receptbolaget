import React from 'react';
import { Modal, Button } from 'react-materialize';
import _ from 'lodash';
import Input from 'react-materialize/lib/Input';
const MyModal = ({ recipe }) => {

  let recipeDetails = recipe.Ingredients.map(recipe => {
    let name = recipe.ingredient.Namn;
    let amount = recipe.amount;
    let measure=recipe.measure;
    let quantity=recipe.quantity
    return (
      <li key={name}>
       {quantity}{measure} {name} (ca {amount}g)
      </li>
    );
  });

  let instructions = recipe.Instruktioner;

  function getCal() {
    let kalorier = [];
    for (let i = 0; i < recipe.Ingredients.length; i++) {
      let forCalc = recipe.Ingredients[i].amount / 100;
      kalorier.push(
        recipe.Ingredients[i].ingredient.Naringsvarden.Naringsvarde.find(
          namn => namn.Namn === 'Energi (kcal)'
        ).Varde * forCalc
      );
    }
    return _.sum(kalorier);
  }

  return (
    <Modal fixedFooter trigger={<Button>Till receptet</Button>}>
      <div
        className="row"
        style={{
          backgroundImage: `url(${recipe.IMGUrl})`,
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
        <h2>{recipe.Name}</h2>
      </div>
      <h5>Beskrivning</h5>
      {recipe.Description}
      <h5>Ingredienser</h5>
      <ol>{recipeDetails}</ol>
      <h5>Instruktioner</h5>
      <p>{instructions}</p>
      <h5>Näringsvärden</h5>
      <p>
        {getCal()}
        kcal
      </p>

    </Modal>
  );
};

export default MyModal;
