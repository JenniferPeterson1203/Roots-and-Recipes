const express = require("express");

const recipes = express.Router();

// const verifyToken = require("../middlewares/authMiddleware");

const {
  getAllPublicRecipes,
  createRecipe,
  recipesById,
  getAllLunchRecipes,
  getAllDinnerRecipes,
  lastRecipeById,
  getSingleRecipe,
  deleteRecipeByRecipeId,
  updateRecipeById,
} = require("../queries/recipes");

// To get ALL PUBLIC recipes
recipes.get("/", async (req, res) => {
  try {
    const allPublicRecipes = await getAllPublicRecipes();

    res.status(200).json(allPublicRecipes);
  } catch (error) {
    res.status(500).json({ error: "server error" });
  }
});

// To create a NEW RECIPE
recipes.post("/", async (req, res) => {
  console.log("body", req.body);

  try {
    const newRecipe = await createRecipe(req.body);
    // console.log("new recipe:", newRecipe);
    res.status(200).json(newRecipe);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// // To get ALL of the recipes that have lunch as a category
recipes.get("/lunch", async (req, res) => {
  try {
    const allLunchRecipes = await getAllLunchRecipes();

    res.status(200).json(allLunchRecipes);
  } catch (error) {
    res.status(500).json({ error: "server error" });
  }
});

// // To get ALL of the recipes that have dinner as a category
recipes.get("/dinner", async (req, res) => {
  try {
    const allDinnerRecipes = await getAllDinnerRecipes();

    res.status(200).json(allDinnerRecipes);
  } catch (error) {
    res.status(500).json({ error: "server error" });
  }
});

// To get the most recent recipe the user has created
recipes.get("/latest/:user_id", async (req, res) => {
  const { user_id } = req.params;
  // console.log(user_id);
  try {
    const latestRecipe = await lastRecipeById(user_id);

    res.status(200).json(latestRecipe);
  } catch (error) {
    res.status(500).json({ error: "server error" });
  }
});

recipes.get("/single_recipe/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);

  try {
    const singleRecipe = await getSingleRecipe(id);
    res.status(200).json(singleRecipe);
  } catch (error) {
    res.status(500).json({ error: "server error" });
  }
});

// To get ALL of the Recipes that the user created
recipes.get("/:user_id", async (req, res) => {
  const { user_id } = req.params;

  try {
    const recipes = await recipesById(user_id);
    if (recipes.length > 0) {
      res.status(200).json(recipes);
    } else {
      res.status(404).json({ error: "No recipes found for this user ID" });
    }
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// UPDATE A RECIPE BY ID
recipes.put("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const updatedRecipe = await updateRecipeById(id, req.body);
    res.status(200).json(updatedRecipe);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// recipes.get("/recipes/:user_id", verifyToken, async (req, res) => {
//   const userId = req.userId;

//   try {
//     const recipes = await recipesById(userId);
//     if (recipes) {
//       console.log(recipes);
//       res.status(200).json(recipes);
//     } else {
//       res.status(404).json({ error: "No recipes found for this user" });
//     }
//   } catch (error) {
//     res.status(500).json({ error: "Server error" });
//   }
// });

recipes.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedRecipe = await deleteRecipeByRecipeId(id);
    res.status(200).json(deletedRecipe);
  } catch (error) {
    res.status(400).json({ error: "Recipe not found with this ID" });
  }
});
module.exports = recipes;
