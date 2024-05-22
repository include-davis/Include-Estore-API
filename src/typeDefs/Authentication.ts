import gql from "graphql-tag";

const typeDefs = gql`
  type Authentication {
    email: String!
    password: String!
  }

  type Mutation {
    Login(email: String!, password: String!): Authentication
    Register(email: String! password: String!): Authentication
  }
`;

export default typeDefs;
