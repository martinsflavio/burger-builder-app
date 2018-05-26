import React from 'react';
import classes from './burger.css';
import BurgerIngredient from './Burgeringredient/BurgerIngredient';



const Burger = (props) => {

  // Transforms props.ingredients obj into a array flat array
  let transformedIngredients = Object.keys(props.ingredients)
    .map(igKey => {
      return [...Array(props.ingredients[igKey])]
        .map((_, i) => {
          return <BurgerIngredient key={igKey + i} type={igKey} />;
        });
    })
    .reduce((arr, el) => {
      return arr.concat(el)
    }, []);

  // Checking for ingredients passed as props obj
  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please start adding ingredients</p>
  }

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      { transformedIngredients }
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default Burger;
