import React from 'react';
import IngredientListItem from './ingredientListItem';

const IngredientList = props => {
  console.log('props: ', props);
  const ingredientItem = props.ingredients.map(ingredient => {
    return <IngredientListItem key={ingredient._id} ingredient={ingredient} />;
  });

  return <ul className="col-md-4 list-group">{ingredientItem}</ul>;
};

export default IngredientList;
