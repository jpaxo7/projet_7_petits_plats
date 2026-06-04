export function searchRecipes(recipesList, searchTerm) {
  const search = searchTerm.trim().toLowerCase();
  if (searchTerm.length < 3) {
    return recipesList;
  }

  return recipesList.filter(
    (recipe) =>
      recipe.name.toLowerCase().includes(search) ||
      recipe.description.toLowerCase().includes(search) ||
      recipe.ingredients.some((ingredientObject) =>
        ingredientObject.ingredient.toLowerCase().includes(search),
      ),
  );
}
