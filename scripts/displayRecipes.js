import { recipes } from "./recipes.js";

export function displayRecipes(recipesToDisplay) {
  const recipesContainer = document.getElementById("recipes-grid");
  recipesContainer.innerHTML = ""; // Clear previous recipes

  recipesToDisplay.forEach((recipe) => {
    const recipeCard = document.createElement("div");
    recipeCard.classList.add("col-12", "col-md-6", "col-lg-4");

    const recipeArticle = document.createElement("article");
    recipeArticle.classList.add("recipe-card");
    recipeCard.appendChild(recipeArticle);

    const recipeImageWrapper = document.createElement("div");
    recipeImageWrapper.classList.add("recipe-card__img-wrapper");
    recipeArticle.appendChild(recipeImageWrapper);

    const recipeImage = document.createElement("img");
    recipeImage.src = `assets/${recipe.image}`;
    recipeImage.alt = recipe.name;
    recipeImage.classList.add("recipe-card__img");
    recipeImageWrapper.appendChild(recipeImage);

    const preparationTime = document.createElement("span");
    preparationTime.classList.add("recipe-card__time");
    preparationTime.textContent = `${recipe.time}min`;
    recipeImageWrapper.appendChild(preparationTime);

    const recipeBody = document.createElement("div");
    recipeBody.classList.add("recipe-card__body");
    recipeArticle.appendChild(recipeBody);

    const recipeName = document.createElement("h2");
    recipeName.classList.add("recipe-card__title");
    recipeName.textContent = recipe.name;
    recipeBody.appendChild(recipeName);

    const recipeSubtitle = document.createElement("h3");
    recipeSubtitle.classList.add("recipe-card__subtitle");
    recipeSubtitle.textContent = "Recette";
    recipeBody.appendChild(recipeSubtitle);

    const recipeDescription = document.createElement("p");
    recipeDescription.classList.add("recipe-card__description");
    recipeDescription.textContent = recipe.description;
    recipeBody.appendChild(recipeDescription);

    const ingredientsSubtitle = document.createElement("h3");
    ingredientsSubtitle.classList.add("recipe-card__subtitle");
    ingredientsSubtitle.textContent = "ingrédients";
    recipeBody.appendChild(ingredientsSubtitle);

    const ingredientsList = document.createElement("ul");
    ingredientsList.classList.add("recipe-card__ingredients");
    recipe.ingredients.forEach((ingredient) => {
      const ingredientItem = document.createElement("li");

      const ingredientName = document.createElement("p");
      ingredientName.classList.add("recipe-card__ingredient-name");
      ingredientName.textContent = ingredient.ingredient;

      const ingredientQuantity = document.createElement("p");
      ingredientQuantity.classList.add("recipe-card__ingredient-qty");
      ingredientQuantity.textContent = `${ingredient.quantity || ""} ${ingredient.unit || ""}`;

      ingredientItem.appendChild(ingredientName);
      ingredientItem.appendChild(ingredientQuantity);
      ingredientsList.appendChild(ingredientItem);
    });
    recipeBody.appendChild(ingredientsList);

    recipesContainer.appendChild(recipeCard);
  });
}
