document.addEventListener('DOMContentLoaded', () => {
    const logoutBtn = document.getElementById('logout-btn');
    if (!logoutBtn) return;

    const userEmailEl = document.getElementById('user-email');
    const savedRecipesContainer = document.getElementById('saved-recipes-container');
    const token = localStorage.getItem('token');
    const API_KEY = '95baaafdde7b4f1898c187087df74042';
    
    if (token) {
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            if (payload.email) {
                userEmailEl.textContent = payload.email;
            }
        } catch (e) {
            console.error('Failed to decode token', e);
            localStorage.removeItem('token');
            window.location.href = 'login.html';
        }
    }

    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('token');
        window.location.href = 'login.html';
    });

    async function fetchSavedRecipes() {
        if (!token) return;

        try {
            const res = await fetch('http://localhost:5000/api/recipes/saved', {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (!res.ok) throw new Error('Could not fetch saved recipes.');

            const recipeIds = await res.json();
            if (recipeIds.length === 0) {
                savedRecipesContainer.innerHTML = '<p>You have no saved recipes yet.</p>';
                return;
            }

            const recipesInfoUrl = `https://api.spoonacular.com/recipes/informationBulk?ids=${recipeIds.join(',')}&apiKey=${API_KEY}`;
            const recipesRes = await fetch(recipesInfoUrl);
            const recipesData = await recipesRes.json();
            
            displaySavedRecipes(recipesData);

        } catch (error) {
            console.error(error);
            savedRecipesContainer.innerHTML = '<p>Could not load saved recipes.</p>';
        }
    }

    function displaySavedRecipes(recipes) {
        const recipeHTML = recipes.map(recipe => {
            return `
                <div class="col-12 col-md-6 col-lg-4 mb-4">
                    <a href="search.html?query=${encodeURIComponent(recipe.title)}" class="recipe-link">
                        <div class="recipe-block">
                            <div class="card-image-container">
                                <img src="${recipe.image}" alt="${recipe.title}">
                            </div>
                            <div class="card-content">
                                <div class="card-title-row">
                                    <h4>${recipe.title}</h4>
                                </div>
                                <div class="card-info-row">
                                    <p>Click to search recipe</p>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
            `;
        }).join('');
        savedRecipesContainer.innerHTML = recipeHTML;
    }

    fetchSavedRecipes();
});