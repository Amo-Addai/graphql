'use strict';

import { graphql, buildSchema, GraphQLSchema, GraphQLObjectType, GraphQLString } from 'graphql';

// Construct a schema, using GraphQL schema language
let schema = buildSchema(`
  type Query {
    hello: String
  }
`); // OR YOU CAN USE THIS INSTEAD
// schema = new GraphQLSchema({
//     query: new GraphQLObjectType({
//         name: 'RootQueryType',
//         fields: {
//             hello: {
//                 type: GraphQLString,
//                 resolve() {
//                     return 'world';
//                 }
//             }
//         }
//     })
// });

// The root provides a resolver function for each API endpoint
let root = {
    hello: () => {
        return 'Hello world!';
    },
}, query = '{ hello }';

// Run the GraphQL query '{ hello }' and print out the response
graphql(schema, query, root).then((response) => {
    console.log(response); // Prints "{ sample: { hello: "world" } }"
});

