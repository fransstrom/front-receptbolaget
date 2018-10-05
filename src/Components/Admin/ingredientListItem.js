import ReactDOM from 'react-dom';
import React from 'react';
import {
  Button,
  Input,
  Badge,
  CollectionItem,
  Collection,
  Icon
} from 'react-materialize';


export var ingredList = [];

const IngredientListItem = ({ ingredient, measure, quantity, amount }) => {
  return (
    <tr data={ingredient} className="ingredient">
      <td>{ingredient.Namn}</td>
      <td>
        <Input
          type="select"
          className="measure"
          label="Måttenhet"
          defaultValue=".."
          onChange={function(e) {
            measure = e.target.value;
          }}>
          <option value="..">..</option>
          <option value="st">Styck</option>
          <option value="kg">Kilo</option>
          <option value="hg">Hekto</option>
          <option value="g">Gram</option>
          <option value="tsk">Tesked</option>
          <option value="msk">Matsked</option>
          <option value="ml">Milliliter</option>
          <option value="cl">Centiliter</option>
          <option value="dl">Deciliter</option>
          <option value="l">Liter</option>
        </Input>
      </td>
      <td>
        <Input
          className="antal"
          label="Antal"
          onChange={function(e) {
            quantity = e.target.value;
          }}
        />
      </td>
      <td>
        <Input
          className="amount"
          label="Vikt i gram"
          onChange={function(e) {
            amount = e.target.value;
          }}
        />
      </td>
      <td>
        <Button
          floating
          className="blue addIng"
          waves="green"
          icon="add"
          type="submit"
          onClick={function() {
            added();
          }}
        />
      </td>
    </tr>
  );


  //Är absolut inte nöjd med denna biten.
  function added() {
    window.Materialize.toast('Ingredienst tillagd', 2000);
    console.log(ingredList);
    ingredList.push({ ingredient, measure, quantity, amount });
    let i = 0;
    let ingredsAdded = ingredList.map(ingredient => {
      i++;
      return (
        <CollectionItem key={ingredient.ingredient._id + 'listan'}>
          {i + '. '}
          {ingredient.ingredient.Namn}{' '}
    
            {ingredient.quantity} {ingredient.measure}
         <Badge>
           <Icon>fastfood</Icon>
          </Badge>
        </CollectionItem>
      );
    });
    ReactDOM.render(
      <div>
      <p>Tillagda ingedienser</p>
      <Collection>{ingredsAdded}</Collection></div>,
      document.getElementById('added')
    );
  }
};

export default IngredientListItem;
