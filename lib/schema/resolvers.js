const recipes = [];

const findRecipeAndIndex = recipes => (id) => {
  let recipeIndex = -1;
  const recipe = recipes.find((r, index) => {
    if (r.id === id) {
      recipeIndex = index;
      return true;
    }
    return false;
  });

  return {
    recipe,
    index: recipeIndex,
  };
}

export const resolvers = {
  Query: {
    recipes() {
      return recipes;
    },
    recipe(_, { id }) {
      return recipes.find(r => r.id === id);
    },
  },
  Mutation: {
    createRecipe(_, {
      ingredients = [],
      ...rest
    }) {
      const recipe = {
        id: `${recipes.length}`,
        ingredients,
        ...rest
      };

      recipes.push(recipe);
      return recipe;
    },
    updateRecipe(_, {
      id,
      ...rest
    }) {
      const { index, recipe } = findRecipeAndIndex(recipes)(id);
      if (!recipe) {
        throw new Error(`Recipe with ID: ${id} not found.`);
      }

      const updatedRecipe = {
        ...recipe,
        ...rest,
        id,
      };

      recipes[index] = updatedRecipe
      return updatedRecipe;
    },
    deleteRecipe(_, { id }) {
      const { index, recipe } = findRecipeAndIndex(recipes)(id);
      if (!recipe) {
        throw new Error(`Recipe with ID: ${id} not found.`);
      }
  
      recipes.splice(index, 1);
      return recipes;
    }
  }
};
