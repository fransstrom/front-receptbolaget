import React from 'react';
import { Card, Col, CardTitle } from 'react-materialize';
const RecipeListItem = ({ recipe }) => {
  return (
    <div>
      <h4>{recipe.Name}</h4>
      <p>{recipe.Description}</p>
    </div>
  );
};

export default RecipeListItem;
