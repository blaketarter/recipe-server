import Hapi from 'hapi';
import { graphqlHapi, graphiqlHapi } from 'apollo-server-hapi';
import mongoose from 'mongoose';
import { executableSchema } from './schema';

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3000;

async function StartServer() {
  await mongoose.connect('mongodb://localhost/recipe-server', {
    useMongoClient: true,
  });

  const server = new Hapi.server({
    host: HOST,
    port: PORT,
  });

  await server.register({
    plugin: graphqlHapi,
    options: {
      path: '/graphql',
      graphqlOptions: {
        schema: executableSchema,
      },
      route: {
        cors: true,
      },
    },
  });

  if (process.env.NODE_ENV !== 'production') {
    await server.register({
      plugin: graphiqlHapi,
      options: {
        path: '/graphiql',
        graphiqlOptions: {
          endpointURL: '/graphql'
        }
      },
    });
  }

  try {
    await server.start();
  } catch (err) {
    console.log(`Error while starting server: ${err.message}`);
  }

  console.log(`Server running at: ${server.info.uri}`);
}

StartServer();
