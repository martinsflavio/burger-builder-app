const burgerHasIngredients = ingredients => {
  let ingredientsTotal;

  if (ingredients && ingredients instanceof Object) {
    ingredientsTotal = Object.values(ingredients).reduce((a, b) => a + b, 0);
  } else {
    ingredientsTotal = 0;
  }

  return ingredientsTotal > 0;
};

export default burgerHasIngredients;
