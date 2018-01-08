import mongoose from 'mongoose';

const RecipeSchema = new mongoose.Schema({
  name: {
    type: String
  },
  image: {
    type: String
  },
  description: {
    type: String
  },
  ingredients: {
    type: [String]
  },
});

export const Recipe = mongoose.model('Recipe', RecipeSchema);
