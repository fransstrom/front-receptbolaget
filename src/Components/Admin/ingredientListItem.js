import ReactDOM from 'react-dom';
import React from 'react';
import { Button, Input, Badge, CollectionItem,Collection } from 'react-materialize';


export let ingredList = [];

const IngredientListItem = ({ ingredient, amount }) => {
  
  return (
    <tr data={ingredient} className="ingredient">
      <td>{ingredient.Namn}</td>
      <td>
        <Input
          className="amount"
          label="Mäng i gram"
          onChange={function(e) {
            amount = e.target.value;
          }}
        />
      </td>
      <td>
        <Button
          className="addIng"
          onClick={function() {

            added();
          }}>
          Lägg till
        </Button>
      </td>
    </tr>
  );

  function added() {
    console.log(ingredList);
    ingredList.push({ingredient, amount});
  let  ingredsAdded=ingredList.map(ingredient=>{return <CollectionItem key={ingredient.ingredient._id+'listan'}>{ingredient.ingredient.Namn} <Badge>{ingredient.amount}gram</Badge></CollectionItem>})
    ReactDOM.render(
      <Collection>{ingredsAdded}</Collection>,
      document.getElementById('added')
    );
  }
};

export default IngredientListItem;
