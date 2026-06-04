export function searchRecipes(recipesList, searchTerm) {
  if (searchTerm.length < 3) {
    return recipesList;
  }

  const search = searchTerm.trim().toLowerCase();

  return recipesList.filter(
    (recipe) =>
      recipe.name.toLowerCase().includes(search) ||
      recipe.description.toLowerCase().includes(search) ||
      recipe.ingredients.some((ingredientObject) =>
        ingredientObject.ingredient.toLowerCase().includes(search),
      ),
  );
}
