import React from 'react';
import { Card, Col, CardTitle } from 'react-materialize';
const RecipeListItem = ({ recipe }) => {
  return (
    <div>
      <Col m={12} s={12} l={12}>
        <Card
          horizontal
          header={<CardTitle image={recipe.IMGUrl} />}
          >
          <h4>{recipe.Name}</h4>
          <p>{recipe.Description}</p>
        </Card>
      </Col>
    </div>
  );
};



export default RecipeListItem;
