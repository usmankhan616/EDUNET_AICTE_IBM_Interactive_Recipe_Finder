document.addEventListener('DOMContentLoaded', () => {
    const searchBtn = document.getElementById('search-btn');
    const ingredientInput = document.getElementById('ingredient-input');
    const recipeResults = document.getElementById('recipe-results');
    const modal = document.getElementById('recipe-modal');
    const modalBody = document.getElementById('modal-body');
    const modalCloseBtn = document.querySelector('.modal-close-btn');

    const API_KEY = 'YOUR_API_KEY_HERE';

    searchBtn.addEventListener('click', searchRecipes);
    modalCloseBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    async function searchRecipes() {
        const ingredients = ingredientInput.value.trim();
        if (ingredients === '') {
            recipeResults.innerHTML = '<p>Please enter some ingredients.</p>';
            return;
        }

        recipeResults.innerHTML = '<p>Searching for recipes...</p>';
        const url = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&number=10&apiKey=${API_KEY}`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            displayRecipes(data);
        } catch (error) {
            recipeResults.innerHTML = '<p>Sorry, something went wrong. Please try again later.</p>';
        }
    }

    function displayRecipes(recipes) {
        if (recipes.length === 0) {
            recipeResults.innerHTML = '<p>No recipes found. Try different ingredients.</p>';
            return;
        }

        const recipeHTML = recipes.map(recipe => {
            return `
                <div class="recipe-block" data-id="${recipe.id}">
                    <img src="${recipe.image}" alt="${recipe.title}">
                    <h2>${recipe.title}</h2>
                    <p><strong>Ingredients Used:</strong> ${recipe.usedIngredientCount} out of ${recipe.usedIngredientCount + recipe.missedIngredientCount}</p>
                </div>
            `;
        }).join('');

        recipeResults.innerHTML = recipeHTML;
        addRecipeClickListeners();
    }

    function addRecipeClickListeners() {
        const recipeBlocks = document.querySelectorAll('.recipe-block');
        recipeBlocks.forEach(block => {
            block.addEventListener('click', () => {
                const recipeId = block.dataset.id;
                getRecipeDetails(recipeId);
            });
        });
    }

    async function getRecipeDetails(id) {
        const url = `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false&apiKey=${API_KEY}`;
        
        try {
            const response = await fetch(url);
            const data = await response.json();
            displayRecipeDetails(data);
        } catch (error) {
            modalBody.innerHTML = '<p>Could not fetch recipe details.</p>';
            openModal();
        }
    }

    function displayRecipeDetails(recipe) {
        const ingredientsHTML = recipe.extendedIngredients.map(ingredient => `<li>${ingredient.original}</li>`).join('');
        const instructionsHTML = recipe.instructions.split('\n').filter(step => step).map(step => `<li>${step}</li>`).join('');

        const detailsHTML = `
            <h2>${recipe.title}</h2>
            <img src="${recipe.image}" alt="${recipe.title}">
            <h3>Ingredients:</h3>
            <ul>${ingredientsHTML}</ul>
            <h3>Instructions:</h3>
            <ol>${instructionsHTML}</ol>
        `;

        modalBody.innerHTML = detailsHTML;
        openModal();
    }

    function openModal() {
        modal.classList.remove('hidden');
    }

    function closeModal() {
        modal.classList.add('hidden');
    }
});