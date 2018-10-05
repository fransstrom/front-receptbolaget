import React from 'react';
import { Card, Col, CardTitle } from 'react-materialize';

import RecipeModal from './recipeModal';
let ids=900;
const RecipeListItem = ({ recipe }) => {
const categories=recipe.category.map(e=>{return <li className="list-inline-item" key={Math.random(ids)+900}>{e}</li>})
  return (

      <Col className="fill" m={12} s={12} l={12}>
        <Card horizontal header={<CardTitle image={recipe.IMGUrl} />}>
        
          <h4>{recipe.Name}</h4>
          <p>{recipe.Description}</p>
          <p />
          <br></br>
         <ul className="list-inline">{categories}</ul>
          
          <RecipeModal recipe={recipe}></RecipeModal>
        </Card>
      </Col>
  );
};

export default RecipeListItem;
