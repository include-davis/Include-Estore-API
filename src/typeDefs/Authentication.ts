import gql from "graphql-tag";

const typeDefs = gql`
  type Mutation {
    Login(email: String!, password: String!): Boolean
    Register(email: String! password: String!): Boolean
  }
`;

export default typeDefs;
