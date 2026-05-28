import { recipes } from "./recipes.js";

export function populateDropdown(category, recipesList, onTagSelect) {
  const uniqueValues = [];

  recipesList.forEach((recipe) => {
    if (category === "appliance") {
      // appliance est un string
      if (
        !uniqueValues.some(
          (existingValue) =>
            existingValue.toLowerCase() === recipe.appliance.toLowerCase(),
        )
      ) {
        uniqueValues.push(recipe.appliance);
      }
    } else if (category === "ustensils") {
      // tableau de strings
      recipe.ustensils.forEach((ustensil) => {
        if (
          !uniqueValues.some(
            (existingValue) =>
              existingValue.toLowerCase() === ustensil.toLowerCase(),
          )
        ) {
          uniqueValues.push(ustensil);
        }
      });
    } else if (category === "ingredients") {
      // tableau d'objets
      recipe.ingredients.forEach((ingredientObject) => {
        if (
          !uniqueValues.some(
            (existingValue) =>
              existingValue.toLowerCase() ===
              ingredientObject.ingredient.toLowerCase(),
          )
        ) {
          uniqueValues.push(ingredientObject.ingredient);
        }
      });
    }
  });

  uniqueValues.sort((a, b) => a.localeCompare(b));

  // Cibler le bon dropdown (ordre : ingrédients, appareils, ustensiles)
  const categoriesOrder = ["ingredients", "appliance", "ustensils"];
  const dropdownIndex = categoriesOrder.indexOf(category);
  const dropdown = document.querySelectorAll(".filter-dropdown")[dropdownIndex];
  const list = dropdown.querySelector(".filter-dropdown__list");
  const searchInput = dropdown.querySelector(".filter-dropdown__search");

  renderDropdownItems(list, uniqueValues, category, onTagSelect);

  // Mini barre de recherche du dropdown (listener attaché une seule fois)
  if (!searchInput.dataset.listenerAttached) {
    searchInput.addEventListener("input", () => {
      const userInput = searchInput.value.toLowerCase();
      const matchingValues = uniqueValues.filter((value) =>
        value.toLowerCase().includes(userInput),
      );
      renderDropdownItems(list, matchingValues, category, onTagSelect);
    });
    searchInput.dataset.listenerAttached = "true";
  }
}

function renderDropdownItems(list, items, category, onTagSelect) {
  list.innerHTML = "";
  items.forEach((itemName) => {
    const listElement = document.createElement("li");
    const capitalizedName =
      itemName.charAt(0).toUpperCase() + itemName.slice(1);
    listElement.textContent = capitalizedName;
    listElement.style.cursor = "pointer";
    listElement.addEventListener("click", (event) => {
      event.stopPropagation();
      onTagSelect(category, capitalizedName);
    });
    list.appendChild(listElement);
  });
}
