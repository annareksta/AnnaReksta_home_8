const API_URL = 'https://www.themealdb.com/api/json/v1/1';

const searchByNameInput = document.getElementById('searchByName');
const searchNameBtn = document.getElementById('searchNameBtn');
const alphabetSearch = document.getElementById('alphabetSearch');
const recipesDiv = document.getElementById('recipes');

searchNameBtn.addEventListener('click', () => {
    const query = searchByNameInput.value.trim();
    if (query) {
        fetch(`${API_URL}/search.php?s=${query}`)
            .then(response => response.json())
            .then(data => {
                recipesDiv.innerHTML = "";
                if (data.meals) {
                    displayRecipes(data.meals);
                } else {
                    recipesDiv.textContent = "No recipes found";}
                })
            .catch(error => console.error("Error:", error));
    } else {
        recipesDiv.textContent = "Введите название рецепта";
    }
});

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
alphabet.split("").forEach(letter => {
    const option = document.createElement("option");
    option.value = letter;
    option.textContent = letter;
    alphabetSearch.appendChild(option);
})
alphabetSearch.addEventListener('change', (event) => {
    const letter = event.target.value;
    if (letter) {
        fetch(`${API_URL}/search.php?f=${letter}`)
            .then(response => response.json())
            .then(data => {
                recipesDiv.innerHTML = "";
                if (data.meals) {
                 displayRecipes(data.meals);
                } else {
                    recipesDiv.textContent = "No recipes found";
                }
            })
    .catch(error => console.error(error));
    }
});

function displayRecipes(meals) {
    meals.forEach(meal => {
    const mealDiv = document.createElement('div');
    mealDiv.style.border = '1px solid #ccc';
    mealDiv.style.margin = '10px';
    mealDiv.style.padding = '10px';
    mealDiv.style.width = '300px';

    mealDiv.innerHTML = `
        <a href="${meal.strSource}" target="_blank">
            <h3>${meal.strMeal}</h3>
        </a>
        <a href="${meal.strSource}" target="_blank"> 
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" style="width: 100px; height: 100px; border-radius: 8px;">
    </a>
    `;
    recipesDiv.appendChild(mealDiv);
});
}
