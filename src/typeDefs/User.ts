import gql from "graphql-tag";

const typeDefs = gql`
type User {
    id: ID!
    name: String!
    email: String!
    password: String!
    address: String!
    city: String!
    country: String!
    zipCode: String!
}

input UserInput {
    name: String!
    email: String!
    password: String!
    address: String!
    city: String!
    country: String!
    zipCode: String!
}

input UpdateUserInput {
    name: String
    email: String
    password: String
    address: String
    city: String
    country: String
    zipCode: String
}

type Query {
    user(id: ID!): User
    users(ids: [ID!]): [User]
}

type Mutation {
    createUser(input: UserInput!): User
    updateUser(id: ID!, input: UpdateUserInput!): User
    deleteUser(id: ID!): Boolean
}
`; // Add a closing backtick here
export default typeDefs;
