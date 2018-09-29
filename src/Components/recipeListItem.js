import React from 'react';
import { Card, Col, CardTitle } from 'react-materialize';
import MyModal from './modal';
let ids=900;
const RecipeListItem = ({ recipe }) => {
const categories=recipe.category.map(e=>{return <li key={Math.random(ids)+900}>{e}</li>})
  return (

    <div>
      
      <Col m={12} s={12} l={12}>
        <Card horizontal header={<CardTitle image={recipe.IMGUrl} />}>
          <h4>{recipe.Name}</h4>
          <p>{recipe.Description}</p>
          <p />
          <br></br>
      <p>{categories}</p>
          <MyModal recipe={recipe}></MyModal>
        </Card>
      </Col>
    </div>
  );
};

export default RecipeListItem;
