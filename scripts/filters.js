export function filterByTags(recipesList, activeTags) {
  return recipesList.filter((recipe) => {
    const ingredientNames = recipe.ingredients.map((ingredientObject) =>
      ingredientObject.ingredient.toLowerCase(),
    );
    const matchIngredients = activeTags.ingredients.every((tag) =>
      ingredientNames.includes(tag.toLowerCase()),
    );

    const matchAppliance = activeTags.appliance.every(
      (tag) => recipe.appliance.toLowerCase() === tag.toLowerCase(),
    );

    const ustensilsLower = recipe.ustensils.map((ustensil) =>
      ustensil.toLowerCase(),
    );
    const matchUstensils = activeTags.ustensils.every((tag) =>
      ustensilsLower.includes(tag.toLowerCase()),
    );

    return matchIngredients && matchAppliance && matchUstensils;
  });
}

export function addTag(activeTags, category, tag) {
  if (!activeTags[category].includes(tag)) {
    activeTags[category].push(tag);
  }
}

export function removeTag(activeTags, category, tag) {
  activeTags[category] = activeTags[category].filter(
    (currentTag) => currentTag !== tag,
  );
}

export function renderTags(activeTags, onTagRemove) {
  const container = document.querySelector(".active-tags");
  container.innerHTML = "";
  const categoriesOrder = ["ingredients", "appliance", "ustensils"];

  categoriesOrder.forEach((category) => {
    activeTags[category].forEach((tag) => {
      const tagElement = document.createElement("span");
      tagElement.textContent = tag;
      tagElement.style.cssText =
        "display:inline-flex;align-items:center;background:#FFD15B;padding:6px 12px;border-radius:8px;margin:4px;";

      const closeButton = document.createElement("button");
      closeButton.textContent = "×";
      closeButton.style.cssText =
        "margin-left:8px;background:none;border:none;cursor:pointer;font-size:18px;line-height:1;";
      closeButton.addEventListener("click", () => onTagRemove(category, tag));

      tagElement.appendChild(closeButton);
      container.appendChild(tagElement);
    });
  });
}
