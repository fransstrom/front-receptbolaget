import React from 'react';
import { Card, Col, CardTitle } from 'react-materialize';
import MyModal2 from './modal2';
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
          
          <MyModal2 recipe={recipe}></MyModal2>
        </Card>
      </Col>
  );
};

export default RecipeListItem;
