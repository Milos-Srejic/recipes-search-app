window.onload = () => {
  const searchForm = document.forms['search-form'];
  searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const term = document.getElementById('search-form-input').value;
    getData(term);
  });

  const getData = async (term) => {
    const app_id = '7bc56cce';
    const app_key = '3d3922b79e098ca7ad060ea1b12cd370';
    const api_url = `https://api.edamam.com/search?q=${term}&app_id=${app_id}&app_key=${app_key}`;
    try {
      let response = await fetch(api_url);

      let data = await response.json();

      displayData(data);
    } catch (error) {
      console.error(error);
    }
  };
  const displayData = (data) => {
    document.getElementById('recipes-box').textContent = '';
    let recipes = Array.from(data.hits);
    recipes.map((recipe) => {
      console.log(recipe.recipe.ingredientLines);
      const recipeCard = document.createElement('div');
      const recipeImg = document.createElement('img');
      const recipeTitle = document.createElement('h3');
      const recipeBottom = document.createElement('div');
      const recipeCalories = document.createElement('span');
      const recipeIngredients = document.createElement('span');
      const hiddenIngredients = document.createElement('div');

      recipeCard.classList.add('recipe-card');
      recipeBottom.classList.add('recipe-card-bottom');
      recipeCalories.classList.add('recipe-calories');
      recipeIngredients.classList.add('recipe-ingredients');
      hiddenIngredients.classList.add('hidden-ingrediants');

      recipeImg.src = recipe.recipe.image;
      recipeTitle.innerText = recipe.recipe.label;
      recipeCalories.innerText =
        'Calories: ' + Math.round(recipe.recipe.calories);
      recipeIngredients.textContent = 'Ingredients';
      hiddenIngredients.innerText = recipe.recipe.inredientLines;
      recipeBottom.appendChild(recipeCalories);
      recipeBottom.appendChild(recipeIngredients);
      recipeBottom.appendChild(hiddenIngredients);

      recipeCard.appendChild(recipeImg);
      recipeCard.appendChild(recipeTitle);
      recipeCard.appendChild(recipeBottom);

      document.getElementById('recipes-box').appendChild(recipeCard);

      recipeCard.addEventListener('click', (e) => {
        if (e.target.className === 'recipe-ingredients') {
          console.log(e.target.nextSibling);
          e.target.nextSibling.style.display = 'block';
        }
      });
    });
  };
};
