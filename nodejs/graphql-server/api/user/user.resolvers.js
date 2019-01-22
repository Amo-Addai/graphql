import { User } from './user.model'

// rootValue (from parent node in graph), args (for all params)
// context (of this current resolver), info (extra information)
// context HAS req & user PROPERTIES (FROM graphql-router.js - graphqlExpress() METHOD)
const getMe = (rootValue, args, context, info) => {
    return context.user; // OR JUST return {USER PROPS};
}, allUsers = (rootValue, args, context, info) => {

}, // AND NOW, DEFINE THE MUTATION RESOLVERS ...
updateMe = (rootValue, {input}, {req, user}, info) => {
    // VALIDATE input FIRST AS UpdatedUser GRAPH-QL OBJECT
    merge(user, input)
    return user.save()
};

export const userResolvers = {
    Query: { getMe, allUsers },
    Mutation: {
        updateMe
    },
    User: { // PUT NESTED RESOLVERS (DATA DOMAIN OBJECT'S FIELDS' RESOLVERS)
        friends: (userRootValue, args, context, info) => {
            // YOU CAN RETURN AN ARRAY OF USERS, OR USER IDs
            if(args.sorting) return []; // SORT THIS ARRAY
            else return []; // NO NEED TO SORT THIS ARRAY
        }
    }
};