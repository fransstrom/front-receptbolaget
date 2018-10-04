import React from 'react';
import RecipeListItem from './recipeListItem';

const RecipeList = props => {
  const recipeItem = props.recipes.map(recipe => {
    return <RecipeListItem key={recipe._id} recipe={recipe} />;
  });

  return <ul className="col-md-4 list-group inline">{recipeItem}</ul>;
};

export default RecipeList;
