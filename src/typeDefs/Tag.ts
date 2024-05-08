import gql from "graphql-tag";

const typeDefs = gql`
  type Tag {
    id: ID!
    name: String!
    products: [ProductToTag]
  }

  input TagInput {
    name: String!
  }

  type Query {
    tag(id: ID!): Tag
    tagName(name: String!): Tag
    manyTags(id: [ID]): [Tag]
  }

  type Mutation {
    createTag(input: TagInput!): Tag
    deleteTag(id: ID!): Boolean
  }
`;
export default typeDefs;
