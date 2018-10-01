import React from 'react';
import IngredientListItem from './ingredientListItem';
import { Table } from 'react-materialize';
const IngredientList = props => {
  // console.log(props, 'props list')
  const ingredientItem = props.ingredients.map(ingredient => {
    return <IngredientListItem key={ingredient._id} ingredient={ingredient} />;
  });

  return (
    <Table className="col-md-4 list-group">
      <thead>
        <tr>
          <th>Ingrediens</th>
          <th>Måttenhet</th>
          <th>Mängd</th>
          <th>Vikt(g)</th>
          <th>Lägg till</th>
        </tr>
      </thead>
      <tbody>{ingredientItem}</tbody>
    </Table>
  );
};

export default IngredientList;
