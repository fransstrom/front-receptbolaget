import ReactDOM from 'react-dom';
import React from 'react';
import {
  Button,
  Input,
  Badge,
  CollectionItem,
  Collection,
  
} from 'react-materialize';

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
        floating className='blue addIng' waves='green' icon='add'
          
          onClick={function() {
            added();
          }}>
         
        </Button>
      </td>
    </tr>
  );

  function added() {
    console.log(ingredList);
    ingredList.push({ ingredient, amount });
   let i=0;
    let ingredsAdded = ingredList.map(ingredient => {
      i++;
      return (
        
        <CollectionItem key={ingredient.ingredient._id + 'listan'}>
          {i +'. '}{ingredient.ingredient.Namn}{' '}
          <Badge>
            {ingredient.amount}
            gram
          </Badge>
        </CollectionItem>
      );
    });
    ReactDOM.render(
      <Collection>{ingredsAdded}</Collection>,
      document.getElementById('added')
    );
  }
};

export default IngredientListItem;
