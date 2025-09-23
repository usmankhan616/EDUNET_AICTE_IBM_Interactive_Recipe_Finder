document.addEventListener('DOMContentLoaded', () => {
    
    // --- THEME SWITCHER LOGIC (Runs on every page) ---
    const themeToggle = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme) {
        document.body.classList.add(currentTheme);
        if (currentTheme === 'dark-mode') {
            themeToggle.checked = true;
        }
    }

    themeToggle.addEventListener('change', () => {
        document.body.classList.toggle('dark-mode');
        let theme = document.body.classList.contains('dark-mode') ? 'dark-mode' : 'light-mode';
        localStorage.setItem('theme', theme);
    });


    // --- RECIPE SEARCH LOGIC (Only runs if search elements exist) ---
    const searchBtn = document.getElementById('search-btn');
    if (searchBtn) {
        const ingredientInput = document.getElementById('ingredient-input');
        const recipeResults = document.getElementById('recipe-results');
        const modal = document.getElementById('recipe-modal');
        const modalBody = document.getElementById('modal-body');
        const modalCloseBtn = document.querySelector('.modal-close-btn');
        const API_KEY = '95baaafdde7b4f1898c187087df74042';

        searchBtn.addEventListener('click', searchRecipes);
        modalCloseBtn.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });

        const urlParams = new URLSearchParams(window.location.search);
        const searchQuery = urlParams.get('query');
        if (searchQuery) {
            ingredientInput.value = searchQuery;
            searchRecipes();
        }

        async function searchRecipes() {
            const ingredients = ingredientInput.value.trim();
            if (ingredients === '') {
                recipeResults.innerHTML = '<p>Please enter some ingredients.</p>';
                return;
            }

            recipeResults.innerHTML = '<p>Searching for recipes...</p>';
            const url = `https://api.spoonacular.com/recipes/complexSearch?query=${ingredients}&number=12&apiKey=${API_KEY}`;


            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                displayRecipes(data.results);
            } catch (error) {
                recipeResults.innerHTML = '<p>Sorry, something went wrong. Please check your API key or try again later.</p>';
                console.error("Fetch error:", error);
            }
        }

        function displayRecipes(recipes) {
            if (recipes.length === 0) {
                recipeResults.innerHTML = '<p>No recipes found. Try different ingredients.</p>';
                return;
            }

            const recipeHTML = recipes.map(recipe => {
                return `
                    <div class="col-12 col-md-6 col-lg-4 mb-4">
                        <div class="recipe-block" data-id="${recipe.id}">
                            <div class="card-image-container">
                                <img src="${recipe.image}" alt="${recipe.title}">
                            </div>
                            <div class="card-content">
                                <div class="card-title-row">
                                    <h4>${recipe.title}</h4>
                                </div>
                                <div class="card-info-row">
                                    <p>Click to view recipe</p>
                                </div>
                            </div>
                        </div>
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
            const instructionsHTML = recipe.instructions ? recipe.instructions.split('\n').filter(step => step).map(step => `<li>${step}</li>`).join('') : '<li>No instructions available.</li>';

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
    }
});