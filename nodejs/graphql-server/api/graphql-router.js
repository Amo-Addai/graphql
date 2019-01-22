import { makeExecutableSchema } from 'graphql-tools'
import { graphqlExpress } from 'apollo-server-express'
import merge from 'lodash.merge'
import { userType, userResolvers } from './user'
import { songType, songResolvers } from './song'
import { playlistType, playlistResolvers } from './playlist'


const baseSchema = `
    schema {
        query: Query
        mutation: Mutation
    }
`;

const schema = makeExecutableSchema({
    typeDefs: [ baseSchema, userType, songType, playlistType ],
    resolvers: merge({}, userResolvers, songResolvers, playlistResolvers ) // MERGE ALL RESOLVERS FROM ALL DATA DOMAINS
});

export const graphQLRouter = graphqlExpress(req => ({
    schema, context: { req, user: req.user }
    // context IS EVERY context ARGUMENT ON ALL RESOLVERS ..
    // SO THE req & user PROPS ARE WITHIN THE context (3rd)
}));


// EXTRA STUFF ON GRAPH-QL USAGE
import { graphql } from 'graphql'

// Run the GraphQL query '{ hello }' and print out the response
// Can be used as a GraphQL Testing tool ..
// USING IT WITHIN TEST FILES (user.spec.js) TO MAKE GRAPH-QL REQUESTS :)
graphql(schema, graphqlQuery, root, {user}, variables).then((response) => {
    console.log(response); // Prints "{ sample: { hello: "world" } }"
    // BASICALLY PRINTS THE RESPONSE GIVEN BY THE GRAPH-QL SERVER
});

