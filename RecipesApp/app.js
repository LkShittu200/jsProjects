const mealsCtn = document.querySelector(".relative-span");
const searchBtn = document.querySelector("#search-term");
console.log(searchBtn);
const searchPlace = document.querySelector("#search");
console.log(searchPlace);
const popupInfoContainer = document.querySelector("#popup-container");
console.log(popupInfoContainer);
const mealInfo = document.querySelector(".mealsin");
const closePopupBtn = document.querySelector(".close-popup");

getRandom();
updatePopMeals();

const popContainer = document.querySelector(".popular-food");

async function getRandom() {
  const resp = await fetch(
    "https://www.themealdb.com/api/json/v1/1/random.php"
  );

  const respBook = await resp.json();
  const respData = respBook.meals[0];
  console.log(respData);

  addMeal(respData, true);
}

async function fetchById(id) {
  const resp = await fetch(
    "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id
  );

  const respData = await resp.json();
  const meal = respData.meals[0];

  return meal;
}

async function findMealsBysearch(term) {
  const resp = await fetch(
    /*"https://www.themealdb.com/api/json/v1/1/search.php?s=" + term*/
    "https://www.themealdb.com/api/json/v1/1/search.php?s=" + term
  );

  const respData = await resp.json();
  const meals = respData.meals;
  return meals;
}

function addMeal(mealData, get = false) {
  console.log(mealData);
  const random = document.createElement("div");

  random.classList.add("random");
  random.innerHTML = `
          ${get ? `<span class="recipes">Random Recipe</span> ` : ""}
          <img
            src="${mealData.strMealThumb}"
            alt="${mealData.strMeal}"
          />

          <div class="container-down">
            ${mealData.strMeal}

            <button class="heart">
              <i class="fa fa-heart" ></i>
            </button>
          </div>
        `;

  const btn = random.querySelector(".container-down .heart");

  btn.addEventListener("click", () => {
    if (btn.classList.contains("active")) {
      removeMealLS(mealData.idMeal);
      btn.classList.remove("active");
    } else {
      addMealLS(mealData.idMeal);
      btn.classList.add("active");
    }
  });
  random.addEventListener("click", () => {
    showMealInfo(mealData);
  });
  mealsCtn.appendChild(random);
}

function addMealLS(mealId) {
  const mealIds = getMealLS();

  localStorage.setItem("mealIds", JSON.stringify([...mealIds, mealId]));
}

function removeMealLS(mealId) {
  const mealIds = getMealLS();

  localStorage.setItem(
    "mealIds",
    JSON.stringify(mealIds.filter((id) => id !== mealId))
  );
}

function getMealLS() {
  const mealIds = JSON.parse(localStorage.getItem("mealIds"));

  return mealIds === null ? [] : mealIds;
}

async function updatePopMeals() {
  const mealIds = getMealLS();

  const meals = [];

  for (let i = 0; i < mealIds.length; i++) {
    const mealId = mealIds[i];

    const meal = await fetchById(mealId);

    meals.push(meal);

    addMealPopular(meal);
  }

  console.log(meals);
}

function addMealPopular(mealData) {
  const popMeal = document.createElement("li");

  popMeal.innerHTML = `
          
            <img
              src="${mealData.strMealThumb}"
              alt="${mealData.strMeal}"
            /><span>${mealData.strMeal}</span><button class="clear">
              <i class="fa fa-times" >clear</i>
            </button>
          
        `;

  const btn = popMeal.querySelector(".clear");

  btn.addEventListener("click", () => {
    removeMealLS(mealData.idMeal);
    updatePopMeals();
  });

  popMeal.addEventListener("click", () => {
    showMealInfo(mealData);
  });

  popContainer.appendChild(popMeal);
}

function showMealInfo(mealData) {
  mealInfo.innerHTML = "";
  const mealInfoPop = document.createElement("div");

  const ingredients = [];
  for (let i = 1; i < 20; i++) {
    if (mealData["strIngredient" + i]) {
      ingredients.push(
        `${mealData["strIngredient" + i]}- ${mealData["strMeasure" + i]}`
      );
    } else {
      break;
    }
  }
  mealInfoPop.innerHTML = `
     
        <h1>${mealData.strMeal}</h1>

        <img
          src="${mealData.strMealThumb}"
          alt=""
        />
        <p>
          ${mealData.strInstructions}
        </p>
        <h3>Ingredients:</h3>
        <ul>
        ${ingredients
          .map(
            (ing) => `<li>
        ${ing}
        </li>`
          )
          .join("")}
        </ul>
        `;

  mealInfo.appendChild(mealInfoPop);

  popupInfoContainer.classList.remove("hidden");
}

searchBtn.addEventListener("click", async () => {
  mealsCtn.innerHTML = "";
  const search = searchPlace.value;

  const meals = await findMealsBysearch(search);

  if (meals) {
    meals.forEach((meal) => {
      addMeal(meal);
    });
  } else {
    const recipes = document.createElement("div");

    recipes.classList.add("no-recipes");
    recipes.innerHTML = `<span>Sorry! ${search} isn't present!</span> `;
    mealsCtn.appendChild(recipes);
  }
});

closePopupBtn.addEventListener("click", () => {
  popupInfoContainer.classList.add("hidden");
});
