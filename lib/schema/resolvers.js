import { Recipe as RecipeDB } from './models/recipe';

/**
 * generate projection object for mongoose
 * @param  {Object} fieldASTs
 * @return {Project}
 */
export function getProjection (fieldASTs) {
  return fieldASTs.fieldNodes[0].selectionSet.selections.reduce((projections, selection) => {
    projections[selection.name.value] = true;
    return projections;
  }, {});
}

export const resolvers = {
  Query: {
    recipes(_, { id }, source, fieldASTs) {
      const projections = getProjection(fieldASTs);
      return RecipeDB.find({}, projections).exec();
    },
    recipe(_, { id }, source, fieldASTs) {
      const projections = getProjection(fieldASTs);
      return RecipeDB.findById(id, projections).exec();
    },
  },
  Mutation: {
    createRecipe(_, {
      ingredients = [],
      ...rest
    }, source, fieldASTs) {
      const projections = getProjection(fieldASTs);
      const recipe = new RecipeDB({ ...rest, ingredients });

      return recipe.save();
    },
    async updateRecipe(_, {
      id,
      ...rest
    }, source, fieldASTs) {
      const projections = getProjection(fieldASTs);
      
      await RecipeDB.update({
        _id: id
      }, {
        $set: rest
      });

      return RecipeDB.findById(id, projections).exec();
    },
    deleteRecipe(_, { id }, source, fieldASTs) {
      const projections = getProjection(fieldASTs);
      return RecipeDB.findOneAndRemove({ _id: id }).exec();
    }
  }
};
