import React from 'react';
import IngredientListItem from './ingredientListItem';
import {

  Table
} from 'react-materialize';
const IngredientList = props => {
  const ingredientItem = props.ingredients.map(ingredient => {
    return <IngredientListItem key={ingredient._id} ingredient={ingredient} />;
  });

  return (
    <Table className="col-md-4 list-group">
      <thead>
        <tr>
          <th data-field="id">Ingrediens namn</th>
          <th data-field="name">Mängd(g)</th>
          <th data-field="price">Lägg till</th>
        </tr>
      </thead>
      <tbody>{ingredientItem}</tbody>
    </Table>
  );
};

export default IngredientList;
