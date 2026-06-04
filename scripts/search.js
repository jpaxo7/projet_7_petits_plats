import { displayRecipes } from "./displayRecipes.js";
import { recipes } from "./recipes.js";

export function searchRecipes(recipes, searchTerm) {
  const search = searchTerm.trim().toLowerCase();

  if (searchTerm.length < 3) {
    return recipes;
  } else {
    const filteredRecipes = [];
    for (let i = 0; i < recipes.length; i++) {
      const recipe = recipes[i];
      if (
        recipe.name.toLowerCase().includes(search) ||
        recipe.description.toLowerCase().includes(search)
      ) {
        filteredRecipes.push(recipe);
      } else {
        for (let j = 0; j < recipe.ingredients.length; j++) {
          const ingredient = recipe.ingredients[j];
          if (ingredient.ingredient.toLowerCase().includes(search)) {
            filteredRecipes.push(recipe);
            break;
          }
        }
      }
    }
    return filteredRecipes;
  }
}
