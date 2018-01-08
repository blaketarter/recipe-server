import { makeExecutableSchema } from 'graphql-tools';
import { Recipe } from './types/recipe';
import { resolvers } from './resolvers';

const Query = `
  type Query {
    recipe(id: ID!): Recipe
    recipes: [Recipe]
  }
`;

const Mutation = `
  type Mutation {
    createRecipe (
      name: String
      description: String
      ingredients: [String]
    ): Recipe
    updateRecipe (
      id: ID!
      name: String
      description: String
      ingredients: [String]
    ): Recipe
    deleteRecipe (
      id: ID!
    ): Recipe
  }
`;

const SchemaDefinition = `
  schema {
    query: Query
    mutation: Mutation
  }
`;

export const executableSchema = makeExecutableSchema({
  typeDefs: [SchemaDefinition, Query, Recipe, Mutation],
  resolvers,
});
