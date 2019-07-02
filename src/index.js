import express from 'express';
import graphQLServer from './graphql-server';

const port = 8888;
const app = express();

graphQLServer.applyMiddleware({ app, path: '/graphql' });

app.get('/graphql-voyager', (req, res) => {
  res.sendFile(`${__dirname}/graphql-voyager/index.html`);
});

app.listen({ port }, () => {
  console.log(`Listening on port: ${port}`);
});
