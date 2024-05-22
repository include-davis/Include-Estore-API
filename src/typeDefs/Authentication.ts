import gql from "graphql-tag";

const typeDefs = gql`
  type Authentication {
    email: String!
    password: String!
  }

  type Mutation {
    login(email: String!, password: String!): Boolean
    register(email: String! password: String!): Boolean
    generateHMACSignature(email: String!, duration: String): String
    verifyHMACSignature(token: String!): String
  }
`;

export default typeDefs;
