import React from 'react';
import { CollectionItem } from 'react-materialize';

const IngredientListItem = ({ ingredient }) => {
  return <CollectionItem>{ingredient.Namn}</CollectionItem>;
};

export default IngredientListItem;
