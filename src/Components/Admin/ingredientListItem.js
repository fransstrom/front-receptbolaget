import React from 'react';
import {

  Button,
  Input,

} from 'react-materialize';
let ingredList = [];
const IngredientListItem = ({ ingredient, amount }) => {
  return (
    <tr data={ingredient} className="ingredient">
      <td>{ingredient.Namn}</td>
      <td>
        <Input className="amount" label="Mäng i gram" />
      </td>
      <td>
        <Button
        className="addIng"
          onClick={function() {
           let amountEl=document.getElementsByClassName('addIng');
           
            ingredList.push(ingredient);
            console.log(ingredList);
            console.log(amountEl);
          }}>
          Lägg till
        </Button>
      </td>
    </tr>
  );
};

export default IngredientListItem;
