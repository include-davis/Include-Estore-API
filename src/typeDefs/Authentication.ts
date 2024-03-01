import gql from "graphql-tag";

const typeDefs = gql`
  type Authentication {
    email: String!
    password: String!
  }

  type Mutation {
    login(email: String!, password: String!): Boolean
    register(email: String! password: String!): Boolean
  }
`;

export default typeDefs;
