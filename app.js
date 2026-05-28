import { displayRecipes } from "./scripts/displayRecipes.js";
import { recipes } from "./scripts/recipes.js";
import { searchRecipes } from "./scripts/search.js";
import { populateDropdown } from "./scripts/dropdown.js";
import {
  filterByTags,
  addTag,
  removeTag,
  renderTags,
} from "./scripts/filters.js";

// Application state
const state = {
  searchTerm: "",
  activeTags: { ingredients: [], appliance: [], ustensils: [] },
};

// Main update function: re-filter and re-render everything
function updateUI() {
  // Filter recipes by main search term
  let filteredRecipes = searchRecipes(recipes, state.searchTerm);
  // Filter recipes by active tags (intersection)
  filteredRecipes = filterByTags(filteredRecipes, state.activeTags);

  // Display recipes or "no results" message
  if (filteredRecipes.length === 0) {
    recipesContainer.innerHTML = "";
    const message = document.createElement("p");
    message.className = "text-center w-100";
    message.textContent = `Aucune recette ne contient "${state.searchTerm}". Vous pouvez chercher « tarte aux pommes », « poisson », etc.`;
    recipesContainer.appendChild(message);
  } else {
    displayRecipes(filteredRecipes);
  }

  // Update recipe count
  const recipeCount = filteredRecipes.length;
  document.querySelector(".recipe-count").textContent =
    `${recipeCount} recette${recipeCount > 1 ? "s" : ""}`;

  // Update dropdowns based on currently visible recipes
  populateDropdown("ingredients", filteredRecipes, handleTagSelect);
  populateDropdown("appliance", filteredRecipes, handleTagSelect);
  populateDropdown("ustensils", filteredRecipes, handleTagSelect);

  // Render active tags
  renderTags(state.activeTags, handleTagRemove);
}

// Called when user clicks an item in a dropdown
function handleTagSelect(category, tag) {
  addTag(state.activeTags, category, tag);
  updateUI();
}

// Called when user clicks the × on an active tag
function handleTagRemove(category, tag) {
  removeTag(state.activeTags, category, tag);
  updateUI();
}

// Main search bar listener
const searchInput = document.querySelector(".search-bar__input");
searchInput.addEventListener("input", () => {
  state.searchTerm = searchInput.value;
  updateUI();
});

// Initial display
updateUI();
