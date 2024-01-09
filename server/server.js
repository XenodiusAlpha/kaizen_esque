const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { graphqlUploadExpress } = require('graphql-upload');
const path = require('path');
const { authMiddleware } = require('./utils/auth');
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');
const { expressMiddleware } = require('@apollo/server/express4');


const PORT = process.env.PORT || 3006;
const app = express();


const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const user = authMiddleware(req);
    return { user }; // Return an object that includes both user and s3
  },
});


// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async () => {
  await server.start();

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json(limit = '50mb'));

  // graphql-upload middleware for handling file uploads
  app.use(graphqlUploadExpress());

  // Serve up static assets
  app.use('/images', express.static(path.join(__dirname, '../client/images')));

  // Apply Apollo server middleware
  app.use('/graphql', expressMiddleware(server, {
    context: authMiddleware
  }));

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));

    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
  }

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};

// Call the async function to start the server
startApolloServer();
