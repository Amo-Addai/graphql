import express from 'express';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import bodyParser from 'body-parser';
import schema from './sample/schema';
// 
import { restRouter, graphQLRouter } from './api'
import { auth } from './auth' // BUT THIS MUST BE CREATED FIRST

const GRAPHQL_PORT = 3000;

const APIgraphQLServer = express();
// THIS IS THE NORMAL STANDARD
// APIgraphQLServer.use('/graphql', bodyParser.json(), graphqlExpress({ schema })); 
// BUT IT'S BEST TO USE THIS APPROACH TO ADD BOTH GRAPH-QL & REST ROUTERS
// auth PARAM IS AN AUTHENTICATION MIDDLEWARE THAT CAN DO AUTHENTICATION ...
APIgraphQLServer.use('/api', auth, restRouter);
// ONLY HAVE GENERAL AUTHENTICATION STUFF IN auth 
// BUT USE SPECIFIC AUTHENTICATIONS WITHIN THE GRAPH-QL RESOLVERS
APIgraphQLServer.use('/graphql', auth, graphQLRouter);
APIgraphQLServer.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

APIgraphQLServer.listen(GRAPHQL_PORT, () =>
  console.log(
    `GraphiQL is now running on http://localhost:${GRAPHQL_PORT}/graphiql`
  )
);
