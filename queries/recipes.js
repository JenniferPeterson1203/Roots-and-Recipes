const db = require("../db/dbConfig");

//HOME PG
//Grabs all public recipes
//Grab one recipe

// VIEW ALL PUBLIC RECIPES
const getAllPublicRecipes = async () => {
  try {
    const query = "SELECT * FROM recipes WHERE status = $1";

    const recipes = await db.any(query, "TRUE");

    return recipes;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

// CREATE NEW RECIPE
const createRecipe = async (recipe) => {
  // console.log(recipe);

  const { name, family, chef, status, user_id, photo, ingredients, steps } =
    recipe;

  try {
    const query =
      "INSERT INTO recipes (name, family, chef, status, user_id, photo, ingredients, steps) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *";

    const newRecipe = await db.one(query, [
      name,
      family,
      chef,
      status,
      user_id,
      photo,
      ingredients,
      steps,
    ]);
    return newRecipe;
  } catch (error) {
    return error;
  }
};

// GET RECIPES BASED ON USER ID
const recipesById = async (user_id) => {
  try {
    const query = "SELECT * FROM recipes WHERE user_id=$1";
    const allRecipes = await db.any(query, user_id);
    return allRecipes;
  } catch (error) {
    return error;
  }
};

// GET USERS MOST RECENT RECIPE
const lastRecipeById = async (user_id) => {
  try {
    const query =
      "SELECT * FROM recipes WHERE user_id=$1 ORDER BY created_at DESC LIMIT 1";
    const lastRecipe = await db.oneOrNone(query, user_id);
    return lastRecipe;
  } catch (error) {
    return error;
  }
};

const getSingleRecipe = async (id) => {
  try {
    const query = "SELECT * FROM recipes WHERE id = $1";
    const singleRecipe = await db.one(query, id);
    return singleRecipe;
  } catch (error) {
    return error;
  }
};

// To delete ONE recipe based on the user id and the recipe id
const deleteRecipeByRecipeId = async (id) => {
  try {
    const query = "DELETE FROM recipes WHERE id = $1 RETURNING *";
    const deletedRecipe = await db.one(query, [id]);
    return deletedRecipe;
  } catch (error) {
    console.error("Error executing this DELETE query:", error);
    throw error;
  }
};

// EDIT RECIPE BASED ON RECIPE ID
const updateRecipeById = async (id, recipe) => {
  const { name, chef, family, photo, status, ingredients, steps } = recipe;
  try {
    const query = `
      UPDATE recipes SET 
 name = $1, chef = $2, family = $3, photo = $4, status = $5, ingredients = $6, steps = $7
      WHERE id = $8 
      RETURNING *`;
    const updatedRecipe = await db.one(query, [
      name,
      chef,
      family,
      photo,
      status,
      ingredients,
      steps,
      id,
    ]);
    return updatedRecipe;
  } catch (error) {
    console.error("Error updating recipe:", error);
    throw error;
  }
};

// // GET RECIPES WITH LUNCH AS A CATEGORY
const getAllLunchRecipes = async () => {
  try {
    const query =
      "SELECT * FROM recipes JOIN category_to_recipe ON recipes.id = category_to_recipe.recipe_id WHERE category_to_recipe.category_id = 2 AND status = true LIMIT 8";

    const lunchRecipes = await db.any(query);

    return lunchRecipes;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

// // GET RECIPES WITH DINNER AS A CATEGORY
const getAllDinnerRecipes = async () => {
  try {
    const query =
      "SELECT * FROM recipes JOIN category_to_recipe ON recipes.id = category_to_recipe.recipe_id WHERE category_to_recipe.category_id = 3 AND status = true LIMIT 8";

    const dinnerRecipes = await db.any(query);

    return dinnerRecipes;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

module.exports = {
  getAllPublicRecipes,
  createRecipe,
  recipesById,
  getAllLunchRecipes,
  getAllDinnerRecipes,
  lastRecipeById,
  getSingleRecipe,
  deleteRecipeByRecipeId,
  updateRecipeById,
};
